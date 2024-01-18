import { Fragment } from 'react';
import PropTypes from 'prop-types';
import css from './DotDecor.module.css';

const DotRow = () => {
  const circle = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 5 5"
      fill="none"
    >
      <circle cx="2.5" cy="2.5" r="2.5" fill="#1F9A7C" />
    </svg>
  );

  const dots = [...Array(7)].map((_, index) => (
    <Fragment key={index}>{circle}</Fragment>
  ));

  return <div className={css['dot-row']}>{dots}</div>;
};

function DotDecorComponent({ position }) {
  return (
    <div className={`${css['dot-block']} ${css[position]}`}>
      <DotRow />
      <DotRow />
      <DotRow />
      <DotRow />
      <DotRow />
      <DotRow />
    </div>
  );
}

DotDecorComponent.propTypes = {
  position: PropTypes.string.isRequired,
};

export default DotDecorComponent;

