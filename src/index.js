import express from 'express'
import dotenv from 'dotenv'
// import users from './db.js'
import { readFile, writeFile } from 'fs/promises'
dotenv.config()
const app = express()


// requestden body olaraq json gelende
app.use(express.json()) // middleware 
// get all
app.get('/users', async (req, res) => {
    const users = JSON.parse((await readFile(process.env.USERS_DB_PATH)).toString())
    res.statusCode = 200
    res.json(users)
})
// get by id
app.get('/users/:id', async (req, res) => {
    const users = JSON.parse((await readFile(process.env.USERS_DB_PATH)).toString())
    const user = users.find((user) => user.id === req.params.id)
    if (user) {
        res.statusCode = 200
        res.json(user)
    } else {
        res.statusCode = 404
        res.json({ message: `User with id ${req.params.id} not found! Try other!` })
    }
})

// create user
// body-parser
// 
app.post("/users", async (req, res) => {
    const users = JSON.parse((await readFile(process.env.USERS_DB_PATH)).toString())
    users.push(req.body)
    await writeFile(process.env.USERS_DB_PATH, JSON.stringify(users))
    res.statusCode = 201
    res.json({ message: 'User has been created!' })
})
app.listen(process.env.NODE_PORT, () => {
    console.log('server is up...');
})


// env file: `environment` -=> deyisilen variable, deyerler onlari veririk. 
// NAME  = VALUE
// 2 muhit:
// development - env  - API KEY (test)
// production -  env  - API KEY (real)
// package -> out of topic :)



// put, post, delete -> video baxarsiniz /  ders
