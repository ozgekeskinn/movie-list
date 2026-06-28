import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClapperboard, faUser} from "@fortawesome/free-solid-svg-icons";

export default function Header({children}){
    return (
        <div id="header" className="d-flex justify-content-between align-items-center">
            {children}
        </div>
    );
}