import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import { CorsOptions } from 'cors';
import cors from 'cors'
import session from 'express-session'
dotenv.config({path: "./config.env"});
import passport from 'passport';
import * as authRouter from './auth/routes/auth.routes';
import workoutStatsRouter from './routes/workoutStats.route';

const allowedOrigins = ["https://hildong.github.io/healthjournal", "https://api.api-ninjas.com", "https://healthjournal.onrender.com", "/\.onrender\.com$/"]

const options: CorsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}

const app: Application = express();
const port = process.env.PORT || 8000;
const prodPort = ""
const mongo_uri = process.env.MONGO_URI

mongoose.set("strictQuery", true)
mongoose.connect(`${mongo_uri}`)
const connection = mongoose.connection
connection.once("open", function () {
  console.log("MongoDB database connection established successfully")
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://healthjournal.onrender.com/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors(options))
app.use(express.json())

app.use(
    session({
        name: "sid",
        saveUninitialized: false,
        resave: false,
        secret: "i90digf9dfkdksoadko",
        cookie: {secure: true, maxAge: 24 * 60 * 60 * 1000}
    })
)
app.use(passport.initialize())
app.use(passport.session())
import './auth/passport'
import { checkAuthenticated } from './auth/auth';

app.use("/auth", authRouter.default)
app.use("/workout", checkAuthenticated, workoutStatsRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});