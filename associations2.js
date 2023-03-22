
const Sequelize = require('sequelize')


const sequelize = new Sequelize('sequelize_db', 'root', '' , {
    logging:true ,
    dialect: 'mysql' ,
    host:'localhost' ,
    port: 3306
})


const UserApp = sequelize.define('UserApp', {
    username: {
        type: Sequelize.DataTypes.STRING ,
    } ,
    password: {
       type: Sequelize.DataTypes.STRING 
    }
} , {
    timestamp:false ,
    tableName: 'UserApp'
})



const Post = sequelize.define('Post', {
    message: {
        type: Sequelize.DataTypes.STRING
    }
},{
    tableName: 'Post'
})



UserApp.hasMany(Post, {
   
})
Post.belongsTo(UserApp, {

})




sequelize.sync({alter: true})
    .then(()=> {

        console.log('Table successfully created')

        /** create many user 
        UserApp.bulkCreate([
            {
                username:'okahs' ,
                password:'22728jks'
            },
            {
                username:'okgssgahs' ,
                password:'22728jks'
            },
            {
                username:'ola;,akahs' ,
                password:'22728jks'
            },
            {
                username:'okakskshs' ,
                password:'22728jks'
            },
        ])
        */



        /** create many post 
        Post.bulkCreate([
            {
                message:'this was an amazing post that i made online'
            } ,
            {
                message:'this was an amazing post that i made online'
            },
            {
                message:'this was an amazing post that i made online'
            },
            {
                message:'this was an amazing post that i made online'
            }
            , {
                message:'this was an amazing post that i made online'
            } ,
            {
                message:'this was an amazing post that i made online'
            },
            {
                message:'this was an amazing post that i made online'
            },
            {
                message:'this was an amazing post that i made online'
            },
            {
                message:'this was an amazing post that i made online'
            },
            {
                message:'this was an amazing post that i made online'
            }
        ]) */




        /** get this user okahs 
        UserApp.findOne({ where:{
            username:'okahs'
        }})
        .then( user => {

            if(user) {

              //get 5 post and add them to the user 

              Post.findAll({
                limit:5
              })
              .then( posts => {

                user.addPosts(posts)
              })
            }
        }) 
        */




        /**  count all posts of a user 
        UserApp.findOne({
            where: {
                username:'okahs'
            }
        })
        .then(user => {
            if(user) {
                
                user.countPosts()
                .then( posts => {
                    console.log(`${posts} for ${user.username}`)
                })
            }
        }) 
        */

        /** remove one post : user.removePost(post) */

    })
    .catch(err=> {

        console.log(err)
    })