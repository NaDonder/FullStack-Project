import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Customer from "../../../model/customer";
import { loginUserString } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import "./DeleteCustomer.css";

function DeleteCustomer(): JSX.Element {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { register, handleSubmit, formState: { errors } } = useForm<Customer>();

    function send(company: Customer) { 

        let token:string = store.getState().authState.loginUser.token;
        
        axios.delete(globals.urls.administrator+`deleteCustomer/${company.id}`,{headers: {"authorization" : token}})
         .then(response => {
            store.dispatch(loginUserString(response.headers.authorization));
                console.log("IT WORKS")
                notify.success("Customer deleted succssesfully")
                console.log(response)
              })
              .catch(error => {
                notify.error(error.response.data.description);
                console.log(error.response);
                console.log(error.message);
              });
    }

    return (
        <div className="DeleteCustomer smallBoxRemove">
                <Typography variant="h4" className="HeadLine">Deleting Customer</Typography><br />

                <h3>
                    DELETING A CUSTOMER IS UNRETURNABLE
                </h3>

                <DeleteForeverIcon style={{ fontSize: 40, margin: 10 }} />
                <TextField label="Customer number" variant="outlined"
                    {...register("id", {
                        required: { value: true, message: "this field is required" }
                    })} />
                <br />
                <span> {errors.id && <p>{errors.id.message}</p>}</span>

                <br /><br />
                <ButtonGroup variant="contained" >
                <Button type="submit" color="secondary" onClick={handleClickOpen} >Delete Customer</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete this Customer?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deleting a customer is not returnable, after you will delete the
                            customer it will be lost forever.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>NO, STOP!</Button>
                        <Button onClick={handleSubmit(send)} autoFocus>
                            CONTINUE
                        </Button>
                    </DialogActions>
                </Dialog>
            </ButtonGroup>
        </div>
    );
}

export default DeleteCustomer;
