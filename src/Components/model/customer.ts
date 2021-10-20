import CouponDetails from "./coupon";

export default class Customer{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    coupons:CouponDetails[]
}