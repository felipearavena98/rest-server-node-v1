const { Router } = require('express');
const { check } = require('express-validator');
const { userGet,
    userPost,
    userPut,
    userDelete,
    userPatch } = require('../controllers/user');
const { isRoleValid, emailIsValid, existUserById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');


const router = Router();

router.get('/', userGet);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required and min length 6 characters').isLength({ min: 6 }),
    check('email').custom(emailIsValid),
    check('role').custom(isRoleValid),
    validarCampos
], userPost)

router.put('/:id', [
    check('id', 'Is not valid ID').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(isRoleValid),
    validarCampos
], userPut)

router.delete('/:id', [
    check('id', 'Is not valid ID').isMongoId(),
    check('id').custom(existUserById),
    validarCampos
], userDelete)

router.patch('/', userPatch)

module.exports = router;