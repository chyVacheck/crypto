// ? style
import s from './Notifications.module.css';

// * assets
// ? images
import unsuccessfulIcon from './../../assets/images/unsuccessful.svg';
import successfulIcon from './../../assets/images/successful.svg';

// * utils
// ? constants
import { STATUS } from '../../utils/constants';

function Notifications({ notifications, setNotifications }) {
  // определяем, уведомления находятся ниже шапки профиля или нет
  window.onscroll = function () {
    const _notifications = document.getElementById('notifications');

    if (_notifications) {
      if (107.5 - window.scrollY < 14) _notifications.style.top = '8.5px';
      else _notifications.style.top = `${107.5 - window.scrollY}px`;
    }
  };

  return (
    <section id='notifications' className={s.main}>
      {notifications.map((item, index) => {
        // function to delete
        function deleteNotification() {
          if (STATUS.DEV) console.log(`Delete notification [${item.name}]`);

          setNotifications((arr) =>
            arr.filter((c) => (c === item ? false : true)),
          );
        }

        return (
          <div key={index} className={s.notification}>
            <img
              src={item.ok ? successfulIcon : unsuccessfulIcon}
              alt={item.ok ? 'ok' : 'error'}
              className={s.icon}
            />

            <div className={s.info}>
              <div className={s.button}>
                <h2 className={`title-second ${s.name}`}>{item.name}</h2>
                <button
                  onClick={deleteNotification}
                  className={`button ${s.button_type_close}`}
                />
              </div>
              <p className={`caption ${s.text}`}>{item.text}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Notifications;
