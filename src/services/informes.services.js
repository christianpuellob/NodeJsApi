import connection from '../database.js'

class IngresoService {
    obtenerListaDeIngresos (usuario, body){
        return new Promise((res,rej) => {
            connection.query(
                `
                    SELECT *
                    FROM ingresos
                    WHERE usuario_id = ?
                    AND fecha >= ?
                    AND fecha <= ?;
                `,
                [usuario.id, body.fechaInicial, body.fechaFinal],
                (err, result) => {
                    if (err) return rej(`Error inesperado/obteniendo lista ingresos(${err})`)
                    return res(result)
                }
            )
        })
    }

    obtenerMontoTotalDeIngresos (usuario, body) {
        return new Promise((res,rej) => {
            connection.query(
                `
                    SELECT SUM(valor) AS total_ingresos 
                    FROM ingresos 
                    WHERE usuario_id = ?
                    AND fecha >= ?
                    AND fecha <= ?;
                `,
                [usuario.id, body.fechaInicial, body.fechaFinal],
                (err, result) => {
                    if (err) return rej(`Error inesperado/obteniendo monto de ingresos(${err})`)
                    return res(result[0].total_ingresos)
                }
            )
        })
    }

    obtenerCantidadTotalDeIngresos (usuario, body){
        return new Promise((res,rej) => {
            connection.query(
                `
                    SELECT COUNT(*) AS cantidad_ingresos
                    FROM ingresos
                    WHERE usuario_id = ?
                    AND fecha >= ?
                    AND fecha <= ?;
                `,
                [usuario.id, body.fechaInicial, body.fechaFinal ],
                (err, result) => {
                    if (err) return rej(`Error inesperado/obteniendo cantidad ingresos(${err})`)
                    return res(result[0].cantidad_ingresos)
                }
            )
        })
    }

    obtenerListaDeGastos (usuario, body){
        return new Promise((res,rej) => {
            connection.query(
                `
                    SELECT *
                    FROM gastos
                    WHERE usuario_id = ?
                    AND fecha >= ?
                    AND fecha <= ?;
                `,
                [usuario.id, body.fechaInicial, body.fechaFinal],
                (err, result) => {
                    if (err) return rej(`Error inesperado/obteniendo lista gastos(${err})`)
                    return res(result)
                }
            )
        })
    }

    obtenerMontoTotalDeGastos (usuario, body) {
        return new Promise((res,rej) => {
            connection.query(
                `
                    SELECT SUM(valor) AS total_gastos 
                    FROM gastos 
                    WHERE usuario_id = ?
                    AND fecha >= ?
                    AND fecha <= ?;
                `,
                [usuario.id, body.fechaInicial, body.fechaFinal],
                (err, result) => {
                    if (err) return rej(`Error inesperado/obteniendo monto de gastos(${err})`)
                    return res(result[0].total_gastos)
                }
            )
        })
    }

    obtenerCantidadTotalDeGastos (usuario, body){
        return new Promise((res,rej) => {
            connection.query(
                `
                    SELECT COUNT(*) AS cantidad_gastos
                    FROM gastos
                    WHERE usuario_id = ?
                    AND fecha >= ?
                    AND fecha <= ?;
                `,
                [usuario.id, body.fechaInicial, body.fechaFinal ],
                (err, result) => {
                    if (err) return rej(`Error inesperado/obteniendo cantidad gastos(${err})`)
                    return res(result[0].cantidad_gastos)
                }
            )
        })
    }

    calcularSaldo (usuario, body){
        return new Promise((res,rej) => {
            connection.query(
                `
                    SELECT 
                        (
                            SELECT COALESCE(SUM(valor), 0) 
                            FROM ingresos 
                            WHERE usuario_id = ? 
                            AND fecha BETWEEN ? AND ?
                        ) -
                        (
                            SELECT COALESCE(SUM(valor), 0) 
                            FROM gastos 
                            WHERE usuario_id = ? 
                            AND fecha BETWEEN ? AND ?
                        ) 
                    AS saldo 
                `,
                [
                    usuario.id,
                    body.fechaInicial,
                    body.fechaFinal,
                    usuario.id,
                    body.fechaInicial,
                    body.fechaFinal,
                ],
                (err, result) => {
                    if (err) return rej(`Error inesperado/calculando saldo(${err})`)
                    return res(result[0].saldo)
                }
            )
        })
    }

    async generar (usuario, body){
        try {
            const listaIngresos = await this.obtenerListaDeIngresos(usuario, body)
            const montoTotalIngresos = await this.obtenerMontoTotalDeIngresos(usuario, body)
            const cantidadTotalIngresos = await this.obtenerCantidadTotalDeIngresos(usuario, body)

            const listaGastos = await this.obtenerListaDeGastos(usuario, body)
            const montoTotalGastos = await this.obtenerMontoTotalDeGastos(usuario, body)
            const cantidadTotalGastos = await this.obtenerCantidadTotalDeGastos(usuario, body)

            const saldo = await this.calcularSaldo(usuario,body)

            return {
                ingresos: {
                    montoTotal: montoTotalIngresos,
                    cantidadTotal: cantidadTotalIngresos,
                    items: listaIngresos
                },
                gastos: {
                    montoTotal: montoTotalGastos,
                    cantidadTotal: cantidadTotalGastos,
                    items: listaGastos
                },
                saldo
            }
        } catch (e){
            return e
        }
    }
}

const ingresoService = new IngresoService()
export default ingresoService