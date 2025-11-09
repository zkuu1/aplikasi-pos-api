const express = require('express');
const {errorMiddleware} = require('./middleware/error-middleware');
const Logging = require('./logging');

const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const logRequest = require('./middleware/logs');

dotenv.config();

const app = express();
app.use(errorMiddleware);
app.use(express.json());
app.use(logRequest);
app.use('/api/users', userRoutes);

app.listen(3000, () => {
  Logging.info('Server is running on port 3000');
});
