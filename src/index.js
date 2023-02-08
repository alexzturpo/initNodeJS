const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const connection = require('./connection')

const user = require('./routers/user')
const loggedMiddleware = require('./middlewares/logged')
 
//* middewares
// app.use(loggedMiddleware.isLogged)
//* Usando  archivos estaticos
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:false}))
console.log("__dirname",path)
// console.log("PATH",path.join(__dirname,'public','hola')) 

//* settings
app.set('title','Aplicacion hecha en nodeJS')
app.set('port','3000')
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

  

//* rutas
app.get('/',(req,res)=>{
    res.render('index')
})
// app.get('/users',(req,res)=>{
//     res.send('mostrando los datos del usuario')
// })
app.listen(port,()=>{
    console.log(`Mi ${app.get('title')} esta corriendo en el puerto:${app.get('port')}`)
})

app.use('/users',user)