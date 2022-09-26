const express = require('express');
const app = express();
app.use(express.static(__dirname+'/dist/gie-sara-frontend'));
app.get('/*', (req, res)=>{
  res.sendFile(__dirname+'/dist/heroku-angular/index.html');
});

app.listen(process.env.PORT || 8080)
