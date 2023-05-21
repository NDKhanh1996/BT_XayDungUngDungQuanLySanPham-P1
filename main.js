const handle = require('./handle/handle')
const http = require('http');
const fs = require('fs');
const qs = require('qs')
const PORT = 8080;


const server = http.createServer((req, res) => {
    let dataFile;
    let dataHtml = '';

    if (req.method === 'GET') {
        fs.readFile('./data/data.json', "utf-8", (err, data) => {
            dataFile = JSON.parse(data);
            for (let i = 0; i < dataFile.length; i++) {
                dataHtml = handle.createRow(i, dataFile, dataHtml)
            }
        });

        fs.readFile('./templates/index.html', "utf-8", (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            data = data.replace('{list-user}', dataHtml);
            res.write(data);
            return res.end();
        });
    } else {
        req.on("data", (chunk) => {
            dataHtml += chunk;
        });
        req.on("end", () => {
            fs.readFile('./data/data.json', "utf-8", (err, data) => {
                dataFile = JSON.parse(data);
                const parsedQuery = qs.parse(dataHtml)
                const product = {
                    id: parseInt(parsedQuery.ID),
                    name: parsedQuery.name,
                    price: parseFloat(parsedQuery.price.replace(/[^0-9.-]+/g, ""))
                };
                dataFile.push(product)
                const dataFileToString = JSON.stringify(dataFile)
                fs.writeFile('./data/data.json', dataFileToString, () => {
                    if (err) throw err.message
                })
                for (let i = 0; i < dataFile.length; i++) {
                    dataHtml = handle.createRow(i, dataFile, dataHtml)
                }
            });
            fs.readFile('./templates/index.html', "utf-8", (err, data) => {
                res.writeHead(200, {'Content-Type': "text/html"});
                data = data.replace('{list-user}', dataHtml);
                res.write(data);
                return res.end()
            });
        });
        req.on("error", () => {
            res.end('error')
        })

    }
});
server.listen(PORT, 'localhost', () => {
    console.log('server is running at http://localhost:8080');
});



