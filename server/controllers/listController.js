const fs = require('fs')

const shoppingLists = JSON.parse(
    fs.readFileSync(`${__dirname}/../db/data.json`)
);

exports.getList = async (req, res) => {
    try {
        const id = req.params.id
        const urlId = Number(id.match(/\d+/g))
        const list = shoppingLists.find(obj => obj.id === urlId)
        console.log(list)
        res.status(200).json({
            status: "success",
            data: JSON.stringify(list)

        })
    } catch (err) {
        console.error(err)
    }
}

exports.getAllShoppingLists = (req, res) => {
    res.status(200).json({
        status: "success",
        results: shoppingLists.length,
        data: {
            shoppingLists
        }
    });
};

exports.createShoppingList = (req, res) => {
    const newId = shoppingLists.length * 1;
    const newShoppingList = Object.assign({id: newId}, req.body)

    shoppingLists.push(newShoppingList)

    fs.writeFile(`${__dirname}/../db/data.json`, JSON.stringify(shoppingLists), err => {
        res.status(201).json({
            status: "success",
            data: newShoppingList
        });
    });

};

exports.deleteShoppingList = (req, res) => {
    const urlId = req.params.id;
    const listToDelete = urlId.match(/\d+/g)

    console.log(listToDelete)

    const newShoppingList = shoppingLists.filter(item => item.id !== Number(listToDelete));
    console.log(JSON.stringify(newShoppingList))

    fs.writeFile(`${__dirname}/../db/data.json`, JSON.stringify(newShoppingList), err => {
        res.status(202).json({
            statsu: "successfully deleted",
            data: null
        })
    })
    // console.log(listToDelete)
}