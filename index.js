const express = require('express');
const app = express();
const applications = require('./routes/application');
const jobs = require('./routes/job');
const auth = require('./routes/auth');
const user = require('./routes/user')
const cors = require('cors');
const connectDB = require('./config/DBconnection/dbConnection');
connectDB();
require('./config')();
const errorHandler = require('./middleware/errorHandler');

app.use(cors())
app.use(express.json());
app.use('/api/applications', applications);
app.use('/api/auth', auth);
app.use('/api/jobs', jobs);
app.use('/api/user', user);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening to port ${port}...`));
