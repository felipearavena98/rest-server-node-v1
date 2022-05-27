const { response } = require("express");
const Category = require("../models/category");

const getCategories = async (req, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true }

    const [total, categorys] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        categorys
    })
}

const getCategory = async (req, res = response) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name');

    res.json(category)
}

const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            msg: `Category ${categoryDB.name}, exist in Data Base`
        });
    }

    // Generate data
    const data = {
        name,
        user: req.user._id,
    }

    const category = await new Category(data);

    // Save DB
    await category.save();

    res.status(201).json(category);

}

const updateCategory = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    data.name = data.name.toUpperCase();

    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    res.json(category);

}

const categoryDelete = async (req, res = response) => {

    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, { state: false });


    res.json(category);
}
module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    categoryDelete
} 