import response from "../utils/response.js"
import jwt from 'jsonwebtoken'
import config from "../config.js"

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1]
    if (!token) return response(req,res, 401, 'Token no asignado')
  
    try {
      const usuarioDecodificado = jwt.verify(token, config.secret_key)
      req.usuario = usuarioDecodificado
      next()
    } catch (error) {
        return response(req, res, 500, 'Token invalido')
    }
}

export default verificarToken