import { Router } from 'express';
import { sample_foods, sample_tags} from '../data';
import asyncHandler from 'express-async-handler';
import { foodModel } from '../configs/models/food.model';
const router = Router();

router.get("/seed", asyncHandler(
    async(req,res) =>{
        const foodsCount = await foodModel.countDocuments();
        if(foodsCount > 0){
            res.send("Seed is already done!")
            return;
        }
        await foodModel.create(sample_foods);
        res.send("Seed Is Done!")
    }
))

router.get("/",asyncHandler(
    async(req, res) => {
        const foods = await foodModel.find();
        res.send(foods);
    }
))

router.get("/search/:searchTerm", asyncHandler(
   async (req,res) =>{
        const searchRegex = new RegExp(req.params.searchTerm, 'i'); // 'i' makes search case insensitive
        const foods = await foodModel.find({name:{$regex:searchRegex}})
        res.send(foods);
}
))

router.get("/tags",asyncHandler(
    async (req,res) =>{
        const tags = await foodModel.aggregate([
            {
                $unwind: '$tags' //2 foods 3tags, unwind tags = 6 foods tags 1
            },
            {
                $group:{
                    _id: '$tags',
                    count:{$sum: 1}
                }
            },
            {
                $project:{
                    _id: 0,
                    name:'$_id',
                    count:'$count'
                }
            }
        ]).sort({count: -1});
        const all = {
            name: 'All',
            count: await foodModel.countDocuments()
        }
        tags.unshift(all); // unshift adds to the beginning of the tags
        res.send(tags);
}
))

router.get("/tag/:tagName", asyncHandler(
   async (req,res) =>{
    const foods = await foodModel.find({tags: req.params.tagName})
    res.send(foods);
}
))

router.get("/:foodId", asyncHandler( 
 async (req,res) =>{
    const food = await foodModel.findById(req.params.foodId);
    res.send(food);
}
))

export default router;