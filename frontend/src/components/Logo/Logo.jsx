// ! modules
import { useNavigate } from 'react-router-dom';

// ? styles
import s from './Logo.module.css';

// * assets
// ? images
import logo from './../../assets/images/Logo.svg';

// * utils
// ? constants
import { paths } from '../../utils/constants.js';

function Logo() {
  const navigate = useNavigate();

  function toMain() {
    navigate(paths.main);
  }

  return (
    <img onClick={toMain} className={`${s.main} link`} src={logo} alt='logo' />
  );
}

export default Logo;
