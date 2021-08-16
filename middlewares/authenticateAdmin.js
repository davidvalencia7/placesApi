module.exports = (req,res,next) => {
    if(req.fullUser && req.fullUser.admin)
        return next()

   return  next( new Error('No tienes permisos para estar aqui'))
}