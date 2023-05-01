const fs = require('fs');

const users = [
    {name: 'Mike', age: 25},
    {name: 'Bob', age: 32},
    {name: 'Nikola', age: 17},
];

const data = JSON.stringify(users, null, 2);

const os = require('os');
const path = require('path');


const mainDir = os.maindir();
const dataD = path.join(mainDir, 'data.json');

fs.writeFile(dataD, data, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Read this:', dataD );
    }
});

const { promises: fsPromises } = require('fs');

async function isExist(event) {
    try {
        await fsPromises.stat(event);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
};

async function updateDataJsonFile(event, newData) {
    try {
        const fileExists = await isExist(event);
        if (!fileExists) {
            console.error('EROR! EROR! EROR!');
            return;
        }
        
        const fileContent = await fsPromises.readFile(event, 'utf-8');
        const data = JSON.parse(fileContent);
        const updatedData = [...data, ...newData];
        const updatedDataJson = JSON.stringify(updatedData, null, 2);

        await fsPromises.writeFile(event, updatedDataJson);

        console.log('data.json updated successfully');
    } catch (err) {
        console.error(err);
    }
};

const newData = [
    {name: 'Anna', age: 24},
    {name: 'Tom', age: 52},
];

updateDataJsonFile(dataD, newData);