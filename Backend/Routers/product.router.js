const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const {adminAuthenticate} = require('../Middleware/authentication')
const productRoutes = express.Router();

const { ProductModel } = require("../Models/product.model");

//  search and sort functionality 
productRoutes.get("/admin", async(req,res)=>{
 let data = await ProductModel.find(req.query)
 res.send(data)

})



productRoutes.get("/",async (req, res) => {
    console.log(req.query)
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 7 ;
        const skipIndex = (page-1) * limit;
        const sort = req.query.sortBy || '_id';
        const sortOrder = req.query.sortOrder || 'desc';


        const filter = {};
        if(req.query.title) {
            filter.title = req.query.title;
        }
        if (req.query.gender && (req.query.gender === 'Male' || req.query.gender === 'Female')) {
            filter.gender = req.query.gender;
        }
        if(req.query.arrival) {
            filter.arrival = {$gte: req.query.arrival};
        }
        if(req.query.rating) {
            filter.rating = { $gte: req.query.rating };
        }
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            filter.$or = [
                { title: searchRegex },
                { category: searchRegex },
                { brand: searchRegex}
                // Add more fields to search from if needed
            ];
        }
        const products = await ProductModel.find(filter).sort({ [sort]: sortOrder }).skip(skipIndex).limit(limit);
        return res.send(products)

    } catch (error) {
        res.status(404).send(error.message)
    }
})

// get product by id
productRoutes.get("/:id",async (req, res) => {
    product = await ProductModel.findById({ _id: req.params.id })
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message: "Product not found."});
    }

})


productRoutes.post("/add",adminAuthenticate, async (req, res) => {
    const { title, gender, category, brand, rating, review, price, image, available, item_left } = req.body;
    try {
        product = ProductModel(req.body)
        await product.save();
        res.status(200).send({ "message": "One product has been added " })

    } catch (error) {

        console.log(error.message)
        res.status(404).send({ "message": error.message })
    }
})


productRoutes.delete('/delete',adminAuthenticate,async(req,res)=>{

    let Id = req.query._id

   await ProductModel.deleteOne({ _id: Id })

  res.send({msg:"Product deleted"})

})






module.exports = {productRoutes};