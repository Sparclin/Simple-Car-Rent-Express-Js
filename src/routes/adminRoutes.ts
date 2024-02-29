import express from 'express';
import * as admin from '../controller/adminController'
import * as verify from '../middleware/verifyAdmin'

const app = express();
app.use(express.json());

app.post('/register', verify.verifyUser,admin.createAdmin);
app.post('/login', admin.loginAdmin)
app.get('/show', verify.verifyUser,admin.showAdmin);
app.delete('/delete/:adminID', verify.verifyUser,admin.deleteAdmin);
app.put('/update/:adminID',  verify.verifyUser,admin.updateAdmin)

export default app