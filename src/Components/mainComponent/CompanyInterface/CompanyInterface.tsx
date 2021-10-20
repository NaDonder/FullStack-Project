import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { logoutUser } from "../../redux/authState";
import store from "../../redux/store";
import "./CompanyInterface.css";

function CompanyInterface(): JSX.Element {

    const history = useHistory();

    useEffect(()=>{
        if (store.getState().authState.loginUser.clientType !== "COMPANY") {
            console.log("Unauthorized")
            history.push("/")
        } else {
            console.log("ALL GOOD -> KEEP GOING")
        }
    })

    return (
        <div className="CompanyInterface">
			<h1 id="interfaceHeader"> Company interface : </h1>
            <br />
            <NavLink id="nl2" exact to="/company">Company's Main Page</NavLink>
            <br />
            <hr color="black" />
            <h1 id="interfaceHeader1"> Company functions : </h1>
            <br />
            <NavLink id="nl2" exact to="/company/addCoupon">Add Coupon</NavLink>
            <br />
            <NavLink id="nl2" exact to="/company/updateCoupon">Update Coupon</NavLink>
            <br />
            <NavLink id="nl2" exact to="/company/deleteCoupon">Delete Coupon</NavLink>
            <br />
            <NavLink id="nl2" exact to="/company/getAllCoupons">My Coupons</NavLink>
            <br />
            <hr color="black" />
            <br />
            <NavLink id="nl2" onClick={logoutUser} exact to="/">Log Out</NavLink>
            <br />
        </div>
    );
}

export default CompanyInterface;
