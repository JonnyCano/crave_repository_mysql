<<<<<<< HEAD

const express = require('express');
const mysql2 = require('mysql2');
=======
>>>>>>> 6afc7718ec3dd25b335c2a58f2ab3d7b8342d79c
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
<<<<<<< HEAD
=======
const PORT = process.env.PORT || 3001

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//make the session private
const sess = {
  secret: 'something',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
>>>>>>> 6afc7718ec3dd25b335c2a58f2ab3d7b8342d79c

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(require('./controllers/'));

//turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });







<<<<<<< HEAD
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
=======
>>>>>>> 6afc7718ec3dd25b335c2a58f2ab3d7b8342d79c
