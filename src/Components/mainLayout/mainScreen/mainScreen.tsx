import axios from "axios";
import BusinessIcon from '@material-ui/icons/Business';
import { useEffect, useState } from "react";
import globals from "../../utils/Globals";
import "./mainScreen.css";
import FunctionSingleCoupon from "../../mainComponent/CompanyInterface/GetAllCompanyCoupons/FunctionSingleCoupon/FunctionSingleCoupon";

function MainScreen(): JSX.Element {

    const [couponDetails, setData] = useState([]); // GET ALL COUPONS

    useEffect(() => {
        axios.post(globals.urls.guest + "/getAllCoupons", couponDetails)
            .then((response) => {
            setData(response.data)
            })}, [])

    return (
        <div className="mainScreen">
            <div>
            <h2 >All Avilable coupons on our site<BusinessIcon /> </h2><hr color="black" />
            {couponDetails.map(item=><FunctionSingleCoupon
            id={item.id}
            title={item.title}
            description={item.description}
            category={item.category}
            price={item.price}
            amount={item.amount}
            startDate={item.startDate}
            endDate={item.endDate}
            image={item.image}
            />)}
            </div>
        </div>
    );
}

export default MainScreen;
