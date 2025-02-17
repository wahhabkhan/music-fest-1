const path = require('path');
const express = require('express');    //using express
const app = express();
//server will run on port 5000
const port = 4000;  

//Middleware
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));


//Routes
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/contact', (req, res) => {
  res.render('contact');
}); 
app.get('/activity', (req, res) => {
  res.render('activity');
});
app.get('/lineup', (req, res) => {
    res.render('lineup');
  });
app.get('/stages', (req, res) => {
    res.render('stages');
  });

  
app.use(express.static('public'));

  
// Activity - Sum of Two Numbers
app.get('/api/sumActivity', (req, res) => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const correctSum = num1 + num2;

  res.json({
    message: `Calculate the sum of ${num1} and ${num2}.`,
    correctSum: correctSum,
  });
});

app.post('/api/checkSum', express.urlencoded({ extended: true }), (req, res) => {
  const userAnswer = parseInt(req.body.answer, 10);
  const correctSum = parseInt(req.body.correctSum, 10);

  if (isNaN(userAnswer)) {
    res.json({ message: '<span style="color: black;">Please enter a valid number.</span>' });
  } else if (userAnswer === correctSum) {
    res.json({ message: '<span style="color: black;">Congratulations! You provided the correct sum.</span>' });
  } else {
    res.json({ message: `<span style="color: black;">Sorry, the correct sum was ${correctSum}. Try again!</span>` });
  }
});

app.get('/api/interactiveFeature', (req, res) => {
  // Simulate some interactive feature 
  res.send('AJAX feature worked!');
});


//inserting contact form data
app.post('/contact', express.urlencoded({ extended: true }), (req, res) => {
  const { name, email,  message } = req.body;
  db.run('INSERT INTO contacts_tb (name, email, message) VALUES (?, ?, ?)', [name, email, message], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/');
    }
  });
});


// AJAX - fetches lineup from database 
app.get('/api/lineup', (req, res) => {
  db.all('SELECT * FROM lineup_tb', (err, rows) => {
    if (err) {
      console.error('Error fetching lineup data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const lineupData = rows.map(img => ({
        ...img,
        image_url: `/images/${img.artist.toLowerCase().replace(/\s+/g, '')}.jpg`,
      }));

      res.json(lineupData);
    }
  });
});


// AJAX -  fetches stages from database
app.get('/api/stages', (req, res) => {
  db.all('SELECT * FROM stages_tb', (err, rows) => {
    if (err) {
      console.error('Error fetching stages data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      
      const stagesData = rows.map((stage, index) => ({
        ...stage,
        image_url: `/images/img${index + 1}.jpeg`, 
      }));

      res.json(stagesData);
    }
  });
});


//database connection
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.join(__dirname, 'src', 'db.db'));

// Log when the database is opened
db.on('open', () => {
  console.log('Database opened successfully');
});


//Create Tables
db.run(`
  CREATE TABLE IF NOT EXISTS contacts_tb (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT
  )
`);
db.run(`
  CREATE TABLE IF NOT EXISTS lineup_tb (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS stages_tb (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`);




//Staring the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
