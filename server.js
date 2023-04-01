const http = require('http');
const fs = require('fs');
var Vibrant = require('node-vibrant')
var namer = require('color-namer')
const { key } = require('./ifttt.json')
http.createServer(function (req, res) {
    const chunks = [];
    req.on('data', (chunk) => {
        chunks.push(chunk);
    });
    req.once('close', async () => {
        const buffer = Buffer.from(JSON.parse(Buffer.concat(chunks).toString()).image, "base64");
        fs.writeFileSync('album.png', buffer);
        Vibrant.from('./album.png').getPalette().then((pallete) => {
            console.log(pallete['Vibrant'].rgb)
            const color = namer(`rgb(${pallete['Vibrant'].rgb[0]},${pallete['Vibrant'].rgb[1]},${pallete['Vibrant'].rgb[2]})`).roygbiv[0].name
            console.log(color)
            
            fetch(`https://maker.ifttt.com/trigger/set_color_${color}/json/with/key/${key}`)
        })
    });
    res.end();
}).listen(8080);
