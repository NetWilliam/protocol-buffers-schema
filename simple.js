var fs = require("fs")
var t = require("./tokenize.js")

//console.log(fs.ReadStream("./simple.proto"))
//t(fs.readFileSync("./simple.proto"))
fs.readFile("./simple.proto", 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
    console.log(t(data));
})
