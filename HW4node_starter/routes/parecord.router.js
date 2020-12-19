const express = require('express');
const router = express.Router();
const parecordController = require('../controllers/parecord.controller');


router.post('/addparecord', parecordController.createPArecord);
router.get('/getparecords', parecordController.getPArecords);
router.delete('/:date', parecordController.deletePArecord);
router.post('/updateparecord', parecordController.updatePArecord);
router.delete('/delete/:group', parecordController.deleteGroup);


module.exports = router;
