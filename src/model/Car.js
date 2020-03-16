import  mongoose, { Schema } from 'mongoose'

const CarSchema = new Schema({
    url: String,
    typeOfTransport: String,
    bodyType: String,
    theCountryOfManufacture: String,
    mark: String,
    model: String,
    mileage: String,
    desc: String,
    extraDesc: String,
    phone: Number,
    city: String,
    year: Number,
    cost: Number,
    region: String,
    specifications: {
        fuel: String,
        transmission: String,
        typeOfDrive: String,
        engineCapacity: Number,
        power: Number,
        mileageCar: Number,
        color: String,
    },
    costByDollor: Number
}   
,{
    timestamps: true
})

const CarModel = mongoose.model('Car', CarSchema)

export default CarModel