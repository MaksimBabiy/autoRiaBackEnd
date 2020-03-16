import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/auto-app',{
    useNewUrlParser: true,
    useCreateIndex: false,
    useFindAndModify: false,
    useUnifiedTopology: true})

