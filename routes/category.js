const { Router } = require("express");
const { check } = require("express-validator");
const { createCategory,
    getCategories,
    getCategory,
    updateCategory,
    categoryDelete } = require("../controllers/category");
const { existCategoryByID } = require("../helpers/db-validators");
const { validateJWT, validarCampos, isAdminRole } = require("../middlewares");



const router = Router();

router.get('/', getCategories);

router.get('/:id', [
    validateJWT,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(existCategoryByID),
    validarCampos
], getCategory);

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validarCampos
], createCategory);

router.put('/:id', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom(existCategoryByID),
    validarCampos
], updateCategory);

router.delete('/:id', [
    validateJWT,
    check('id', 'Id insvalid').isMongoId(),
    check('id').custom(existCategoryByID),
    validarCampos
], categoryDelete);


module.exports = router;