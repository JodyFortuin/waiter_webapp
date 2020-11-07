let express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const waiterFactory = require('./waiter');

let app = express();

const connectionString =
  process.env.DATABASE_URL || "postgresql://jojothepompiman:pg123@localhost:5432/waiterdb";

const pg = require("pg");

const Pool = pg.Pool;
const pool = new Pool({
  connectionString,
});

const waiterFact = waiterFactory(pool);

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

app.get('/waiters/:username', async function (req, res) {

  res.render('index', {

  });
});

app.post('/waiters/:username', async function (req, res) {
  const day = req.body.checkbox;
console.log(day)
  const waiterName = req.body.nameItem;
  if(waiterName){
  const addWaiter = await waiterFact.addWaiter(waiterName);
  }

  const name = [req.body.nameItem];
  if(waiterName){
  const addDays = await waiterFact.addDays(name, day);
  }

    res.render('index', {
         
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
