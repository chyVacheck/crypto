// ! modules
import { useState, useEffect, useContext } from 'react';

// ? styles
import s from './Dashboard.module.css';

// ? Api
import mainApi from './../../Api/MainApi';

// ? contexts
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// ? components
import ListItemTransaction from './../../components/ListItemTransaction/ListItemTransaction';
import ListItemWallet from './../../components/ListItemWallet/ListItemWallet.jsx';

// ? utils
// * constants
import { VALIDATION } from '../../utils/constants';

function Dashboard({ addNotification }) {
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
        setTimeToUpdate(20);
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
    const _interval = setInterval(_getPrice, 20_000);

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
      {/* // ? кошельки пользователя */}
      <article className={s.container}>
        <h3 className={`title-second ${s.title}`}>Wallets</h3>
        {userData.wallets.map((wallet, index) => {
          return (
            <ListItemWallet
              key={`w_${index}_${wallet._id}`}
              data={wallet}
              index={index}
            />
          );
        })}
      </article>

      {/* // ? транзакции */}
      <article className={s.container}>
        <h3 className={`title-second ${s.title}`}>Transactions</h3>
        {userData.transactions.map((tr, index) => {
          return <ListItemTransaction key={tr._id} data={tr} index={index} />;
        })}
        {userData.transactions.length < 1 && (
          <p className={`${s.info}`}>User don't have any transactions yet</p>
        )}
      </article>

      {/* // ? таблица курса валют */}
      <article className={s.container}>
        <h3 className={`title-second ${s.title}`}>
          Real time courses{' '}
          <span className={`body ${s.value}`}>update in: {timeToUpdate}</span>
        </h3>
        {isPricesLoad ? (
          <>
            <table className={s.priceTable}>
              <thead>
                <tr>
                  <th className={`subhead ${s.priceTable__title}`}>Name</th>

                  {/* Добавьте столбцы для остальных валют */}
                  {Object.keys(allPrices[0].data).map((currency) => (
                    <th
                      className={`caption ${s.priceTable__title}`}
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
                        className={`caption ${s.priceTable__price}`}
                        key={`${crypto.name}_t1_b_n1`}
                      >
                        {crypto.name}
                      </td>

                      {Object.keys(crypto.data).map((currency) => (
                        <>
                          <td
                            className={`detail ${s.priceTable__price}`}
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
              <table className={s.priceTable}>
                <thead>
                  <tr>
                    <th className={`subhead ${s.priceTable__title}`}>Name</th>
                    <th className={`subhead ${s.priceTable__title}`}>
                      User wallet
                    </th>
                    {/* Добавьте столбцы для остальных валют */}
                    {Object.keys(allPrices[0].data).map((currency) => (
                      <th
                        className={`caption ${s.priceTable__title}`}
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
                            className={`caption ${s.priceTable__price}`}
                          >
                            {crypto.name}
                          </td>
                          <th
                            key={`${crypto.name}_t2_b_n2`}
                            className={`caption ${s.priceTable__price}`}
                          >
                            {_value}
                          </th>

                          {/* Добавьте ячейки для остальных валют */}
                          {Object.keys(crypto.data).map((currency) => {
                            return (
                              <td
                                className={`detail ${s.priceTable__price}`}
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
