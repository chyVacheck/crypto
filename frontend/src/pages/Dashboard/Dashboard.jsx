// ! modules
import { useState, useEffect } from 'react';

// ? styles
import s from './Dashboard.module.css';

// ? Api
import mainApi from './../../Api/MainApi';

function Dashboard({ addNotification }) {
  const [isPricesLoad, setPricesLoad] = useState(false);
  const [allPrices, setAllPrices] = useState(false);
  const [timeToUpdate, setTimeToUpdate] = useState(0);

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

  useEffect(() => {
    _getPrice();
    const _interval = setInterval(_getPrice, 20_000);

    return () => {
      clearInterval(_interval); // Очистка интервала при размонтировании компонента
    };
  }, []);

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
      <article className={s.container}>
        <h3>
          Time to update: <span>{timeToUpdate}</span>
        </h3>
        {isPricesLoad ? (
          <table className={s.priceTable}>
            <thead>
              <tr>
                <th className={`subhead ${s.priceTable__title}`}>Name</th>
                {/* Добавьте столбцы для остальных валют */}
                {Object.keys(allPrices[0].data).map((currency) => (
                  <th
                    className={`caption ${s.priceTable__title}`}
                    key={currency}
                  >
                    {currency.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Мапим данные для каждой криптовалюты */}
              {allPrices.map((crypto) => (
                <tr key={crypto.name}>
                  <td className={`caption ${s.priceTable__price}`}>
                    {crypto.name}
                  </td>
                  {/* Добавьте ячейки для остальных валют */}
                  {Object.keys(crypto.data).map((currency) => (
                    <td
                      className={`detail ${s.priceTable__price}`}
                      key={currency}
                    >
                      {crypto.data[currency]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          'Waiting...'
        )}
      </article>
    </section>
  );
}

export default Dashboard;
