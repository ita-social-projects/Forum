import { useMemo, useEffect, useContext } from 'react';
import { PropTypes } from 'prop-types';

import { ActiveLinksContext } from '../../../../context/ActiveLinksContext';

import ReadMore from '../../ProfileDetailComponents/ReadMore';
import classes from './Startup.module.css';


function Startup({ data }) {
  const { setActiveLinks } = useContext(ActiveLinksContext);
  const profile = useMemo(() => {
    return {
      startup_idea: data.startup_idea,
    };
  }, [data]);

  // TODO: implement logic for getting data from db when it's added on server side

  const startupData = {
    'Ідея стартапу: ': profile.startup_idea,
    'Розмір інвестицій': '',
    'Ціль співпраці': '',
    'Кінцевий результат': '',
    'Конкурентна перевага ідеї': '',
    'Ризики': '',
    'Пошук партнерів': '',
  };

  const renderedSections = Object.entries(startupData).map(([key, value]) => {
    if (value) {
      return (
        <div key={key} className={classes['startup__content--block']}>
            <ReadMore>
              <span className={classes['startup__content--title']}>{key}</span>
              {value}
            </ReadMore>
          </div>
      );
    }
    return null;
  });

  const hasSections = renderedSections.some((section) => section !== null);

  useEffect(() => {
    if (hasSections) {
      setActiveLinks(prevData => [
        ...prevData,
        'startup']);
    }
  }, [hasSections, setActiveLinks]);

  return (
    hasSections ? (
      <div id="startup" className={classes['startup-wrapper']}>
        <h2 className={classes['startup__title--text']}>Стартап</h2>
        {renderedSections}
      </div>
    ) : null
  );
}

export default Startup;

Startup.propTypes = {
  data: PropTypes.shape({
    startup_idea: PropTypes.string,
  }),
};
