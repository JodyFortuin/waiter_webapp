let express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const waiterFactory = require('./waiter');

let app = express();

const connectionString =
  process.env.DATABASE_URL || "postgresql://codex:pg123@localhost:5432/waiterdb";

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
  const name = req.body.nameItem;
  if(name){
  const addWaiter = await waiterFact.addWaiter(name);
  }

  if(name && !day == ""){
  const addID = await waiterFact.addID(name, day);
  }

  const noName = await waiterFact.noName(name);

  if (noName === true) {
    req.flash("info", "No name entered");
  }

  if (!day) {
    req.flash("check", "No days selected");
  }

    res.render('index', {
         
    });
});

app.get('/days', async function (req, res) {

    const display = await waiterFact.get();
    const count = await waiterFact.count();
    const color = await waiterFact.color();

    res.render('admin', {
       display,
       count,
       color
    });
});


let PORT = process.env.PORT || 3090;

app.listen(PORT, function () {
  console.log("App starting on port", PORT);
});