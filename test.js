let RegExtract = require("./index.js");

test();

function test() {


    var a = new RegExtract(`
        function test() {
        new RegExtract(\`
            1
            2
            3
            4
            5
            @a1@
            @b1@
            @c1@
        \`)
    }
    `);

    var ret = a.extract({
        "/function (.+?)\\(/": "functionName",
        // "/function .+?\\(.+?\\{([\\s\\S]+?)\\}/":"function_body",
        "/function .+?\\(.+?\\{([\\s\\S]+?)\\}/": {
            "/new (.+)\\(/": "className",
            "/\\s+?(\\d+)\\s+?/g": "numbers",
            "/@(.+)@/g|values": {
                "/(\\d+)/": "number",
                "/([a-z]+)/": "zimu"
            }
        },
    });
    console.log(ret);
}