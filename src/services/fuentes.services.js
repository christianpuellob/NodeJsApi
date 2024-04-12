import connection from '../database.js'

class FuenteService {
    
    agregarNuevo(body, usuario) {
        return new Promise((res, rej) => {
            // Verifica si otros campos necesarios están presentes en el 'body'
            if (!body?.fecha || !body?.nombre || !body?.descripcion) {
                throw new Error('Debe proporcionar todos los campos requeridos');
            }
            connection.query(
                `
                    INSERT INTO fuentes (
                        fecha,
                        nombre,
                        descripcion,
                        usuario_id
                    ) VALUES ( ?, ?, ?, ? );
                `, 
                [
                    body.fecha,
                    body.nombre,
                    body.descripcion,
                    usuario.id
                ],
                (err, results) => {
                    if (err) return rej(`Error inesperado(${err})`)
                    return res(`Fuente agregada...`)
                }
            )
        })
    }

    listar (usuario){
        return new Promise((res, rej) => {
            connection.query(`SELECT * FROM fuentes WHERE usuario_id = ${usuario.id}`, (err, result) => {
                if (err) return rej(`Error inesperado(${err})`)
                return res(result)
            })
        })
    }

    buscar (query, usuario){
        return new Promise((res, rej) => {
            connection.query(
                `
                    SELECT * 
                    FROM fuentes 
                    WHERE usuario_id = ${usuario.id}
                    AND (
                        nombre LIKE '%${query}%' OR
                        fecha LIKE '%${query}%' OR
                        descripcion LIKE '%${query}%'
                    )
                `,
                (err, result) => {
                    if (err) return rej(`Error inesperado(${err})`)
                    return res(result)
                }
            )
        })
    }

    editar (fuenteId, usuario, body){
        return new Promise((res, rej) => {
            connection.query(
                `SELECT * FROM fuentes WHERE id = ${fuenteId}`,
                (err, result) => {
                    if (err) return rej(`Error inesperado(${err})`)
                    if (result.length <= 0) return rej(`Fuente id no existe`)
                }
            )

            connection.query(
                `
                    UPDATE fuentes
                    SET fecha = ?,
                        nombre = ?,
                        descripcion = ?
                    WHERE usuario_id = ?
                    AND id = ?                
                `,
                [
                    body.fecha,
                    body.nombre,
                    body.descripcion,
                    usuario.id,
                    fuenteId,
                ],
                (err, result) => {
                    if (err) return rej(`Error inesperado(${err})`)
                    return res(`Fuente editada...`)
                }
            )
        })
    }
}

const fuenteService = new FuenteService()
export default fuenteService