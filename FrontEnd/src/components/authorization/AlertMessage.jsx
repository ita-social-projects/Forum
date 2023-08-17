import classes from "./AlertMessage.module.css";

const AlertMessage = (props) => {

    const alertMessageHandler = () => {
        props.setErrorMessage("")
    };
    
  return (
    <div className={classes["alert-message"]}>
      <p className={classes["alert-message__content"]}>{props.errorMessage}</p>
      <button className={classes["alert-message__icon"]} onClick={alertMessageHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
        >
          <path
            d="M5.86858 6L9.97014 1.11094C10.0389 1.02969 9.98108 0.90625 9.87483 0.90625H8.62796C8.55452 0.90625 8.48421 0.939062 8.43577 0.995312L5.05296 5.02813L1.67014 0.995312C1.62327 0.939062 1.55296 0.90625 1.47796 0.90625H0.231082C0.124832 0.90625 0.0670197 1.02969 0.13577 1.11094L4.23733 6L0.13577 10.8891C0.120369 10.9072 0.110489 10.9293 0.107302 10.9529C0.104115 10.9764 0.107755 11.0004 0.117791 11.022C0.127826 11.0435 0.143835 11.0617 0.163917 11.0745C0.183998 11.0872 0.207309 11.0939 0.231082 11.0938H1.47796C1.55139 11.0938 1.62171 11.0609 1.67014 11.0047L5.05296 6.97188L8.43577 11.0047C8.48264 11.0609 8.55296 11.0938 8.62796 11.0938H9.87483C9.98108 11.0938 10.0389 10.9703 9.97014 10.8891L5.86858 6Z"
            fill="black"
            fillOpacity="0.45"
          />
        </svg>
      </button>
    </div>
  );
};

export default AlertMessage;
