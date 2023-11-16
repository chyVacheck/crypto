// ! modules
import { NavLink } from 'react-router-dom';

// ? styles
import s from './PageNotFound.module.css';

// * utils
// ? constants
import { paths } from '../../utils/constants';

function PageNotFound() {
  return (
    <section className={s.main}>
      <div className={s.status}>
        <h1 className={s.code}>404</h1>
        <p className={s.message}>Page not found</p>
      </div>

      <NavLink to={paths.main} className={`${s.link} link`}>
        To main
      </NavLink>
    </section>
  );
}

export default PageNotFound;
