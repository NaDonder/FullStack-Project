import { Button, ButtonGroup, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import "./LoginFC.css";
import { AccountBox } from "@material-ui/icons";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import UserDetails from "../../model/UserDetails";
import { useForm } from "react-hook-form";
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import axios from "axios";
import { useHistory } from "react-router-dom";
import globals from "../../utils/Globals";
import store from "../../redux/store";
import { loginUserString } from "../../redux/authState";
import notify from "../../utils/Notify";

function LoginFC(): JSX.Element {

    //register -> indicates fileds to be registerd
    //handleSubmit -> to catch submit button and run the useForm
    //setError -> configure (fyn) errors messages
    //formState -> to get the error message formState :)
    const { register, handleSubmit, formState: { errors } } = useForm<UserDetails>();
    //inject another component
    const history = useHistory();

    //once the user press submit button , this method will be run
    function send(userDetails: UserDetails) {
        console.log("data arrived:");
        console.log(userDetails.clientType);
        console.log(userDetails.email);
        console.log(userDetails.password);

        const adminURL = globals.urls.administrator;
        const companyURL = globals.urls.company;
        const customerURL = globals.urls.customer;

        let url: string;
        switch (userDetails.clientType) {
            case "ADMINISTRATOR":
                url = adminURL;
                break;
            case "COMPANY":
                url = companyURL;
                break;
            case "CUSTOMER":
                url = customerURL;
                break;
        }

        //using axios data for getting JWT token from the system....
        axios.post<string>(url + "login", userDetails) //"http://localhost:8080/admin/login"
            //after we will send the REST POST command, we will wait for the response
            .then((response) => {
                console.log(response.data); //jwt
                store.dispatch(loginUserString(response.data));

                let loggedInClient = userDetails.clientType;
                console.log("Logged In Client Type");
                console.log(loggedInClient);
                console.log("Logged In Client Type V2");
                console.log(store.getState().authState.loginUser.clientType); //WHY??

                var loginFunction = () => {
                    if (loggedInClient == "ADMINISTRATOR") {
                        notify.success("Welcome back Admin!")
                        history.push("/administrator");
                    } else if (loggedInClient == "COMPANY") {
                        notify.success("Welcome back" + userDetails.email);
                        history.push("/company")
                    } else if (loggedInClient == "CUSTOMER") {
                        notify.success("Welcome back" + userDetails.email);
                        history.push("/customer")
                    } else {
                        history.push("/")
                    }
                }
                loginFunction();
            })
            .catch(error => {
                notify.error(error.response.data);
                console.log("error in login");
                console.log(error.response);
                console.log(error.message);
            });
    }

    return (
        <div className="LoginFC">
            <div className="smallBoxLogin">
                <form onSubmit={handleSubmit(send)}>
                    <Typography variant="h4" className="HeadLine">Login Form</Typography><br />
                    <AccountBox style={{ fontSize: 40, margin: 10 }} />

                    <TextField type="email"  label="email" variant="outlined" 
                        {...register("email", {
                            required: { value: true, message: "field is required" }
                            , minLength: { value: 3, message: "minimum length must be 3" }
                        })} />
                    <span> {errors.email && <p>{errors.email.message}</p>}</span>
                    <br /><br />

                    <LockOpenIcon style={{ fontSize: 40, margin: 10 }} />
                    <TextField label="password" variant="outlined" type="password"
                        {...register("password", {
                            required: { value: true, message: "field is required" },
                            minLength: { value: 3, message: "minimum length must be 3" },
                            maxLength: { value: 20, message: "maximum length must be 20" }
                        })} />
                    <span> {errors.password && <p>{errors.password.message}</p>}</span>
                    <br /><br />

                    <AccessibilityNewIcon style={{ fontSize: 40, margin: 10 }} />
                    <Select variant="outlined" style={{ width: 200 }} {...register("clientType", { required: true })}>
                        <MenuItem value={"ADMINISTRATOR"}>Administrator</MenuItem>
                        <MenuItem value={"COMPANY"}>Company</MenuItem>
                        <MenuItem value={"CUSTOMER"}>Customer</MenuItem>
                    </Select>
                    <span> {errors.clientType && <p>{errors.clientType.message}</p>}</span>
                    <br /><br />

                    <ButtonGroup variant="contained">
                        <Button type="submit" color="primary">Login</Button>
                    </ButtonGroup>

                </form>
            </div>
        </div>
    );
}

export default LoginFC;

