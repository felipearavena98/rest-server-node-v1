const { response } = require('express');

const userGet = (req, res = response) => {

    const params = req.query;

    res.json({
        msg: 'GET API - Cotroller',
        params
    })
}

const userPost = (req, res = response) => {
    const { name, age } = req.body

    res.json({
        msg: 'POST API - Cotroller',
        name,
        age
    })
}

const userPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'PUT API - Cotroller'
    })
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'PATCH API - Cotroller'
    })
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE API - Cotroller'
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}