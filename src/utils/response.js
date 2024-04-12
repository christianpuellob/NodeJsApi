const response = (req, res, code, rta)=> {
    return res.json({
        code, 
        result: rta
    })
}

export default response 