import css from "./ProfileList.module.css";
import { List, ConfigProvider } from "antd";
import ProfileCard from "./ProfileCard";

// FIXME: change loader to the one from dev
// FIXME: change error page to the one from dev

const ListHeader = ({ number }) => (
  <div className={css["results-header"]}>
    <p className={css["results-header__number"]}>{number}</p>
    <p className={css["results-header__text"]}>компаній</p>
  </div>
);

export default function ProfileList(props) {
  const isAuthorized = props.isAuthorized;
  const currentPage = props.current;
  const data = props.data;
  const companiesFound = data.total_items;
  const profiles = data.results;
  const pageSize = 6;

  return (
    <List
      pagination={{
        onChange: (page) => {
          props.paginationFunc(page);
        },
        position: "bottom",
        align: "center",
        pageSize: pageSize,
        total: companiesFound,
        hideOnSinglePage: true,
        current: currentPage,
      }}
      header={<ListHeader number={companiesFound} />}
      dataSource={profiles}
      split={false}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <ProfileCard isAuthorized={isAuthorized} data={item} />
        </List.Item>
      )}
    />
  );
}
