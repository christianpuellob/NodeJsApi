import connection from '../database.js'

class IngresoService {
    
    agregarNuevo (body, usuario){
        return new Promise((res, rej)=> {
            if (!body?.valor || body?.valor <= 0 || typeof body?.valor !== 'number'){
                throw new Error('Debe definir un valor numerico superior a 0')
            }
            connection.query(
                `
                    INSERT INTO ingresos (
                        fecha,
                        nombre,
                        valor,
                        fuente,
                        descripcion,
                        usuario_id
                    ) VALUES ( ?, ?, ?, ?, ?, ? );
                `, 
                [
                    body.fecha,
                    body.nombre,
                    body.valor,
                    body.fuente,
                    body.descripcion,
                    usuario.id
                ],
                (err, results) => {
                    if (err) return rej(`Error inesperado(${err})`)
                    return res(`Ingreso agregado`)
                }
            )
        })
    }

    listar (usuario){
        return new Promise((res, rej) => {
            connection.query(`SELECT * FROM ingresos WHERE usuario_id = ${usuario.id}`, (err, result) => {
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
                    FROM ingresos 
                    WHERE usuario_id = ${usuario.id}
                    AND (
                        nombre LIKE '%${query}%' OR
                        fecha LIKE '%${query}%' OR
                        valor LIKE '%${query}%' OR
                        fuente LIKE '%${query}%' OR 
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

    editar (ingresoId, usuario, body){
        return new Promise((res, rej) => {
            connection.query(
                `SELECT * FROM ingresos WHERE id = ${ingresoId}`,
                (err, result) => {
                    if (err) return rej(`Error inesperado(${err})`)
                    if (result.length <= 0) return rej(`Ingreso id no existe`)
                }
            )

            connection.query(
                `
                    UPDATE ingresos
                    SET fecha = ?,
                        nombre = ?,
                        valor = ?,
                        fuente = ?,
                        descripcion = ?
                    WHERE usuario_id = ?
                    AND id = ?                
                `,
                [
                    body.fecha,
                    body.nombre,
                    body.valor,
                    body.fuente,
                    body.descripcion,
                    usuario.id,
                    ingresoId,
                ],
                (err, result) => {
                    if (err) return rej(`Error inesperado(${err})`)
                    return res(`Ingreso modificado!`)
                }
            )
        })
    }
}

const ingresoService = new IngresoService()
export default ingresoService