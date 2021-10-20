import "./FunctionSingleCoupon.css";
interface FunctionSingleCouponProps {
	id: number,
    category: string,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    amount: number,
    price: number,
    image: string;
}

function FunctionSingleCoupon(props: FunctionSingleCouponProps): JSX.Element {
    return (
        <div className="FunctionSingleCoupon smallBox">
			<h4>{props.title} Coupon info</h4><hr color="black" />
            <span>ID : </span>{props.id} <br />
            <span>Category : </span>{props.category} <br />
            <span>Description: </span>{props.description} <br />
            <span>Start Date : </span>{props.startDate} <br />
            <span>End Date : </span>{props.endDate} <br />
            <span>Amount Left : </span>{props.amount} <br />
            <span>Price : </span>{props.price} <br />
            <img src={props.image} width="125" height="125" />
            <hr color="black" />
        </div>
    );
}

export default FunctionSingleCoupon;
