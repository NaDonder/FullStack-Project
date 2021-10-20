import axios from "axios";
import { useEffect, useState } from "react";
import Customer from "../../../model/customer";
import { loginUserString } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import FunctionSingleCoupon from "../../CompanyInterface/GetAllCompanyCoupons/FunctionSingleCoupon/FunctionSingleCoupon";
import "./CustomerMainPage.css";

function CustomerMainPage(): JSX.Element {

    const [customer, setCustomer] = useState(new Customer());
    const [couponDetails,setData] = useState([]);

    useEffect(()=>{
        let token: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.customer + "customer/getDetails", customer ,{headers: {"authorization" : token}})
        .then(response=>{
            store.dispatch(loginUserString(response.headers.authorization));
            console.log(response);
            setCustomer(response.data);
        })
        let nextToken: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.customer+"coupons/getCoupons",couponDetails,{headers : {"Authorization" : nextToken}})
        .then((response)=>{
            store.dispatch(loginUserString(response.headers.authorization));
            setData(response.data)
        })
    }, [])

    return (
        <div className="CustomerMainPage">
			<h1>Welcome Back {customer.firstName} {customer.lastName} !!!</h1>
            <br />
            <h1>Email of the Customer : {customer.email}</h1>
            <hr color="black" />
            <br />
            <h1>Coupons of the Customer:</h1>
            <br />
            <br />
            {couponDetails.map(item=><FunctionSingleCoupon
            id={item.id}
            category={item.category}
            title={item.title}
            description={item.description}
            startDate={item.startDate}
            endDate={item.endDate}
            amount={item.amount}
            price={item.price}
            image={item.image}
            />)}
        </div>
    );
}

export default CustomerMainPage;
