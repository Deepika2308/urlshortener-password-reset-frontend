import {Link} from 'react-router-dom';
import {CreateShortUrl} from './CreateShortUrl';
import { UserActivity } from "./UserActivity";

export function HomePage({pathname}) {

  let userSession = sessionStorage.getItem("user");

  let user;
  if (userSession !== null || userSession !== "") {
    user = JSON.parse(userSession);

  }

  return (
    <div className="d-flex flex-column gap-5">
      <div className="profileContainer container-fluid bg-dark text-white d-flex">
        <div
          className="nav-link dropdown-toggle"
          id="navbarDarkDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {user.fname}
        </div>
        <ul
          className="dropdown-menu dropdown-menu-dark"
          aria-labelledby="navbarDarkDropdownMenuLink"
        >
            <li>
            <Link to="/"
              className="dropdown-item"
            >
              Home
            </Link>
          </li>

            <li>
            <Link to={`/userCreatedUrls`}
              className="dropdown-item"
            >
              Activity
            </Link>
          </li>

          <li>
            <a

              className="dropdown-item"
              href="/"
              onClick={() => {

                sessionStorage.setItem("user", null);
              }}
            >
              Logout
            </a></li>

        </ul>
      </div>

      {pathname === '/userCreatedUrls' ? <UserActivity /> : <CreateShortUrl />}
    </div>
  );
}

