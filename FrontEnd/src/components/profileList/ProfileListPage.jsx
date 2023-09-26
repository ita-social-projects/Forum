import css from "./ProfileListPage.module.css";
import ProfileList from "./ProfileList";
import AllSavedGroup from "./AllSavedGroup";

export default function ProfileListPage(props) {
  let isAuthorized = props.isAuthorized;
  // isAuthorized = false;
  return (
    <div className={css.page}>
      <div className={css["page-content"]}>
      {isAuthorized ? <AllSavedGroup /> : null}
      <ProfileList isAuthorized={isAuthorized} />
      </div>
      
    </div>
  );
}
