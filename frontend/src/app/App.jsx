/* eslint-disable react-hooks/exhaustive-deps */
// ! modules
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// ? styles
import s from './App.module.css';

// ? Api
import mainApi from '../Api/MainApi';

// * components
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Notifications from './../components/Notifications/Notifications';

// ? Context
import { CurrentUserContext } from './../contexts/CurrentUserContext';

// * pages
// About
import About from './../pages/About/About';
// AMLPolicy
import AMLPolicy from './../pages/AMLPolicy/AMLPolicy';
// CompanyProfile
import CompanyProfile from '../pages/CompanyProfile/CompanyProfile';
// Contact
import Contact from '../pages/Contact/Contact';
// CookiesPolicy
import CookiesPolicy from '../pages/CookiesPolicy/CookiesPolicy';
// CreateAdmin
import CreateAdmin from '../pages/CreateAdmin/CreateAdmin';
// CreateCompany
import CreateCompany from '../pages/CreateCompany/CreateCompany';
// Dashboard
import Dashboard from '../pages/Dashboard/Dashboard';
// Exchange
import Exchange from '../pages/Exchange/Exchange';
// ListOfUsers
import ListOfUsers from '../pages/ListOfUsers/ListOfUsers';
// Login
import Login from '../pages/Login/Login';
// Main
import Main from '../pages/Main/Main';
// PageNotFound
import PageNotFound from '../pages/PageNotFound/PageNotFound';
// PrivacyPolicy
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
// Signup
import Signup from '../pages/Signup/Signup';
// Profile
import Profile from '../pages/Profile/Profile';
// Services
import Services from '../pages/Services/Services';
// Support
import Support from '../pages/Support/Support';
// TermsAndConditions
import TermsAndConditions from '../pages/TermsAndConditions/TermsAndConditions';
// UserProfileById
import UserProfileById from '../pages/UserProfileById/UserProfileById';
// Verify Email
import VerifyEmail from '../pages/VerifyEmail/VerifyEmail';

// * utils
// ? constants
import { STATUS, paths, TEST_USERS } from '../utils/constants';

