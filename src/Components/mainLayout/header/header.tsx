import "./header.css";
import logo from "../../assets/logo.jpg";

function Header(): JSX.Element {

    const logos = [{img: logo}]
    
    return (
        <div className="header">
            <img src={logo} width={480} height={100}  />
        </div>
    );
}

export default Header;
