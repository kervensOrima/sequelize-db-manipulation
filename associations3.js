const Sequelize = require('sequelize')

const sequelize = new Sequelize('sequelize_db', 'root', '', {
    port:3306 ,
    dialect:'mysql' ,
    loggin:true ,
    host:'localhost'
})



const Customer = sequelize.define('Customer' ,{
    fullName: {
        type: Sequelize.DataTypes.STRING
    }
}, {
   timestamp: false,
   tableName:'Customer' 
})


const Product = sequelize.define('Product', {
    productName:  {
        type: Sequelize.DataTypes.STRING
    }
}, {
    tableName: 'Product' ,
    timestamp: false
})


const CustomerProducts = sequelize.define('CustomerProducts' ,{
 
}, {
    timestamp: true ,
    createdAt:'created_at' ,
    updatedAt:'updated_at',
    tableName: 'CustomerProducts'
})


/** many to many relationship with sequelize */
Customer.belongsToMany(Product,{
    through:CustomerProducts
})
Product.belongsToMany(Customer, {
    through: CustomerProducts
})



sequelize.sync({alter: true})
    .then(() => {
        console.log('successfully created...')

        /*
        Customer.bulkCreate([
            {fullName:'ORIMA Kervens'} ,
            {fullName:'ORIMA Reginal'} ,
            {fullName:'ORIMA Jephte'} ,
            {fullName:'ORIMA Shneider'} ,
            {fullName:'ORIMA ORILNE'} ,
        ])

        Product.bulkCreate([
            {productName:'Parfums'} ,
            {productName:'Surretes'} ,
            {productName:'Jus'} ,
            {productName:'Ice cream'} ,
        ])
        */

        /** setObjects and addObjects and setObject and addObject works for all relatonship */

        Customer.findOne({ where : { fullName:'ORIMA ORILNE'}})
        .then( customer => {

            if(customer ) {

                Product.findAll({ limit: 3})
                .then( products => {
                    if(products) {
                        // customer.setProducts(products)
                        customer.addProducts(products)
                    }
                })
            }
        })

    })
    .catch( error => {
        console.log(error)
    })