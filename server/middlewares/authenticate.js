const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.authenticate = (req, res, next) => {

    try {

        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                message: 'No Token'
            })
        }

        const verifytoken = jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, decode) => {
                if (err) {
                    return res.status(401).json({ message: "Token Invalid" })
                } else {
                    // console.log(decode)
                    req.user = decode
                    next()
                }
            }
        )

    } catch (err) {

        return res.status(401).json({
            message: 'Token Invalid'
        })

    }

}

exports.adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "You not ADMIN!!" })
    }
    next()
}

exports.userEnabled = async (req, res, next) => {
    try{
        const user = await await User.findByPk(req.user.id)

        if(!user.enabled){
            return res.status(403).json({message:"This user is disabled"})
        }

        next()
    }catch(err){
        return res.status(500).json({message: "Server Error"})
    }
}