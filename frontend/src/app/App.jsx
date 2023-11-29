// ! modules
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// ? styles
import s from './App.module.css';

// ? Api
import mainApi from '../Api/MainApi';

// * components
// ? footer
import Footer from '../components/Footer/Footer';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Notifications from './../components/Notifications/Notifications';

// ? Context
import { CurrentUserContext } from './../contexts/CurrentUserContext';

// * pages
// CreateAdmin
import CreateAdmin from '../pages/CreateAdmin/CreateAdmin';
// Login
import Login from '../pages/Login/Login';
// PageNotFound
import PageNotFound from '../pages/PageNotFound/PageNotFound';
// Signup
import Signup from '../pages/Signup/Signup';
// Profile
import Profile from '../pages/Profile/Profile';
// Support
import Support from '../pages/Support/Support';
// UserProfileById
import UserProfileById from '../pages/UserProfileById/UserProfileById';
// Verify Email
import VerifyEmail from '../pages/VerifyEmail/VerifyEmail';

// * utils
// ? constants
import { STATUS, paths } from '../utils/constants';

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
    //   type: 'successfully', // successfully, error
    //   text: 'Вы протестированы', // any text
    // },
  ]);

  // * useEffects

  // check Cookies
  useEffect(() => {
    async function fetchData() {
      await mainApi
        .getUserInfo()
        .then((res) => {
          setUserLogin(true);
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
              type: 'error',
              text: err.message,
            });
        });

      // если после первого запроса пользователь не вошел в акк, то пробуем зайти, под админом
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
              type: 'error',
              text: err.message,
            });
        })
        .finally(() => {
          setCookiesChecked(true);
        });
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
            <main className={s.container}>
              <Routes>
                {/* MAIN */}
                <Route path={paths.main} element={<p>main</p>} />

                {/* LOGIN */}
                <Route
                  path={paths.signin}
                  element={
                    <ProtectedRoute
                      isActive={!isUserLogin}
                      page={page}
                      to={paths.main}
                    >
                      <Login
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
                      to={paths.main}
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

                {/* SUPPORT */}
                <Route
                  path={paths.support}
                  element={
                    <ProtectedRoute
                      isActive={isUserLogin}
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
                      to={paths.admin.main}
                    >
                      <Login
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

                {/* // ? все остальные страницы */}
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </main>
            <Footer page={page} />
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
