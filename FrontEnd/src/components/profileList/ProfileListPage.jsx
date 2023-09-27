import css from "./ProfileListPage.module.css";
import ProfileList from "./ProfileList";
import AllSavedGroup from "./AllSavedGroup";
import useSWR from 'swr';
export default function ProfileListPage(props) {
  let isAuthorized = props.isAuthorized;
  console.log(isAuthorized)
  // isAuthorized = false;
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data: fetchedProfiles, error, isLoading } = useSWR(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/`, fetcher);
  return (
    <div className={css.page}>
      <div className={css["page-content"]}>
      {isAuthorized ? <AllSavedGroup /> : null}
      <ProfileList isAuthorized={isAuthorized} data={fetchedProfiles} />
      </div>
      
    </div>
  );
}
