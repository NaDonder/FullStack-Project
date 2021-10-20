import { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { logoutUser } from "../../redux/authState";
import store from "../../redux/store";
import "./AdministratorInterface.css";

function AdministratorInterface(): JSX.Element {

    const history = useHistory();

    useEffect(() => {
        if (store.getState().authState.loginUser.clientType !== "ADMINISTRATOR") {
            console.log("Unauthorized")
            history.push("/")
        } else {
            console.log("ALL GOOD -> KEEP GOING")
        }
    })


    return (
        <div className="AdministratorInterface">
            <h3 id="interfaceHeader"> Administrator interface </h3>
            <br />
            <NavLink id="nl1" exact to="/administrator">Admin's Main Page</NavLink>
            <br />
            <hr color="black" />
            <span>
                <h3 id="interfaceHeader1">Company functions : </h3>
                <br />
                <NavLink id="nl1" exact to="/administrator/addCompany">Add Company</NavLink>
                <br />
                <NavLink id="nl1" exact to="/administrator/updateCompany">Update Company Information</NavLink>
                <br />
                <NavLink id="nl1" exact to="/administrator/deleteCompany">Delete Company</NavLink>
                <br />
                <NavLink id="nl1" exact to="/administrator/getOneCompany">Get Company Information</NavLink>
                <br />
                <NavLink id="nl1" exact to="/administrator/getAllCompanies">Get All Registered Companies</NavLink>
                <br />
                <hr color="black" />
            </span>
            <span>
                <h3 id="interfaceHeader2">Customer functions : </h3>
                <br />
                <NavLink id="nl1" exact to="/administrator/addCustomer">Add Customer</NavLink>
                <br />
                <NavLink id="nl1" exact to="/administrator/updateCustomer">Update Customer Information</NavLink>
                <br />
                <NavLink id="nl1" exact to="/administrator/deleteCustomer">Delete Customer</NavLink>
                <br />
                <NavLink id="nl1" exact to="/administrator/getOneCustomer">Get Customer Information</NavLink>
                <br />
                <NavLink id="nl1" exact to="/administrator/getAllCustomers">Get All Registered Customers</NavLink>
                <br />
                <hr color="black" />
            </span>
            <br />
            <NavLink id="nl1" onClick={logoutUser} exact to="/">Log Out</NavLink>
            <br />
        </div>
    );
}

export default AdministratorInterface;
