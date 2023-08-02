import { useEffect, useState } from "react";
import Link from "next/link";
import {
  candidateItems,
  employerItems,
  findJobItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { useRouter } from "next/router";
import cookie from 'js-cookie';
import fetchFromApi from '../../pages/api/api';

const HeaderNavContent = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = cookie.get('token');

      if (token) {
        try {
          const data = await fetchFromApi('user/', 'GET', null, {
            Authorization: `Token ${token}`,
          });

          setUser(data[0]);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}

          <li className={`${isActiveLink('/', router.asPath) ? "current" : ""}`}>
            <Link href="/">Find Jobs</Link>
          </li>

          {/* End findjobs menu items */}
          {user?.is_employer && (
            <li
              className={`${isActiveParent(employerItems, router.asPath) ||
                router.asPath === "/employer/dashboard"
                ? "current"
                : ""
                } dropdown`}
            >
              <span>Employers</span>
              <ul>
                {employerItems.map((item) => (
                  <li className="dropdown" key={item.id}>
                    <span
                      className={
                        isActiveParentChaild(item.items, router.asPath)
                          ? "current"
                          : ""
                      }
                    >
                      {item.title}
                    </span>
                    <ul>
                      {item.items.map((menu, i) => (
                        <li
                          className={
                            isActiveLink(menu.routePath, router.asPath)
                              ? "current"
                              : ""
                          }
                          key={i}
                        >
                          <Link href={menu.routePath}>{menu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
                <li
                  className={
                    isActiveLink("/employer/dashboard", router.asPath)
                      ? "current"
                      : ""
                  }
                >
                  <Link href="/employer/dashboard">
                    Employers Dashboard
                  </Link>
                </li>
              </ul>
            </li>
          )}
          {/* End Employers menu items */}
          {!user?.is_employer && (
            <li
              className={`${isActiveParent(candidateItems, router.asPath) ||
                router.asPath === "/candidate/dashboard"
                ? "current"
                : ""
                  ? "current"
                  : ""
                } dropdown`}
            >
              <span>Candidates</span>
              <ul>
                {/* {candidateItems.map((item) => (
                  <li className="dropdown" key={item.id}>
                    <span
                      className={
                        isActiveParentChaild(item.items, router.asPath)
                          ? "current"
                          : ""
                      }
                    >
                      {item.title}
                    </span>
                    <ul>
                      {item.items.map((menu, i) => (
                        <li
                          className={
                            isActiveLink(menu.routePath, router.asPath)
                              ? "current"
                              : ""
                          }
                          key={i}
                        >
                          <Link href={menu.routePath}>{menu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))} */}
                <li
                  className={
                    router.asPath === "/candidate/dashboard"
                      ? "current"
                      : ""
                  }
                >
                  <Link href="/candidate/dashboard">
                    Candidates Dashboard
                  </Link>
                </li>
              </ul>
            </li>
          )}
          {/* End Candidates menu items */}
          <li
            className={`${isActiveParentChaild(pageItems, router.asPath) ||
              isActiveParentChaild(shopItems[0].items, router.asPath)
              ? "current "
              : ""
              } dropdown`}
          >
            <span>Pages</span>
            <ul>
              {pageItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, router.asPath) ? "current" : ""
                  }
                  key={i}
                >
                  <Link href={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
