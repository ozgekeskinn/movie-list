import { NavLink, Outlet } from "react-router";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

export default function MainLayout() {
    return (
        <>
            <Header>
                <div className="header-left">
                    <NavLink to="/" className="brand-link" > 
                        Film / Dizi Listem
                    </NavLink>                   
                </div>    

                <nav className="header-center">
                    <NavLink
                        to="/"
                        end
                        className={ ({isActive}) => isActive ? "menu-link active" : "menu-link" }
                    >
                        Anasayfa
                    </NavLink>

                    <NavLink
                        to="/movies"
                        className= { ({isActive}) => isActive ? "menu-link active" : "menu-link" }
                    >
                        Filmler
                    </NavLink>

                    <NavLink
                        to="/my-list"
                        className= { ({isActive}) => isActive ? "menu-link active" : "menu-link" }
                    >
                        Listem
                    </NavLink>
                </nav>

                <div className="header-right">
                    <SearchForm />
                    <span>Profil</span>
                </div>
            </Header>  

            <main>
                <Outlet />
            </main>   
        </>
    )
}