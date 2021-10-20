import { NavLink } from "react-router-dom";
import "./aside.css";

function Aside(): JSX.Element {

    return (
        <div className="aside">
            <h1>
                Menu
            </h1>
            <hr color="black" />
            <nav>
                <br />
                <br />
                <br />
                <br />
                <NavLink id="nl" exact to="/main">Main Page</NavLink>
                <br />
                <br />
                <br />
                <br />
                <NavLink id="nl" exact to="/login">Login page</NavLink>
                <br />
                <br />
                <br />
                <br />
            </nav>

        </div>
    );
}

export default Aside;
