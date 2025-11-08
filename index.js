const express = require('express');

const app = express();

app.listen(3000, () => {
    return console.log('Server is running on http://localhost:3000');
});