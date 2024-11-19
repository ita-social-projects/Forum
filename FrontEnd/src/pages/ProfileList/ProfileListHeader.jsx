import css from './ProfileListHeader.module.css';

export default function ListHeader ({ number }) {
    const getCompanyWord = (number) => {
        if (number === 1 || (number > 20 && number % 10 === 1)) {
          return 'підприємство';
        } else if ((number >= 2 && number <= 4) || (number > 20 && number % 10 >= 2 && number % 10 <= 4)) {
          return 'підприємства';
        } else {
          return 'підприємств';
        }
      };

    return (
        <div className={css['results-header']}>
            <p className={css['results-header__text']}>{number} {getCompanyWord(number)}</p>
        </div>
    );

}