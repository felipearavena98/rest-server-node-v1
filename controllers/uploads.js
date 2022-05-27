const path = require('path');
const fs = require('fs')
const { response } = require('express');
const { uploadFiles } = require('../helpers');
const Product = require('../models/product');
const User = require('../models/user');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const uploadFile = async (req, res = response) => {

    try {
        // const name = await uploadFiles(req.files, [ 'txt', 'md', 'text']);
        const name = await uploadFiles(req.files, undefined, 'imgs');

        res.json({ name })
    } catch (error) {
        res.status(400).json({ msg });
    }
}

const updateFile = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let model;

    switch (coleccion) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `User does not exist, invalid ID ${id}`
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `Product does not exist, invalid ID ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Not implement validation' });
    }

    // Clean previus images
    if (model.img) {
        const imgPath = path.join(__dirname, '../uploads', coleccion, model.img);
        if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath)
        }
    }

    const name = await uploadFiles(req.files, undefined, coleccion);
    model.img = name;

    await model.save();

    res.json(model)

}



const updateFileCloudinary = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let model;

    switch (coleccion) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `User does not exist, invalid ID ${id}`
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `Product does not exist, invalid ID ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Not implement validation' });
    }

    // Clean previus images
    if (model.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy(public_id);
    }



    const { tempFilePath } = req.files.file
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

    model.img = secure_url;

    await model.save();

    res.json(model)

}


const visualizeImg = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let model;

    switch (coleccion) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `User does not exist, invalid ID ${id}`
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `Product does not exist, invalid ID ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'Not implement validation' });
    }

    // Clean previus images
    if (model.img) {
        const imgPath = path.join(__dirname, '../uploads', coleccion, model.img);
        if (fs.existsSync(imgPath)) {
            return res.sendFile(imgPath);
        }
    }

    const imgPath = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(imgPath);
}


module.exports = {
    uploadFile,
    updateFile,
    visualizeImg,
    updateFileCloudinary
}