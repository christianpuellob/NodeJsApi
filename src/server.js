import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import config from './config.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import ingresosRoutes from './routes/ingresos.routes.js'
import gastosRoutes from './routes/gastos.routes.js'
import fuentesRoutes from './routes/fuentes.routes.js'
import informesRoutes from './routes/informes.routes.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan())

app.use(usuariosRoutes)
app.use(ingresosRoutes)
app.use(gastosRoutes)
app.use(fuentesRoutes)
app.use(informesRoutes)

const port = config.port
app.listen(port, ()=> console.log(`Utilizando el puerto ${port}`))