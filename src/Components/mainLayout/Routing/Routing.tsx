import { Redirect, Route, Switch } from "react-router-dom";
import AddCompany from "../../mainComponent/AdministratorInterface/AddCompany/AddCompany";
import AddCustomer from "../../mainComponent/AdministratorInterface/AddCustomer/AddCustomer";
import AdminMainPage from "../../mainComponent/AdministratorInterface/AdminMainPage/AdminMainPage";
import DeleteCompany from "../../mainComponent/AdministratorInterface/DeleteCompany/DeleteCompany";
import DeleteCustomer from "../../mainComponent/AdministratorInterface/DeleteCustomer/DeleteCustomer";
import GetAllCompanies from "../../mainComponent/AdministratorInterface/GetAllCompanies/GetAllCompanies";
import GetAllCustomers from "../../mainComponent/AdministratorInterface/GetAllCustomers/GetAllCustomers";
import GetOneCompany from "../../mainComponent/AdministratorInterface/GetOneCompany/GetOneCompany";
import GetOneCustomer from "../../mainComponent/AdministratorInterface/GetOneCustomer/GetOneCustomer";
import UpdateCompany from "../../mainComponent/AdministratorInterface/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../mainComponent/AdministratorInterface/UpdateCustomer/UpdateCustomer";
import AddCoupon from "../../mainComponent/CompanyInterface/AddCoupon/AddCoupon";
import CompanyMainPage from "../../mainComponent/CompanyInterface/CompanyMainPage/CompanyMainPage";
import DeleteCoupon from "../../mainComponent/CompanyInterface/DeleteCoupon/DeleteCoupon";
import GetAllCompanyCoupons from "../../mainComponent/CompanyInterface/GetAllCompanyCoupons/GetAllCompanyCoupons";
import UpdateCoupon from "../../mainComponent/CompanyInterface/UpdateCoupon/UpdateCoupon";
import CustomerMainPage from "../../mainComponent/CustomerInterface/CustomerMainPage/CustomerMainPage";
import PurchaseCoupon from "../../mainComponent/CustomerInterface/PurchaseCoupon/PurchaseCoupon";
import ShowMyCoupons from "../../mainComponent/CustomerInterface/ShowMyCoupons/ShowMyCoupons";
import LoginFC from "../../mainComponent/LoginFC/LoginFC";
import MainScreen from "../mainScreen/mainScreen";
import Page404 from "../page404/page404";

function Routing(): JSX.Element {


    return (
        <div className="Routing">
			<Switch>
                
                <Route path="/main" component={MainScreen} exact/>
                <Route path="/login" component={LoginFC} exact/>

                {/*<Route path="/administrator" component={AdministratorInterface} exact/>*/}

                <Route path="/administrator" component={AdminMainPage} exact/>

                <Route path="/administrator/addCompany" component={AddCompany} exact/>
                <Route path="/administrator/updateCompany" component={UpdateCompany} exact/>
                <Route path="/administrator/getOneCompany" component={GetOneCompany} exact/>
                <Route path="/administrator/deleteCompany" component={DeleteCompany} exact/>
                <Route path="/administrator/getAllCompanies" component={GetAllCompanies} exact/>

                <Route path="/administrator/addCustomer" component={AddCustomer} exact/>
                <Route path="/administrator/updateCustomer" component={UpdateCustomer} exact/>
                <Route path="/administrator/getOneCustomer" component={GetOneCustomer} exact/>
                <Route path="/administrator/deleteCustomer" component={DeleteCustomer} exact/>
                <Route path="/administrator/getAllCustomers" component={GetAllCustomers} exact/>

                {/*<Route path="/company" component={CompanyInterface} exact/>*/}

                <Route path="/company" component={CompanyMainPage} exact/>

                <Route path="/company/addCoupon" component={AddCoupon} exact/>
                <Route path="/company/updateCoupon" component={UpdateCoupon} exact/>
                <Route path="/company/deleteCoupon" component={DeleteCoupon} exact/>
                <Route path="/company/getAllCoupons" component={GetAllCompanyCoupons} exact/>

                {/* <Route path="/customer" component={CustomerInterface} exact/>*/}

                <Route path="/customer" component={CustomerMainPage} exact/>

                <Route path="/customer/purchaseCoupon" component={PurchaseCoupon} exact/>
                <Route path="/customer/showMyCoupons" component={ShowMyCoupons} exact/>
                
                {/* for redirecting our pages we will use Redirect*/}
                <Redirect from="/" to="/main" exact/>
                {/* handle page 404 , Must be the last one in the order */}
                <Route component={Page404}/>
            </Switch>
        </div>
    );
}

export default Routing;
