import { MenuItem, Select, FormControl, InputLabel, Button, ButtonGroup } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CouponDetails from "../../../model/coupon";
import Customer from "../../../model/customer";
import { loginUserString } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import "./PurchaseCoupon.css";

function PurchaseCoupon(): JSX.Element {

    const { setValue, register, handleSubmit, setError, formState: { errors } } = useForm<Customer>();

    const [couponDetails, setData] = useState([]); // GET ALL COUPONS

    const [coupon, setCoupon] = useState(new CouponDetails()); // GET SINGLE COUPON

    const [choosenCoupon, setChoosenCoupon] = useState(""); // GET COUPON ID

    function searchCoupon() {
        let token: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.customer + `coupon/${choosenCoupon}`, coupon, { headers: { "authorization": token } })
            .then(response => {
                store.dispatch(loginUserString(response.headers.authorization));
                setCoupon(response.data);
                console.log(response.data);
                notify.success("Coupon was found!!!");
            })
            .catch(error => {
                notify.error(error.response.data.description);
                console.log(error.response);
                console.log(error.message);
            })
    }

    function purchaseCoupon(){
        let token: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.customer + "customer/addCoupon", coupon, { headers: { "authorization": token}})
        .then(response =>{
            console.log(response)
            notify.success("You Bought coupon successfull!!!")
        })
        .catch(error => {
            notify.error(error.response.data.description);
            console.log(error.response);
            console.log(error.message);
        })
    }

    useEffect(() => {
        axios.post(globals.urls.guest + "/getAllCoupons", couponDetails)
            .then((response) => {
                setData(response.data)
            })
    }, [])
    return (
        <div className="PurchaseCoupon smallBoxPurchase">
            <br />
            Please select the coupon you'd want to purchase
            <hr />
            <br />
            <br />
            <FormControl>
                <InputLabel>Coupon Types</InputLabel>
                <Select style={{ width: 200 }}  >
                    {couponDetails.map(item =>
                        <MenuItem value={item.id} key={item.id} onClick={(e) => setChoosenCoupon(item.id)}  >{item.title}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <br />
            <span>You Selected </span>
            <span> Coupon ID:  {choosenCoupon} </span>
            <br />
            <br />
            <input type="button" value="search" onClick={searchCoupon} /> <hr />


            <span>
                Title: {coupon.title} <br />
            </span>
            <span>
                Description: {coupon.description} <br />
            </span>
            <span>
                Coupon Start Date : {coupon.startDate} <br />
            </span>
            <span>
                Coupon End Date : {coupon.endDate} <br />
            </span>
            <span>
                Coupon Price : {coupon.price} <br />
            </span>
            <span>
                Coupon Amount : {coupon.amount} <br />
            </span>
            <img src={coupon.image} height="125" width="125" />

            <br />
            <ButtonGroup variant="contained" >
                    <Button type="submit" color="secondary" onClick={purchaseCoupon}>Buy Coupon</Button>
            </ButtonGroup>
        </div>
    );
}

export default PurchaseCoupon;

