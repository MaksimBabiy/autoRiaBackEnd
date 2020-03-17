import  CarModel  from '../model/Car'
import axios from 'axios'
class CarController {
    all(req,res) {
        CarModel.find({}, (err,docs) => {
            if(err) {
                res.json({
                    status: 'error',
                    message: err
                })
            }
            res.json({
                status: 'success',
                data: docs
            })
        })
    }
    create(req,res) {
        const newCar = {
            url: req.body.url,
            typeOfTransport: req.body.typeOfTransport,
            mark: req.body.mark,
            model: req.body.model,
            year: req.body.year,
            bodyType: req.body.bodyType,
            VIN: req.body.VIN,
            mileage: req.body.mileage,
            region: req.body.region,
            city: req.body.city,
            cost: req.body.cost,
            desc: req.body.desc,
            extraDesc: req.body.extraDesc,
            phone: req.body.phone,
            specifications: {
                fuel: req.body.fuel,
                transmission: req.body.transmission,
                typeOfDrive: req.body.typeOfDrive,
                engineCapacity: req.body.engineCapacity,
                power: req.body.power,
            },
           
        }
        newCar.costByDollor = (newCar.cost / 27).toFixed(0)
        console.log(newCar)
        CarModel.create(newCar, (err, data) => {
            if(err) {
                res.status(500).json({
                    status: 'error',
                    message: err
                })
            }
            res.json({
                status: 'success',
                data
            })
        })
    }
    delete(req,res) {
        const id = req.params.id;
        CarModel.findOneAndDelete({_id: id}, (err, data) => {
            if(err) {
                res.status(500).json({
                   success: false,
                   message: err
               })
           }
           res.json({
               status: 'success',
               data
           })
        })
    }
    index(req, res) {
        const id = req.params.id;
        CarModel.findById(id, (err, data) => {
            if(err) {
                res.status(500).json({
                   success: false,
                   message: err
               })
           }
            res.json({
                status: 'succces',
                data
            });
        })
      };
    findByParams(req,res) {
        let costFrom = req.query.costFrom ? req.query.costFrom: '0'
        let costTo = req.query.costTo ? req.query.costTo : '99999999999';
        let yearFrom = req.query.yearFrom ? parseInt(req.query.yearFrom) : '1899';
        let yearUntil = req.query.yearUntil ? parseInt(req.query.yearUntil) : '99999';
        let mileageFrom = req.query.mileageFrom ? req.query.mileageFrom : '0';
        let mileageTo = req.query.mileageTo ? req.query.mileageTo : '99999999999';
        const params = {
            ...req.query,
        }
        yearFrom && yearUntil !== undefined ? (delete params.yearFrom, delete params.yearUntil, params.year = {$gt: yearFrom -1, $lt: yearUntil + 1 }) : null
        costFrom && costTo !== undefined ? (delete params.costFrom, delete params.costTo, params.cost = {$gt: costFrom -1, $lt: costTo + 1}) : null
        mileageFrom && mileageTo !== undefined ? (delete params.mileageFrom, delete params.mileageTo, params.mileage = {$gt: mileageFrom - 1, $lt: parseInt(mileageTo) + 1}) : null
        console.log(params.cost)
        console.log(params.mileage)
        CarModel.find(params).exec((err,data) => {
            if(err) {
                res.status(500).json({
                   success: false,
                   message: err
               })
           }
            res.json({
                status: 'succces',
                data
            });
        })
    }
}

export default CarController