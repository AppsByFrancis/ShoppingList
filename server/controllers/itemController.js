const fs = require('fs');

let shoppingLists = JSON.parse(
    fs.readFileSync(`${__dirname}/../db/data.json`)
);


exports.addItem = async (req, res) => {
    try {
        const url = req.body.locationUrl.pathname;
        const urlId = url.match(/\d+/g);

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
        const itemId = req.params.id.match(/\d+/g)

        let list = shoppingLists.find(list => list.id == Number(urlId));
        let removeOldItem = shoppingLists.filter(list => list.id !== Number(urlId));
        if (list) {
            list.listItems = list.listItems.filter(item => item.id !== Number(itemId))
            removeOldItem.push(list)
        }
        fs.writeFile(`${__dirname}/../db/data.json`, JSON.stringify(removeOldItem), err => {
            res.status(202).json({
                status: "successfully deleted",
                data: {
                    list
                }
            })
        })
    } catch (err) {
        console.error(err)
    }
}

