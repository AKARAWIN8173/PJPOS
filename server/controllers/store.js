
//ดึง model Store
const Store = require('../models/Store')
//ดึง uploadToCloudinary จาก utils
const { uploadToCloudinaryStore, deleteFromCloudinary } = require('../utils/uploadToCloudinary')

exports.create = async (req, res) => {
    try {
        //destuck storename จาก req
        const { storename } = req.body
        //ตรวจสอบชื่อว่าถูกส่งมาไหม
        if (!storename) {
            return res.status(400).json({ message: "storename is require!" })
        }
        //ตรวจวอบว่ามี req.file ไหท
        if (req.file) {
            //ถ้ามีก็ให้ส่ง req.file.buffer เข้าไปใน fuc uploadToCloudinarystore
            //buffer คืออะไร
            //สมมติรูปมีขนาด 50 KB ข้อมูล Binary เช่น 11101010100101010010...
            //Node.js จะเก็บ Binary พวกนี้ไว้ใน Buffer จึงเห็น req.file.buffer มีค่าเป็น <Buffer ff d8 ff db 00 c5 ...>
            const result = await uploadToCloudinaryStore(req.file.buffer)
            console.log(result)
            image = result.secure_url
            imagePublicId = result.public_id
        }

        // console.log(req.body)
        // console.log(req.file)

        const store = await Store.create({
            storename,
            image,
            imagePublicId,
            userId: req.user.id
        })

        res.status(201).json({
            message: "Create Store Success",
            store
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const { storename } = req.body

        const store = await Store.findOne({
            where: {
                id: id,
                userId: req.user.id
            }
        })

        if (!store) {
            return res.status(401).json({
                message: "Store not found"
            })
        }

        store.storename = storename

        if (req.file) {

            // ลบรูปเก่าจาก Cloudinary
            if (store.imagePublicId) {
                await deleteFromCloudinary(store.imagePublicId)
            }

            // Upload รูปใหม่
            const result = await uploadToCloudinaryStore(req.file.buffer)

            // เก็บข้อมูลรูปใหม่
            store.image = result.secure_url
            store.imagePublicId = result.public_id
        }

        await store.save()

        res.json({ message: "Update Store Success", store })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.list = async (req, res) => {
    try {
        const store = await Store.findAll({
            where: {
                userId: req.user.id
            }
        })
        res.json({ store })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.remove = async (req, res) => {
    try {
        const { id } = req.params

        const store = await Store.findOne({
            where: {
                id: id,
                userId: req.user.id
            }
        })

        if (!store) {
            return res.status(404).json({
                message: "Store not found"
            })
        }

        console.log(store)

        if (store.imagePublicId) {
            await deleteFromCloudinary(store.imagePublicId)
        }

        await store.destroy()

        res.json({ message: "Remove Store Success" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}