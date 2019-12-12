const express = require('express');
const router = express.Router();
const controllersEmployees = require('../controllers/controllersEmployees'); 

//GET EMPLOYEES
router.get('/api/employees', controllersEmployees.getEmployees);

//GET EMPLOYEE
router.get('/api/employees/:id' , controllersEmployees.getEmployee);

//POST EMPLOYEE
router.post('/api/employees' , controllersEmployees.insertEmployee);

//PUT EMPLOYEE
router.put('/api/employees/:id' , controllersEmployees.updateEmployee);

//DELETE EMPLOYEE
router.delete('/api/employees/:id' , controllersEmployees.deleteEmployee);

module.exports = router;