/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { ValidarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Para crear un nuevo usuario
router.post('/new',
             [  // middlewares
                check('name', 'El nombre es obligatorio').not().isEmpty(),  // evalua un campo en el formulario en particular
                check('email', 'El email no es valido').isEmail(),  // evalua un campo en el formulario en particular
                check('password', 'El password debe tener minimo 6 caracteres').isLength({min: 6}),
                ValidarCampos,

             ], 
             crearUsuario);
router.post('/',
            [
                check('email', 'El email no es valido').isEmail(),  // evalua un campo en el formulario en particular
                check('password', 'El password debe tener minimo 6 caracteres').isLength({min: 6}),
                ValidarCampos,
            ],
             loginUsuario);

             
router.get('/renew', validarJWT, revalidarToken);


module.exports = router;