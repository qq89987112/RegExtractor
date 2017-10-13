let
    RegExtract = require("./index.js"),
    filesystem = require("filesys"),
    path = require("path");

main();

function main() {

    let ext = new RegExtract(filesystem.get(path.join(__dirname,"./test2.md")));
    let result = ext.extract({
        "/接口描述：([\\s\\S]+?)备注/g|apis":{
            "/请求方式：[\\s\\S]+?-(.+)/":"method",
            "/请求URL：[\\s\\S]+?-(.+)/":"url",
            "/请求参数说明\\*\\*([\\s\\S]+?)\\*/":{
                "/\\|(.+?)\\|(.+?)\\|(.+?)\\|(.+?)\\|/g|params":function (result) {
                    let ret = undefined;
                    if(result) {
                        let retTemp = {
                            param: result[1],
                            must: result[2] === "是"
                        };
                        if(/[a-z]+/.test(retTemp.param)){
                            ret = retTemp
                        }
                    }
                    return ret;
                }
            }
        }
    });
    //请在这里下断点
    console.log(result);

}