import axios from "axios";
import BusinessIcon from '@material-ui/icons/Business';
import { useEffect, useState } from "react";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import FunctionSingleCompany from "./FunctionSingleCompany/FunctionSingleCompany";
import "./GetAllCompanies.css";
import { loginUserString } from "../../../redux/authState";

function GetAllCompanies(): JSX.Element {

    const [company,setData] = useState([]);

    useEffect(()=>{
        let token:string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.administrator+"company/all",company,{headers : {"Authorization" : token}})
        .then((response)=>{
            store.dispatch(loginUserString(response.headers.authorization));
            setData(response.data)
        })
    }, [])

    return (
        <div className="GetAllCompanies">
			<h3>All registered Companies<BusinessIcon /> </h3><hr />
            {company.map(item=><FunctionSingleCompany
            id={item.id}
            name={item.name}
            email={item.email}
            password={item.password}
            coupons={item.coupons}
            />)}
            <hr />
        </div>
    );
}

export default GetAllCompanies;
