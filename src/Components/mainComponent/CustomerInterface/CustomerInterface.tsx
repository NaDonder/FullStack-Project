import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { logoutUser } from "../../redux/authState";
import store from "../../redux/store";
import "./CustomerInterface.css";

function CustomerInterface(): JSX.Element {

    const history = useHistory();

    useEffect(()=>{
        if (store.getState().authState.loginUser.clientType !== "CUSTOMER") {
            console.log("Unauthorized")
            history.push("/")
        } else {
            console.log("ALL GOOD -> KEEP GOING")
        }
    })

    return (
        <div className="CustomerInterface">
			<h2 id="interfaceHeader"> Customer interface </h2>
            <br />
            <br />
            <NavLink id="nl" exact to="/customer">Customer's Main Page</NavLink>
            <br />
            <br />
            <hr color="black" />
            <br />
            <br />
            <NavLink id="nl" exact to="/customer/purchaseCoupon">Purchase Coupon</NavLink>
            <br />
            <br />
            <br />
            <NavLink id="nl" exact to="/customer/showMyCoupons">My Coupons</NavLink>
            <br />
            <br />
            <hr color="black" />
            <br />
            <br />
            <NavLink id="nl" onClick={logoutUser} exact to="/">Log Out</NavLink>
            <br />
        </div>
    );
}

export default CustomerInterface;
