const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 4500;
const connection = require('./server');
const jsonParser = bodyParser.json();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(process.cwd() + '/images'));
// routing start now
app.get('/', (req, res) => {
    res.render('dashboard');
});

app.get('/about', (req, res) => {
    res.render('about');
});

// product routing

app.get('/milk-product', (req, res) => {
    res.render('product');
});

app.post('/product_insert', jsonParser, (req, res) => {
    var product_image = req.body.product_image;
    var product_name = req.body.product_name;
    var product_price = req.body.product_price;

    const sql = `INSERT INTO product('product_image', 'product_name', 'product_price') VALUES ('${product_image}','${product_name}','${product_price}')`;

    const query = connection.query(sql, (err, results, fields) => {
        if (err) throw err;
        else {
            res.render('buyNowPro');
            console.log('data is buy now..' + results.affectedRows);
        }
    });
});

app.get('/contact-us', (req, res) => {
    res.render('contact');
});

app.post('/contact_submit', jsonParser, (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phoneNumber = req.body.phoneNumber;
    var email = req.body.email;
    var message = req.body.message;

    const sql = `INSERT INTO contact(firstName, lastName,phoneNumber,email, message) VALUES ('${firstName}','${lastName}','${phoneNumber}','${email}','${message}') `;

    const query = connection.query(sql, (err, results, fields) => {
        if (err) throw err;
        else {
            res.render('contact');
            console.log('inserted data in database' + results.affectedRows);
        }
    });
});

app.listen(port, (err) => {
    if (err) throw err;
    else {
        console.log('server is running on port http://localhost:4500');
    }
});
