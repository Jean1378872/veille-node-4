const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
app.get('/html/02_formulaire.html', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/" + "02_formulaire.html" );
})


app.post('/traiter_post', urlencodedParser, function (req, res) {
 // Preparer l'output en format JSON 
 reponse = {
 prenom:req.body.prenom,
 nom:req.body.nom,
 lamethode: "POST"
 };
 console.log('reponse');
 res.end(JSON.stringify(reponse));
})

 app.get('/list', (req, res) => { 
    fs.readFile( __dirname + "/public/data/" + "adresses.json", 
        'utf8',
        (err, data) => {if (err) { return console.error(err);}
        console.log( data );
        let resultat = JSON.parse(data);           
  res.render('template_0.ejs', {adresses: resultat})  
  });
})

function copyData(source, destination) {
 fs.readFile(source, 'utf8',  (err, data) => {
 if (err) throw err;
 // Effectuer un traitement modifier data
 fs.writeFile (destination, data, (err) => {
 if (err) throw err;
 console.log('Terminé');
 });
 });
}