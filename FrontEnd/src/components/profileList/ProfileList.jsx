import { List } from "antd";
import ProfileCard from "./ProfileCard";
import css from "./ProfileList.module.css";

// FIXME: change loader to the one from dev
// FIXME: change error page to the one from dev
const PAGE_SIZE = 6;

const ListHeader = ({ number }) => (
  <div className={css["results-header"]}>
    <p className={css["results-header__number"]}>{number}</p>
    <p className={css["results-header__text"]}>компаній</p>
  </div>
);

export default function ProfileList({
  isAuthorized,
  current,
  data,
  paginationFunc,
}) {
  return (
    <List
      pagination={{
        onChange: (page) => {
          paginationFunc(page);
        },
        position: "bottom",
        align: "center",
        pageSize: PAGE_SIZE,
        total: data.total_items,
        hideOnSinglePage: true,
        current: current,
      }}
      header={<ListHeader number={data.total_items} />}
      dataSource={data.results}
      split={false}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <ProfileCard isAuthorized={isAuthorized} data={item} />
        </List.Item>
      )}
    />
  );
}
