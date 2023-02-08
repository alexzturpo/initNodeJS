// const mysql = require ('mysql')
const mongoose = require('mongoose')
const { mongodb } = require('./config')

// const connection = mongoose.connect(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`)
const connection = mongoose.connect(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`)
.then(db=>{
    console.log('conexion exitosa')
})
.catch(err=>{
    console.log('ha ocurrido un error:' + err)
    console.log(`DATA error: --->  mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}` )
})

module.exports = connection