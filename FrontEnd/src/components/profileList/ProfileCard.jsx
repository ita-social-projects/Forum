import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import css from "./ProfileCard.module.css";
import { Badge, Space, Switch } from 'antd';
export default function ProfileCard() {
  const profile1 = {
    companyName: "Ace&W by Stakhovsky",
    activities: "Виробник",
    region: "Львівська обл",
    address: "Львів",
    catogories: ["cat1", "cat2", "cat3", "cat4"],
    commonInfo:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac condimentum nunc, eu bibendum odio. Donec porttitor tincidunt enim, at cursus diam efficitur sed. Cras sapien diam, efficitur in pretium sit amet, blandit vel nisi. Quisque facilisis sapien non mauris pharetra, sit amet tristique turpis placerat. Integer eleifend faucibus tristique. Etiam sed justo diam. Pellentesque vel elit at lectus elementum pellentesque quis vel erat.Proin laoreet, ipsum eget vestibulum ullamcorper, turpis nisl aliquam arcu, vitae dapibus ipsum nibh varius justo. Mauris dignissim iaculis libero non euismod. Maecenas massa purus, tincidunt sit amet enim et, scelerisque eleifend mauris. Aliquam euismod viverra mauris, ut interdum est venenatis nec. Mauris malesuada libero ut placerat semper. Cras sit amet vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam congue vestibulum neque, ac volutpat neque. Suspendisse semper turpis tincidunt elit pulvinar laoreet. Pellentesque convallis vitae risus at pellentesque. Ut eget viverra erat. Donec molestie mauris lacus, maximus sollicitudin nulla volutpat ullamcorper. Integer commodo cursus arcu ac ullamcorper. Donec vulputate eros est, at pretium neque faucibus eu.",
  };
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
            {profile1.companyName}
          </div>
          <div className={css["content-header__address"]}>
            {profile1.address}
            {profile1.region}
          </div>
        </div>
        <div className={css["content__common-info"]}>{profile1.commonInfo}</div>
        <div className={css["content__categories"]}>
            <Badge color="#faad14">{profile1.catogories[0]}</Badge>
            <Badge>{profile1.catogories[1]}</Badge>
            <Badge>{profile1.catogories[2]}</Badge>
            <Badge>{profile1.catogories[3]}</Badge>
            {/* {profile1.catogories}</div> */}
            </div>
      </div>

      {/* {/* <StarOutlined /> */}
      <StarFilled style={{ color: "#FFD800", fontSize: "24px" }} />
      {/* <StarFilled color="#FFD800" /> */}
      {/* <StarTwoTone twoToneColor="#eb2f96" /> */}
    </div>
  );
}
