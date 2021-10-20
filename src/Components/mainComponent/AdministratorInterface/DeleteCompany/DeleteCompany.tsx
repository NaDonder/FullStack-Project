import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from "axios";
import { useState } from "react";

import { useForm } from "react-hook-form";
import Company from "../../../model/company";
import { loginUserString } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { register, handleSubmit, formState: { errors } } = useForm<Company>();

    function send(company: Company) {

        let token: string = store.getState().authState.loginUser.token;

        axios.delete(globals.urls.administrator + `deleteCompany/${company.id}`, {
            headers: {
                "authorization": token
            }
        })
            .then(response => {

                store.dispatch(loginUserString(response.headers.authorization));

                handleClose();

                console.log("IT WORKS")

                notify.success("Company deleted succssesfully")

                console.log(response)
            })

            .catch(error => {
                notify.error(error.response.data.description);
                console.log(error.response);
                console.log(error.message);
            });
    }

    const styles = () => ({
        multilineColor:{
            color:'red'
        }
    })

    return (
        <div className="DeleteCompany smallBoxRemove">
            <Typography variant="h4" className="HeadLine">Deleting Company</Typography><br />

            <h3>
                DELETING A COMPANY IS UNRETURNABLE
            </h3>

            
            Insert ID Number :
            <br />
            <DeleteForeverIcon style={{ fontSize: 40, margin: 10 }} />
            <TextField label="Company number" variant="outlined" 
                {...register("id", {
                    required: { value: true, message: "this field is required" }
                })} />
            <br />
            <span> {errors.id && <p>{errors.id.message}</p>}</span>

            <br /><br />
            <ButtonGroup variant="contained" >
                <Button type="submit" color="secondary" onClick={handleClickOpen} >Delete Company</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete this Company?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deleting a company is not returnable, after you will delete the
                            company it will be lost forever.
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

export default DeleteCompany;
