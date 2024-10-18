import express, { json } from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import { createServer } from 'http'

const db = new sqlite3.Database('db.db')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/api/getDeseaseList', (req, res) => {
    db.all('SELECT * FROM deseases', (err, data) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send(data)
        }
    })
})

app.get('/api/getTreatmentList', (req, res) => {
    db.all('SELECT * FROM treatments', (err, data) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send(data)
        }
    })
})

app.post('/api/login', (req, res) => {
    const {email, password} = req.body
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else if(!user){
            res.status(404).send('usuario no encontrado')
        }else if(password != user.password){
            res.status(401).send('contraseña incorrecta')
        }else{
            res.status(200).send(user)
        }
    })
})

app.post('/api/register', (req, res) => {
    const {id, name, email, password, type, deseaseId} = req.body
    console.log(req.body)
    db.run('INSERT INTO users(id, name, email, password, type, deseaseId) VALUES(?, ? ,?, ?, ?, ?)', [id, name, email, password, type, deseaseId], (err) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send('usuario registrado')
        }
    })
})

const server = createServer(app)
server.listen(port, () => {
    console.log(`su puerto es: ${port}`)
})