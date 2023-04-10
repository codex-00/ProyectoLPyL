const express = require('express')
const docentesController = require('../controllers/docentes.controller')

const router = express.Router()

router.get('/', docentesController.getAllDocentes)
router.get('/:legajo', docentesController.getDocenteByLegajo)
router.delete('/:legajo', docentesController.deleteDocenteByLegajo)
router.post('/', docentesController.createDocente)
router.put('/:legajo', docentesController.updateDocente)

module.exports = { router}
