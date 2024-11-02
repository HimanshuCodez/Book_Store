import express from 'express';
import User from '../models/user.model.js';
import Book from '../models/book.model.js';
import Order from '../models/order.model.js';
import authenticateToken from './userAuth.routes.js';

const router = express.Router();

router.post('/place-order',authenticateToken,async(req,res)=>{
 try {
     const {id} = req.headers;
     const {order} = req.body;
     for (const orderData of order ) {
        const newOrder = new Order({user :id, book:orderData._id});
       const orderDataFromdb=  await newOrder.save();
       //saving order in db
       await User.findByIdAndUpdate(id,{
         $push: { orders: orderDataFromdb._id },
       });
       //clearing cart
       await User.findByIdAndUpdate(id,{
         $pull: { cart: orderData._id },
       });
     }
     res.status(200).json({message:"Order placed successfully"});
 } catch (error) {
      console.error("Error during order placement:", error);
     res.status(500).json({ message: "Internal server error" });
 }
}

)





export default router;