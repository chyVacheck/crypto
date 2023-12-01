// ! modules
import { useState, useRef, useEffect } from 'react';

// ? styles
import s from './ListOfUsers.module.css';

// ? Api
import mainApi from './../../Api/MainApi';

// ? components
import Logo from '../../components/Logo/Logo';
import SearchForm from '../../components/SearchForm/SearchForm';

// ? utils
// * constants
import ListItemUser from '../../components/ListItemUser/ListItemUser';

function ListOfUsers({ addNotification }) {
  // usersData
  const [usersData, setUsersData] = useState([]);
  const [renderedUsersData, setRenderedUsersData] = useState([]);
  const [isUsersDataDownloaded, setUsersDataDownloaded] = useState(false);

  const searchRef = useRef();

  // ? function`s

  // фильтрация
  function handleSearch() {
    setRenderedUsersData(
      usersData.filter(
        (userData) =>
          userData.email.includes(searchRef.current.value.toLowerCase()) ||
          userData._id.includes(searchRef.current.value.toLowerCase()),
      ),
    );
  }

  // ? useEffect`s

  // запрос на данные пользователей
  useEffect(() => {
    mainApi
      .getUsersInfo()
      .then((_usersData) => {
        setUsersData(_usersData.data);
        setRenderedUsersData(_usersData.data);
        setUsersDataDownloaded(true);
      })
      .catch((err) => {
        // показываем администратору уведомление
        addNotification({
          name: 'Get users data',
          ok: false,
          text: err.message,
        });
      });
  }, [addNotification]);

  return (
    <section className={s.main}>
      <article className={s.container}>
        <div className={s.header}>
          <Logo />

          <h1 className={s.title}>Users Data</h1>
        </div>

        {/* Search input */}
        <SearchForm
          onSubmit={handleSearch}
          input={{
            id: 'search',
            placeholder: 'id or email',
            ref: searchRef,
          }}
        />

        {/* LIST */}
        <div className={s.list}>
          {isUsersDataDownloaded ? (
            renderedUsersData.length > 0 ? (
              renderedUsersData.map((userData, index) => {
                return (
                  <ListItemUser key={index} userData={userData} index={index} />
                );
              })
            ) : (
              <span className='caption'>No user find</span>
            )
          ) : (
            <span className='caption'>Downloading...</span>
          )}
        </div>
      </article>
    </section>
  );
}

export default ListOfUsers;
