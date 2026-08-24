//ดึง cloudinary จาก config/cloudinary
const cloudinary = require('../config/cloudinary')
//ดึง streamifier 
// streamifier คือ Library ที่ใช้แปลง Buffer ให้กลายเป็น Stream ใน Node.js
// Buffer = ข้อมูลไฟล์ที่อยู่ในหน่วยความจำทั้งหมด
// Stream = การส่งข้อมูลไฟล์ทีละส่วน (chunk) เหมือนการไหลของข้อมูล
// streamifier ช่วยเอา Buffer ที่เราได้จาก multer.memoryStorage() ไปทำให้เป็น Stream เพื่อส่งต่อไปยังบริการที่ต้องการ Stream เช่น Cloudinary
const streamifier = require('streamifier')

exports.uploadToCloudinaryStore = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                //สร้างfolderใน cloudinary ให้จัดการง่าย ชื่อ sotres
                folder: "stores"
            },
            (err, result) => {
                if (err) {
                    return reject(err)
                }
                resolve(result)
            }
        )
        streamifier.createReadStream(buffer).pipe(stream)
    })
}

exports.uploadToCloudinaryUser = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                //สร้างfolderใน cloudinary ให้จัดการง่าย ชื่อ sotres
                folder: "users"
            },
            (err, result) => {
                if (err) {
                    return reject(err)
                }
                resolve(result)
            }
        )
        streamifier.createReadStream(buffer).pipe(stream)
    })
}


exports.uploadToCloudinaryProduct = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                //สร้างfolderใน cloudinary ให้จัดการง่าย ชื่อ sotres
                folder: "products"
            },
            (err, result) => {
                if (err) {
                    return reject(err)
                }
                resolve(result)
            }
        )
        streamifier.createReadStream(buffer).pipe(stream)
    })
}


//remove picture from cloudinay
exports.deleteFromCloudinary = (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(
            publicId,
            (err, result) => {
                if (err) {
                    return reject(err)
                }

                resolve(result)
            }
        )
    })
}