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

app.get('/api/getDoctors', (req, res) => {
    db.all('SELECT * FROM users WHERE type = 1', (err, list) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send(list)
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
    const {username, password} = req.body
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
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
    const {id, name, username, email, password, type, deseaseId} = req.body
    db.run('INSERT INTO users(id, name, username, email, password, type, deseaseId) VALUES(?, ? ,?, ?, ?, ?, ?)', [id, name, username, email, password, type, deseaseId], (err) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send('usuario registrado')
        }
    })
})

app.post('/api/makeDate', (req, res) => {
    const {doctorId, patientId, date, treatmentId} = req.body
    db.run('INSERT INTO dates(doctorId, patientId, date, treatmentId) VALUES(?, ?, ?, ?)', [doctorId, patientId, date, treatmentId], (err) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send('Cita registrada con exito')
        }
    })
})

app.get('/api/getDoctorsDate/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    db.all(`
            SELECT users.name, dates.doctorId, dates.date, dates.id AS dateId, dates.treatmentId FROM users INNER JOIN dates ON users.id = dates.patientId WHERE dates.doctorId = ?
        `, [id], (err, list) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            console.log(list)
            res.status(200).send(list)
        }
    })
})

app.get('/api/getAllDates', (req, res) => {
    db.all(`
        SELECT users.name, dates.doctorId, dates.date, dates.id AS dateId, dates.treatmentId FROM users INNER JOIN dates ON users.id = dates.patientId
    `, (err, list) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send(list)
        }
    })
})

app.get('/api/getDates/:id', (req, res) => {
    const id = req.params.id
    db.all('SELECT * FROM dates WHERE patientId = ?', [id], (err, list) => {
        if(err){
            console.log(err)
            res.status(500).send('error del servidor')
        }else{
            res.status(200).send(list)
        }
    })
})

const server = createServer(app)
server.listen(port, () => {
    console.log(`su puerto es: ${port}`)
})