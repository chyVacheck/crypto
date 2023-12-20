// ? styles
import s from './ListItemTransaction.module.css';

// * utils
// ? utils
import { copy } from '../../utils/utils';

function ListItemTransaction({ data, index }) {
  const date = new Date(data.data);

  const time = `${date.getFullYear()}/${
    date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
  }/${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} ${
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  }`;

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
      <div className={s.data}>
        <div>
          <p
            onClick={() => {
              copy(`${data.received.value} ${data.received.currency}`);
            }}
            className={`caption ${s.currency}`}
          >
            <span>received:</span>
            <span className={`copy ${s.value}`}>
              {`${data.received.value} ${data.received.currency}`}
            </span>
          </p>
          <p
            onClick={() => {
              copy(`${data.given.value} ${data.given.currency}`);
            }}
            className={`caption ${s.currency}`}
          >
            <span>given:</span>
            <span className={`copy ${s.value}`}>
              {`${data.given.value} ${data.given.currency}`}
            </span>
          </p>
        </div>

        <p
          onClick={() => {
            copy(time);
          }}
          className={`caption ${s.text}`}
        >
          Time transaction: <span className={`copy ${s.value}`}>{time}</span>
        </p>
      </div>
    </article>
  );
}

export default ListItemTransaction;
