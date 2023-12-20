// ? styles
import s from './ListItemWallet.module.css';

// * utils
// ? utils
import { copy } from '../../utils/utils';

function ListItemWallet({ data, index }) {
  return (
    <article className={s.main}>
      <div className={s.info}>
        <h3 className={`detail ${s.text}`}>
          index: <span className={s.value}>{index + 1}</span>
        </h3>
        <h4
          onClick={() => {
            copy(data._id);
          }}
          className={`detail ${s.text}`}
        >
          id: <span className={`copy ${s.value}`}>{data._id}</span>
        </h4>
      </div>
      <div className={s.currencies}>
        {Object.keys(data.currency).map((currency) => (
          <div
            className={`detail ${s.currency}`}
            key={`${currency}_w${index}_c1`}
          >
            {currency}:{' '}
            <span className={s.value}>{data.currency[currency]}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default ListItemWallet;
