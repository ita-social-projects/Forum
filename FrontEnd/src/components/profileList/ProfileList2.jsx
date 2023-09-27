import css from "./ProfileList.module.css";
import { List, ConfigProvider } from "antd";
import ProfileCard from "./ProfileCard";

const ListHeader = ({ number }) => (
  <div className={css["results-header"]}>
    <p className={css["results-header__number"]}>{number}</p>
    <p className={css["results-header__text"]}>компаній</p>
  </div>
);

export default function ProfileList2(props) {
  const isAuthorized = props.isAuthorized;
  const data = props.data;

  const companiesFound = data.total_items;
  console.log(data);
  const profiles = data.results;
  const pageSize = 6;

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              colorPrimary: "#1F9A7C",
              colorPrimaryHover: "#0b6c61",
            }
          },
        }}
      >
        <List
          pagination={{
            onChange: (page) => {              
              console.log(page);
            },
            position: "bottom",
            align: "center",
            pageSize: pageSize,
            total: companiesFound,
            hideOnSinglePage: true
          }}
          
          header={<ListHeader number={companiesFound} />}
          dataSource={profiles}
          split={false}
          renderItem={(item) => (
            <List.Item>
                <ProfileCard isAuthorized={isAuthorized} data={item} />
            </List.Item>
          )}
        />
      </ConfigProvider>
    </>
  );
}
