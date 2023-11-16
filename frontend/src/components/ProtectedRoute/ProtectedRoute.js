// * react
import { Navigate } from 'react-router-dom';

// ? utils
// * константы
import { paths, STATUS } from './../../utils/constants';

function ProtectedRoute({ isActive, children, page, to = paths.login }) {
  // перемещает на другую страницу
  function toAnotherPage() {
    // ! dev
    STATUS.DEV && console.log(`attempting to access the [${page}]`);
    return <Navigate to={to} />;
  }

  return isActive ? children : toAnotherPage();
}
export default ProtectedRoute;
