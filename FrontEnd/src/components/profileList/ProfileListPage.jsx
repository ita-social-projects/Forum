import css from "./ProfileListPage.module.css";
import ProfileList2 from "./ProfileList2";
import AllSavedGroup from "./AllSavedGroup";
import useSWR from "swr";
import { useParams } from "react-router-dom";

export default function ProfileListPage(props) {
  let isAuthorized = props.isAuthorized;
  const { filter } = useParams();
  let backendFilter = "";
  switch (filter) {
    case "companies":
      backendFilter = "is_registered=True";
      break;
    case "startups":
      backendFilter = "is_startup=True";
      break;
    case "producers":
      backendFilter = "activities__name=production";
      break;
    case "importers":
      backendFilter = "activities__name=import";
      break;
    case "retailers":
      backendFilter = "activities__name=retail";
      break;
    case "horeca":
      backendFilter = "activities__name=horeca";
      break;
    default:
      break;
  }
  // console.log(useParams());
  console.log(filter);
  // isAuthorized = false;
  // console.log(props)
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: fetchedProfiles,
    error,
    isLoading,
  } = useSWR(
    `${process.env.REACT_APP_BASE_API_URL}/api/profiles/?${backendFilter}`,
    fetcher
  );

  return (
    <div className={css.page}>
      <div className={css["page-content"]}>
        {isAuthorized ? <AllSavedGroup /> : null}
        {isLoading || error ? null : (
          <ProfileList2 isAuthorized={isAuthorized} data={fetchedProfiles} />
        )}
      </div>
    </div>
  );
}
