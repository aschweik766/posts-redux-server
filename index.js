import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import mongoose from 'mongoose';
import methodOverride from 'method-override';

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(methodOverride('_method'))
const PORT = process.env.PORT || 5000;

app.use('/posts', postRoutes);
// app.listen(PORT, ()=> {
//     console.log(`server running on port: ${PORT}`)
// });
// const mongoURI = process.env.DB_URL 
const mongoURI = process.env.DB_URL || 'mongodb+srv://test:test1@cluster0.06xha.mongodb.net/moveApp';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
    .catch((error) => console.log(error));

