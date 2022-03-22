const express = require("express")
const app = express()
const path = require("path")
const router = express.Router()

const { Sequelize, Op, Model, DataTypes } = require("@sequelize/core")
const req = require("express/lib/request")

const db = new Sequelize({
    dialect: "sqlite",
    storage: "path/to/teste.db"
})

const User = db.define("User", {
    id: {type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_email: {
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

router.all('/')
    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname+'/index.html'))
    })
    .post('/', (req, res) => {
    const { user_name } = req.body
    const { user_age } = req.body
    const { user_email } = req.body

    var newUser = User.build(`{user_name:${user_name}, user_age:${user_age}, user_email:${user_email}}`)
    newUser.save()
})


app.use("/", router)
app.listen(process.env.port || 3000)
console.log("servidor rodando")
