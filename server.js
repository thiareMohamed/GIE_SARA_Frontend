const express = require('express');
const app = express();
app.use(express.static(__dirname+'/dist/gie-sara-frontend'));
app.get('/*', (req, res)=>{
  res.sendFile(__dirname+'/dist/heroku-angular/index.html');
});
const csp = require('express-csp-header');
app.use(csp({
  policies: {
    'default-src': [csp.NONE],
    'img-src': [csp.SELF],
  }
}));

app.listen(process.env.PORT || 8080)
