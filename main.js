const http = require('http');
const fs = require('fs');
const PORT = 8080;

const server = http.createServer((req, res) => {
    let dataFile;
    let dataHtml = '';
    let arrayRow = [];

    fs.readFile('./data/data.json', "utf-8", (err, data) => {
        dataFile = JSON.parse(data);
        console.log(JSON.parse(data))
        // console.log(dataFile)
        // console.log(data)
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
});
server.listen(PORT, 'localhost', () => {
    console.log('server is running at http://localhost:8080');
});

const handle = {};

handle.createRow = (i, dataFile, dataHtml) => {
    const deleteHandler = () => {
        handle.deleteRow(dataFile, i);
    };
    dataHtml += '<tr>'
    dataHtml += `<td>${dataFile[i].id}</td>`
    dataHtml += `<td>${dataFile[i].name}</td>`
    dataHtml += `<td>${dataFile[i].price}</td>`
    dataHtml += `<td><button class="btn btn-danger" onclick="${deleteHandler}">Delete</button></td>`
    dataHtml += `<td><button class="btn btn-info" >Update</button></td>`
    dataHtml += '</tr>'
    return dataHtml;
}

handle.deleteRow = (dataFile, id) => {
    const index = dataFile.findIndex(item => item.id === id);
    let data = '';
    if (index !== -1) {
        dataFile.splice(index, 1);
        data = JSON.stringify(dataFile)
        fs.writeFileSync('./data/data.json', data);
        console.log(data)
    }
}

