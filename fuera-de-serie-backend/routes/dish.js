const express = require("express");
const router = express.Router();

const dishController = require('../controllers/dishController');

// Private 
router.post('/add', dishController.add );
router.get('/list',dishController.list);
router.put('/update',dishController.update);
router.delete('/remove',dishController.remove);

module.exports = router;