const fs = require('fs');

let shoppingLists = JSON.parse(
    fs.readFileSync(`${__dirname}/../db/data.json`)
);


exports.addItem = async (req, res) => {
    try {
        const url = req.body.locationUrl.pathname;
        const urlId = url.match(/\d+/g);

        // Convert urlId to Number if necessary
        const idToFind = Number(urlId[0]);

        shoppingLists.forEach(obj => {
            if (obj.id === idToFind) {
                obj.listItems.push(req.body);
            }
        });

        fs.writeFile(`${__dirname}/../db/data.json`, JSON.stringify(shoppingLists), err => {
            res.status(201).json({
                status: "success",
            })
        });

    } catch (err) {
        console.error(err)
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const url = req.body.pathname
        const urlId = url.match(/\d+/g);

        let list = shoppingLists.find(list => list.id == Number(urlId));
        if (list) {
            list.listItems = list.listItems.filter(item => item.id !== req.params);
        }

        fs.writeFile(`${__dirname}/../db/data.json`, JSON.stringify(list), err => {
            res.status(202).json({
                statsu: "successfully deleted",
                data: null
            })
        })


    } catch (err) {
        console.error(err)
    }
}

