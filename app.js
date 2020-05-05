var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');





var app = express();


app.engine('handlebars', exphbs({
    defaultLayout: null
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('accueil');
});
app.get('/success', function(req, res){
	res.render('success');
});
app.get('/actualite', function(req, res){
	res.render('actualite');
});
app.get('/prestation', function(req, res){
	res.render('prestation');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.post('/contact/send', function(req, res){
	
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'sadok.akremi@esprit.tn',
			pass: 'zdigolozdigolo220290'
		}
		
	});

	var mailOptions = {
		from: 'Global Services',
		to: 'sadok.akremi@esprit.tn',
		subject: 'Demande Devis',
		text: 'Vous avez reçu un message... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message +'Société: '+req.body.societe+ +'Téléphone: '+req.body.telephone,
		html: '<p>Vous avez reçu un message...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Société: '+req.body.societe+'</li><li>Téléphone: '+req.body.telephone+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
        res.redirect('/success');
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
	
});
  

app.listen(process.env.PORT || 3000, function(){
	console.log('global server runnig');
});

