require('dotenv').config();
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
function checkRole(req, res, next) {
    if (res.locals.role == process.env.USER)
        res.sendStatus(401).statusMessage("You do not have admin privileges")
    else
        next()
}

module.exports = { checkRole: checkRole }