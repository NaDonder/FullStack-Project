import axios from "axios";
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import BusinessIcon from '@material-ui/icons/Business';
import { SyntheticEvent, useState } from "react";
import Company from "../../../model/company";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import "./GetOneCompany.css";
import { Email, VpnKey } from "@material-ui/icons";
import { loginUserString } from "../../../redux/authState";
import FunctionSingleCoupon from "../../CompanyInterface/GetAllCompanyCoupons/FunctionSingleCoupon/FunctionSingleCoupon";

function GetOneCompany(): JSX.Element {

    let myNumber: string = "";
    var [company, setCompany] = useState(new Company());
    const [couponDetails, setData] = useState([]);

    function chooseNumber(args: SyntheticEvent) {
        myNumber = (args.target as HTMLInputElement).value.toString();
        console.log(myNumber);
    }

    function searchCompany() {
        let token: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.administrator + `company/${myNumber}`, company, { headers: { "authorization": token } })
            .then((response) => {
                store.dispatch(loginUserString(response.headers.authorization));
                if (response.data < 1) {
                    notify.error("company was not found !!!");
                    setCompany(new Company());
                    return;
                }
                setCompany(response.data)
                setData(response.data.coupons)
                console.log(response.data)
                notify.success("Company was found!!!")
            })
            .catch(error => {
                notify.error(error.response.data.description);
                console.log(error.response);
                console.log(error.message);
            })
    }
    return (
        <div>
            <div className="GetOneCompany smallBoxCompany">
                <h3>Company Search</h3>
                <input type="text" placeholder="Please enter a company number..." onChange={chooseNumber} />
                <input type="button" value="Search" onClick={searchCompany} /> <hr />
                <span>
                    <FingerprintIcon style={{ fontSize: 20, margin: 0 }} />
                    ID : {company.id} <br />
                </span>
                <span>
                    <BusinessIcon style={{ fontSize: 20, margin: 0 }} />
                    Company Name : {company.name} <br />
                </span>
                <span>
                    <Email style={{ fontSize: 20, margin: 0 }} />
                    Email : {company.email} <br />
                </span>
                <span>
                    <VpnKey style={{ fontSize: 20, margin: 0 }} />
                    Password : {company.password}
                </span>
                <hr />
                <span>Company Coupons:</span>
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
        </div>
    );
}

export default GetOneCompany;
