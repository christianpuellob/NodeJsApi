import mysql from 'mysql2'
import config from './config.js'

const connection = mysql.createConnection({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name,
})

connection.connect((err) => {
    if (err) {
      console.error(`No se pudo conectar a la base de datos: ${err}`)
      return 
    }
    console.log(`Conectado a la Base de datos...`)
})

export default connection