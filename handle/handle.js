const fs =require ("fs");
const handle = {};

handle.createRow = (i, dataFile, dataHtml) => {
    dataHtml += '<tr>'
    dataHtml += `<td>${dataFile[i].id}</td>`
    dataHtml += `<td>${dataFile[i].name}</td>`
    dataHtml += `<td>${dataFile[i].price}</td>`
    dataHtml += `<td><button class="btn btn-danger" >Delete</button></td>`
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
    }
}


module.exports = handle;