import css from "./ProfileListPage.module.css";
import ProfileList from "./ProfileList";
import AllSavedGroup from "./AllSavedGroup";

export default function ProfileListPage() {
  return (
    <div className={css["page-container"]}>
      <AllSavedGroup />
      <ProfileList />
    </div>
  );
}
