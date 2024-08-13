import bodyParser from 'body-parser'
import { dbConnection as db } from './config/index.js'

import express from 'express'

import path from 'path'

const app = express()
const port = process.env.PORT || 3000
const router = express.Router()

// middleware
app.use(router, express.json(), express.urlencoded())

router.use(bodyParser.json())

// building our api (Endpoint with an s)

router.get('/', (req, res) => {
    res.sendFile(path.resolve( "./static/html/index.html"))
})

// this endpoint fetches all users
router.get('/Users', (req, res) => {

    db.query("SELECT * FROM Users", (err, results) => {
        if (err) throw new Error(err);
        res.json(
            
           { 
            status : res.statusCode, 
            results
            
            }
        )
    }) 

})

//this is used to fetch one user
router.get('/User/:id', (req, res) => {
    const id = req.params.id

    const query = `
    SELECT * FROM Users 
    WHERE underID = ${id}
    `
    db.query(query, (err, result) => {
        if (err) throw new Error(err);
        res.json(
            { 
                status : req.statusCode, 
    
                result
            }
        )
    })
})

// this endpoint updates the user 
router.patch('/User/:id', (req, res) =>{
    const id = req.params.id
    const { firstName, lastName, age, emailAdd, pwd } = req.body

    const query = `
    UPDATE Users 
    SET firstName = '${firstName}'
    WHERE underID = ${id}
    `
    db.query('ALTER TABLE Users RENAME COLUMN underID TO userID')
    db.query(`UPDATE Users  SET firstName = '${firstName}' WHERE userID = ${id}`, (err, result) => {
        if (err) throw new Error(err);
        res.json(
            {
                result
            }
        )
    })
})

router.get('/alter', (req, res) => {
    db.query( `ALTER TABLE Users ADD COLUMN profileURL TEXT` )

})


// this endpoint registers the user
router.get('/register', (req,res) => {
    res.sendFile(path.resolve('./static/html/register.html'))
})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})