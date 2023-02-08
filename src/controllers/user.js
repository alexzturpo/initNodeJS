// const path = require('path')
// const root = path.join(__dirname,'../public')
const User = require('../models/mUsers')

let usersData = [
    {id:1,nombre:'Pablo',edad:25},
    {id:2,nombre:'Luis',edad:23},
    {id:3,nombre:'Jose',edad:22}

]
const getUser = (req,res)=>{
    // res.sendFile('users.html',{root:root})  // para enviar archivos estaticos en html
    //logica mongoDB
    User.find({},(err, result)=>{
        if(err) {
            console.log('Ha ocurrido un error')
        }else{
            console.log(result)
            res.render('users',{users:result})
        }
    })
    //fin logica
    // res.render('users',{users: usersData})
}
const getCreateUser = (req,res)=>{
    res.render('create-user')
}
const getUpdateUser = (req,res)=>{
    //rescibe la ruta de la pagina  y los datos para enviarlo a la pagina update
    const param = req.params.id
    User.find({_id:param},(err,result)=>{
        if(err) {
            console.log('Ha ocurrido un error'+ err)
        }else{
            console.log(result)
            res.render('update-user',{user:result})
        }
    })
    // res.render('update-user.ejs')
}
const getDeleteUser = (req,res)=>{
    res.render('delete-user.ejs')
}
const createUser = (req,res) => {
    console.log("createUser",req.body)
    // usersData.push(req.body)
    // res.render('users',{users: usersData})

    //logica mongoDB
    const data = req.body
    const user = new User({
        name: data.name,
        age: data.age
    })
    user.save((err, result)=>{
        if(err) {
            console.log('Ha ocurrido un error')
        }else{
            console.log('USUARIO REGISTRADO')
            res.redirect('/users/all')
        }
    })
    //fin logica

}
const updateUser = (req,res) => {
    const param = req.params.id
    const data = req.body
    console.log("param",param)
    console.log("data",data)
    // const result = usersData.filter(user => user.id == param);
    User.findOneAndUpdate({_id:param},data, (err,result)=>{
        if(err) {
            console.log('Ha ocurrido un error'+err)
        }else{
            console.log('USUARIO ACTUALIZADO')
            res.redirect('/users/all')
        }
    })
    
    // res.render('users',{users: usersData})

}
const deleteUser = (req,res) => {
    console.log(req.body)
    const param = req.params.id
    console.log("param",param)
    usersData = usersData.filter( e => e.id != param )

    console.log("deleteUser result",usersData)
    // usersData=result
    res.render('users',{users: usersData})

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
