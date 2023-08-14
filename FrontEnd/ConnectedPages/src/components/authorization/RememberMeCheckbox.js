import classes from "./RememberMeCheckbox.module.css";

const RememberMeCheckbox = (props) => {
  return (
    <div className={classes["rememberme-checkbox"]}>
        <label htmlFor="rememberme">
          <input id="rememberme" type="checkbox" />
          Запам'ятати мене
        </label>
    </div>
  );
};

export default RememberMeCheckbox;
