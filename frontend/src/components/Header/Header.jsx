// ! modules
import { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

// ? styles
import s from './Header.module.css';

// ? Api
import mainApi from './../../Api/MainApi';

// * components
import Logo from '../Logo/Logo';

// ? Context
import { CurrentUserContext } from './../../contexts/CurrentUserContext';

// * utils
// ? constants
import {
  paths,
  activeHeaderRoutes,
  activeLandingHeaderRoutes,
  PATTERN_PAGE_USER_ID,
  PATTERN_PAGE_COMPANY_ID,
} from '../../utils/constants';

function Header({
  isUserLogin,
  setUserLogin,
  isAdminLogin,
  setAdminLogin,
  page,
  addNotification,
}) {
  const navigate = useNavigate();
  const userData = useContext(CurrentUserContext);

  // ? отрисовка header
  const [isActive, setActive] = useState(false);
  // ? landing ли сейчас
  const [isLandingActive, setLandingActive] = useState(false);
  // ? открыт ли burger
  const [isBurgerOpen, setBurgerOpen] = useState(false);

  // ? открыт ли pop-up с выбором страницы policy
  const [isListPolicyOpen, setListPolicyOpen] = useState(false);

  useEffect(() => {
    // ? показываем ли header
    setActive(
      activeHeaderRoutes.includes(page.toLowerCase()) ||
        PATTERN_PAGE_USER_ID.test(page.toLowerCase()) ||
        PATTERN_PAGE_COMPANY_ID.test(page.toLowerCase()),
    );

    // ? landing ли сейчас
    setLandingActive(activeLandingHeaderRoutes.includes(page.toLowerCase()));
  }, [page]);

  function _generateCompanyLink(baseUrl, companyId) {
    // Заменяем :companyId в baseUrl на переданное значение companyId
    return baseUrl.replace(':companyId', companyId);
  }

  // ? функция по выходу из системы
  async function handleLogout(e) {
    e.preventDefault();

    await mainApi
      .logOut()
      .then((res) => {
        addNotification({
          name: 'Logout',
          ok: true,
          text: res.message,
        });
        setUserLogin(false);
        setAdminLogin(false);
        navigate(paths.main);
      })
      .catch((err) => {
        // устанавливаем ошибку
        addNotification({
          name: 'Logout',
          ok: false,
          text: err.message,
        });
      });
  }

  return (
    isActive && (
      <header className={`${s.main}`}>
        <div className={s.container}>
          {/* // ? logo and link to main */}
          <div className={s['logo-link']}>
            <Logo />
            <NavLink
              to={paths.main}
              className={`link landing-subtitle ${s.navigation__Link} ${s.title}`}
            >
              Coin Experts
            </NavLink>
          </div>

          {/* // ? navigation */}

          <nav>
            {/* без бургера */}
            <ul className={s.navigation}>
              {/* // ? Landing */}
              {isLandingActive && (
                <>
                  {/* // ? home */}
                  <li>
                    <NavLink
                      onClick={() => {
                        setListPolicyOpen(false);
                      }}
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.main}
                    >
                      Home
                    </NavLink>
                  </li>
                  {/* // ? about */}
                  <li>
                    <NavLink
                      onClick={() => {
                        setListPolicyOpen(false);
                      }}
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.about}
                    >
                      About
                    </NavLink>
                  </li>
                  {/* // ? services */}
                  <li>
                    <NavLink
                      onClick={() => {
                        setListPolicyOpen(false);
                      }}
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.services}
                    >
                      Services
                    </NavLink>
                  </li>
                  {/* // ? policies */}
                  <li className={s['list']}>
                    <p
                      onClick={() => {
                        setListPolicyOpen(!isListPolicyOpen);
                      }}
                      className={`button landing-paragraph ${
                        s['policy-button']
                      } ${page.includes('policies') && s.button_active_active}`}
                    >
                      Policy
                    </p>

                    <ul
                      className={`${s['list-popup']} ${
                        s['list-popup_type_policy']
                      } ${isListPolicyOpen ? s['list-popup_open_open'] : ''}`}
                    >
                      <li>
                        <NavLink
                          onClick={() => {
                            setListPolicyOpen(false);
                          }}
                          className={(info) => {
                            return `link landing-paragraph ${
                              s.navigation__Link
                            } ${
                              info.isActive
                                ? s.navigation__Link_active_active
                                : ''
                            }`;
                          }}
                          to={paths.policies.termsConditions}
                        >
                          Terms & Conditions
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={() => {
                            setListPolicyOpen(false);
                          }}
                          className={(info) => {
                            return `link landing-paragraph ${
                              s.navigation__Link
                            } ${
                              info.isActive
                                ? s.navigation__Link_active_active
                                : ''
                            }`;
                          }}
                          to={paths.policies.privacyPolicy}
                        >
                          Privacy Policy
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={() => {
                            setListPolicyOpen(false);
                          }}
                          className={(info) => {
                            return `link landing-paragraph ${
                              s.navigation__Link
                            } ${
                              info.isActive
                                ? s.navigation__Link_active_active
                                : ''
                            }`;
                          }}
                          to={paths.policies.amlPolicy}
                        >
                          AML Policy
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={() => {
                            setListPolicyOpen(false);
                          }}
                          className={(info) => {
                            return `link landing-paragraph ${
                              s.navigation__Link
                            } ${
                              info.isActive
                                ? s.navigation__Link_active_active
                                : ''
                            }`;
                          }}
                          to={paths.policies.cookiesPolicy}
                        >
                          Cookies Policy
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  {/* // ? contact */}
                  <li>
                    <NavLink
                      onClick={() => {
                        setListPolicyOpen(false);
                      }}
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.contact}
                    >
                      Contact
                    </NavLink>
                  </li>
                  {/* // ? signin */}
                  <li>
                    <button
                      className={`button landing-paragraph ${s.button} ${s.button_type_signin}`}
                      onClick={() => {
                        setListPolicyOpen(false);
                        window.location.href = paths.signin;
                      }}
                    >
                      Signin
                    </button>
                  </li>
                </>
              )}

              {/* // ? no Landing and users */}
              {!isLandingActive && isUserLogin && (
                <>
                  {/* // ? profile */}
                  <li>
                    <NavLink
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.user.profile}
                    >
                      Profile
                    </NavLink>
                  </li>
                  {/* // ? company */}
                  {!!userData.companyId && (
                    <li>
                      <NavLink
                        className={(info) => {
                          return `link landing-paragraph ${
                            s.navigation__Link
                          } ${
                            info.isActive
                              ? s.navigation__Link_active_active
                              : ''
                          }`;
                        }}
                        to={_generateCompanyLink(
                          paths.company.profile,
                          userData.companyId,
                        )}
                      >
                        Company
                      </NavLink>
                    </li>
                  )}
                  {/* // ? dashboard */}
                  <li>
                    <NavLink
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.user.dashboard}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  {/* // ? exchange */}
                  <li>
                    <NavLink
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.user.exchange}
                    >
                      Exchange
                    </NavLink>
                  </li>
                  {/* // ? support */}
                  <li>
                    <NavLink
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.support}
                    >
                      Support
                    </NavLink>
                  </li>
                </>
              )}

              {/* // ? no Landing and admin */}
              {!isLandingActive && isAdminLogin && (
                <>
                  {/* // ? Create Admin */}
                  <li>
                    <NavLink
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.admin.create}
                    >
                      Create Admin
                    </NavLink>
                  </li>
                  {/* // ? List of  Users */}
                  <li>
                    <NavLink
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.admin.users}
                    >
                      List of users
                    </NavLink>
                  </li>
                </>
              )}

              {/* // ? no Landing button logout */}
              {!isLandingActive && (isUserLogin || isAdminLogin) && (
                <>
                  {/* // ! logout */}
                  <li>
                    <button
                      onClick={(e) => {
                        handleLogout(e);
                      }}
                      className={`button landing-paragraph ${s.button} ${s.button_type_logout}`}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>

            {/* с бургером */}
            <ul
              className={`${s['navigation-burger']} ${
                isBurgerOpen ? s['navigation-burger_open_open'] : ''
              }`}
            >
              {/* // ? Landing */}
              {isLandingActive && (
                <>
                  {/* // ? home */}
                  <li>
                    <NavLink
                      onClick={() => {
                        setBurgerOpen(false);
                        setListPolicyOpen(false);
                      }}
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.main}
                    >
                      Home
                    </NavLink>
                  </li>
                  {/* // ? about */}
                  <li>
                    <NavLink
                      onClick={() => {
                        setBurgerOpen(false);
                        setListPolicyOpen(false);
                      }}
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.about}
                    >
                      About
                    </NavLink>
                  </li>
                  {/* // ? services */}
                  <li>
                    <NavLink
                      onClick={() => {
                        setBurgerOpen(false);
                        setListPolicyOpen(false);
                      }}
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.services}
                    >
                      Services
                    </NavLink>
                  </li>
                  {/* // ? policies */}
                  <li className={s['list']}>
                    <p
                      onClick={() => {
                        setListPolicyOpen(!isListPolicyOpen);
                      }}
                      className={`button landing-paragraph ${
                        s['policy-button']
                      } ${page.includes('policies') && s.button_active_active}`}
                    >
                      Policy
                    </p>
                    <ul
                      className={`${s['list-popup']} ${
                        s['list-popup_type_policy']
                      } ${isListPolicyOpen ? s['list-popup_open_open'] : ''}`}
                    >
                      <li>
                        <NavLink
                          onClick={() => {
                            setBurgerOpen(false);
                            setListPolicyOpen(false);
                          }}
                          className={(info) => {
                            return `link landing-paragraph ${
                              s.navigation__Link
                            } ${
                              info.isActive
                                ? s.navigation__Link_active_active
                                : ''
                            }`;
                          }}
                          to={paths.policies.termsConditions}
                        >
                          Terms & Conditions
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={() => {
                            setBurgerOpen(false);
                            setListPolicyOpen(false);
                          }}
                          className={(info) => {
                            return `link landing-paragraph ${
                              s.navigation__Link
                            } ${
                              info.isActive
                                ? s.navigation__Link_active_active
                                : ''
                            }`;
                          }}
                          to={paths.policies.privacyPolicy}
                        >
                          Privacy Policy
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={() => {
                            setBurgerOpen(false);
                            setListPolicyOpen(false);
                          }}
                          className={(info) => {
                            return `link landing-paragraph ${
                              s.navigation__Link
                            } ${
                              info.isActive
                                ? s.navigation__Link_active_active
                                : ''
                            }`;
                          }}
                          to={paths.policies.amlPolicy}
                        >
                          AML Policy
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={() => {
                            setBurgerOpen(false);
                            setListPolicyOpen(false);
                          }}
                          className={(info) => {
                            return `link landing-paragraph ${
                              s.navigation__Link
                            } ${
                              info.isActive
                                ? s.navigation__Link_active_active
                                : ''
                            }`;
                          }}
                          to={paths.policies.cookiesPolicy}
                        >
                          Cookies Policy
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  {/* // ? contact */}
                  <li>
                    <NavLink
                      onClick={() => {
                        setBurgerOpen(false);
                        setListPolicyOpen(false);
                      }}
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.contact}
                    >
                      Contact
                    </NavLink>
                  </li>
                  {/* // ? signin */}
                  <li>
                    <button
                      className={`button landing-paragraph ${s.button} ${s.button_type_signin}`}
                      onClick={() => {
                        setListPolicyOpen(false);
                        window.location.href = paths.signin;
                      }}
                    >
                      Signin
                    </button>
                  </li>
                </>
              )}
              {/* // ? no Landing and users */}
              {!isLandingActive && isUserLogin && (
                <>
                  {/* // ? profile */}
                  <li>
                    <NavLink
                      onClick={() => {
                        setBurgerOpen(false);
                      }}
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.user.profile}
                    >
                      Profile
                    </NavLink>
                  </li>
                  {/* // ? support */}
                  <li>
                    <NavLink
                      onClick={() => {
                        setBurgerOpen(false);
                      }}
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.support}
                    >
                      Support
                    </NavLink>
                  </li>
                  {/* // ? company */}
                  {/* {!!userData.companyId && (
                    <li>
                      <NavLink
                        onClick={() => {
                          window.location.href = _generateCompanyLink(
                            paths.company.profile,
                            userData.companyId,
                          );
                          setBurgerOpen(false);
                        }}
                        className={(info) => {
                          return `link landing-paragraph ${
                            s.navigation__Link
                          } ${
                            info.isActive
                              ? s.navigation__Link_active_active
                              : ''
                          }`;
                        }}
                        to={_generateCompanyLink(
                          paths.company.profile,
                          userData.companyId,
                        )}
                      >
                        Company
                      </NavLink>
                    </li>
                  )} */}
                  {/* // ? dashboard */}
                  <li>
                    <NavLink
                      onClick={() => {
                        setBurgerOpen(false);
                      }}
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.user.dashboard}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  {/* // ? exchange */}
                  <li>
                    <NavLink
                      onClick={() => {
                        setBurgerOpen(false);
                      }}
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.user.exchange}
                    >
                      Exchange
                    </NavLink>
                  </li>
                </>
              )}
              {/* // ? no Landing and admin */}
              {!isLandingActive && isAdminLogin && (
                <>
                  {/* // ? Create Admin */}
                  <li>
                    <NavLink
                      onClick={() => {
                        setBurgerOpen(false);
                      }}
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.admin.create}
                    >
                      Create Admin
                    </NavLink>
                  </li>
                  {/* // ? List of  Users */}
                  <li>
                    <NavLink
                      onClick={() => {
                        setBurgerOpen(false);
                      }}
                      className={(info) => {
                        return `link landing-paragraph ${s.navigation__Link} ${
                          info.isActive ? s.navigation__Link_active_active : ''
                        }`;
                      }}
                      to={paths.admin.users}
                    >
                      List of users
                    </NavLink>
                  </li>
                </>
              )}
              {/* // ? no Landing button logout */}
              {!isLandingActive && (isUserLogin || isAdminLogin) && (
                <>
                  {/* // ! logout */}
                  <li>
                    <button
                      onClick={(e) => {
                        handleLogout(e);
                      }}
                      className={`button landing-paragraph ${s.button} ${s.button_type_logout}`}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              <button
                onClick={() => {
                  setBurgerOpen(!isBurgerOpen);
                }}
                className={`button ${s['burger-button']} ${
                  s['burger-button_place_menu']
                } ${isBurgerOpen ? s['burger-button_open_open'] : ''}`}
              >
                <span
                  className={`${s['burger-button__line_place_top']} ${s['burger-button__line']}`}
                />
                <span
                  className={`${s['burger-button__line_place_middle']} ${s['burger-button__line']}`}
                />
                <span
                  className={`${s['burger-button__line_place_bottom']} ${s['burger-button__line']}`}
                />
              </button>
            </ul>

            <button
              onClick={() => {
                setBurgerOpen(!isBurgerOpen);
                setListPolicyOpen(false);
              }}
              className={`button ${s['burger-button']} ${
                isBurgerOpen ? s['burger-button_open_open'] : ''
              } `}
            >
              <span
                className={`${s['burger-button__line_top']} ${s['burger-button__line']}`}
              />
              <span
                className={`${s['burger-button__line_middle']} ${s['burger-button__line']}`}
              />
              <span
                className={`${s['burger-button__line_bottom']} ${s['burger-button__line']}`}
              />
            </button>
          </nav>
        </div>
      </header>
    )
  );
}

export default Header;
