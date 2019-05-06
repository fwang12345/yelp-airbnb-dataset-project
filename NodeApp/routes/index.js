var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'cis450project.cvzijce8kecp.us-east-1.rds.amazonaws.com',
  user: 'cis450project',
  password: 'cis450project',
  database: 'cis450project'
});

connection.connect(function(err) {
  if (err) {
    console.log("Error Connection to DB" + err);
    return;
  }
  console.log("Connection established...");
});

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
});

router.get('/trip', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'trip.html'));
});

router.get('/new-trip', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'new_trip.html'));
});

router.get('/newAccount', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'new_account.html'));
});

router.get('/listing', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'listing.html'));
});

router.get('/dashboard', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'dashboard.html'));
});

router.get('/add', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'add.html'));
});

router.get('/recommend', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'recommend.html'));
});



// To add a new page, use the templete below
/*
router.get('/routeName', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'fileName.html'));
});
*/

router.post('/addHouse', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
  var query = `INSERT INTO doHousing VALUES ('${req.body.username}','${req.body.tripID}', '${req.body.id}','${req.body.day}')`; /* Write your query here and uncomment line 21 in javascripts/app.js*/
  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success'
      });
    }
  });
});

router.post('/addRest', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
  var query = `INSERT INTO doRestaurant VALUES ('${req.body.username}','${req.body.tripID}', '${req.body.id}','${req.body.day}')`; /* Write your query here and uncomment line 21 in javascripts/app.js*/
  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success'
      });
    }
  });
});

router.post('/addAct', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
  var query = `INSERT INTO doActivity VALUES ('${req.body.username}','${req.body.tripID}', '${req.body.id}','${req.body.day}')`; /* Write your query here and uncomment line 21 in javascripts/app.js*/
  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success'
      });
    }
  });
});


// Login uses POST request
router.get('/login', function(req, res) {
  var user = req.query.username;
  var query = `SELECT password FROM cis450project.users
               WHERE username = '${user}'`;
  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json(rows)
    }
  });
});
router.post('/create', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username
  var query = `INSERT INTO users VALUES ('${req.body.username}', '${req.body.password}')
  ON DUPLICATE KEY UPDATE password='${req.body.password}'`; /* Write your query here and uncomment line 21 in javascripts/app.js*/
  connection.query(query, function(err, rows, fields) {
    console.log("rows", rows);
    console.log("fields", fields);
    if (err) console.log('insert error: ', err);
    else {
      res.json({
        result: 'success'
      });
    }
  });
});
router.get('/new_trip_id', function(req, res) {
  var user = req.query.user;
  var query = `SELECT MAX(trip_id) AS id FROM trips
               WHERE user = '${user}'`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('insert error:', err);
    else {
      res.json(rows);
    }
  });
});
router.get('/trips', function(req, res) {
  var user = req.query.user;
  var query = `SELECT * FROM cis450project.trips
               WHERE user = '${user}'`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log('insert error:', err);
    else {
      res.json(rows);
    }
  });
});
router.post('/create_trip', function(req, res) {
  var user = req.body.user;
  var id = req.body.trip_id;
  var name = req.body.name;
  var location = req.body.location;
  var startdate = req.body.startdate.substring(0, 10);
  var enddate = req.body.enddate.substring(0, 10);
  console.log(user, id, startdate, enddate);
  var query = `INSERT INTO cis450project.trips VALUES ('${user}', ${id}, '${name}', '${location}', '${startdate}', '${enddate}')`;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json({
        result: 'success'
      });
    }
  });
});
router.get('/listing/:city', function(req, res) {
  var city = req.params.city
  var query = `SELECT *
               FROM cis450project.listing
               WHERE city = '${city}'
               ORDER BY rating DESC
               LIMIT 10`;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      
    }
  });
});
router.get('/business/:city', function(req, res) {
  var city = req.params.city
  var query = `SELECT *
               FROM cis450project.business
               WHERE city = '${city}'
               ORDER BY review_count DESC, rating DESC
               LIMIT 10`;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      
    }
  });
});
router.get('/house/:city/:beds/:rooms/:baths/:orderBy', function(req, res) {
  var city = req.params.city
  var beds = req.params.beds
  var rooms = req.params.rooms
  var baths = req.params.baths
  var orderBy = req.params.orderBy
  var query = `SELECT *
               FROM cis450project.listing
               WHERE city = '${city}' AND beds >= ${beds} AND bedrooms >= ${rooms} AND bathrooms >= ${baths}
               ORDER BY '${orderBy}' DESC
               LIMIT 25`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      
    }
  });
});
router.get('/bus/:city/:category/:orderBy', function(req, res) {
  var city = req.params.city
  var category = req.params.category;
  var orderBy = req.params.orderBy;
  var query = `SELECT business_id, name, address, city, state, zipcode, stars, reviews
              FROM cis450project.categories 
              NATURAL JOIN 
              cis450project.business
              WHERE city = '${city}' AND
              category ='${category}'
              ORDER BY '${orderBy}'  DESC
              LIMIT 25`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      
    }
  });
});
// template for GET requests
/*
router.get('/routeName/:customParameter', function(req, res) {

  var myData = req.params.customParameter;    // if you have a custom parameter
  var query = '';

  // console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});
*/

module.exports = router;
