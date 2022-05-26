const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSingIng } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post('/login', [
    check('email', 'Email is obligatory').isEmail(),
    check('password', 'Password is obligatory').not().isEmpty(),
    validarCampos
], login);


router.post('/google', [
    check('id_token', 'id_token is obligatory').not().isEmpty(),
    validarCampos
], googleSingIng);


module.exports = router;