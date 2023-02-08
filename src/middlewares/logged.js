const isLogged = (req,res,next) => {
    // console.log('Ejecutando middelware....')
    let logged = false
    if(logged){
        next()
    }else{
        res.send('no puede acceder,debe loguearse')
    }
}

exports.isLogged = isLogged