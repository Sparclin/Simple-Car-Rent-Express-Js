import express from 'express';
import * as rent from '../controller/rentController'

const app = express();
app.use(express.json());

app.post('/rent', rent.createRent);
app.get('/rent', rent.showRent);
app.delete('/delete/:rentID', rent.deleteRent);
app.put('/update/:rentID',  rent.updateRent)

export default app