// ! modules
import { NavLink } from 'react-router-dom';

// ? styles
import s from './ListItemUser.module.css';

// * utils
// ? utils
import { copy } from './../../utils/utils';

function ListItemUser({ userData, index }) {
  return (
    <article className={s.main}>
      <div className={s.info}>
        <h3 className={`detail ${s.text}`}>
          <span className={s.value}>{index}</span>
        </h3>
        <h4
          onClick={() => {
            copy(userData._id);
          }}
          className={`detail ${s.text}`}
        >
          id: <span className={`copy ${s.value}`}>{userData._id}</span>
        </h4>
      </div>
      <div className={s.data}>
        <h3
          onClick={() => {
            copy(userData.email);
          }}
          className={`caption ${s.text}`}
        >
          email: <span className={`copy ${s.value}`}>{userData.email}</span>
        </h3>
        <NavLink
          to={`${userData._id}`}
          className={`detail link ${s.text} ${s.link}`}
        >
          view profile
        </NavLink>
      </div>
    </article>
  );
}

export default ListItemUser;
