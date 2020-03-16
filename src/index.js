import express  from 'express'
import CarController from './controllers/CarControllers'
import './core/db'
import cors from 'cors'

const CarCtrl = new CarController()

const app = express();
app.use(express.json())
app.use(cors())


app.post('/car', CarCtrl.create)
app.get('/car', CarCtrl.all)
app.get('/car/:id', CarCtrl.index)
app.delete('/car/:id', CarCtrl.delete)
app.get('/carParams', CarCtrl.findByParams)
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server started on: ${PORT} PORT`)
})

