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
              <tr>
                <th className={`subhead ${s.table__title}`}>Name</th>
                <th className={`subhead ${s.table__title}`}>Value</th>
              </tr>
            </thead>
            <tbody>
              {/* Мапим данные для каждой криптовалюты */}
              {userData.wallets.map((wallet, index) => {
                return (
                  <>
                    {index > 0 && (
                      <tr>
                        <td className={s.line} />
                        <td className={s.line} />
                      </tr>
                    )}

                    <tr>
                      <td
                        onClick={() => {
                          copy(wallet._id);
                        }}
                        className={`caption ${s.table__price}`}
                      >
                        id:{' '}
                        <span className={`copy ${s.value}`}>{wallet._id}</span>
                      </td>
                      <td />
                    </tr>

                    {Object.keys(wallet.currency).map((currency, _index) => {
                      const _isShow =
                        wallet.currency[currency] > 0 ||
                        CURRENCY_ALWAYS_SHOW.includes(currency);

                      return (
                        _isShow && (
                          <tr key={`tr_${wallet._id}_${index}_${_index}`}>
                            <td
                              className={`caption ${s.table__price}`}
                              key={`td_1_${wallet._id}_${index}`}
                            >
                              {currency}
                            </td>
                            <td
                              className={`caption ${s.table__price}`}
                              key={`td_2_${wallet._id}_${index}`}
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
          <table className={s.table}>
            <thead>
              <tr>
                {/* <th className={`subhead ${s.table__title}`}>Id</th>
              <th className={`subhead ${s.table__title}`}>Received</th>
              <th className={`subhead ${s.table__title}`}>Given</th>
              <th className={`subhead ${s.table__title}`}>Time</th> */}

                <th className={`subhead ${s.table__title}`}>Name</th>
                <th className={`subhead ${s.table__title}`}>Value</th>
              </tr>
            </thead>
            <tbody>
              {/* Мапим данные для каждой криптовалюты */}
              {userData.transactions.map((tr, index) => {
                const date = new Date(tr.data);

                const time = `${date.getFullYear()}/${
                  date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
                }/${
                  date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
                } ${
                  date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
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
                      <tr>
                        <td className={s.line} />
                        <td className={s.line} />
                      </tr>
                    )}
                    {/* // ? id */}
                    <tr key={`tr_1_${tr._id}_${index}`}>
                      <td
                        onClick={() => {
                          copy(tr._id);
                        }}
                        className={`caption ${s.table__price}`}
                      >
                        id: <span className={`copy ${s.value}`}>{tr._id}</span>
                      </td>
                      <td />
                    </tr>
                    {/* // ? received */}
                    <tr key={`tr_2_${tr._id}_${index}`}>
                      <td className={`caption ${s.table__price}`}>received</td>
                      <td
                        className={`caption copy ${s.value} ${s.table__price}`}
                      >
                        {tr.received.value} {tr.received.currency}
                      </td>
                    </tr>
                    {/* // ? given */}
                    <tr key={`tr_3_${tr._id}_${index}`}>
                      <td className={`caption ${s.table__price}`}>given</td>
                      <td
                        className={`caption copy ${s.value} ${s.table__price}`}
                      >
                        {tr.given.value} {tr.given.currency}
                      </td>
                    </tr>
                    {/* // ? date */}
                    <tr key={`tr_4_${tr._id}_${index}`}>
                      <td className={`caption ${s.table__price}`}>date</td>
                      <td
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
                  {Object.keys(allPrices[0].data).map((currency) => (
                    <th
                      className={`caption ${s.table__title}`}
                      key={`${currency}_t1_h_c1`}
                    >
                      {currency.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Мапим данные для каждой криптовалюты */}
                {allPrices.map((crypto) => {
                  return (
                    <tr key={`tr_${crypto.name}`}>
                      <td
                        className={`caption ${s.table__price}`}
                        key={`${crypto.name}_t1_b_n1`}
                      >
                        {crypto.name}
                      </td>

                      {Object.keys(crypto.data).map((currency) => (
                        <>
                          <td
                            className={`detail ${s.table__price}`}
                            key={`${currency}_t1_b_c1`}
                          >
                            {Number(
                              crypto.data[currency].toPrecision(
                                VALIDATION.PRICE.TO_PRECISION,
                              ),
                            )}
                          </td>
                        </>
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
          <div>
            {hasUserCurrency && (
              <table className={s.table}>
                <thead>
                  <tr>
                    <th className={`subhead ${s.table__title}`}>Name</th>
                    <th className={`subhead ${s.table__title}`}>User wallet</th>
                    {/* Добавьте столбцы для остальных валют */}
                    {Object.keys(allPrices[0].data).map((currency) => (
                      <th
                        className={`caption ${s.table__title}`}
                        key={`${currency}_t2_h_c1`}
                      >
                        {currency.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Мапим данные для каждой криптовалюты */}
                  {allPrices.map((crypto) => {
                    const _value = Number(
                      userData.wallets[0].currency[crypto.name].toPrecision(
                        VALIDATION.PRICE.TO_PRECISION,
                      ),
                    );

                    return (
                      _value > 0 && (
                        <tr key={`tr_${crypto.name}`}>
                          <td
                            key={`${crypto.name}_t2_b_n1`}
                            className={`caption ${s.table__price}`}
                          >
                            {crypto.name}
                          </td>
                          <td
                            key={`${crypto.name}_t2_b_n2`}
                            className={`caption ${s.table__price}`}
                          >
                            {_value}
                          </td>

                          {/* Добавьте ячейки для остальных валют */}
                          {Object.keys(crypto.data).map((currency) => {
                            return (
                              <td
                                className={`detail ${s.table__price}`}
                                key={`${currency}_t2_b_c1`}
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
          </div>
        ) : (
          'Waiting...'
        )}
      </article>
    </section>
  );
}

export default Dashboard;
