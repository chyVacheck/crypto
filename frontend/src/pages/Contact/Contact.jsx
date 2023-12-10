// ? styles
import s from './Contact.module.css';

function Contact() {
  return (
    <section className={s.main}>
      {/* title */}
      <section className={s.block}>
        <article className={`${s.container} ${s.container_type_title}`}>
          <h1 className={`title-main ${s.title}`}>
            For any inquiries, please call or email us. Alternatively you can
            fill in the following contact form.
          </h1>
        </article>
      </section>
      {/* map */}
      <section className={`${s.block}`}>
        <iframe
          className={s.map}
          title='Coin Experts EOOD'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.6654986337526!2d23.37029999068698!3d42.65745823494817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8429fa4b4da9%3A0x2a0ac364cb49e948!2sMusagenitsa!5e0!3m2!1sru!2sde!4v1701791040341!5m2!1sru!2sde'
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </section>
    </section>
  );
}

export default Contact;
