const express = require("express");
const router = express.Router();

const categoriaController = require('../controllers/categoriaController');

//privados
router.post('/add', categoriaController.add );
router.get('/list',categoriaController.list);
router.get('/listActivos',categoriaController.listActivos);
router.put('/update',categoriaController.update);
router.put('/activate',categoriaController.activate);
router.put('/desactivate',categoriaController.desactivate);

module.exports = router;