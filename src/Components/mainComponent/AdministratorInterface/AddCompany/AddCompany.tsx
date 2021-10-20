import "./AddCompany.css";
import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { AccountBox, Email } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import Company from "../../../model/company";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import axios from "axios";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import store from "../../../redux/store";
import { loginUserString } from "../../../redux/authState";

function AddCompany(): JSX.Element {

  const { register, handleSubmit, formState: { errors } } = useForm<Company>();

  function send(company: Company) {

    console.log(company);

    console.log(store.getState().authState.loginUser.token); //jwt

    let token: string = store.getState().authState.loginUser.token;

    console.log(token);

    axios.post<string>(globals.urls.administrator + "company/add", company, {headers: {"authorization": token}})
      .then(response => {
        store.dispatch(loginUserString(response.headers.authorization));
        console.log("IT WORKS");
        notify.success("Company Created succssesfully");
        console.log(response);
      })
      .catch(error => {
        notify.error(error.response.data.description);
        console.log(error.response);
        console.log(error.message);
      });

  }
  return (
    <div className="AddCompany smallBoxAddCompany">
      <form onSubmit={handleSubmit(send)}>
        <Typography variant="h4" className="HeadLine">Adding Company</Typography>
        <AccountBox style={{ fontSize: 40, margin: 10 }} />
        <TextField label="Company name" variant="outlined"
          {...register("name", {
            required: { value: true, message: "this field is required" },
            maxLength: { value: 20, message: "max length is 20" }
          })} />
        <span> {errors.name && <p>{errors.name.message}</p>}</span>

        <Email style={{ fontSize: 40, margin: 10 }} />
        <TextField type="email" label="Company email" variant="outlined"
          {...register("email", {
            required: { value: true, message: "this field is required" },
            maxLength: { value: 20, message: "max length is 20" }
          })} />
        <span> {errors.email && <p>{errors.email.message}</p>}</span>

        <LockOpenIcon style={{ fontSize: 40, margin: 10 }} />
        <TextField label="Company Password" variant="outlined" type="password"
          {...register("password", {
            required: { value: true, message: "this field is required" },
            maxLength: { value: 20, message: "max length is 20" }
          })} />
          <span> {errors.password && <p>{errors.password.message}</p>}</span>

        <br /><br />
        <ButtonGroup variant="contained">
          <Button type="submit" color="primary">Create Company</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}


export default AddCompany;
