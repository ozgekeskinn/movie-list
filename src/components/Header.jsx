import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClapperboard, faUser} from "@fortawesome/free-solid-svg-icons";

export default function Header(){
    return (
        <div id="header" className="d-flex justify-content-between align-items-center">
            <div className="header-left">
                <span>
                    <FontAwesomeIcon icon={faClapperboard} className="me-2"/>
                    Film / Dizi Listem
                </span>
            </div>
            <nav className="header-center">
                <span>Filmler</span>
                <span>Diziler</span>
            </nav>
            
            <div className="header-right">
                <FontAwesomeIcon icon={faUser} />
            </div>
        </div>
    );
}