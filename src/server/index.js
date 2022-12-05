const express = require('express');
const path = require('path');
const healthcheckRoutes = require('./routes/healthcheck');
const carrierRoutes = require('./routes/carriers');

const app = express();

app.use(healthcheckRoutes);
app.use(carrierRoutes);

app.use(express.static(__dirname + '/../client/'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.listen(8081);