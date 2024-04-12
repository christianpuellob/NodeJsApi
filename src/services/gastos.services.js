import connection from '../database.js'

class GastoService {
    
    agregarNuevo (body, usuario){
        return new Promise((res, rej)=> {
            if (!body?.valor || body?.valor <= 0 || typeof body?.valor !== 'number'){
                throw new Error('Debe definir un valor numerico superior a 0')
            }
            connection.query(
                `
                    INSERT INTO gastos (
                        fecha,
                        nombre,
                        valor,
                        categoria,
                        descripcion,
                        usuario_id
                    ) VALUES ( ?, ?, ?, ?, ?, ? );
                `, 
                [
                    body.fecha,
                    body.nombre,
                    body.valor,
                    body.categoria,
                    body.descripcion,
                    usuario.id
                ],
                (err, results) => {
                    if (err) return rej(`Error inesperado(${err})`)
                    return res(`Gasto agregado...`)
                }
            )
        })
    }

    listar (usuario){
        return new Promise((res, rej) => {
            connection.query(`SELECT * FROM gastos WHERE usuario_id = ${usuario.id}`, (err, result) => {
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
                    FROM gastos 
                    WHERE usuario_id = ${usuario.id}
                    AND (
                        nombre LIKE '%${query}%' OR
                        fecha LIKE '%${query}%' OR
                        valor LIKE '%${query}%' OR
                        categoria LIKE '%${query}%' OR 
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

    editar (gastoId, usuario, body){
        return new Promise((res, rej) => {
            connection.query(
                `SELECT * FROM gastos WHERE id = ${gastoId}`,
                (err, result) => {
                    if (err) return rej(`Error inesperado(${err})`)
                    if (result.length <= 0) return rej(`Gasto id no existe`)
                }
            )

            connection.query(
                `
                    UPDATE gastos
                    SET fecha = ?,
                        nombre = ?,
                        valor = ?,
                        categoria = ?,
                        descripcion = ?
                    WHERE usuario_id = ?
                    AND id = ?                
                `,
                [
                    body.fecha,
                    body.nombre,
                    body.valor,
                    body.categoria,
                    body.descripcion,
                    usuario.id,
                    gastoId,
                ],
                (err, result) => {
                    if (err) return rej(`Error inesperado(${err})`)
                    return res(`Gasto editado...`)
                }
            )
        })
    }
}

const gastoService = new GastoService()
export default gastoService