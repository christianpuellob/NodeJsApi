import express from "express"
import ingresoService from "../services/ingresos.services.js"
import response from '../utils/response.js'
import verificarToken from '../middlewares/verificarToken.js'

const routes = express()

routes.post('/ingresos/agregar', verificarToken, async (req, res) => {
    const body = req.body
    const usuario = req?.usuario
    try {
        const rta = await ingresoService.agregarNuevo(body, usuario)
        return response(req,res, 200, rta)
    } catch (e){
        return response(req,res, 500, e?.message ? e.message : e)
    }
})

routes.get('/ingresos/listar', verificarToken,  async (req, res) => {
    const usuario = req?.usuario
    try {
        const rta = await ingresoService.listar(usuario)
        return response(req,res, 200, rta)
    } catch (e){
        return response(req,res, 500, e?.message ? e.message : e)
    }
})

routes.post('/ingresos/buscar', verificarToken,  async (req, res) => {
    const { busqueda } = req.body
    const usuario = req?.usuario
    try {
        const rta = await ingresoService.buscar(busqueda, usuario)
        return response(req,res, 200, rta)
    } catch (e){
        return response(req,res, 500, e?.message ? e.message : e)
    }
})

routes.patch('/ingresos/editar/:ingresoId', verificarToken, async (req, res) => {
    const body = req.body
    const { ingresoId } = req.params
    const usuario = req?.usuario
    try {
        const rta = await ingresoService.editar(ingresoId,usuario, body)
        return response(req,res, 200, rta)
    } catch (e){
        return response(req,res, 500, e?.message ? e.message : e)
    }
})

export default routes 