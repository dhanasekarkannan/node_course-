var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var app = express();

var port = process.env.PORT || 3000;
hbs.registerPartials( __dirname + '/views/partials' );
app.set('view engine','hbs');
app.use(( req, res, next ) => {
  var now = new Date().toString();
  var log =  `${now}` + `${req.method}` + `${req.url}`
  fs.appendFile( 'server.log', log + '\n', (err) => {
    if(err){
      console.log("Unable to log the event ");
    }
  }  );
  next();
});

// app.use( ( req, res, next ) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static( __dirname + '/public' ) );
hbs.registerHelper( 'getCurrentYear' , () => {
  return new Date().getFullYear()
});
app.get('/',( req, res ) => {
  res.render('index.hbs',{
    pageTitle : 'Welcome',
    welcomeMessage : 'Dhanasekar Kannan, Welcomes you'
  })
} );

app.get('/about',(req, res) => {
   res.render('about.hbs',{
     pageTitle : 'About Page'
   })
});

app.get('/projects',(req, res) => {
   res.render('projects.hbs',{
     pageTitle : 'Projects Page'
   })
});

app.get('/bad',( req, res ) => {
   res.send({
     error : 'Bad URL'
   }
   );
});


app.listen( port, () => {
  console.log( `server started, Listening to Port ${port}`);
} );
