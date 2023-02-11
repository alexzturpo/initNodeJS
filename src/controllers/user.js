// const path = require('path')
// const root = path.join(__dirname,'../public')
const connection = require('../connection')
const User = require('../models/mUsers')

// let usersData = [
//     {id:1,nombre:'Pablo',edad:25},
//     {id:2,nombre:'Luis',edad:23},
//     {id:3,nombre:'Jose',edad:22}

// ]
const getUser = (req,res)=>{
    // res.sendFile('users.html',{root:root})  // para enviar archivos estaticos en html
    //* logica mySQL
    const sql = 'Select * from users'
    connection.query(sql, (err,result)=>{
        if (err) console.log(`Ha ocurrido un erro: ${err}`)
        else {
            console.log(`Operacion OK ${result}`) 
            res.render('users', {users: result})
        }
    })
    //* logica mongoDB
    // User.find({},(err, result)=>{
    //     if(err) {
    //         console.log('Ha ocurrido un error')
    //     }else{
    //         console.log(result)
    //         res.render('users',{users:result})
    //     }
    // })
    //* logica render vista y enviar un dato
    // res.render('users',{users: usersData})
}
const getCreateUser = (req,res)=>{
    res.render('create-user')
}
const getUpdateUser = (req,res)=>{
    //* Rescibe la ruta de la pagina  y los datos para enviarlo a la pagina update
    //* upDate para SQL
    const param = req.params.id
    console.log(`ID seleccionado ${param}`)
    const sql = 'select * from users where id=?'
    connection.query(sql, param, (err,result)=>{
        if (err) console.log(`Error para actualizar >> ${err}`)
        else {
            console.log(result)
            res.render('update-user',{user:result})
        }
    })
    // const param = req.params.id
    // User.find({_id:param},(err,result)=>{
    //     if(err) {
    //         console.log('Ha ocurrido un error'+ err)
    //     }else{
    //         console.log(result)
    //         res.render('update-user',{user:result})
    //     }
    // })
    // res.render('update-user.ejs')
}
const getDeleteUser = (req,res)=>{
    const param = req.params.id
    console.log(`ID seleccionado ${param}`)
    const sql = 'select * from users where id=?'
    connection.query(sql, param, (err,result)=>{
        if (err) console.log(`Error para actualizar >> ${err}`)
        else {
            console.log(result)
            res.render('delete-user',{user:result})
        }
    })
    // res.render('delete-user.ejs')
}
const createUser = (req,res) => {
    console.log("createUser",req.body)
    // usersData.push(req.body)
    // res.render('users',{users: usersData})
    //* logica mongoDB
    const data = req.body
    const sql = 'insert into users SET ?'
    connection.query(sql, data, (err, result)=>{
        if(err) console.log(`Ocurrio un error: ${err}`)
        else{
            console.log('Dato registrado')
            res.redirect('/users/all')
        }
    })

    //* logica mongoDB
    // const data = req.body
    // const user = new User({
    //     name: data.name,
    //     age: data.age
    // })
    // user.save((err, result)=>{
    //     if(err) {
    //         console.log('Ha ocurrido un error')
    //     }else{
    //         console.log('USUARIO REGISTRADO')
    //         res.redirect('/users/all')
    //     }
    // })
    //fin logica

}
const updateUser = (req,res) => {
    const param = req.params.id
    const data = req.body
    console.log("param",param)
    console.log("data",data)

    //* POST update SQL
    const sql = `update users SET name='${data.name}', age='${data.age}' where id=${param}`
    connection.query(sql,(err,result)=>{
        if(err) console.error(`Operacion ${err}`)
        else{
            console.log('Update OK','background-color:green')
            res.redirect('/users/all')
        }
    })
    // const result = usersData.filter(user => user.id == param);
    // User.findOneAndUpdate({_id:param},data, (err,result)=>{
    //     if(err) {
    //         console.log('Ha ocurrido un error'+err)
    //     }else{
    //         console.log('USUARIO ACTUALIZADO')
    //         res.redirect('/users/all')
    //     }
    // })
    
    // res.render('users',{users: usersData})

}
const deleteUser = (req,res) => {
    console.log(req.body)
    const param = req.params.id
    console.log("param",param)
    //* elminar SQL
    const sql = `delete from users where id=${param}`
    connection.query(sql,(err,result)=>{
        if(err) console.error(`Operacion ${err}`)
        else{
            console.log('Delete OK','background-color:green')
            res.redirect('/users/all')
        }
    })

    // usersData = usersData.filter( e => e.id != param )

    // console.log("deleteUser result",usersData)
    // res.render('users',{users: usersData})

    // usersData.forEach(e => {
    //     if(e.id == param){ 
    //         e.splice(param,1)
    //     }
    // });
    
}

module.exports = {
    getUser,
    getCreateUser,
    getUpdateUser,
    getDeleteUser,
    createUser,
    updateUser,
    deleteUser
}
