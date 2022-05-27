const { Router } = require("express");
const { check } = require("express-validator");
const { uploadFile, updateFile, visualizeImg, updateFileCloudinary } = require("../controllers/uploads");
const { allowedCollections } = require("../helpers");
const { validarCampos } = require("../middlewares/validar-campos");
const { validateUploadFile } = require("../middlewares/validate-file");



const router = Router();

router.post('/', validateUploadFile, uploadFile)

router.put('/:coleccion/:id', [
    validateUploadFile,
    check('id', 'Is required mongo id').isMongoId(),
    check('coleccion').custom(c => allowedCollections(c, ['users', 'products'])),
    validarCampos
], updateFileCloudinary)
//, updateFile)

router.get('/:coleccion/:id', [
    check('id', 'Is required mongo id').isMongoId(),
    check('coleccion').custom(c => allowedCollections(c, ['users', 'products'])),
    validarCampos
], visualizeImg)

module.exports = router;