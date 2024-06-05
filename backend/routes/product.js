const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

// API to add the product 
router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let product = req.body;
    var query = "insert into product(name, categoryId, description, price, status) values(?,?,?,?, 'true')"// A new product is added: it should be not ACTIVE: in that case so we can use false 
    connection.query(query, [product.name, product.categoryId, product.description, product.price], (err, results) => {

        if (!err) {
            return res.status(200).json({ message: "Product Added Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})


// Get API
router.get('/get', auth.authenticateToken, (req, res, next) => {
    //req reprint request, res reprint respond
    var query = "select p.id, p.name, p.description, p.price, p.status, c.id as categoryId,c.name as category from product as p INNER JOIN category as c where p.categoryId = c.id";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }

    })
})

// API to get by Category
router.get('/getByCategory/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "select id, name, price from product where categoryId = ? and status ='true'";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }

    })
})

// API to get by ID
router.get('/getById/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "select id, name, description, price from product where id = ?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0]);
        }
        else {
            return res.status(500).json(err);
        }

    })

})


// API to update product 
router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let product = req.body;
    var query = "update product set name=?, categoryId=?, description=?, price=?, status=? where id=?";
    connection.query(query, [product.name, product.categoryId, product.description, product.price, product.status, product.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id is not found" });
            }
            return res.status(200).json({ message: "Product Updated Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})


// API to delete
router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    const id = req.params.id;
    var query = "delete from product where id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id is not found" });
            }
            return res.status(200).json({ message: "Product Deleted Successfully" });
        }
        else {
            return res.status(500).json(err);
        }


    })

})

// A{I to change the status 
router.patch('/updateStatus', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let product = req.body;
    var query = "update product set status=? where id=?";
    connection.query(query, [product.status, product.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id is not found" });
            }
            return res.status(200).json({ message: "Product Status Updated Successfully" })
        }
        else {
            return res.status(500).json(err)
        }

    })
})

module.exports = router;

