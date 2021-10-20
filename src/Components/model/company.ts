import CouponDetails from "./coupon";

export default class Company{
    id:number;
    email:string;
    name:string;
    password:string;
    coupons:CouponDetails[];
}