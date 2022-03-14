const express = require("express")
const app = express()
const path = require("path")
const router = express.Router()

const { Sequelize, Op, Model, DataTypes } = require("@sequelize/core")

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "path/to/teste.db"
})

const User = sequelize.define("User", {
    id: {type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    }
})

User.sync({ alter: true })

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

router.get('/', function(req, res){
    var name = req.body.name
    var idade = req.body.idade
    var email = req.body.email

    var newUser = User.build({ name: name, idade: idade, email: email})   
    newUser.save()
    res.sendFile(path.join(__dirname+'/index.html'))
})



app.use('/', router)
console.log("servidor rodando")
app.listen(process.env.port || 3000)
console.log("servidor rodando")