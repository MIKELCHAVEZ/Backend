import express from 'express';
import bookRoutes from './routes/bookRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

//vreate express app
const app = express();

//to prase incoming data
app.use(express.json());

app.use('/book', bookRoutes);
app.use('/student', studentRoutes);


try {
    const port = 3000;
    app.listen(port, () => {
        console.log(`listening to port ${port}...`);
    });
}  catch(e) {
    console.log(e)
}