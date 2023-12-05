// ! modules
import { useEffect } from 'react';

// ? styles
import s from './Services.module.css';

function Services() {
  const _allServices = [
    'Risk Management',
    'Crypto Estate',
    'NFT',
    'Trading',
    'Selection of Exchange',
    'Fundamental analisys',
    'Market Analisys',
    'Usage of Wallets',
    'Investment Options',
    'Risk Disclosure',
    'Secure Storage',
    'Investments',
  ];

  return (
    <section className={s.main}>
      {/* title */}
      <section className={s.block}>
        <article className={`${s.container} ${s['container-with-title']}`}>
          <h3 className={`landing-subtitle ${s.subtitle}`}>Our services</h3>
          <h1 className={`title-main ${s.title}`}>
            We provide comprehensive and insightful answers to your most complex
            questions.
          </h1>
        </article>
      </section>

      {/* Our services */}
      <section className={`${s.block} ${s.block_background_other}`}>
        <article className={`${s.container} ${s['container-with-services']}`}>
          {/* // ? titles */}
          <div className={s.titles}>
            <h3 className={`title-main ${s.text} ${s.text_place_services}`}>
              Our services
            </h3>
            <h4
              className={`landing-paragraph ${s.text} ${s.text_place_services}`}
            >
              Individually tailored to your needs
            </h4>
          </div>

          {/* // ? grid of services */}
          <div className={s.grid}>
            {_allServices.map((value, index) => {
              return (
                <div key={index} className={s.element}>
                  <img
                    alt='logo'
                    src='https://static.wixstatic.com/media/02fd0f_0f43b914b94c48799759d3d0f1b288c2~mv2.png/v1/fill/w_46,h_46,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/icon.png'
                  />
                  <p
                    className={`landing-paragraph ${s.text} ${s.element__text}`}
                  >
                    {value}
                  </p>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      {/* parallax image */}
      <section id='parallax' className={`${s.block} ${s.parallax}`}>
        <div className={s.image} />
      </section>
    </section>
  );
}

export default Services;
