import { NavLink, Outlet } from "react-router";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import logo from "../assets/branding/film-dizi-listem-logo.png";

export default function MainLayout() {
  return (
    <>
      <Header>
        <div className="header-left">
          <NavLink to="/" className="brand-link">
            <img src={logo} alt="Film / Dizi Listem" className="brand-logo" />
          </NavLink>
        </div>

        <nav className="header-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            Anasayfa
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            Filmler
          </NavLink>

          <NavLink
            to="/series"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            Diziler
          </NavLink>

          <NavLink
            to="/my-list"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
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
  );
}
