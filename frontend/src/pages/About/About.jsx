// ? styles
import s from './About.module.css';

function About() {
  return (
    <section className={s.main}>
      {/* about company */}
      <section className={s.block}>
        <article className={`${s.container} ${s.columns}`}>
          <div className={s.column}>
            <h1 className={`title-main ${s.title}`}>
              Discover the future with Coin Experts
            </h1>
          </div>

          <div className={s.column}>
            <h3 className={`landing-subtitle ${s.subtitle}`}>
              Company Profile
            </h3>
            <div className={`landing-paragraph ${s.texts}`}>
              <p className={s.text}>Welcome to Coin Experts!</p>
              <p className={s.text}>
                We are a leading consulting firm specializing in cryptocurrency
                investments. Our team of experts is here to guide you through
                the exciting world of digital assets and help you make informed
                decisions.
              </p>
              <p className={s.text}>
                With years of experience in the crypto market, we offer tailored
                solutions that cater to your unique investment goals. Whether
                you're a seasoned investor or just getting started, our
                comprehensive range of services will assist you in navigating
                the complexities of this rapidly evolving industry.
              </p>
              <p className={s.text}>
                At Coin Experts, we understand that the crypto landscape can be
                overwhelming. That's why our consultants are dedicated to
                providing personalized advice and strategies designed to
                maximize your returns while managing risk effectively. We stay
                up-to-date with the latest market trends and employ cutting-edge
                tools to deliver actionable insights.
              </p>
              <p className={s.text}>
                Trust is paramount in the crypto space, and we prioritize
                transparency and integrity in all our interactions. Your
                financial success is our top priority, and we work diligently to
                ensure your investments are secure and optimized for growth.
                Join us today and unlock the potential of cryptocurrencies with
                confidence.
              </p>
              <p className={s.text}>
                Take the first step towards a profitable crypto portfolio.
                Contact Coin Experts now and let our experts guide you on the
                path to financial prosperity in the world of digital assets.
              </p>
            </div>
          </div>
        </article>
      </section>
      {/* image */}
      <section className={`${s.block} ${s['block_type_with-image']}`}>
        <article className={`${s.container} ${s['block-with-image']}`}>
          <img
            className={s['main-image']}
            alt=''
            src='https://static.wixstatic.com/media/36f4beb3133f47cda5b2af104596b3b1.jpg/v1/fill/w_910,h_601,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/36f4beb3133f47cda5b2af104596b3b1.jpg'
          />
        </article>
      </section>
    </section>
  );
}

export default About;
