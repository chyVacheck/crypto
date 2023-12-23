/* eslint-disable react-hooks/exhaustive-deps */
// ! modules
import { useState, useEffect, useContext } from 'react';

// ? styles
import s from './Dashboard.module.css';

// ? Api
import mainApi from '../../Api/MainApi';

// ? contexts
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// ? utils
// * constants
import { VALIDATION } from '../../utils/constants';
// * utils
import { copy } from '../../utils/utils';

function Dashboard({ addNotification }) {
  const CURRENCY_ALWAYS_SHOW = ['bitcoin', 'ethereum', 'usd', 'eur'];

  const userData = useContext(CurrentUserContext);

  // ? useState`s
  const [isPricesLoad, setPricesLoad] = useState(false);
  const [allPrices, setAllPrices] = useState(false);
  const [timeToUpdate, setTimeToUpdate] = useState(0);
  const [hasUserCurrency, setHasUserCurrency] = useState(false);

  // ? function`s

  // получение курса валют
  function _getPrice() {
    mainApi
      .getPrice()
      .then((prices) => {
        const _answer = [];

        for (const index in prices) {
          _answer.push({ name: index, data: prices[index] });
        }

        setAllPrices(_answer);
        setPricesLoad(true);
        setTimeToUpdate(60);
      })
      .catch((err) => {
        // устанавливаем ошибку
        addNotification({
          name: 'Get price',
          ok: false,
          text: err.message,
        });
      });
  }

  // ? useEffect`s
  useEffect(() => {
    _getPrice();
    const _interval = setInterval(_getPrice, 60_000);

    return () => {
      clearInterval(_interval); // Очистка интервала при размонтировании компонента
    };
  }, []);

  useEffect(() => {
    if (!isPricesLoad) return;
    allPrices.forEach((crypto) => {
      const _value = Number(
        userData.wallets[0].currency[crypto.name].toPrecision(
          VALIDATION.PRICE.TO_PRECISION,
        ),
      );
      if (_value > 0) setHasUserCurrency(true);
    });
  }, [isPricesLoad]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeToUpdate > 0) {
        setTimeToUpdate((prevSeconds) => prevSeconds - 1);
      }
    }, 1_000);

    return () => clearInterval(interval);
  }, [timeToUpdate]);

  return (
    <section className={s.main}>
      {/* // * кошельки пользователя + транзакции */}
      <article className={`${s.container} ${s.container_type_tables}`}>
        {/* // ? кошельки пользователя */}
        <div>
          <h3 className={`title-second ${s.title}`}>Wallets</h3>
          <table className={s.table}>
            <thead>
              <tr key={`tb1_thead_tr1`}>
                <th
                  key={`tb1_thead_th1`}
                  className={`subhead ${s.table__title}`}
                >
                  Name
                </th>
                <th
                  key={`tb1_thead_th2`}
                  className={`subhead ${s.table__title}`}
                >
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Мапим данные для каждой криптовалюты */}
              {userData.wallets.map((wallet, index) => {
                return (
                  <>
                    {index > 0 && (
                      <tr key={`tb1_tr1_in_${index}`}>
                        <td
                          key={`tb1_tr1_td1_in_${index}`}
                          className={s.line}
                        />
                        <td
                          key={`tb1_tr1_td2_in_${index}`}
                          className={s.line}
                        />
                      </tr>
                    )}

                    <tr key={`tb1_tr2_in_${index}`}>
                      <td
                        key={`tb1_tr2_td1_in_${index}`}
                        onClick={() => {
                          copy(wallet._id);
                        }}
                        className={`caption ${s.table__price}`}
                      >
                        id:{' '}
                        <span className={`copy ${s.value}`}>{wallet._id}</span>
                      </td>
                      <td key={`tb1_tr2_td2_in_${index}`} />
                    </tr>

                    {Object.keys(wallet.currency).map((currency, _index) => {
                      const _isShow =
                        wallet.currency[currency] > 0 ||
                        CURRENCY_ALWAYS_SHOW.includes(currency);

                      return (
                        _isShow && (
                          <tr key={`tb1_tr3_in_${index}_in2_${_index}`}>
                            <td
                              key={`tb1_tr3_td1_in_${index}`}
                              className={`caption ${s.table__price}`}
                            >
                              {currency}
                            </td>
                            <td
                              key={`tb1_tr3_td2_in_${index}`}
                              className={`caption ${s.table__price}`}
                            >
                              {wallet.currency[currency]}
                            </td>
                          </tr>
                        )
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* // ? транзакции */}
        <div>
          <h3 className={`title-second ${s.title}`}>Transactions</h3>
          {userData.transactions.length > 0 ? (
            <table className={s.table}>
              <thead>
                <tr key={`tb2_thead_tr1`}>
                  <th className={`subhead ${s.table__title}`}>Name</th>
                  <th className={`subhead ${s.table__title}`}>Value</th>
                </tr>
              </thead>
              <tbody>
                {/* Мапим данные для каждой криптовалюты */}
                {userData.transactions.map((tr, index) => {
                  const date = new Date(tr.data);

                  const time = `${date.getFullYear()}/${
                    date.getMonth() < 10
                      ? `0${date.getMonth()}`
                      : date.getMonth()
                  }/${
                    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
                  } ${
                    date.getHours() < 10
                      ? `0${date.getHours()}`
                      : date.getHours()
                  }:${
                    date.getMinutes() < 10
                      ? `0${date.getMinutes()}`
                      : date.getMinutes()
                  }:${
                    date.getSeconds() < 10
                      ? `0${date.getSeconds()}`
                      : date.getSeconds()
                  }`;

                  return (
                    <>
                      {index > 0 && (
                        <tr key={`tb2_tr1_in_${index}`}>
                          <td
                            key={`tb2_tr1_td1_in_${index}`}
                            className={s.line}
                          />
                          <td
                            key={`tb2_tr1_td2_in_${index}`}
                            className={s.line}
                          />
                        </tr>
                      )}
                      {/* // ? id */}
                      <tr key={`tb2_tr2_in_${index}_id_${tr._id}`}>
                        <td
                          key={`tb2_tr2_td1_in_${index}`}
                          onClick={() => {
                            copy(tr._id);
                          }}
                          className={`caption ${s.table__price}`}
                        >
                          id:{' '}
                          <span className={`copy ${s.value}`}>{tr._id}</span>
                        </td>
                        <td key={`tb2_tr2_td2_in_${index}`} />
                      </tr>
                      {/* // ? received */}
                      <tr key={`tb2_tr3_in_${index}_id_${tr._id}`}>
                        <td
                          key={`tb2_tr3_td1_in_${index}`}
                          className={`caption ${s.table__price}`}
                        >
                          received
                        </td>
                        <td
                          key={`tb2_tr3_td2_in_${index}`}
                          className={`caption copy ${s.value} ${s.table__price}`}
                        >
                          {tr.received.value} {tr.received.currency}
                        </td>
                      </tr>
                      {/* // ? given */}
                      <tr key={`tb2_tr4_in_${index}_id_${tr._id}`}>
                        <td
                          key={`tb2_tr4_td1_in_${index}`}
                          className={`caption ${s.table__price}`}
                        >
                          given
                        </td>
                        <td
                          key={`tb2_tr4_td2_in_${index}`}
                          className={`caption copy ${s.value} ${s.table__price}`}
                        >
                          {tr.given.value} {tr.given.currency}
                        </td>
                      </tr>
                      {/* // ? date */}
                      <tr key={`tb2_tr5_in_${index}_id_${tr._id}`}>
                        <td
                          key={`tb2_tr5_td1_in_${index}`}
                          className={`caption ${s.table__price}`}
                        >
                          date
                        </td>
                        <td
                          key={`tb2_tr5_td2_in_${index}`}
                          onClick={() => copy(time)}
                          className={`caption copy ${s.value} ${s.table__price}`}
                        >
                          {time}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className={`${s.info}`}>User don't have any transactions yet</p>
          )}
        </div>
      </article>

      {/* // ? таблица курса валют */}
      <article className={s.container}>
        <h3 className={`title-second ${s.title}`}>
          Real time courses{' '}
          <span className={`body ${s.value}`}>update in: {timeToUpdate}</span>
        </h3>
        {isPricesLoad ? (
          <>
            <table className={s.table}>
              <thead>
                <tr>
                  <th className={`subhead ${s.table__title}`}>Name</th>

                  {/* Добавьте столбцы для остальных валют */}
                  {Object.keys(allPrices[0].data).map((currency, index) => (
                    <th
                      className={`caption ${s.table__title}`}
                      key={`tb3_th2_in_${index}_currency_${currency}`}
                    >
                      {currency.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Мапим данные для каждой криптовалюты */}
                {allPrices.map((crypto, index) => {
                  return (
                    <tr key={`tb3_tr1_in_${index}_name_${crypto.name}`}>
                      <td
                        className={`caption ${s.table__price}`}
                        key={`tb3_td1_in_${index}_name_${crypto.name}`}
                      >
                        {crypto.name}
                      </td>

                      {Object.keys(crypto.data).map((currency, _index) => (
                        <td
                          className={`detail ${s.table__price}`}
                          key={`tb3_td2_in_${index}_in2_${_index}`}
                        >
                          {Number(
                            crypto.data[currency].toPrecision(
                              VALIDATION.PRICE.TO_PRECISION,
                            ),
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          'Waiting...'
        )}
      </article>

      {/* // ? счет пользователя */}
      <article className={s.container}>
        <h3 className={`title-second ${s.title}`}>
          User crypto currency in usd and eur
        </h3>
        {isPricesLoad ? (
          <>
            {hasUserCurrency && (
              <table className={s.table}>
                <thead>
                  <tr>
                    <th key={`tb4_th1`} className={`subhead ${s.table__title}`}>
                      Name
                    </th>
                    <th key={`tb4_th2`} className={`subhead ${s.table__title}`}>
                      User wallet
                    </th>
                    {/* Добавьте столбцы для остальных валют */}
                    {Object.keys(allPrices[0].data).map((currency, index) => (
                      <th
                        className={`caption ${s.table__title}`}
                        key={`tb4_th3_in_${index}`}
                      >
                        {currency.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Мапим данные для каждой криптовалюты */}
                  {allPrices.map((crypto, index) => {
                    const _value = Number(
                      userData.wallets[0].currency[crypto.name].toPrecision(
                        VALIDATION.PRICE.TO_PRECISION,
                      ),
                    );

                    return (
                      _value > 0 && (
                        <tr key={`tb4_tr1_in_${index}`}>
                          <td
                            key={`tb4_td1_in_${index}`}
                            className={`caption ${s.table__price}`}
                          >
                            {crypto.name}
                          </td>
                          <td
                            key={`tb4_td2_in_${index}`}
                            className={`caption ${s.table__price}`}
                          >
                            {_value}
                          </td>

                          {/* Добавьте ячейки для остальных валют */}
                          {Object.keys(crypto.data).map((currency, _index) => {
                            return (
                              <td
                                className={`detail ${s.table__price}`}
                                key={`tb4_td3_in_${index}_in2_${_index}`}
                              >
                                {Number(
                                  crypto.data[currency].toPrecision(
                                    VALIDATION.PRICE.TO_PRECISION,
                                  ),
                                ) * _value}
                              </td>
                            );
                          })}
                        </tr>
                      )
                    );
                  })}
                </tbody>
              </table>
            )}
            {!hasUserCurrency && (
              <p className={`${s.info}`}>
                User don't have any crypto currency yet
              </p>
            )}
          </>
        ) : (
          'Waiting...'
        )}
      </article>
    </section>
  );
}

export default Dashboard;
