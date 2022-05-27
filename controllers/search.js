const { response } = require('express');
const { isValidObjectId } = require('mongoose');
const Category = require('../models/category');
const Product = require('../models/product');
const User = require('../models/user');


const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles',
]


const searchUsers = async (termino = '', res = response) => {
    const isMongoId = isValidObjectId(termino); // TRUE 

    if (isMongoId) {
        const user = await User.findById(termino);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    const users = await User.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: users
    });

}


const searchCategorias = async (termino = '', res = response) => {

    const isMongoId = isValidObjectId(termino); // TRUE 

    if (isMongoId) {
        const category = await Category.findById(termino);
        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    const categories = await Category.find({ nombre: regex, estado: true });

    res.json({
        results: categories
    });

}

const searchProductos = async (termino = '', res = response) => {

    const isMongoId = isValidObjectId(termino); // TRUE 

    if (isMongoId) {
        const product = await Product.findById(termino)
            .populate('category', 'name');
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    const products = await Product.find({ nombre: regex, estado: true })
        .populate('category', 'name')

    res.json({
        results: products
    });

}


const search = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!allowedCollections.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${allowedCollections}`
        })
    }

    switch (coleccion) {
        case 'users':
            searchUsers(termino, res);
            break;
        case 'categories':
            searchCategorias(termino, res);
            break;
        case 'products':
            searchProductos(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsquda'
            })
    }
}


module.exports = {
    search
}