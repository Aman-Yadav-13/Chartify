// require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(cors({
    origin : process.env.LOCAL_URL
}))

mongoose.connect(process.env.MONGODB_URL)
.then(async () => {
    console.log('MongoDB connected ...');
})
.catch((error) => {
    console.log('Erro occured while connecting to mongoDB : ', error);
})

app.get("/total-sales-over-time", async (req, res) => {
    try{
        console.log('total sales data');
        const client = mongoose.connection.getClient();

        const shopifyOrdersCollection = client.db('RQ_Analytics').collection('shopifyOrders');
        const orders = await shopifyOrdersCollection.find({}).toArray();

        const collection = orders.map(data => {
            const date = new Date(data.created_at);
            return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        });

        collection.sort();
        res.status(200).json({data: collection});
    }catch(error){
        console.log('Error : ', error);
    }
})

app.get("/sales-growth-rate-over-time", async (req, res) => {
    try{
        console.log('total sales data');
        const client = mongoose.connection.getClient();

        const shopifyOrdersCollection = client.db('RQ_Analytics').collection('shopifyOrders');
        const orders = await shopifyOrdersCollection.find({}).toArray();

        const collection = orders.map(data => {
            const date = new Date(data.created_at);
            return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        });

        collection.sort();
        res.status(200).json({data: collection});
    }catch(error){
        console.log('Error : ', error);
    }
})

app.get('/new-customers-added-over-time', async (req, res) => {
    try{
        console.log('new customer data');
        const client = mongoose.connection.getClient();

        const shopifyOrdersCollection = client.db('RQ_Analytics').collection('shopifyCustomers');
        const orders = await shopifyOrdersCollection.find({}).toArray();

        const collection = orders.map(data => {
            const date = new Date(data.created_at);
            return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        });

        collection.sort();
        res.status(200).json({data: collection});
    }catch(error){
        console.log('Error : ', error);
    }
})

app.listen(process.env.PORT, (error) => {
    if(error){
        console.log("Error in starting server ...");
    }else{
        console.log("Server initiated successfully ...");
    }
})