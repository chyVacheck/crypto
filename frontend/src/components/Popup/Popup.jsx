// ? styles
import s from './Popup.module.css';

// * assets
// ? images
// icon
import closeIcon from './../../assets/images/icons/close_light.svg';

function Popup({ title, file, closePopup }) {
  return (
    <article className={s.main}>
      <div className={s.container}>
        <img className={s.image} src={file.src} alt={file.alt} />
        <h3 className={`title-third ${s.title}`}>{title}</h3>
        <img
          onClick={closePopup}
          className={`button ${s.close}`}
          alt='close'
          src={closeIcon}
        />
      </div>
    </article>
  );
}

export default Popup;
