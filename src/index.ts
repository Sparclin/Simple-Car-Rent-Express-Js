import express, { Request,Response } from "express";
import adminRoute from './routes/adminRoutes'
import carRoute from './routes/carRoutes'
import rentRoute from './routes/rentRoutes'

const app = express();
const port = 3000;

app.use(adminRoute)
app.use(carRoute)
app.use(rentRoute)

app.listen(port, () => {
    console.log(`Your running on port ${port}`)
})