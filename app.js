const express = require('express')
const sanonnat = require('./sanonnat')
const lodash = require('lodash')
const fs = require('fs')

//initialisoidaan express-applikaatio (expressjs.com)
const app = express()
const port = 3000 //määritetään portti jota käytetään


app.set('view engine','ejs') //määritetään app käyttämään ejs template engineä. Oletuksena ejs hakee ejs tiedostot views nimisestä kansiosta.



//MIDDLEWARE BELOW------------------------------------------------------
// function shuffleArray(array) {
//     const arr = [...array]; // copy to avoid mutating original
//     for (let i = arr.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//     return arr;
// }

app.use(express.urlencoded({extended: false}))  //Aina kun koodissa on app.use, käytetään valmiiksi sisäänrakennettua middlewarea



//ROUTES AND ENDPOINTS BELOW-----------------------------------------------------------
app.get('/', (req, res) => {
    // const userAgent = req.headers['user-agent'] //userAgent kertoo mitä selainta käyttäjä käyttää ja req.headers pyytää headerista nämä tiedot
    // console.log(userAgent)
    
    // const userLocale = req.headers['accept-language'] //userLocale kertoo mitä kieltä käyttäjä käyttää ja req.headers pyytää headerista nämä tiedot
    // console.log(userLocale)
    
    res.render('index',{sanonta:lodash.sample(sanonnat.sanonnat)})  //Hakee index.ejs tiedoston, sekä sanonta tiedoston, ja käyttää sanonta tiedostoon lodash samplea
    })
  //res.send('Hello World!')


app.get('/login', (req, res) => {
    res.render('login')
    })

app.post('/login', (req, res) => {
    res.render('welcome', {kayttajanimi:req.body.username})  
    })

app.get('/saveuser', (req, res) => {
    res.render('saveuser')

})

app.post('/saveuser', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (!username) {
        return res.status(400).send('Missing username')
    }

    // Kirjaa käyttäjänimi tiedostoon kayttajat.txt
    fs.appendFile('kayttajat.txt', username + '\n' + password + '\n' + '\n', (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send('Error saving username')
        }

        // uudelleenohjaa käyttäjän etusivulle
        res.redirect('/')
    })

})



//  const randomi = shuffleArray(sanonnat.sanonnat)
 // res.render('index',{randomi}) //hakee index.ejs tiedoston views kansiosta.

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

