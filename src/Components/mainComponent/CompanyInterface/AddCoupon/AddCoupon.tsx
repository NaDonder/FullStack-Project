import { Button, ButtonGroup, createStyles, makeStyles, MenuItem, Select, TextField, Theme, Typography } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CouponDetails from "../../../model/coupon";
import { loginUserString } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import "./AddCoupon.css";

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

function AddCoupon(): JSX.Element {
    const classes = useStyles();
    const { setValue, register, handleSubmit, formState: { errors} } = useForm<CouponDetails>();

    function send(couponDetails:CouponDetails){
        console.log("Coupon details:")
        console.log(couponDetails)
        let token: string = store.getState().authState.loginUser.token;
        console.log(token);
        axios.post<string>(globals.urls.company + "coupon/add", couponDetails, {headers: {"authorization": token}})
          .then((response)=>{
            store.dispatch(loginUserString(response.headers.authorization));
            console.log("Coupon Sent")
            console.log(response)
            notify.success("Coupon was added!!!")
          })
          .catch(error => {
            notify.error(error.response.data.description);
            console.log(error.response);
            console.log(error.message);
          })
    }

      const [selectedFile, setSelectedFile] = useState(null);

      // const fileSelectedHandler = (e: any) => {
      //   console.log(e.target.files[0]);
      //   setSelectedFile(e.target.files[0]);
      // }

      // const fileUploadHanlder = () => {
      //   setValue("image",selectedFile.name);
      // }

    return (
        <div className="AddCoupon smallBoxAddCoupon">
			<form onSubmit={handleSubmit(send)}>
            <Typography variant="h4" className="HeadLine">Add Coupon</Typography><br/>
            <TextField label="Coupon title" variant="outlined"
                         {...register("title", {
                            required: {value:true, message : "this field is required"},
                            maxLength: {value: 30 , message : "max length is 30"}
                         })}/>
                    <br/>
                    <span> {errors.title && <p>{errors.title.message}</p>}</span>
                    <br/>
                    <TextField label="Coupon Description" variant="outlined" 
                        {...register("description",{
                        maxLength : {value : 250, message : "max length is 250"}
                    })}/>
                    <br/>
                    <span> {errors.description && <p>{errors.description.message}</p>}</span>
                    <br/>
                    <TextField type="number" label="Coupon price" variant="outlined" 
                        {...register("price",{
                         required: {value:true, message : "this field is required"},
                         min : {value : 1 , message :"minimum price is 1 NIS"},
                         max : {value : 100, message: "maximum price is 100 NIS"}
                    })}/>
                    <br/>
                    <span> {errors.price && <p>{errors.price.message}</p>}</span>
                    <br/>
                    <TextField type="number" label="Coupon QTY" variant="outlined" 
                    {...register("amount",{
                         required: {value:true, message : "this field is required"},
                         min : {value : 1 , message :"minimum QTY is 1 piece"},
                         max : {value : 10, message: "maximum QTY is 10 PCS"}
                    })}/>
                    <br/>
                    <span> {errors.amount && <p>{errors.amount.message}</p>}</span>
                    <br/>
                    Coupon type<br/>
                    <Select variant="outlined" style={{width:250}}
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
                    <br/>
                    <span> {errors.category && <p>{errors.category.message}</p>}</span>
                    <br/>
                    <TextField 
                        {...register("startDate", {
                          required: {value:true, message : "this field is required"}
                        })}
                        id="datetime-local"
                        label="Coupon Start Date"
                        type="datetime-local"
                        defaultValue={new Date}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <br/>
                    <span> {errors.startDate && <p>{errors.startDate.message}</p>}</span>
                    <br/>
                    <TextField 
                        {...register("endDate", {
                          required: {value:true, message : "this field is required"}
                        })}
                        id="datetime-local"
                        label="Coupon Expiration"
                        type="datetime-local"
                        defaultValue={new Date}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <br />
                    <span> {errors.endDate && <p>{errors.endDate.message}</p>}</span>
                    <br />
                    <TextField label="Image" variant="outlined"
                    {...register("image")}
                    />
                    {/*
                    <br /><br />
                    <input type="file" onChange={fileSelectedHandler}  />
                    <br/><br/>
                    */}
                    <ButtonGroup variant="contained">
                        <Button type="submit" color="primary"  >Add Coupon</Button> {/* onClick={fileUploadHanlder} */}
                    </ButtonGroup>
                      
            </form>
        </div>
    );
}

export default AddCoupon;
