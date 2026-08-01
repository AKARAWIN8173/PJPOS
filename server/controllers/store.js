
//ดึง model Store
const Store = require('../models/Store')
//ดึง uploadToCloudinary จาก utils
const { uploadToCloudinaryStore } = require('../utils/uploadToCloudinary')

exports.create = async (req,res) => {
    try{
        //destuck storename จาก req
        const { storename } = req.body
        //ตรวจสอบชื่อว่าถูกส่งมาไหม
        if(!storename){
            return res.status(400).json({message: "storename is require!"})
        }
        //ตรวจวอบว่ามี req.file ไหท
        if(req.file) {
                //ถ้ามีก็ให้ส่ง req.file.buffer เข้าไปใน fuc uploadToCloudinary
                //buffer คืออะไร
                //สมมติรูปมีขนาด 50 KB ข้อมูล Binary เช่น 11101010100101010010...
                //Node.js จะเก็บ Binary พวกนี้ไว้ใน Buffer จึงเห็น req.file.buffer มีค่าเป็น <Buffer ff d8 ff db 00 c5 ...>
                const result = await uploadToCloudinaryStore(req.file.buffer)
                image = result.secure_url
                console.log(result)
        }

        console.log(req.body)
        console.log(req.file) 

        const store = await Store.create({
            storename,
            image,
            userId: req.user.id
        })

        res.status(201).json({
            message: "Create Store Success",
            store
        })

    }catch(err){
        console.log(err)
        res.status(500).json({message: "Server Error"})
    }
}

exports.update = async (req,res) => {
    res.send('hello update')
}

exports.list = async (req,res) => {
    res.send('hello list')
}

exports.remove = async (req,res) => {
    res.send('hello remove')
}   