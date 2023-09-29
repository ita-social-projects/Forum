import css from "./ProfileListPage.module.css";
import ProfileList from "./ProfileList";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ConfigProvider, Radio } from "antd";
import Loader from "./Loader";
import ErrorPage from "./ErrorPage";

const optionSet = [
  {
    label: "Усі",
    value: false,
  },
  {
    label: "Збережені",
    value: true,
  },
];

export default function ProfileListPage(props) {
  let isAuthorized = props.isAuthorized;

  const { filter } = useParams();

  let profileTypeFilter = "";

  let profileActivityFilter = "activities__name=";
  const emptyActivityFilter = profileActivityFilter.length;

  const [filterSaved, setFilterSaved] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  switch (filter) {
    case "companies":
      profileTypeFilter = "is_registered=True";
      break;
    case "startups":
      profileTypeFilter = "is_startup=True";
      break;
    case "producers":
      profileActivityFilter += "Виробник";
      break;
    case "importers":
      profileActivityFilter += "Імпортер";
      break;
    case "retailers":
      profileActivityFilter += "Роздрібна мережа";
      break;
    case "horeca":
      profileActivityFilter += "HORECA";
      break;
    default:
      break;
  }

  const urlForAll = `${
    process.env.REACT_APP_BASE_API_URL
  }/api/profiles/?${profileTypeFilter}${
    profileActivityFilter.length > emptyActivityFilter
      ? profileActivityFilter
      : ""
  }&page=${currentPage}`;

  const urlForSaved = `${
    process.env.REACT_APP_BASE_API_URL
  }/api/profiles/?${profileTypeFilter}${
    profileActivityFilter.length > emptyActivityFilter
      ? profileActivityFilter
      : ""
  }${filterSaved ? "&is_saved=True" : ""}&page=${currentPage}`;

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: fetchedProfiles,
    error,
    isLoading,
  } = useSWR(filterSaved ? urlForSaved : urlForAll, fetcher);

  const handleRadioSelect = () => {
    if (!filterSaved) {
      setCurrentPage(1);
    }
    setFilterSaved(!filterSaved);
  };

  return (
    <div className={css.page}>
      {error ? (
        <ErrorPage />
      ) : (
        <div className={css["page-content"]}>
          {isAuthorized ? (
            <div className={css.group}>
              <ConfigProvider
                theme={{
                  components: {
                    Radio: {
                      colorPrimary: "#1f9a7c",
                      borderRadius: 2,
                      colorBorder: "#DEE1E8",
                      buttonColor: "#25292C",
                      fontFamily: "Inter",
                      fontSize: 16,
                      algorithm: true, // Enable algorithm
                    },
                  },
                }}
              >
                <Radio.Group
                  options={optionSet}
                  onChange={handleRadioSelect}
                  value={filterSaved}
                  optionType="button"
                  buttonStyle="solid"
                  size="large"
                />
              </ConfigProvider>
            </div>
          ) : null}
          {isLoading ? (
            <Loader />
          ) : (
            <ProfileList
              isAuthorized={isAuthorized}
              isLoading={isLoading}
              data={fetchedProfiles}
              paginationFunc={setCurrentPage}
              current={currentPage}
            />
          )}
        </div>
      )}
    </div>
  );
}
