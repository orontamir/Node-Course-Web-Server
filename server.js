const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url} `;
  console.log(`${log}`);
  fs.appendFile('Server.log',log + '\n', (err) => {
    if (err)
    {
      console.log('Unable to append the server');
    }
  });
  next();
});

app.use((req,res,next) => {
  res.render('maintenence.hbs');
});
hbs.registerHelper(
  'currentYear', () => {
    return new Date().getFullYear();
  }
);
app.get('/', (req, res) => {
  //res.send({
  //  name: 'Oron',
  //  Like: ['Bike','scle']
  //});
  res.render('home.hbs',{
    PageTitle: 'About Page',
    currentYear: new Date().getFullYear(),
    WelcomeMessage: 'Welcome to my web server'
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    PageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
  //res.send('About page');
});
app.get('/project', (req,res) => {
  res.render('project.hbs', {
      PageTitle: 'Projects'
  });
});
app.get('/bed',(req,res) => {
  res.send({
    errorMessage: 'Unable to range request'
  });
});

app.listen(port, ()=> {
  console.log(`Unable connecting to port ${port}`);
});
