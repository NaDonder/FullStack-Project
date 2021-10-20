import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import Company from "../../../model/company";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import "./UpdateCompany.css";
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import BusinessIcon from '@material-ui/icons/Business';
import { Email, VpnKey } from "@material-ui/icons";
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import { loginUserString } from "../../../redux/authState";


function UpdateCompany(): JSX.Element {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [company, setCompany] = useState(new Company());
    const { setValue, register, handleSubmit } = useForm<Company>();
    let myNumber: string = "";

    function send(company: Company){
        handleClose();
        console.log("Company after update:");
        console.log(company);
        console.log("JWT:");
        console.log(store.getState().authState.loginUser.token);
        let token: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.administrator + "company/update", company, {
            headers: {
                "authorization": token
            }
        })
        .then(response => {
            store.dispatch(loginUserString(response.headers.authorization));
            console.log("COMPANY UPDATED!");
            notify.success("Company updated succssesfully");
            console.log(response);

        })
        .catch(error => {
        notify.error(error.response.data.description);
        console.log(error.response);
        console.log(error.message);
        })
    }

    function chooseNumber(args: SyntheticEvent) {
        myNumber = (args.target as HTMLInputElement).value.toString();
        console.log(myNumber);
    }

    function searchCompany() {
        let token: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.administrator + `company/${myNumber}`, company, { headers: { "authorization": token } }
        ).then((response) => {
            store.dispatch(loginUserString(response.headers.authorization));
            setCompany(response.data)
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
        <div className="UpdateCompany smallBoxUpdate">
            <h3>Update Company</h3>
            <h3>Company Search</h3>
            <input type="text" placeholder="Please enter a company ID..." onChange={chooseNumber} />
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
            <br />
            <ButtonGroup variant="contained">
                <Button type="submit" color="secondary" onClick={handleClickOpen}>Change Email and password?</Button>
                <Dialog open={open} onClose={handleClose}>
                    {setValue('id', company.id)}
                    {setValue('name', company.name)}
                    {setValue('coupons', company.coupons)}
                    <DialogTitle>Updating Company ID : {company.id}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To change the email of the company insert the new email below:
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
                            To change the password of the company insert the new password below:
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

export default UpdateCompany;


