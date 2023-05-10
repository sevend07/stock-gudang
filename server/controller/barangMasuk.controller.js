const { barangMasuk, stock } = require('../model/bundleModel')
const { Op } = require('sequelize')
const moment = require('moment')

const findStock = async (req, res) => {
    const stockData = await stock.findOne({ 
        where: {
            nama_barang: req.body.nama_barang,
            merk: req.body.merk
        }
    })
    
    return stockData
}

exports.create = async (req, res) => {
    const idStock = await findStock(req, res)
    if (idStock !== null) {
        const create = {
            tanggal: req.body.tanggal,
            jumlah: req.body.jumlah,
            keterangan: req.body.keterangan,
            idStock: idStock.id_barang
        }
        await barangMasuk.create(create)
        .then(async created => {      
            await stock.update(
                { jumlah: idStock.jumlah + create.jumlah}, 
                { where: { id_barang: create.idStock}}
            )
            res.status(200).json({
                massage: "Insert data success",
                data: created
            })
        })
        .catch(err => {
            res.status(400).send({massage: "insert data error"})
        })
        
    } else {
        res.status(400).json(`Tidak ada barang dengan nama ${req.body.nama_barang}`)
    }
    
}

// find all data for table barang masuk
// exports.findAll = async (req, res) => {
//     const allData = await barangMasuk.findAll()
//     res.json(allData)
// }

// find all data for searching barang masuk
exports.findAll = async (req, res) => {
    const search = req.query.search_query || ""
    const tanggal = moment(req.body.tanggal, 'YYYY-MM-DD').format('YYYY-MM-DD')
    const allData = await barangMasuk.findAll({
        where: {
            [Op.or]: [
                {tanggal: {
                    [Op.like]: `%${tanggal}%`
                }},
                {'$Stock.nama_barang$': {
                    [Op.like]: `%${search}%`
                }},
                {'$Stock.jenis_barang$': {
                    [Op.like]: `%${search}%`
                }},
                {'$Stock.merk$': {
                    [Op.like]: `%${search}%`
                }}
            ]
        },
        include: [{
            model: stock,
            as: 'Stock',
        }],
    })
    res.json(allData)
}

exports.findOne = async (req, res) => {
    const id = parseInt(req.query.id)
    const specificData = await barangMasuk.findOne({ where: {id_barangMasuk: id} })
    res.json(specificData)
}

exports.update = async (req, res) => {
    const id = req.params.id
    const idStock = await findStock(req, res)
    const updateData = {
        tanggal: req.body.tangga,
        jumlah: req.body.jumlah,
        keterangan: req.body.keterangan,
        idStock: idStock.id_barang
    }
    await barangMasuk.update(updateData, { where: {id_barangMasuk: id} })
    res.json("update data success")
}

exports.delete = async (req, res) => {
    const id = req.params.id
    await barangMasuk.destroy({ where: {id_barangMasuk: id} }) 
    res.json("delete data success")
}