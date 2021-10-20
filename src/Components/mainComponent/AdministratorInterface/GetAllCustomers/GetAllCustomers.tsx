import axios from "axios";
import GroupIcon from '@material-ui/icons/Group';
import { useEffect, useState } from "react";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import FunctionSingleCustomer from "./FunctionSingleCustomer/FunctionSingleCustomer";
import "./GetAllCustomers.css";
import { loginUserString } from "../../../redux/authState";

function GetAllCustomers(): JSX.Element {

    const [customer,setData] = useState([]);

    useEffect(()=>{
        let token:string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.administrator+"customer/all",customer,{headers : {"Authorization" : token}})
        .then((response)=>{
            store.dispatch(loginUserString(response.headers.authorization));
            setData(response.data)
        })
    })

    return (
        <div className="GetAllCustomers">
            
			<h3> All registered Customers<GroupIcon /> </h3><hr />
            {customer.map(item=><FunctionSingleCustomer
            id={item.id}
            firstName={item.firstName}
            lastName={item.lastName}
            email={item.email}
            password={item.password}
            />)}
        </div>
    );
}

export default GetAllCustomers;
