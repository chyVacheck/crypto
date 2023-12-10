// ! modules
import { useEffect, useRef } from 'react';

// ? styles
import s from './Main.module.css';

function Main() {
  const animatedElementRef = useRef(new Map());

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(s.show);
        }
      });
    }, options);

    animatedElementRef.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={s.main}>
      {/* title */}
      <section className={`${s.block} ${s.block_type_title}`}>
        <article className={`${s.container} ${s.container_type_title}`}>
          <h1 className={`title-main ${s.title}`}>
            Your crypto destination is here
          </h1>

          <div className={s.image} />
        </article>
      </section>

      {/* About */}
      <section className={`${s.block} ${s.block_type_about}`}>
        <article className={`${s.container} ${s.container_type_about}`}>
          <div className={s.texts}>
            <h3 className={`landing-subtitle ${s.subtitle}`}>
              Coin Experts - About
            </h3>
            <p className={`landing-paragraph ${s.text} ${s.text_type_about}`}>
              With our expertise and personalized approach, we empower
              businesses to navigate the dynamic world of digital assets
              confidently. From strategic guidance to risk management, we
              provide the tools and insights you need to unlock the full
              potential of cryptocurrencies.
            </p>
          </div>

          <div className={s.cryptos}>
            {/* Learn Crypto */}
            <div
              id='LearnCrypto'
              ref={(el) => animatedElementRef.current.set('LearnCrypto', el)}
              className={s.crypto}
            >
              <img
                src='https://static.wixstatic.com/media/02fd0f_ab7e46c9afde47188843bb1a957daf02~mv2.png/v1/fill/w_163,h_163,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/icon-learn-crypto-v2_edited.png'
                alt='Learn crypto'
                className={s.crypto__image}
              />
              <h3 className={`landing-subtitle ${s.text} ${s.crypto__title}`}>
                Learn crypto
              </h3>
              <p className={`landing-paragraph ${s.text} ${s.crypto__text}`}>
                Level up your crypto knowledge
              </p>
            </div>
            {/* Trade Crypto */}
            <div
              id='TradeCrypto'
              ref={(el) => animatedElementRef.current.set('TradeCrypto', el)}
              className={`${s.crypto} ${s.crypto_bg_other}`}
            >
              <img
                src='https://static.wixstatic.com/media/02fd0f_a54e955b0c254e27858bdc0a5cf9f96b~mv2.png/v1/fill/w_163,h_163,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/icon-trade-crypto-v2_edited.png'
                alt='Trade crypto'
                className={s.crypto__image}
              />
              <h3 className={`landing-subtitle ${s.text} ${s.crypto__title}`}>
                Trade crypto
              </h3>
              <p className={`landing-paragraph ${s.text} ${s.crypto__text}`}>
                Buy and sell crypto with confidence
              </p>
            </div>
            {/* Build Crypto */}
            <div
              id='BuildCrypto'
              ref={(el) => animatedElementRef.current.set('BuildCrypto', el)}
              className={s.crypto}
            >
              <img
                src='https://static.wixstatic.com/media/02fd0f_72bb1b50640b4fb3ae09690514329829~mv2.png/v1/fill/w_163,h_163,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/icon-earn-crypto-v2_edited.png'
                alt='Build crypto'
                className={s.crypto__image}
              />
              <h3 className={`landing-subtitle ${s.text} ${s.crypto__title}`}>
                Build crypto
              </h3>
              <p className={`landing-paragraph ${s.text} ${s.crypto__text}`}>
                Build your crypto portfolio
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Animals */}
      <section className={`${s.block} ${s.block_type_animals}`}>
        <article className={`${s.container} ${s.container_type_animals}`}>
          {/* column */}
          <div className={s.column}>
            <h3
              id='Partners'
              ref={(el) => animatedElementRef.current.set('Partners', el)}
              className={`landing-subtitle ${s.text}  ${s['big-title']}`}
            >
              Partners
            </h3>
            <h3
              id='Experts'
              ref={(el) => animatedElementRef.current.set('Experts', el)}
              className={`landing-subtitle ${s.text}  ${s['big-title']}`}
            >
              Experts
            </h3>
            <h3
              id='Investments'
              ref={(el) => animatedElementRef.current.set('Investments', el)}
              className={`landing-subtitle ${s.text}  ${s['big-title']}`}
            >
              Investments
            </h3>
          </div>
          {/* column */}
          <div className={s.column}>
            <h3
              id='Success'
              ref={(el) => animatedElementRef.current.set('Success', el)}
              className={`landing-subtitle ${s.text}  ${s['bigger-title']}`}
            >
              100% success
            </h3>
          </div>
        </article>
      </section>

      {/* parallax */}
      <section className={`${s.block} ${s.block_type_parallax}`}></section>
    </section>
  );
}

export default Main;
