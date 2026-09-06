const Category = require('../models/Category')
const Store = require('../models/Store')

exports.create = async (req, res) => {
    try {
        const { storeId } = req.params
        const { categoryname } = req.body

        if (!categoryname) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }else{
            if(categoryname.trim().length < 3 || categoryname.trim().length > 30){
                return res.status(401).json({
                message: "categoryname must be between 3 and 30 characters"
            })
            }
        }

        const store = await Store.findOne({
            where: {
                id: storeId,
                userId: req.user.id
            }
        })

        if (!store) {
            return res.status(404).json({
                message: "Store not found"
            })
        }

        const category = await Category.create({
            categoryname: categoryname.trim(),
            storeId: store.id
        })

        res.status(201).json({
            message: "Create Category Success",
            category
        })
    } catch (err) {
        console.log(500)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.list = async (req, res) => {
    try {
        const { storeId } = req.params

        const store = await Store.findOne({
            where: {
                id: storeId,
                userId: req.user.id
            }
        })

        if (!store) {
            return res.status(401).json({
                message: "store or user is not match!"
            })
        }
        const category = await Category.findAll({
            where: {
                storeId: store.id,
            }
        })

        console.log(category)
        res.json({ category })
    } catch (err) {
        console.log(500)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.update = async (req, res) => {
    try {
        const { storeId,id } = req.params
        const { categoryname } = req.body

        if(!categoryname){
            return res.status(401).json({
                message: "categoryname is require!!"
            })
        }else{
            if(categoryname.trim().length < 3 || categoryname.trim().length > 30){
                return res.status(401).json({
                message: "categoryname must be between 3 and 30 characters"
            })
            }
        }
        
        const store = await Store.findOne({
            where: {
                id: storeId,
                userId: req.user.id
            }
        })

        if(!store){
            return res.status(401).json({
                message: "store or user is not match!"
            })
        }

        const category = await Category.findOne({
            where: {
                id: id,
            }
        })

        category.categoryname = categoryname

        await category.save()

        res.json({ message: "Update Category Success", category})
    } catch (err) {
        console.log(500)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.remove = async (req, res) => {
    try {
        const { storeId,id } = req.params

        const store = await Store.findOne({
            where: {
                id: storeId,
                userId: req.user.id
            }
        })

        if(!store){
            return res.status(401).json({
                message: "store or user is not match!"
            })
        }

        const category = await Category.findByPk(id)

        if(!category){
            return res.status(404).json({
                message: "Category not found"
            })
        }

        await category.destroy()

        res.json({ message: "Delete Category Success", category})

    } catch (err) {
        console.log(500)
        res.status(500).json({ message: "Server Error" })
    }
}