// ! app
function App() {
  // * для отслеживания пути в адресной строке
  const page = useLocation().pathname;

  // * State`s
  // ? пользовательские данные
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });

  // ? проверили ли cookie
  const [isCookiesChecked, setCookiesChecked] = useState(false);

  // ? авторизовался ли пользователь
  const [isUserLogin, setUserLogin] = useState(false);

  // ? авторизовался ли администратор
  const [isAdminLogin, setAdminLogin] = useState(false);

  // ? почта на которую отправили код подтверждения
  const [temporaryInfo, setTemporaryInfo] = useState({
    email: null,
    password: null,
  });

  // ? уведомления
  const [notifications, setNotifications] = useState([
    // {
    //   name: 'Тест', // any text
    //   ok: true, // true, false
    //   text: 'Вы протестированы', // any text
    // },
  ]);

  // * useEffects

  // ! DEV
  useEffect(() => {
    const _canvas = Array.from(document.getElementsByTagName('canvas'))[0];
    if (_canvas) {
      _canvas.style['z-index'] = -1000;
    }
  }, []);

  // check Cookies
  useEffect(() => {
    let _isUser = false;
    async function fetchData() {
      await mainApi
        .getUserInfo()
        .then(async (res) => {
          setUserLogin(true);
          _isUser = true;
          res.data.transactions = [];
          res.data.currency = {};
          res.data.wallets = [
            {
              _id: '746217360847ad5f36ab2284',
              currency: {
                algorand: 0,
                'avalanche-2': 0,
                binancecoin: 0,
                bitcoin: 0,
                cardano: 0,
                chainlink: 0,
                dogecoin: 0,
                ethereum: 0,
                polkadot: 0,
                ripple: 0,
                solana: 0,
                'terra-luna-2': 0,
                tether: 0,
                'usd-coin': 0,
              },
            },
            {
              _id: '747237370857cf5f36ab4048',
              currency: {
                usd: 0,
                eur: 0,
              },
            },
          ];

          for (const _user of TEST_USERS) {
            console.log(_user);

            if (res.data._id === _user._id) {
              res.data.currency = _user.currency;
              res.data.transactions = _user.transactions;
              res.data.wallets = _user.wallets;
              break;
            }
          }
          setCurrentUser(res.data);
        })
        .catch((err) => {
          if (STATUS.DEV)
            console.log(
              `Запрос на сервер с целью проверки токена выдал: [${err.message}]`,
            );
          if (err.message === 'Failed to fetch')
            // показываем пользователю уведомление
            addNotification({
              name: 'Сервер 500',
              ok: false,
              text: err.message,
            });
        });

      if (!_isUser) {
        await mainApi
          .getAdminInfo()
          .then((res) => {
            setUserLogin(false);
            setAdminLogin(true);
            setCurrentUser(res.data);
          })
          .catch((err) => {
            if (STATUS.DEV)
              console.log(
                `Запрос на сервер с целью проверки токена администратора выдал: [${err.message}]`,
              );
            if (err.message === 'Failed to fetch')
              // показываем пользователю уведомление
              addNotification({
                name: 'Сервер 500',
                ok: false,
                text: err.message,
              });
          });
      }
      setCookiesChecked(true);
    }

    fetchData();
  }, []);

  // * function`s
  //
  function addNotification(notification) {
    setNotifications([notification, ...notifications]);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className={s.main}>
        {isCookiesChecked ? (
          <>
            <Header
              isUserLogin={isUserLogin}
              setUserLogin={setUserLogin}
              isAdminLogin={isAdminLogin}
              setAdminLogin={setAdminLogin}
              page={page}
              addNotification={addNotification}
            />
            <main>
              <Routes>
                {/* MAIN */}
                <Route path={paths.main} element={<Main />} />

                {/* ABOUT */}
                <Route path={paths.about} element={<About />} />

                {/* SERVICES */}
                <Route path={paths.services} element={<Services />} />

                {/* CONTACT */}
                <Route path={paths.contact} element={<Contact />} />

                {/* PRIVACY POLICY */}
                <Route
                  path={paths.policies.privacyPolicy}
                  element={<PrivacyPolicy />}
                />

                {/* COOKIES POLICY */}
                <Route
                  path={paths.policies.cookiesPolicy}
                  element={<CookiesPolicy />}
                />

                {/* AML POLICY */}
                <Route
                  path={paths.policies.amlPolicy}
                  element={<AMLPolicy />}
                />
                {/* TERMS AND CONDITIONS */}
                <Route
                  path={paths.policies.termsConditions}
                  element={<TermsAndConditions />}
                />

                {/* LOGIN */}
                <Route
                  path={paths.signin}
                  element={
                    <ProtectedRoute
                      isActive={!isUserLogin}
                      page={page}
                      to={paths.user.profile}
                    >
                      <Login
                        setCurrentUser={setCurrentUser}
                        addNotification={addNotification}
                        setLogin={setUserLogin}
                      />
                    </ProtectedRoute>
                  }
                />

                {/* REGISTRATION */}
                <Route
                  path={paths.signup}
                  element={
                    <ProtectedRoute
                      isActive={!isUserLogin}
                      page={page}
                      to={paths.user.profile}
                    >
                      <Signup
                        addNotification={addNotification}
                        setTemporaryInfo={setTemporaryInfo}
                      />
                    </ProtectedRoute>
                  }
                />

                {/* VERIFY EMAIL */}
                <Route
                  path={paths.verifyEmail}
                  element={
                    <ProtectedRoute
                      isActive={temporaryInfo.email}
                      page={page}
                      to={paths.signup}
                    >
                      <VerifyEmail
                        setCurrentUser={setCurrentUser}
                        addNotification={addNotification}
                        info={temporaryInfo}
                        setLogin={setUserLogin}
                      />
                    </ProtectedRoute>
                  }
                />

                {/* PROFILE */}
                <Route
                  path={paths.user.profile}
                  element={
                    <ProtectedRoute
                      isActive={isUserLogin}
                      page={page}
                      to={paths.signin}
                    >
                      <Profile
                        addNotification={addNotification}
                        setUser={setCurrentUser}
                      />
                    </ProtectedRoute>
                  }
                />

                {/* DASHBOARD */}
                <Route
                  path={paths.user.dashboard}
                  element={
                    <ProtectedRoute
                      isActive={isUserLogin}
                      page={page}
                      to={paths.signin}
                    >
                      <Dashboard addNotification={addNotification} />
                    </ProtectedRoute>
                  }
                />

                {/* EXCHANGE */}
                <Route
                  path={paths.user.exchange}
                  element={
                    <ProtectedRoute
                      isActive={isUserLogin}
                      page={page}
                      to={paths.signin}
                    >
                      <Exchange addNotification={addNotification} />
                    </ProtectedRoute>
                  }
                />

                {/* COMPANY CREATE */}
                <Route
                  path={paths.company.create}
                  element={
                    <ProtectedRoute
                      isActive={isUserLogin && !currentUser.companyId}
                      page={page}
                      to={paths.user.profile}
                    >
                      <CreateCompany
                        addNotification={addNotification}
                        setUser={setCurrentUser}
                      />
                    </ProtectedRoute>
                  }
                />

                {/* COMPANY PROFILE */}
                <Route
                  path={paths.company.profile}
                  element={
                    <ProtectedRoute
                      isActive={
                        isAdminLogin || (isUserLogin && currentUser.companyId)
                      }
                      page={page}
                      to={paths.company.create}
                    >
                      <CompanyProfile
                        addNotification={addNotification}
                        setUser={setCurrentUser}
                      />
                    </ProtectedRoute>
                  }
                />

                {/* SUPPORT */}
                <Route
                  path={paths.support}
                  element={
                    <ProtectedRoute
                      isActive={isUserLogin || isAdminLogin}
                      page={page}
                      to={paths.signin}
                    >
                      <Support addNotification={addNotification} />
                    </ProtectedRoute>
                  }
                />

                {/* ADMIN LOGIN */}
                <Route
                  path={paths.admin.signin}
                  element={
                    <ProtectedRoute
                      isActive={!isAdminLogin}
                      page={page}
                      to={paths.admin.users}
                    >
                      <Login
                        setCurrentUser={setCurrentUser}
                        addNotification={addNotification}
                        setLogin={setAdminLogin}
                        isLoginUser={false}
                      />
                    </ProtectedRoute>
                  }
                />

                {/* CREATE ADMIN */}
                <Route
                  path={paths.admin.create}
                  element={
                    <ProtectedRoute
                      isActive={isAdminLogin}
                      page={page}
                      to={paths.admin.signin}
                    >
                      <CreateAdmin addNotification={addNotification} />
                    </ProtectedRoute>
                  }
                />

                {/* VIEW USER PROFILE */}
                <Route
                  path={paths.admin.userProfile}
                  element={
                    <ProtectedRoute
                      isActive={isAdminLogin}
                      page={page}
                      to={paths.admin.signin}
                    >
                      <UserProfileById addNotification={addNotification} />
                    </ProtectedRoute>
                  }
                />

                {/* LIST OF USERS */}
                <Route
                  path={paths.admin.users}
                  element={
                    <ProtectedRoute
                      isActive={isAdminLogin}
                      page={page}
                      to={paths.admin.signin}
                    >
                      <ListOfUsers addNotification={addNotification} />
                    </ProtectedRoute>
                  }
                />

                {/* // ? все остальные страницы */}
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </main>
            <Footer page={page} addNotification={addNotification} />
            {notifications.length > 0 && (
              <Notifications
                notifications={notifications}
                setNotifications={setNotifications}
              />
            )}
          </>
        ) : (
          <p>Waiting...</p>
        )}
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;
