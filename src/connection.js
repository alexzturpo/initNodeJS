// *configuration for connection mySQL
const mysql = require ('mysql')
const {mysql_database} = require('./config')

const connection = mysql.createConnection(mysql_database)
connection.connect((err,conn)=>{
    if (err) console.log('Ha ocurrido un error al conectarse')
    else console.log('Connection OK')
})
module.exports = connection

//* configuration for connection mongoDB
// const mongoose = require('mongoose')
// const { mongodb, mysql_database } = require('./config')
// const connection = mongoose.connect(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`)
// const connection = mongoose.connect(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`)
// .then(db=>{
//     console.log('conexion exitosa')
// })
// .catch(err=>{
//     console.log('ha ocurrido un error:' + err)
//     console.log(`DATA error: --->  mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}` )
// })

// module.exports = connection