const express = require('express');
const {errorMiddleware} = require('./middleware/error-middleware');
const Logging = require('./logging');
const dotenv = require('dotenv');

// import router 
const userRoutes = require('./routes/users');
const absensiRoutes = require('./routes/absensi')


const logRequest = require('./middleware/logs');

dotenv.config();

const app = express();
app.use(errorMiddleware);
app.use(express.json());
app.use(logRequest);

// main router
app.use('/api/users', userRoutes);
app.use('/api/absensi', absensiRoutes)

app.listen(3000, () => {
  Logging.info('Server is running on port 3000');
});
