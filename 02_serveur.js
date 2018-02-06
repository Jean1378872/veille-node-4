const express = require('express');
const app = express();
let fs = require('fs');
app.use(express.static('public'));
app.get('/html/02_formulaire.html', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/" + "02_formulaire.html" );
})

app.get('/list', (req, res) => {
 fs.readFile( __dirname + "/public/data/" + "adresses.json", 'utf8', function (err, data) {
 console.log( data );
 res.end( data );
 });
})

fs.readFile(__dirname + "/public/data/" + "adresses.json", 'utf8', function (err, data) {
	if (err) throw err

	fs.writeFile(__dirname + "/public/data/" + "adresses.json", 'utf8', function (err) {
		if (err) throw err
		console.log('Done!')
	})
})


/////////////*///////

/*fs.exists('adresses.json', function(exists){
    if(exists){
        console.log("yes file exists");
        fs.readFile('adresses.json', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); 
        for (i=0; i<5 ; i++){
        obj.table.push({id: i, square:i*i});
        }
        var json = JSON.stringify(obj); 
        fs.writeFile('adresses.json', json); 
        }});
    } else {
        console.log("file not exists")
        for (i=0; i<5 ; i++){
        obj.table.push({id: i, square:i*i});
        }
        var json = JSON.stringify(obj);
        fs.writeFile('adresses.json', json);
        }
    });*/

    //////*//////

app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})

app.get('/traiter_get', function (req, res) {
 // Preparer l'output en format JSON

console.log('la route /traiter_get')

// on utilise l'objet req.query pour récupérer les données GET
 reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 tel:req.query.tel,
 mail:req.query.mail
 };


res.write('<p>'+JSON.stringify(reponse)+'</p>')

console.log(reponse);
 res.end(JSON.stringify(reponse));
})




var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})
