//app.js
const express = require('express');
const logger = require('./config/logger.js');
const client = require('./config/db.js'); 
const allRoutes = require('./routes/allroutes.js');
const app = express();
const cors= require('cors');

app.use(cors());
app.use(express.json());

//Routes
app.use('/', allRoutes);

// Port connection
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});