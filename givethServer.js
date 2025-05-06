require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


// app.get("/", (req, res) => {
//     res.send("Welcome to Giveth");
// });

app.listen(port, ()=>{
    console.log(`You are using ${process.env.BASE_URL}`);
});