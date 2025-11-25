const express = require('express')
const sanonnat = require('./sanonnat')
const lodash = require('lodash')

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

//ROUTES AND ENDPOINTS BELOW-----------------------------------------------------------
app.get('/', (req, res) => {
    const userAgent = req.headers['user-agent']
    console.log(userAgent)
    
    const userLocale = req.headers['accept-language']
    console.log(userLocale)

  //res.send('Hello World!')

//  const randomi = shuffleArray(sanonnat.sanonnat)
 // res.render('index',{randomi}) //hakee index.ejs tiedoston views kansiosta.
 res.render('index',{sanonta:lodash.sample(sanonnat.sanonnat)})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

