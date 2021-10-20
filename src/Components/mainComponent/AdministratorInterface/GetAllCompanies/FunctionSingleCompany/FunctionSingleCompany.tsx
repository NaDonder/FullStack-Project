import CouponDetails from "../../../../model/coupon";
import FunctionSingleCoupon from "../../../CompanyInterface/GetAllCompanyCoupons/FunctionSingleCoupon/FunctionSingleCoupon";
import "./FunctionSingleCompany.css";

interface FunctionSingleCompanyProps {
	id:number,
    name:string,
    email:string,
    password:string,
    coupons:CouponDetails[];
}

function FunctionSingleCompany(props: FunctionSingleCompanyProps): JSX.Element {
    return (
        <div className="FunctionSingleCompany smallBoxSingle">
			<h3>{props.name} company info</h3><hr />
            <span>ID : </span>{props.id} <br />
            <span>Email : </span>{props.email} <br />
            <span>Password : </span>{props.password} <br />
            
            {/* {props.coupons.map(item => <FunctionSingleCoupon
                id={item.id}
                category={item.category}
                title={item.title}
                description={item.description}
                startDate={item.startDate}
                endDate={item.endDate}
                amount={item.amount}
                price={item.price}
                image={item.image}
            />)} */}
           
            <hr /> 
        </div>
    );
}

export default FunctionSingleCompany;
