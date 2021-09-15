const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');

const router = Router();

// Todas las rutas deben pasar por la validación del JWT

router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos);


// Crear eventos
router.post('/',  crearEvento);


// Actualizar Evento
router.put('/:id', actualizarEvento);

// Borrar Evento
router.delete('/:id', eliminarEvento);

module.exports = router;

