import express from "express"
import informeService from "../services/informes.services.js"
import response from '../utils/response.js'
import verificarToken from '../middlewares/verificarToken.js'

const routes = express()

routes.post('/informes/generar', verificarToken, async (req, res) => {
    const body = req.body
    const usuario = req?.usuario
    try {
        const rta = await informeService.generar(usuario, body)
        return response(req,res, 200, rta)
    } catch (e){
        return response(req,res, 500, e?.message ? e.message : e)
    }
})

export default routes 