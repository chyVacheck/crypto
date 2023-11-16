// * react
import { useEffect, useState } from 'react';

// ? styles
import s from './Footer.module.css';

// ? constants
import {
  YEAR,
  activeFooterRoutes as active,
  PATTERN_PAGE_USER_ID,
  LINK_REPOSITORY,
} from '../../utils/constants';

function Footer({ page }) {
  const [year, setYear] = useState(`${YEAR}`);
  const currentYear = new Date().getFullYear();

  // ? отрисовка элемента
  const [isActive, setIsActive] = useState(false);

  // отображение года
  useEffect(() => {
    if (currentYear === YEAR) {
      setYear(currentYear);
    } else {
      setYear(`${YEAR}-${currentYear}`);
    }
  }, [currentYear]);

  // Проверка на показ элемента
  useEffect(() => {
    if (active.includes(page) || PATTERN_PAGE_USER_ID.test(page)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [page]);

  return (
    isActive && (
      <footer className={s.main}>
        <h6 className={s.title}>Some information</h6>

        <div className={s.info}>
          <div className={s.texts}>
            {/* © */}
            <p className={`${s.text} caption`}>© {year}</p>

            <p className={`${s.text} caption`}>Coin Experts</p>
          </div>

          <div className={s.texts}>
            <p className={`${s.text} caption`}>Some information too</p>

            <a
              href={LINK_REPOSITORY}
              className={`${s.text} caption link`}
              target={'_blank'}
              rel='noreferrer'
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    )
  );
}

export default Footer;
