// ? style
import s from './PolicyListParagraphs.module.css';

function PolicyListParagraphs({ index, title, paragraphs = [] }) {
  let i = 0;
  return (
    <div className={s.main}>
      {!!title && (
        <h2 className={`title-second ${s.title}`}>
          {index}. {title}
        </h2>
      )}
      <ul className={s.paragraphs}>
        {paragraphs.map((paragraph, _index) => {
          const _isItString = typeof paragraph === 'string';
          if (_isItString) i++;
          return (
            <li key={_index} className={`body ${s.paragraph}`}>
              {_isItString && (
                <>
                  <span className={s.index}>
                    {index}.{i}
                  </span>{' '}
                </>
              )}
              {paragraph}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PolicyListParagraphs;
