import { ButtonGroup, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, MenuItem, Select, createStyles, makeStyles, Theme } from "@material-ui/core";
import axios from "axios";
import { send } from "process";

import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import company from "../../../model/company";
import CouponDetails from "../../../model/coupon";
import { loginUserString } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import "./UpdateCoupon.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 250,
    },
  }),
);

function UpdateCoupon(): JSX.Element {

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [coupon, setCoupon] = useState(new CouponDetails());

    const { setValue, register, handleSubmit } = useForm<CouponDetails>();

    let myNumber: string = "";

    function chooseNumber(args: SyntheticEvent) {
        myNumber = (args.target as HTMLInputElement).value.toString();
        console.log(myNumber);
    }

    function searchCoupon(){
        let token: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.company + `coupon/${myNumber}`, coupon, { headers: { "authorization": token} } )
        .then((response) => {
            store.dispatch(loginUserString(response.headers.authorization));
            setCoupon(response.data);
            console.log(response.data);
            notify.success("Coupon was found!!!");
        })
        .catch(error => {
            notify.error(error.response.data.description);
            console.log(error.response);
            console.log(error.message);
        })
    }

    function send(coupon : CouponDetails){
        console.log(coupon)
        let token: string = store.getState().authState.loginUser.token;
        axios.post(globals.urls.company + "coupon/update", coupon, { headers: { "authorization": token}})
        .then(response => {
            store.dispatch(loginUserString(response.headers.authorization));
            notify.success("You updated coupon successfully!!!");
            handleClose();
            console.log(response);
        })
        .catch(error => {
            notify.error(error.response.data.description);
            console.log(error.response);
            console.log(error.message);
        })
    }

    return (
        <div className="UpdateCoupon smallBoxUpdateCoupon">
			<h3>Update Coupon</h3>
            <h3>Coupon Search</h3>
            <input type="text" placeholder="Please enter coupon ID..." onChange={chooseNumber} />
            <input type="button" value="search" onClick={searchCoupon} /> <hr />
            <span>
                ID : {coupon.id} <br />
            </span>
            <span>
                Title: {coupon.title} <br />
            </span>
            <span>
                Category : {coupon.category} <br />
            </span>
            <span>
                Description: {coupon.description} <br />
            </span>
            <span>
                Coupon Start Date : {coupon.startDate} <br />
            </span>
            <span>
                Coupon End Date : {coupon.endDate} <br />
            </span>
            <span>
                Coupon Price : {coupon.price} <br />
            </span>
            <span>
                Coupon Amount : {coupon.amount} <br />
            </span>

               <img src={coupon.image} width="125" height="125" />

            <br />
            <ButtonGroup variant="contained">
                <Button type="submit" color="secondary" onClick={handleClickOpen}>Change Details?</Button>
                <Dialog open={open} onClose={handleClose}>
                    {setValue('id', coupon.id)}
                    {setValue('companyID', coupon.companyID)}
                    <DialogTitle>Updating Coupon ID : {coupon.id}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To change the Title of the coupon insert the new title below:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            {...register("title", {
                                required: {value:true, message : "this field is required"},
                            maxLength: {value: 30 , message : "max length is 30"}
                            })}
                            margin="dense"
                            id="title"
                            label="Title"
                            type="title"
                            fullWidth
                            variant="standard"
                        />
                        <DialogContentText>
                            To change the Category of the coupon choose the new category below:
                        </DialogContentText>
                        <Select style={{width:250}}
                     {...register("category",{
                        required: {value:true, message : "this field is required"}
                    })}>
                        <MenuItem value={"Electricity"}>Electricity</MenuItem>
                        <MenuItem value={"Restaurants"}>Restaurants</MenuItem>
                        <MenuItem value={"Healthcare"}>Healthcare</MenuItem>
                        <MenuItem value={"Sports"}>Sports</MenuItem>
                        <MenuItem value={"Camping"}>Camping</MenuItem>
                        <MenuItem value={"Travelling"}>Travelling</MenuItem>
                    </Select>
                        <DialogContentText>
                            <br />
                            To change the Description of the coupon insert the new Description below:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            {...register("description", {
                                required: {value:true, message : "this field is required"},
                            maxLength: {value: 30 , message : "max length is 200"}
                            })}
                            margin="dense"
                            id="description"
                            label="Description"
                            type="description"
                            fullWidth
                            variant="standard"
                        />
                        <DialogContentText>
                            <br />
                            To change the Price of the coupon insert the new Price below:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            {...register("price",{
                                required: {value:true, message : "this field is required"},
                                min : {value : 1 , message :"minimum price is 1 NIS"},
                                max : {value : 100, message: "maximum price is 100 NIS"}
                           })}
                            margin="dense"
                            id="price"
                            label="Price"
                            type="price"
                            fullWidth
                            variant="standard"
                        />
                        <DialogContentText>
                                <br />
                            To change the Amount of the coupon insert the new Amount below:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            {...register("amount",{
                                required: {value:true, message : "this field is required"},
                                min : {value : 1 , message :"minimum QTY is 1 piece"},
                                max : {value : 10, message: "maximum QTY is 10 PCS"}
                           })}
                            margin="dense"
                            id="amount"
                            label="Amount"
                            type="amount"
                            fullWidth
                            variant="standard"
                        />
                         <DialogContentText>
                                <br />
                            To change the Start Date of the coupon insert the new Date below:
                        </DialogContentText>
                        <TextField 
                        {...register("startDate")}
                        id="datetime-local"
                        label="Coupon Start Date"
                        type="datetime-local"
                        defaultValue={new Date}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                        <DialogContentText>
                                <br />
                            To change the End Date of the coupon insert the new Date below:
                        </DialogContentText>
                        <TextField 
                        {...register("endDate")}
                        id="datetime-local"
                        label="Coupon Expiration"
                        type="datetime-local"
                        defaultValue={new Date}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
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

export default UpdateCoupon;
