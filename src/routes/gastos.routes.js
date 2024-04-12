import express from "express"
import gastoService from "../services/gastos.services.js"
import response from '../utils/response.js'
import verificarToken from '../middlewares/verificarToken.js'

const routes = express()

routes.post('/gastos/agregar', verificarToken, async (req, res) => {
    const body = req.body
    const usuario = req?.usuario
    try {
        const rta = await gastoService.agregarNuevo(body, usuario)
        return response(req,res, 200, rta)
    } catch (e){
        return response(req,res, 500, e?.message ? e.message : e)
    }
})

routes.get('/gastos/listar', verificarToken,  async (req, res) => {
    const usuario = req?.usuario
    try {
        const rta = await gastoService.listar(usuario)
        return response(req,res, 200, rta)
    } catch (e){
        return response(req,res, 500, e?.message ? e.message : e)
    }
})

routes.post('/gastos/buscar', verificarToken,  async (req, res) => {
    const { busqueda } = req.body
    const usuario = req?.usuario
    try {
        const rta = await gastoService.buscar(busqueda, usuario)
        return response(req,res, 200, rta)
    } catch (e){
        return response(req,res, 500, e?.message ? e.message : e)
    }
})

routes.patch('/gastos/editar/:gastoId', verificarToken, async (req, res) => {
    const body = req.body
    const { gastoId } = req.params
    const usuario = req?.usuario
    try {
        const rta = await gastoService.editar(gastoId,usuario, body)
        return response(req,res, 200, rta)
    } catch (e){
        return response(req,res, 500, e?.message ? e.message : e)
    }
})

export default routes 