const Sequelize = require('sequelize')

const sequelize = new Sequelize('sequelize_db' , 'root', '', {
    host:'localhost' ,
    logging: true ,
    port: 3306 ,
    dialect:'mysql'
})



const Country = sequelize.define('Country' ,{
     
        countryName: {
            type: Sequelize.DataTypes.STRING ,
            unique: true ,
        } ,
        pk: {
            type: Sequelize.DataTypes.INTEGER ,
            primaryKey: true ,
            autoIncrement: true ,
        }

},{
    timestamp: true ,
    tableName:"Country"
})



const Capital = sequelize.define('Capital', {
    capitalName : {
        type: Sequelize.DataTypes.STRING ,
    } ,
    pk: {
        type: Sequelize.DataTypes.INTEGER ,
        primaryKey: true ,
        autoIncrement: true
    }

},{
    tableName:'Capital' ,
    timestamp: true
})

/** one country has one capital */
Country.hasOne(Capital, {
    foreignKey:{
        name: 'country_pk' ,
        allowNull: false ,
        type: Sequelize.DataTypes.INTEGER ,
        onDelete: 'CASCADE' ,
        onUpdate: 'CASCADE'
    }
})

Capital.belongsTo(Country, {
    foreignKey:{
        onDelete: 'CASCADE' ,
        onUpdate: 'CASCADE',
        name: 'country_pk' ,
        unique: true
    } ,

})



sequelize.authenticate()
         .then( (resp) => {
            console.log('authenticated')

         })
         .catch(err => {
            console.log(err)
         })

sequelize.sync({alter: false})
         .then(_ => {
            console.log('sync successfully')


            /** add more country
                Country.bulkCreate([
                    {
                        countryName:'Germany' ,
                    },
                    {
                        countryName:'France' ,
                    },{
                        countryName:'Haiti' ,
                    },
                    {
                        countryName:'USA' ,
                    }
                ])
            */

            /** add some capital 
            Capital.bulkCreate([
                {
                    capitalName:'Berlin'
                } , 
                {
                    capitalName:'Paris'
                } ,
                {
                    capitalName:'Port-au-Prince'
                } ,
                {
                    capitalName:'Washington DC'
                } ,
            ])
            */


            /** from country object cann add some capital 
            Country.findOne({
                where: { countryName: 'Germany'}
            })
            .then( country => {
                if(country) {
                    Capital.findOne({ where : { capitalName: 'Berlin'}})
                    .then(capital => {

                        if(capital) {
                            country.setCapital(capital)
                        }
                    })
                }
            }) */



            /** get the capital of the country 
            return Country.findOne({ where : { countryName: 'Germany'}})
            .then( country => {
                    console.log(country.toJSON())
                    country.getCapital().then(capital=> {
                    console.log(capital.toJSON())
                })
            })

            */


            /** create capital when creating country
            
            Country.create({
                countryName: 'Brasil'
            })
            .then( country => {

                if( country ){

                    country.createCapital({
                        capitalName:'Brasilia'
                    })
                    .then( capital => {

                        console.log(capital.toJSON())
                    })
                }
            }) */



            /** set the country fromthe capital 
            Capital.findOne({ where: { capitalName: 'Washington DC'}})
            .then( capital => {
                if(capital) {
                    Country.findOne({ where : { countryName: 'USA'}})
                    .then( country => {
                        if(country) {
                            capital.setCountry(country)
                        }
                    })
                }
            })*/
            
           



           


         })
         
         .catch(err => {
            console.log(err)
         })