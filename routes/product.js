const { Router } = require("express");
const { check } = require("express-validator");
const { createProduct,
    getProducts,
    getProduct,
    updateProduct,
    productDelete } = require("../controllers/product");
const { existCategoryByID, existProductByID } = require("../helpers/db-validators");
const { validateJWT, validarCampos, isAdminRole } = require("../middlewares");



const router = Router();

router.get('/', getProducts);

router.get('/:id', [
    validateJWT,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(existProductByID),
    validarCampos
], getProduct);

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Not valid mongo id').isMongoId(),
    check('category').custom(existCategoryByID),
    validarCampos
], createProduct);

router.put('/:id', [
    validateJWT,
    // check('category', 'Not valid mongo id').isMongoId(),
    check('id').custom(existProductByID),
    validarCampos
], updateProduct);

router.delete('/:id', [
    validateJWT,
    check('id', 'Id insvalid').isMongoId(),
    check('id').custom(existProductByID),
    validarCampos
], productDelete);


module.exports = router;