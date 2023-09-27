import css from "./ProfileCard.module.css";
import { Badge, Space, Switch, Typography } from "antd";
import { useState } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const { Paragraph } = Typography;

export default function ProfileCard(props) {
  const isAuthorized = props.isAuthorized;
  const profile = props.data;

  const [isSaved, setIsSaved] = useState(false);
  
  const profile1 = {
    companyName: "Ace&W by Stakhovsky",
    activities: "Виробник",
    region: "Львівська обл.",
    address: "Львів",
    catogories: ["Сироваріння", "КАТЕГОРІЯ", "КАТЕГОРІЯ", "КАТЕГОРІЯ"],
    isSaved: isSaved,
    commonInfo:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac condimentum nunc, eu bibendum odio. Donec porttitor tincidunt enim, at cursus diam efficitur sed. Cras sapien diam, efficitur in pretium sit amet, blandit vel nisi. Quisque facilisis sapien non mauris pharetra, sit amet tristique turpis placerat. Integer eleifend faucibus tristique. Etiam sed justo diam. Pellentesque vel elit at lectus elementum pellentesque quis vel erat.Proin laoreet, ipsum eget vestibulum ullamcorper, turpis nisl aliquam arcu, vitae dapibus ipsum nibh varius justo. Mauris dignissim iaculis libero non euismod. Maecenas massa purus, tincidunt sit amet enim et, scelerisque eleifend mauris. Aliquam euismod viverra mauris, ut interdum est venenatis nec. Mauris malesuada libero ut placerat semper. Cras sit amet vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam congue vestibulum neque, ac volutpat neque. Suspendisse semper turpis tincidunt elit pulvinar laoreet. Pellentesque convallis vitae risus at pellentesque. Ut eget viverra erat. Donec molestie mauris lacus, maximus sollicitudin nulla volutpat ullamcorper. Integer commodo cursus arcu ac ullamcorper. Donec vulputate eros est, at pretium neque faucibus eu.",
  };

  const filledStar = (
    <StarFilled
      style={{ color: "#FFD800", fontSize: "24px" }}
      onClick={onClick}
    />
  );
  const outlinedStar = (
    <StarOutlined
      style={{ color: "#FFD800", fontSize: "24px" }}
      onClick={onClick}
    />
  );
  const badges = profile1.catogories.map((category) => (
    <Badge
      size="medium"
      count={category.toUpperCase()}
      style={{
        backgroundColor: "#1F9A7C",
        fontWeight: 600,
        fontFamily: "Inter",
        fontSize: 10
      }}
    />
  ));

  const addressLine = `${profile1.address}, ${profile1.region}`
  function onClick() {
    // TODO: add request to add/remove to saved
    setIsSaved(!isSaved);
    console.log(isAuthorized)
  }
  // TODO: add getting info

  return (
    <div className={css["company-card"]}>
      <div className={css.logo}>logo</div>
      <div className={css.content}>
        <div className={css["content-header"]}>
          <div className={css["content-header__activity"]}>
            <p className={css["content-header__activity--text"]}>
              {profile1.activities}
            </p>
          </div>
          <div className={css["content-header__name"]}>
            {profile.name}
          </div>
          <div className={css["content-header__address"]}>
            {addressLine}
          </div>
        </div>
        <div className={css["content__common-info"]}>
          <Paragraph ellipsis={{ rows: 3, expandable: false }}>
            {profile1.commonInfo}
          </Paragraph>
        </div>
        <div className={css["content__categories"]}>{badges}</div>
      </div>
      {isAuthorized ? (isSaved ? filledStar : outlinedStar): null}
    </div>
  );
}
