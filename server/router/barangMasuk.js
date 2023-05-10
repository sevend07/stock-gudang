const express = require('express')
const router = express.Router()
const barangMasuk = require('../controller/barangMasuk.controller')

router.get('/', barangMasuk.findAll)
router.get('/', barangMasuk.findOne)
router.get('/search', barangMasuk.findAll)

router.post('/', barangMasuk.create)

router.put('/:id', barangMasuk.update)

router.delete('/:id', barangMasuk.delete)

module.exports = router