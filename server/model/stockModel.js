module.exports = (sequelize, DataTypes) => {
    const stock = sequelize.define('stock', {
        id_barang: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nama_barang: {
            type: DataTypes.STRING,
            allwoNULL: true
        },
        jenis_barang: {
            type: DataTypes.STRING,
            allowNULL: true
        },
        merk: {
            type: DataTypes.STRING,
            allowNULL: true
        },
        jumlah: {
            type: DataTypes.INTEGER,
            allowNULL: true
        },
        satuan: {
            type: DataTypes.STRING,
            allowNULL: true
        }
    },
    {
        freezeTableName:true
    })

    return stock
}