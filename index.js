const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/posts');

const app = express();

app.use('/posts', postRoutes);

app.use(bodyParser.json({ limit: '30 mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30 mb', extended: true }));
app.use(cors());

const CONNECT_URL =
    'mongodb+srv://javascript:javascript123@cluster0.vzur0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
    .connect(CONNECT_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => {
            console.log(`Server listening on port: ${PORT}`);
        })
    )
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
