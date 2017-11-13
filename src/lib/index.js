function toString(obj) {
    return Object.prototype.toString.call(obj);
}

/**
 * 一旦出现 /reg/g|name 或者 {/reg/g:'name'} 就会被以name为key,汲取到结果中。
 * 配合webstorm的正则查找+ $1 $2 .. 有很不错的开发体验。
 *  g 代表数组，数组的名字通过 | 来给。如 { "/asdf/g|params" }
 *  {}向里头递归,碰到字符串、函数则停止
 *  要记得只有数组才有意义，嵌套的对象不需要被处理(嵌套对象可以处理成顶级对象)，所以可以用来做 向里递归 的标志。
 * @param content
 * @param options
 * @returns {{}}
 */
function extract(content, options) {
    var regExp = /\/(.+)\/([^\|]+)?(?:\|(.+))?/;
    var
        key,
        value,
        reg,
        result,
        type,
        ret = {},
        regStr,
        subRet,
        flags,
        name;

    for (key in options) {
    	if(!options.hasOwnProperty(key)) return;
        result = regExp.exec(key);
        regStr = result[1];
        flags = result[2];
        name = result[3];
        if (regStr) {
            reg = new RegExp(regStr, flags);
            value = options[key];
            type = toString(value);
            result = reg.exec(content);

            switch (true) {
                case flags && ~flags.indexOf("g"):
                    let values = [];
                    switch (type) {
                        case "[object String]":
                            name = value;
                            if (result && result.length > 1) {
                                values.push(result[1]);
                                while (result = reg.exec(content)) {
                                    values.push(result[1]);
                                }
                            }
                            break;
                        case "[object Object]":
                            subRet = extract(result[1], value);
                            values.push(subRet);
                            while (result = reg.exec(content)) {
                                subRet = extract(result[1], value);
                                values.push(subRet);
                            }
                            break;
                        case "[object Function]":
                            subRet = value(result);
                            subRet && values.push(subRet);
                            while (result = reg.exec(content)) {
                                subRet = value(result);
                                subRet && values.push(subRet);
                            }
                            break;
                    }

                    ret[name] = values;
                    break;
                case type === "[object Function]":
                    if (name) ret[name] = value(result);
                    break;
                case type === "[object String]":
                    if (result && result.length > 1) {
                        ret[value] = result[1];
                    }
                    break;
                case type === "[object Object]":
                    subRet = extract(result[1], value);
                    Object.assign(ret, subRet);
                    break;
                // case type ==="[object Array]":
                //     break;
            }
        }
    }

    return ret;
}

class RegExtract {
    constructor(content) {
        this._content = content;
    }

    extract(options) {
        return extract(this._content, options);
    }
}


module.exports = RegExtract;
