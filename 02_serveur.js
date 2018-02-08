const express = require('express');
const app = express();
let fs = require('fs');
app.use(express.static('public'));
app.get('/html/02_formulaire.html', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/" + "02_formulaire.html" );
})

/*app.get('/list', (req, res) => {
 fs.readFile( __dirname + "/public/data/" + "adresses.json", 'utf8', function (err, data) {
 console.log( data );
 res.end( data );
 });
})*/






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

fs.appendFile(__dirname + "/public/data/" + "adresses.json", ',' + JSON.stringify(reponse), function (err, data) {

    var json = JSON.stringify(reponse);
    fs.appendFile("adresses.json", json);

		console.log('Done!')
	})


console.log(reponse);
 res.end(JSON.stringify(reponse));

})

/*const contenu_objet_json = (o) => {
   let trace = '';
   for (let p in o) { 
     trace += p + ': ' + o[p] + '\n' + '<br></br>'; 
     console.log(trace);
   } 
   return trace;
   }*/


app.get('/membres', (req, res) => {



fs.readFile(__dirname + "/public/data/" + "adresses.json", 'utf8', function (err, data) {
	

	if (err) throw err

	


	let collection = JSON.parse('[' + data + ']');
	

	const transforme_en_tableau = (o) =>{

	let trace = '<table style="border:2px solid black;">' + '<tr style="border:2px solid black;">' + '<th>' + '<td">' + 'PRENOMS' + '</td>'+ '<th>' + '<td style="border:2px solid black;">' + 'NOMS' + '</td>'+ '<th>' + '<td style="border:2px solid black;">' + 'TELEPHONE' + '</td>' + '<th>' + '<td style="border:2px solid black;">' + 'MAIL' + '</td>';

   for (let i=0; i<collection.length; i++) { 
     trace += '<tr>' + '<th>' + '<td">' + collection[i].prenom + '</td>' + '</th>' + '<th>' + '<td>' + collection[i].nom + '</td>' + '</th>' + '<th>' + '<td>' + collection[i].tel + '</td>' + '</th>' + '<th>' + '<td>' + collection[i].mail + '</td>' + '</th>' + '<th>' + '<br></br>'; 
     
   } 
   return trace + '</table>';
	}

	res.end(transforme_en_tableau(collection));

	
})
})






var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})
