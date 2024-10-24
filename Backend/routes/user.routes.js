import  express from 'express';

const router = express.Router()

 
//signup
router.post("/signup", async(req, res)=>{
    try {
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({message: "sign up error"})
    }
})
 
export default router
