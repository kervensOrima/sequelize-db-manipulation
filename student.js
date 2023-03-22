
const Sequelize = require('sequelize')
const zlib = require('zlib')

const sequelize = new Sequelize('sequelize_db' , 'root', '', {
    dialect:'mysql' ,
    loggin: true ,
    host:'localhost' ,
    port:3306
})


const Student = sequelize.define('Student', {
        
         pk : {
            type: Sequelize.DataTypes.INTEGER ,
            allowNull: false, 
            primaryKey: true ,
            autoIncrement: true
         } ,
         name: {
            type: Sequelize.DataTypes.STRING ,
            allowNull: false ,
            validate: {
                len: {
                    args: [2, 50] ,
                    msg:'name len error'
                }
            }
         } ,
         favorite_class : {
            type: Sequelize.DataTypes.STRING ,
            defaultValue:'Computer science'
         } ,
         school_year: {
            type: Sequelize.DataTypes.INTEGER ,
            allowNull: false  ,
            validate: {
                min: {
                    args:1 ,
                    msg:'min number 1'
                } ,
                max: {
                    args: 12 ,
                    msg:'max number 12'
                }
            }
         } ,
         suscribe_to_wittcode: {
            type: Sequelize.DataTypes.BOOLEAN ,
            defaultValue: true
         } ,
         description: {
           type: Sequelize.DataTypes.STRING ,
           allowNull:false ,
           defaultValue: 'This is a text wrotte by me' ,
           set(value) {
                 const compressed = zlib.deflateSync(value).toString('base64')
                 this.setDataValue('description', compressed)
           },

           get() {
             const value = this.getDataValue('description')
             const uncompressed = zlib.inflateSync(Buffer.from(value,'base64')).toString()
             return uncompressed
           }
         }

     } ,
     {
    tableName:'Student' ,
    timestamp: true ,
    createdAt:'created_at' ,
    updatedAt:'updated_at'
})

sequelize.authenticate()
      .then((resp) => {
        console.log('authenticated to the database succesfully')
      })
      .catch((err) => {
        console.log('error while trying to authenticated to the database: ' + err)
      })


sequelize.sync({alter: true})
       .then((resp) => {
         console.log('sync successfully...')


         /** register student in the table 
         return Student.bulkCreate([
            {
                name: 'ORIMA Kervens' ,
                school_year: 2 ,
                suscribe_to_wittcode: false
            } ,
            {
                name: 'ORIMA Jephte' ,
                school_year: 3 ,
                suscribe_to_wittcode: false
            },
            {
                name: 'ORIMA Reginal' ,
                school_year: 2 ,
                suscribe_to_wittcode: false
            }
            ,
            {
                name: 'ORIMA Schneider' ,
                school_year: 2 ,
                suscribe_to_wittcode: false
            }
            ,  {
                name: 'Vansley Vilsaint' ,
                school_year: 3,
                suscribe_to_wittcode: false
            }
         ], {
            validate: true
         }) */

         Student.create({
            name: 'MadameKov' ,
            description: 'This is a description i wrote' ,
            school_year: 3,

         })
         .then( (student) => {
            console.log(student.toJSON())
         })
         /** number of studen by year */

        Student.findAll({
            attributes: [
                'school_year' ,
                [sequelize.fn('COUNT', sequelize.col('school_year')), 'number_student']
            ] ,
            group: 'school_year'
         })
         .then((students) => {
        
            students.forEach(element => {
              console.log(element.toJSON())
            });
  
         })





       })
       .catch((err) => {
        console.log(err)
       })
