const Category = require('../models/category');
const Product = require('../models/product');
const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
}


const emailIsValid = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`El email ${email}, ya existe`);
    }
}

const existUserById = async (id) => {
    // Validate email exist
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`ID: {id} is not found, not exist in Data Bases`)
    }
}

const existCategoryByID = async (id) => {
    const existCategory = await Category.findById(id);
    if (!existCategory) {
        throw new Error(`ID: ${id} is not Valid`)
    }
}

const existProductByID = async (id) => {
    const existProduct = await Product.findById(id);
    if (!existProduct) {
        throw new Error(`ID: ${id} is not Valid`)
    }
}

module.exports = {
    isRoleValid,
    emailIsValid,
    existUserById,
    existCategoryByID,
    existProductByID
}