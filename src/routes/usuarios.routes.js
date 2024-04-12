import express from "express"
import usuarioService from "../services/usuarios.services.js"
import response from '../utils/response.js'

const routes = express()

routes.post('/usuarios/registro', async (req, res) => {
    const body = req.body
    try {
        const rta = await usuarioService.agregarNuevo(body)
        return response(req,res, 200, rta)
    } catch (e){
        return response(req,res, 500, e)
    }
})

routes.post('/usuarios/login', async (req, res) => {
    const { id, contrasena } = req.body
    try {
        const usuario = await usuarioService.obtenerUsuarioPorSusCredenciales(id, contrasena)
        if (!usuario) throw new Error('Error en Usuario o contraseña')

        const token = await usuarioService.crearToken(id, contrasena)
        return response(req,res, 200, token)
    } catch (e){
        if (e?.message) return response(req,res, 500, e.message)
        return response(req,res, 500, e)
    }
})

routes.post('/recuperar-contrasena/validando-identidad', async (req, res) => {
    const { id } = req.body
    try {
        const pregunta = await usuarioService.validandoIdentidad(id)
        return response(req,res, 200, pregunta)
    } catch (e){
        if (e?.message) return response(req,res, 500, e.message)
        return response(req,res, 500, e)
    }
})

routes.post('/recuperar-contrasena/validando-respuesta', async (req, res) => {
    const { id, respuesta } = req.body
    try {
        const confirmacion = await usuarioService.validandoRespuesta(id, respuesta)
        return response(req,res, 200, confirmacion)
    } catch (e){
        if (e?.message) return response(req,res, 500, e.message)
        return response(req,res, 500, e)
    }
})

routes.post('/recuperar-contrasena/confirmacion', async (req, res) => {
    const { id, contrasenaNueva } = req.body
    try {
        const confirmacion = await usuarioService.cambiarContraseña(id, contrasenaNueva)
        return response(req,res, 200, confirmacion)
    } catch (e){
        if (e?.message) return response(req,res, 500, e.message)
        return response(req,res, 500, e)
    }
})


  
export default routes 