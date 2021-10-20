import axios from "axios";
import { useEffect, useState } from "react";
import Company from "../../../model/company";
import { loginUserString } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import FunctionSingleCoupon from "../GetAllCompanyCoupons/FunctionSingleCoupon/FunctionSingleCoupon";
import "./CompanyMainPage.css";

function CompanyMainPage(): JSX.Element {

    const [company, setCompany] = useState(new Company());
    const [couponDetails,setData] = useState([]);
    
    useEffect(()=>{
        let token: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.company + "company/getCompanyDetails", company ,{headers: {"authorization" : token}})
        .then(response=>{
            store.dispatch(loginUserString(response.headers.authorization));
            console.log(response);
            setCompany(response.data);
        })
        let nextToken: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.company+"company/getCoupons",couponDetails,{
            headers : {
                "Authorization" : nextToken
            }
        })
        .then((response)=>{
            store.dispatch(loginUserString(response.headers.authorization));
            setData(response.data)
        })
    }, [])

    return (
        <div className="CompanyMainPage">
			<h1> Welcome Back  {company.name} !!! </h1>
            <br />
            <h1> Email of the Company : {company.email} </h1>
            <hr color="black" />
            <br />
            <h1> Coupons of the company: </h1>
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

export default CompanyMainPage;
