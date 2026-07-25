const User = require('./User')
const Store = require('./Store')
const Category = require('./Category')
const Product = require('./Product')
const Sale = require('./Sale')
const SaleItem = require('./SaleItem')
const StockLog = require('./StockLog')


//เชื่อม store -> user by userId
User.hasMany(Store,{
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

Store.belongsTo(User,{
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

//เชื่อม category -> store by storeId
Store.hasMany(Category,{
    foreignKey: "storeId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Category.belongsTo(Store,{
    foreignKey: "storeId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

//เชื่อม Product -> store && Product -> category by storeId && categoryId
Store.hasMany(Product, {
    foreignKey: "storeId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Product.belongsTo(Store, {
    foreignKey: "storeId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Category.hasMany(Product, {
    foreignKey: "categoryId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Product.belongsTo(Category, {
    foreignKey: "categoryId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

//--------------------------------

// Store -> Sales
Store.hasMany(Sale, {
    foreignKey: "storeId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

Sale.belongsTo(Store, {
    foreignKey: "storeId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})


// Sales -> SaleItem
Sale.hasMany(SaleItem, {
    foreignKey: "saleId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

SaleItem.belongsTo(Sale, {
    foreignKey: "saleId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})


// Product -> SaleItem
Product.hasMany(SaleItem, {
    foreignKey: "productId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

SaleItem.belongsTo(Product, {
    foreignKey: "productId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})


// Store -> StockLog
Store.hasMany(StockLog, {
    foreignKey: "storeId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

StockLog.belongsTo(Store, {
    foreignKey: "storeId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})


// Product -> StockLog
Product.hasMany(StockLog, {
    foreignKey: "productId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

StockLog.belongsTo(Product, {
    foreignKey: "productId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})