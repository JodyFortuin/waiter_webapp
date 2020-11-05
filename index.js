let express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const waiterFactory = require('./waiter');

let app = express();

const connectionString =
  process.env.DATABASE_URL || "postgresql://codex:pg123@localhost:5432/waiter_webapp";

const pg = require("pg");

const Pool = pg.Pool;
const pool = new Pool({
  connectionString,
});

const waiter = waiterFactory(pool);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', async function (req, res) {

    res.render('index', {

    });
});

app.post('/waiters/:username', async function (req, res) {
  const name = req.body.nameElem;


    res.render('index', {

    });
});

app.get('/waiters/:username', async function (req, res) {

    res.render('greeted', {

    });
});

app.get('/days', async function (req, res) {

    res.render('counter', {

    });
});


let PORT = process.env.PORT || 3090;

app.listen(PORT, function () {
  console.log("App starting on port", PORT);
});
