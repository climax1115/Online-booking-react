const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const dishRouter = require('./dish');
const categoriaRouter = require("./categoria");

router.use('/user', userRouter);
router.use('/dish', dishRouter);
router.use('/categoria',categoriaRouter);

module.exports = router;