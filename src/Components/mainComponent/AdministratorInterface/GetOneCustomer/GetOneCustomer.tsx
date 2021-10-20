import axios from "axios";
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import BusinessIcon from '@material-ui/icons/Business';
import { SyntheticEvent, useState } from "react";
import Customer from "../../../model/customer";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import "./GetOneCustomer.css";
import { Email, VpnKey } from "@material-ui/icons";
import { loginUserString } from "../../../redux/authState";
import FunctionSingleCoupon from "../../CompanyInterface/GetAllCompanyCoupons/FunctionSingleCoupon/FunctionSingleCoupon";

function GetOneCustomer(): JSX.Element {

    let myNumber: string = "";
    var [customer, setCustomer] = useState(new Customer());
    const [couponDetails, setData] = useState([]);

    function chooseNumber(args: SyntheticEvent) {
        myNumber = (args.target as HTMLInputElement).value.toString();
        console.log(myNumber);
    }

    function searchCustomer() {
        let token: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.administrator + `customer/${myNumber}`, customer, { headers: { "authorization": token } })
            .then((response) => {
                store.dispatch(loginUserString(response.headers.authorization));
                if (response.data < 1) {
                    notify.error("Customer was not found !!!");
                    setCustomer(new Customer());
                    return;
                }
                setCustomer(response.data)
                setData(response.data.coupons)
                console.log(response.data)
                notify.success("Customer was found!!!")
            })
            .catch(error => {
                notify.error(error.response.data.description);
                console.log(error.response);
                console.log(error.message);
            })
    }
    return (
        <div className="GetOneCustomer smallBoxGet">
            <h3>Customer Search</h3>
            <input type="text" placeholder="Please enter a customer number..." onChange={chooseNumber} />
            <input type="button" value="Search" onClick={searchCustomer} /> <hr />
            <span>
                <FingerprintIcon style={{ fontSize: 20, margin: 0 }} />
                ID : {customer.id} <br />
            </span>
            <span>
                <BusinessIcon style={{ fontSize: 20, margin: 0 }} />
                Customer First Name : {customer.firstName} <br />
            </span>
            <span>
                <BusinessIcon style={{ fontSize: 20, margin: 0 }} />
                Customer Last Name : {customer.lastName} <br />
            </span>
            <span>
                <Email style={{ fontSize: 20, margin: 0 }} />
                Email : {customer.email} <br />
            </span>
            <span>
                <VpnKey style={{ fontSize: 20, margin: 0 }} />
                Password : {customer.password}
            </span>
            <hr />
            <span>Customer Coupons:</span>
            <p>
                {couponDetails.map(item => <FunctionSingleCoupon
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
            </p>
        </div>
    );
}

export default GetOneCustomer;
