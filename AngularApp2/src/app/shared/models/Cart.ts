import { CartItem } from "./CartItem";

export class Cart{
    items:CartItem[] = []; //when created it will be an empty array instead of undefined
    totalPrice = 0;
    totalCount = 0;
}