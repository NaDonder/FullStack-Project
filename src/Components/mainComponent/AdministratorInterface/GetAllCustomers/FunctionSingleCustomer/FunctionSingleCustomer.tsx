import "./FunctionSingleCustomer.css";

interface FunctionSingleCustomerProps {
	id:number;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

function FunctionSingleCustomer(props: FunctionSingleCustomerProps): JSX.Element {
    return (
        <div className="FunctionSingleCustomer smallBoxSingle">
			<h3>{props.firstName} {props.lastName} Customer info</h3><hr />
            <span>ID : </span>{props.id} <br />
            <span>Email : </span>{props.email} <br />
            <span>Password : </span>{props.password}
            <hr />
        </div>
    );
}

export default FunctionSingleCustomer;
