import express from "express"
import fuenteService from "../services/fuentes.services.js"
import response from '../utils/response.js'
import verificarToken from '../middlewares/verificarToken.js'

const routes = express()

routes.post('/fuentes/agregar', verificarToken, async (req, res) => {
    const body = req.body
    const usuario = req?.usuario
    try {
        const rta = await fuenteService.agregarNuevo(body, usuario)
        return response(req,res, 200, rta)
    } catch (e){
        return response(req,res, 500, e?.message ? e.message : e)
    }
})

routes.get('/fuentes/listar', verificarToken,  async (req, res) => {
    const usuario = req?.usuario
    try {
        const rta = await fuenteService.listar(usuario)
        return response(req,res, 200, rta)
    } catch (e){
        return response(req,res, 500, e?.message ? e.message : e)
    }
})

routes.post('/fuentes/buscar', verificarToken,  async (req, res) => {
    const { busqueda } = req.body
    const usuario = req?.usuario
    try {
        const rta = await fuenteService.buscar(busqueda, usuario)
        return response(req,res, 200, rta)
    } catch (e){
        return response(req,res, 500, e?.message ? e.message : e)
    }
})

routes.patch('/fuentes/editar/:fuenteId', verificarToken, async (req, res) => {
    const body = req.body
    const { fuenteId } = req.params
    const usuario = req?.usuario
    try {
        const rta = await fuenteService.editar(Id,usuario, body)
        return response(req,res, 200, rta)
    } catch (e){
        return response(req,res, 500, e?.message ? e.message : e)
    }
})

export default routes