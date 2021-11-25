const express =  require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

// Private Methods
router.post('/add', UserController.add);
router.get('/list', UserController.list);
router.put('/update', UserController.update);
router.put('/enabled', UserController.enabled);
router.put('/disabled', UserController.disabled);

//Public Methods
router.post('/login', UserController.login);

module.exports = router;
