import { Redirect, Route, Switch } from "react-router-dom";
import AdministratorInterface from "../../mainComponent/AdministratorInterface/AdministratorInterface";
import CompanyInterface from "../../mainComponent/CompanyInterface/CompanyInterface";
import CustomerInterface from "../../mainComponent/CustomerInterface/CustomerInterface";
import Aside from "../aside/aside";
import Page404 from "../page404/page404";
import "./AsideRouting.css";

function AsideRouting(): JSX.Element {
    return (
        <div className="AsideRouting">
			<Switch>
                
                <Route path="/main" component={Aside} exact/>
                <Route path="/login" component={Aside} exact/>

                <Route path="/administrator" component={AdministratorInterface} exact/>
                <Route path="/administrator/*" component={AdministratorInterface} exact/>

                <Route path="/company" component={CompanyInterface} exact/>
                <Route path="/company/*" component={CompanyInterface} exact/>

                <Route path="/customer" component={CustomerInterface} exact/>
                <Route path="/customer/*" component={CustomerInterface} exact/>

                {/* for redirecting our pages we will use Redirect*/}
                <Redirect from="/" to="/main" exact/>
                {/* handle page 404 , Must be the last one in the order */}
                <Route component={Page404}/>
            </Switch>
        </div>
    );
}

export default AsideRouting;
