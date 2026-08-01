const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.register = async (req, res) => {
    try {

        const {
            email,
            username,
            firstname,
            lastname,
            password
        } = req.body

        const checkEmail = await User.findOne({
            where: { email }
        })

        if (checkEmail) {
            return res.status(400).json({
                message: 'Email already exists'
            })
        }

        const checkUsername = await User.findOne({
            where: { username }
        })

        if (checkUsername) {
            return res.status(400).json({
                message: 'Username already exists'
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            email,
            username,
            firstname,
            lastname,
            password: hashPassword
        })

        res.status(201).json({message: 'Register Success', user})

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Server Error'
        })
    }
}

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body

        if(!email){
            return res.status(400).json({message:"Email is required!"})
        }

        if(!password){
            return res.status(400).json({message:"Password is required!"})
        }

        const user = await User.findOne({
            where: { email }
        })

        if (!user) {
            return res.status(400).json({
                message: 'Email or Password Invalid'
            })
        }

        const match = await bcrypt.compare(
            password,
            user.password
        )

        if (!match) {
            return res.status(400).json({
                message: 'Email or Password Invalid'
            })
        }

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        res.json({
            message: 'Login Success',
            token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Server Error'
        })
    }

}

exports.currentUser = async (req, res) => {

    try{
        const user = await User.findByPk(req.user.id,{
            attributes: {
                exclude: ['password']
            }
        })

        res.json({user})
        console.log(user)
    }catch(err){
        res.status(500).json({message:"Server Error"})
    }

}