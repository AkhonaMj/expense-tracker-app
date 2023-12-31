import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config()
import pgPromise from "pg-promise";
import expenseDB from "./services/expense.js";
import expenseRoutes from "./routes/expenseRoutes.js";

const pgp = pgPromise();
const app = express();

const exphbs = engine({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts'
    
})

const db = pgp({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
});


const expense_db = expenseDB(db)//create an instance for the database factory function

app.engine('handlebars', exphbs);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

const expense = expenseRoutes(expense_db)//create an instance for the routes functions

app.get('/', (req, res) => {
    res.render('index'); 
});

// app.post('/', expense.home)

// app.get('/expense', expense.)
// app.post('/expenses', expense.)


const PORT = process.env.PORT || 3010;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});