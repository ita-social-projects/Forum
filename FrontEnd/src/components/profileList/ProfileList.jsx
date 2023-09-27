import css from "./ProfileList.module.css";
import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import { Card, Space } from "antd";
import { Typography } from "antd";
import ProfileCard from "./ProfileCard";
const { Title } = Typography;

export default function ProfileList(props) {
  const isAuthorized = props.isAuthorized;
  const companiesFound = 30;

  return (
    <div className={css["list-container"]}>
      <div className={css["results-container"]}>
        <div className={css["results-text"]}>
          <h6 className={css["results-text__number"]}>{companiesFound} </h6>
          <h6 className={css["results-text__text"]}>компаній</h6>
        </div>
        {/* <Title level={5}>TRY</Title> */}
        <div className={css["results-list"]}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <ProfileCard isAuthorized={isAuthorized} />
            <ProfileCard isAuthorized={isAuthorized} />
            <ProfileCard isAuthorized={isAuthorized} />
            <ProfileCard isAuthorized={isAuthorized} />
            <ProfileCard isAuthorized={isAuthorized} />
            <ProfileCard isAuthorized={isAuthorized} />
          </Space>
        </div>
      </div>
    </div>
  );
}
