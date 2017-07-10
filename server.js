const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware
app.use(function (req, res, next) {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', function (err) {
        if (err) {
            console.log(`Unable to append to server.log.`);
        }
    });

    next();
});

// Redirect all calls to this one page.
// app.use(function (req, res, next) {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// Creating reusable values.
hbs.registerHelper('getCurrentYear', function () {
    return new Date().getFullYear();
});

// Inserting functions!!
hbs.registerHelper('screamIt', function (text) {
    return text.toUpperCase()
});


app.get('/', function (req, res) {
    res.render('home.hbs', {
        pageTitle: 'Welcome home!!!',
        welcomeMessage: 'Home is where the heart is...',
    });
});

app.get('/about', function (req, res) {

    res.render('about.hbs', {
        pageTitle: 'About Page',
    });

});


app.get('/bad', function (req, res) {
    res.send({
        errorMessage: 'Wanted page does not exist...'
    });
});


app.listen(3000, function () {
    console.log('Server is up and running on port 3000');
});