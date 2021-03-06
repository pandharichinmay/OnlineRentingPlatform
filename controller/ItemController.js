const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Item = mongoose.model('Item');

router.get('/showtItem', (req, res) => {
    res.render("item/addOrEdit", {
        viewTitle: "Insert Item"
    });
});

router.post('/addItem', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var item = new Item();
    item.name = req.body.name;
    item.rentPrice = req.body.rentPrice;
    item.manufactureDate = req.body.manufactureDate; 
    item.price = req.body.price;
    item.save((err, doc) => {
        if (!err)
            res.redirect('item/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("item/addOrEdit", {
                    viewTitle: "Insert item",
                    item: req.body
                });
            } else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Item.findOneAndUpdate({
        _id: req.body._id
    }, req.body, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.redirect('item/list');
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("item/addOrEdit", {
                    viewTitle: 'Update item',
                    item: req.body
                });
            } else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/listItem', (req, res) => {
    Item.find((err, docs) => {
        if (!err) {
            res.render("item/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving item list :' + err);
        }
    });
});


router.get('/:idItem', (req, res) => {
    Item.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("item/addOrEdit", {
                viewTitle: "Update item",
                item: doc
            });
        }
    });
});

router.get('/deleteItem/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/item/list');
        } else {
            console.log('Error in item delete :' + err);
        }
    });
});

module.exports = router;
