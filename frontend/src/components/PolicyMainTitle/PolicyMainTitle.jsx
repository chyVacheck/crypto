// ? styles
import s from './PolicyMainTitle.module.css';

function PolicyMainTitle({ children }) {
  return <h1 className={`title-first ${s.title}`}>{children}</h1>;
}

export default PolicyMainTitle;
