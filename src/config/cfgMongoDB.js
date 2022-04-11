import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: `./src/config/config.env` })

export const optionsMongDB = { 
    uri: "mongodb+srv://" + process.env.USER_MONGODB + ":"  + process.env.PASS_MONGODB + "@cluster0.1t3wi.mongodb.net/ecommerce?retryWrites=true&w=majority",
    timeoutConnect: '5000'
    }








