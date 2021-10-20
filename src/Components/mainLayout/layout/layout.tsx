import { BrowserRouter } from "react-router-dom";
import AsideRouting from "../AsideRouting/AsideRouting";
import Footer from "../footer/footer";
import Header from "../header/header";
import Routing from "../Routing/Routing";
import "./layout.css";

function Layout(): JSX.Element {
    
    return (
        <div className="Layout">
            <BrowserRouter>
                <header>
                    <Header/>
                </header>
                <aside>
                    <AsideRouting />
                </aside>
                <main>
                    <Routing/>
                </main>
                <footer>
                    <Footer/>
                </footer>
            </BrowserRouter>
        </div>
    );
}

export default Layout;
