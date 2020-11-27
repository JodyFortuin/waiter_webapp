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

    res.render('home', {

    });
});

app.get('/waiters', async function (req, res) {

  res.render('index', {

  });
});

app.get('/waiters/:nameItem', async function (req, res) {

  var nameInput = req.params.nameItem;

  res.render('index', {
    user: nameInput
  });
});

app.post('/waiters/:nameItem', async function (req, res) {
  const day = req.body.checkbox;
  //const nameInput = req.body.nameItem;
  var nameInput = req.params.nameItem;
  const name = waiterFact.regex(nameInput);

  if(name){
  addWaiter = await waiterFact.addWaiter(name);
  }

  if (addWaiter == false){
    req.flash("info", "Waiter has already been entered");
  } else if (name && !day == ""){
  const addId = await waiterFact.addShiftsForWaiter(name, day);
  req.flash("shift", "Successfully added shifts");
  }

  const noName = await waiterFact.noName(name);

  if(noName === true && !day){
    req.flash("info", "Enter name and day")
  } /*else if (noName === true) {
    req.flash("info", "No name entered");
  }*/ else if (!day) {
    req.flash("info", "No days selected");
  }

    res.render('index', {
         user: nameInput
    });
});

app.get('/days', async function (req, res) {

 const day = req.body.checkbox;
 const get = await waiterFact.joinShift();

    res.render('admin', {
      display: get
    });
});

app.post('/login', async function (req, res) {

 const user = req.body.userLogin;
 const password = req.body.password;

 var psw = await waiterFact.pswValidation(password);
 var usr = await waiterFact.userValidation(user);

 const get = await waiterFact.joinShift();

 console.log({password});
 console.log({psw});

if(psw == true && usr == true){
  res.render('admin',{
    display:get
  });
}

if(psw == false || usr == false){
  req.flash("login", "Incorrect credentials");

  res.render('login', {

  });}
});

app.get('/login', async function (req, res) {

  res.render('login', {

     });
 });

app.get('/home', async function (req, res) {

  res.render('home', {

   });
 });

app.get('/admin', async function (req, res) {
  const get = await waiterFact.joinShift();

  res.render('admin', {
    display:get
  });
});

app.get('/reset', async function (req, res) {

  const reset = await waiterFact.reset();
  const get = await waiterFact.joinShift();

  if (reset){
    req.flash("reset", "Succesfully cleared shift schedule");
  }
 
     res.render('admin', {
       display: get
     });
 });


let PORT = process.env.PORT || 3090;

app.listen(PORT, function () {
  console.log("App starting on port", PORT);
});
