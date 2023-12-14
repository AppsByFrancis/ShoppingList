const fs = require('fs');
const { url } = require('inspector');

let shoppingLists = JSON.parse(
    fs.readFileSync(`${__dirname}/../db/data.json`)
);

exports.checkIdExists = (req, res, next) => {
    const listId = Number(req.url.match(/\d+/g));
    const listExists = shoppingLists.listItems.some(list => list.id === listId);

    if (!listExists) {
        return res.status(404).json({
            status: "fail",
            message: "List with the provided ID not found"
        });
    }

    next();
}


exports.addItem = async (req, res) => {
    try {
        const newId = shoppingLists.length * 1;
        const newShoppingList = Object.assign({id: newId}, req.body);

        shoppingLists.forEach(obj => {
            if (obj.id === newShoppingList.listId) {
                obj.listItems.push(newShoppingList);
            }
        });

        fs.writeFile(`${__dirname}/../db/data.json`, JSON.stringify(shoppingLists), err => {
            res.status(201).json({
                status: "success",
                data: newShoppingList
            })
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An error occurred"
        });
    }
}

exports.editItemName = async (req, res) => {
    try {
        const newName = req.body.name;
        const itemId = Number(req.url.match(/\d+/g));
        const listId = Number(req.body.listId);

        console.log(`List ID: ${req.url}, Item ID: ${listId}`);

        let itemChanged = false;

        shoppingLists.forEach(obj => {
            if (obj.id === listId) {
                obj.listItems.forEach(item => {
                    if (item.id === itemId) {
                        console.log(`Updating item: ${JSON.stringify(item)}`);
                        item.item = newName;
                        itemChanged = true;
                    }
                });
            }
        });

        if (!itemChanged) {
            return res.status(404).json({
                status: "fail",
                message: "List or item not found"
            });
        };

        fs.writeFile(`${__dirname}/../db/data.json`, JSON.stringify(shoppingLists, null, 2), (err) => {
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred"
        });
    }
};


exports.deleteItem = async (req, res) => {
    try {
        const urlId = req.body.listId;
        const itemId = Number(req.url.match(/\d+/g));

        shoppingLists.forEach(obj => {
            if (obj.id === urlId) {
                obj.listItems = obj.listItems.filter(item => item.id !== itemId).map(el => {
                    if (el.id !== 0 && obj.listItems.length !== 0){
                        el.id -= 1;
                        return el;
                    } else {
                        return [];
                    }
                });
            };
        });

        fs.writeFile(`${__dirname}/../db/data.json`, JSON.stringify(shoppingLists, null, 2), err => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).json({
                    status: "error",
                    message: "Error writing to file"
                });
            }
            res.status(200).json({
                status: "successfully deleted",
                data: null
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred"
        });
    }
};



