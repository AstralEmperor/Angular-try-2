//interface,schema,model
import { Schema, model} from "mongoose";
//interface
export interface Food{
        id: string;
        name: string;
        price: number;
        tags: string[];
        favorite: boolean;
        stars: number;
        imageUrl: string;
        origins: string[];
        cookTime:string;
}   
 //schema
 export const FoodSchema = new Schema<Food>(
    {
        name:{type: String, required:true},
        price:{type: Number, required:true},
        tags:{type: [String]},  // [String] = string array in mongoose
        favorite:{type: Boolean, default:false},
        stars:{type: Number, required:true},
        imageUrl:{type: String, required:true},
        origins:{type: [String], required:true},
        cookTime:{type: String, required:true}
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    } //virtuals
 )
 //Models

 export const foodModel = model<Food>('food', FoodSchema);