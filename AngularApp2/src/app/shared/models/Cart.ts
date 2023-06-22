import { CartItem } from "./CartItem";

export class Cart{
    items:CartItem[] = []; //when created it will be an empty array instead of undefined
    totalPrice:number = 0;
    totalCount:number = 0;
}