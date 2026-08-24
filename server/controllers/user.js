const User = require('../models/User')
const { uploadToCloudinaryUser, deleteFromCloudinary } = require('../utils/uploadToCloudinary')
const { Op } = require('sequelize')

exports.list = async (req, res) => {

    try {

        const user = await User.findAll()

        res.json(user)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server Error"
        })
    }
}


exports.search = async (req, res) => {

    try {

        const { username } = req.query

        const user = await User.findAll({
            where: {
                username: {
                    [Op.like]: `%${username}%`
                }
            }
        })

        res.json(user)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server Error"
        })
    }
}


exports.update = async (req, res) => {
    try {

        const { id } = req.params
        const { username, email } = req.body

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // แก้ username
        if (username) {
            user.username = username
        }

        // แก้ email
        if (email) {
            user.email = email
        }

        // ถ้ามีรูปใหม่
        if (req.file) {

            // ลบรูปเก่าจาก Cloudinary
            if (user.imagePublicId) {
                await deleteFromCloudinary(user.imagePublicId)
            }

            // Upload รูปใหม่
            const result = await uploadToCloudinaryUser(req.file.buffer)

            user.image = result.secure_url
            user.imagePublicId = result.public_id
        }

        await user.save()

        res.json({
            message: "Update User Success",
            user
        })

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.updatebyuser = async (req, res) => {
    try {

        const id = req.user.id
        console.log(id)
        const { username, email } = req.body

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({
                message: "User not found111"
            })
        }

        // แก้ username
        if (username) {

            if (username.length < 5 || username.length > 20) {
                return res.status(400).json({
                    message: "Username must be between 5 and 20 characters"
                })
            }

            user.username = username
        }

        // แก้ email
        if (email) {
            user.email = email
        }

        // ถ้ามีรูปใหม่
        if (req.file) {

            // ลบรูปเก่าจาก Cloudinary
            if (user.imagePublicId) {
                await deleteFromCloudinary(user.imagePublicId)
            }

            // Upload รูปใหม่
            const result = await uploadToCloudinaryUser(req.file.buffer)

            user.image = result.secure_url
            user.imagePublicId = result.public_id
        }

        await user.save()

        res.json({
            message: "Update User Success",
            user
        })

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.remove = async (req, res) => {
    try {

        const { id } = req.params

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // ลบรูปจาก Cloudinary
        if (user.imagePublicId) {
            await deleteFromCloudinary(user.imagePublicId)
        }

        // ลบ User
        await user.destroy()

        res.json({
            message: "Remove User Success"
        })

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.enableduser = async (req, res) => {
    try {

        const { id } = req.params

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        if (user.enabled == 1) {

            user.enabled = 0

            await user.save()

            return res.status(200).json({
                message: "Now Disabled User"
            })
        }

        if (user.enabled == 0) {

            user.enabled = 1

            await user.save()

            return res.status(200).json({
                message: "Now Enabled User"
            })
        }

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server Error"
        })
    }
}