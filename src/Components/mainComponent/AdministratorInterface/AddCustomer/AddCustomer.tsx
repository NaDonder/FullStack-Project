import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { AccountBox, Email } from "@material-ui/icons";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import axios from "axios";
import { useForm } from "react-hook-form";
import Customer from "../../../model/customer";
import { loginUserString } from "../../../redux/authState";
import store from "../../../redux/store";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {

  const { register, handleSubmit, formState: { errors } } = useForm<Customer>();

  function send(customer: Customer) {
    console.log("Data arrived:")
    console.log(customer);
    let token: string = store.getState().authState.loginUser.token;
    axios.post<string>(globals.urls.administrator + "customer/add", customer, { headers: { "authorization": token } })
      .then(response => {
        console.log("IT WORKS")
        notify.success("Customer Created succssesfully")
        console.log(response)
        console.log("new token:")
        console.log(response.headers.authorization)
        store.dispatch(loginUserString(response.headers.authorization));
      })
      .catch(error => {
        notify.error(error.response.data.description);
        console.log(error.response);
        console.log(error.message);
      });


  }
  return (
    <div className="AddCustomer smallBoxAdd">
      <form onSubmit={handleSubmit(send)}>

        <Typography variant="h4" className="HeadLine">Adding Customer</Typography>

        <AccountBox style={{ fontSize: 40, margin: 10 }} />
        <TextField label="First name" variant="outlined"
          {...register("firstName", {
            required: { value: true, message: "this field is required" },
            maxLength: { value: 20, message: "max length is 20" }
          })} />
        <span> {errors.firstName && <p>{errors.firstName.message}</p>}</span>

        <AccountBox style={{ fontSize: 40, margin: 10 }} />
        <TextField label="Last name" variant="outlined"
          {...register("lastName", {
            required: { value: true, message: "this field is required" },
            maxLength: { value: 20, message: "max length is 20" }
          })} />
        <span> {errors.lastName && <p>{errors.lastName.message}</p>}</span>

        <Email style={{ fontSize: 40, margin: 10 }} />
        <TextField type="email" label="Customer email" variant="outlined"
          {...register("email", {
            required: { value: true, message: "this field is required" },
            maxLength: { value: 20, message: "max length is 20" }
          })} />
        <span> {errors.email && <p>{errors.email.message}</p>}</span>

        <LockOpenIcon style={{ fontSize: 40, margin: 10 }} />
        <TextField label="Customer Password" variant="outlined" type="password"
          {...register("password", {
            required: { value: true, message: "this field is required" },
            maxLength: { value: 20, message: "max length is 20" }
          })} />
          <span> {errors.password && <p>{errors.password.message}</p>}</span>

        <br /><br />
        <ButtonGroup variant="contained">
          <Button type="submit" color="primary">Create Customer</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}


export default AddCustomer;
