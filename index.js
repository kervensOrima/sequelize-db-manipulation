
const express = require('express')
const morgan = require('morgan')
const { Sequelize, DataTypes, Op } = require('sequelize')
const app = express()
const PORT = 3000 


app 
  .use(morgan('dev'))


/** create the database here */ 
const sequelize = new Sequelize(
    'sequelize_db' ,
    'root' , 
    '' ,
    {
        dialect:'mysql' ,
        host:'localhost' ,
        logging:true ,
        port:3306
    }
)

/**
 * 
 * Our models 
 */
const User = sequelize.define('User', {
  pk: {
    type: DataTypes.INTEGER,
    allowNull:false, 
    autoIncrement:true ,
    primaryKey: true
  } ,
  username :{
    type: DataTypes.STRING ,
    allowNull: false
  } ,
  password: {
     type: DataTypes.STRING ,
     allowNull:false ,
  } ,
  age: {
    type: DataTypes.INTEGER ,
    defaultValue: 21 ,
    allowNull:true
  } ,
  withcodeworks: {
    type: DataTypes.BOOLEAN ,
    defaultValue:true ,
    allowNull:true
  }
},
{
 freezeTableName:true,
 tableName:'User' ,
 timestamps:true, 
 createdAt:'created_at' ,
 updatedAt:'updated_at'
})


/** connect to the database */
sequelize
      .authenticate()
      .then(() => {
        console.log('successfully connected to the database....')
      })
      .catch( error => {
        console.log(`Error connected to the database... ${error}`)
      })
         


 
/** create the table */
sequelize.sync({force:false, alter:true})
   .then(() => {
    /** 
    console.log(`saving data`)
     
    /** add a user in the table */
    // const user = User.build({
    //     username:'hello' ,
    //     password:'12345'
    // })

    // console.log(`${user.username}`)

    /** save the user */
    // user.save()

    // /** with create */
    // return User.create({
    //     username:'ORIMA Kervens' ,
    //     password:'19292892' ,
    //     age:23
    // })
    // , {
    //     fields: ['age',]
    // }

    // for creating multiple user using bulkCreate([])

    // return User.bulkCreate([
    //     {
    //         username:'ORIMA Jephte' ,
    //         password:'62627783' ,
    //         age:24  
    //     } ,
    //     {
    //         username:'ORIMA Reginald' ,
    //         password:'62627783' ,
    //         age:24  
    //     }
    // ] , {validate:true})


    console.log('fill all')

    User.findAll({
        attributes:['password' , 'username']
    })
    .then( users => {

         users.forEach( user => {
            console.log(user.toJSON())
         })
    })


    /** user have more than 20 */

   User.findAll({
     attributes:['username', 'age' , 'pk'] ,
     where : {
        age: {
            [Op.gt] : 25
        }
     } ,
     order: [
        ['age' , 'ASC'] ,
        ['pk', 'ASC']
     ]
   })
   .then( users => {

    users.forEach( user => {
        console.log(user.toJSON())
     })

   })


   const username ='kervens'
   const age = 23

   /** query with grou by */

   User.findAll({
     where: {
        [Op.or] : {
          username:{
            [Op.like]: `%${username}%`
          } ,
          age: {
            [Op.gt] : age
          },
        }
     } ,
     order:[
        ['age' , 'ASC']
     ]
   })
   .then( users  => {

    users.forEach( user => {
        console.log(user.toJSON())
     })

   })


   })
   .then(data => {
       // to increment column value 
    //    data.increment({age:5}) 
    //    // to decrement a value
    //    data.decrement ({age:1})
    //    console.log(data.toJSON())

     data.forEach((element) =>  {
        console.log(element.toJSON())
     })
   })
   .catch((err) => {
     console.log(`Error to create user table: ${err}`)
   })









app.listen(PORT , () => {
    console.log(`application has been state in PORT: http://localhost:${PORT} successfully`)
})