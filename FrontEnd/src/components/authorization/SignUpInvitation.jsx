import classes from "./SignUpInvitation.module.css";

const SignUpInvitation = () => {
    return (
        <div className={classes["signup-invitation"]}>
            <p>Вперше на нашому сайті?</p>
            <a href="/sign-up">Зареєструйтесь</a>
        </div>
    );
};

export default SignUpInvitation;
