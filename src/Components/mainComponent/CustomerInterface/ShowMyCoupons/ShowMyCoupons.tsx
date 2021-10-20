import axios from "axios";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import { useState, SyntheticEvent } from "react";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import FunctionSingleCoupon from "../../CompanyInterface/GetAllCompanyCoupons/FunctionSingleCoupon/FunctionSingleCoupon";
import "./ShowMyCoupons.css";
import { loginUserString } from "../../../redux/authState";
import { Select, MenuItem, Button } from "@material-ui/core";

function ShowMyCoupons(): JSX.Element {

    const [couponDetails, setData] = useState([]);
    let maxPrice: string = "";
    const [selectedCategory, setSelectedCategory] = useState("");

    /*
    useEffect(()=>{
        let token:string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.customer+"coupons/getCoupons",couponDetails,{headers : {"Authorization" : token}})
        .then((response)=>{
            store.dispatch(loginUserString(response.headers.authorization));
            setData(response.data)
        })
    })
    */

    function showAllCoupons() {
        console.log("all coupons")
        let token: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.customer + "coupons/getCoupons", couponDetails, { headers: { "Authorization": token } })
            .then((response) => {
                store.dispatch(loginUserString(response.headers.authorization));
                setData(response.data)
            })
    }

    function showByCategory() {
        console.log("Selected Category:")
        console.log(selectedCategory)
        //let selectedCategory;
        //const category = "Electricity" // for testing
        let token: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.customer + `coupons/getCouponsByCategory/${selectedCategory}`, couponDetails, { headers: { "Authorization": token } })
            .then((response) => {
                store.dispatch(loginUserString(response.headers.authorization));
                setData(response.data);
            })
    }

    function showByMaxPrice() {
        //const maxPrice: number = 50; // for testing
        console.log("coupon max Price")
        let token: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.customer + `coupons/getCouponsByMaxPrice/${maxPrice}`, couponDetails, { headers: { "Authorization": token } })
            .then((response) => {
                store.dispatch(loginUserString(response.headers.authorization));
                setData(response.data);
            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.message);
            })
    }

    function chooseMaxPrice(args: SyntheticEvent) {
        maxPrice = (args.target as HTMLInputElement).value.toString();
        console.log(maxPrice);
    }
    
    const handleChange = (event: { target: { value: any; }; }) => {
        console.log(event.target.value);
        setSelectedCategory(event.target.value);
    };

    return (
        <div className="ShowMyCoupons">
            <div className="smallBoxShow">
            <h3>My Coupons<CardGiftcardIcon /> </h3>

            <Button  color="secondary" onClick={showAllCoupons}>Show All Coupons</Button>
            <br />
            <br />
            <span>Find By Category : </span>
            <br />
            <Select variant="outlined" style={{ width: 250 }} onChange={handleChange}  >
                <MenuItem value="Electricity">Electricity</MenuItem>
                <MenuItem value="Restaurants">Restaurants</MenuItem>
                <MenuItem value="Healthcare">Healthcare</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Camping">Camping</MenuItem>
                <MenuItem value="Travelling">Travelling</MenuItem>
            </Select>
            <input type="button" value="Search" onClick={showByCategory} />


            <br />
            <span>Find By Max Price : </span>
            <br />
            <input type="text" placeholder="Max Price" onChange={chooseMaxPrice} />
            <input type="button" value="Search" onClick={showByMaxPrice} />

            <hr />
            <br />
            </div>
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
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}

export default ShowMyCoupons;
