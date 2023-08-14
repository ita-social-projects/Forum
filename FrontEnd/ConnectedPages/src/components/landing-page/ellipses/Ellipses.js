import './Ellipses.css';


const Ellipses = ({ type, count }) => {
  const ellipseClass = `ellipses-main__${type}`;

  const ellipses = Array.from({ length: count }, (_, index) => (
    <div key={index} className={ellipseClass} />
  ));

  return <div className="ellipses-main">{ellipses}</div>;
};

export default Ellipses;
