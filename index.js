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
  //req.session.user = name;
  if(name){
  const addWaiter = await waiterFact.addWaiter(name);
  }

  //if(name && !day == ""){
  const addId = await waiterFact.addShiftsForWaiter(name, day);
  //}

  const noName = await waiterFact.noName(name);

  if (noName === true) {
    req.flash("info", "No name entered");
  }

  if (!day) {
    req.flash("check", "No days selected");
  }

  const count = waiterFact.count(day);

    res.render('index', {
         
    });
});

app.get('/days', async function (req, res) {

 const day = req.body.checkbox;
 const get = await waiterFact.joinShift();

 console.log({get});

    res.render('admin', {
       display: get
    });
});

app.post('/reset', async function (req, res) {

  const reset = await waiterFact.reset();
  const get = await waiterFact.joinShift();

  if (reset){
    req.flash("reset", "Succesfully cleared database");
  }
 
     res.render('admin', {
       display: get
     });
 });


let PORT = process.env.PORT || 3090;

app.listen(PORT, function () {
  console.log("App starting on port", PORT);
});
