import { Email, VpnKey } from "@material-ui/icons";
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import BusinessIcon from '@material-ui/icons/Business';
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import Customer from "../../../model/customer";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import "./UpdateCustomer.css";
import { ButtonGroup, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@material-ui/core";
import { send } from "process";
import company from "../../../model/company";
import { useForm } from "react-hook-form";
import { loginUserString } from "../../../redux/authState";

function UpdateCustomer(): JSX.Element {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};

    const { setValue, register, handleSubmit, setError, formState: { errors } } = useForm<Customer>();

    let myNumber:string = "";
    var [customer,setData] = useState(new Customer());

    function send(customer: Customer){
        handleClose();
        console.log("Customer after update:");
        console.log(customer);
        console.log("JWT:");
        console.log(store.getState().authState.loginUser.token);
        let token: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.administrator + "customer/update", customer, {
            headers: {
                "authorization": token
            }
        })
        .then(response => {
            store.dispatch(loginUserString(response.headers.authorization));
            console.log("CUSTOMER UPDATED!");
            notify.success("customer updated succssesfully");
            console.log(response);

        })
        .catch(error => {
        notify.error(error.response.data.description);
        console.log(error.response);
        console.log(error.message);
        })
    }

    function chooseNumber(args:SyntheticEvent) {
        myNumber = (args.target as HTMLInputElement).value.toString();
        console.log(myNumber);
    }

    function searchCustomer() {
        let token:string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.administrator+`customer/${myNumber}`,customer,{headers: {"authorization" : token}} 
        ).then((response)=>{
            store.dispatch(loginUserString(response.headers.authorization));
            setData(response.data)
            console.log(response.data)
            notify.success("Customer was found!!!")
        })
        .catch(error => {
            notify.error("Customer ID doesn't exists");
            console.log(error.response);
            console.log(error.message);
        })
    }

    return (
        <div className="UpdateCustomer smallBoxUpdate">
             <h3>Update Customer</h3>
			 <h3>Customer Search</h3>
            <input type="text" placeholder="Please enter a customer ID..." onChange={chooseNumber}/>
            <input type="button" value="Search" onClick={searchCustomer} /> <hr />
            <span>
            <FingerprintIcon style={{ fontSize: 20, margin: 0 }}  />
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
            <VpnKey style={{ fontSize: 20, margin : 0}} />
             Password : {customer.password}
            </span>
            <br />
            <ButtonGroup variant="contained">
                <Button type="submit" color="secondary" onClick={handleClickOpen}>Change Details?</Button>
                <Dialog open={open} onClose={handleClose}>
                    {setValue('id', customer.id)}
                    {setValue('coupons', customer.coupons)}
                    <DialogTitle>Updating Customer ID : {customer.id}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                            To change the First name and Last name of the customer insert the new details below:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            {...register("firstName", {
                                required: {value:true, message : "this field is required"},
                            maxLength: {value: 30 , message : "max length is 30"}
                            })}
                            margin="dense"
                            id="firstName"
                            label="First Name"
                            type="firstName"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            {...register("lastName", {
                                required: {value:true, message : "this field is required"},
                            maxLength: {value: 30 , message : "max length is 30"}
                            })}
                            margin="dense"
                            id="lastName"
                            label="Last Name"
                            type="lastName"
                            fullWidth
                            variant="standard"
                        />
                        <DialogContentText>
                            To change the email of the customer insert the new email below:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            {...register("email", {
                                required: {value:true, message : "this field is required"},
                            maxLength: {value: 30 , message : "max length is 30"}
                            })}
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        <DialogContentText>
                            To change the password of the customer insert the new password below:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            {...register("password", {
                                required: {value:true, message : "this field is required"},
                            maxLength: {value: 30 , message : "max length is 30"}
                            })}
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit(send)}>Update!</Button>
                    </DialogActions>
                </Dialog>
            </ButtonGroup>
        </div>
    );
}

export default UpdateCustomer;
