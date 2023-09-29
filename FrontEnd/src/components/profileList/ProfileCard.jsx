import css from "./ProfileCard.module.css";
import { Badge, Typography } from "antd";
import { useState } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { PropTypes } from "prop-types";
import axios from "axios";

const { Paragraph } = Typography;

const regions = [
  {
    key: "Lviv region",
    value: "Львівська область",
  },
  {
    key: "Kyiv region",
    value: "Київська область",
  },
];

export default function ProfileCard(props) {
  const isAuthorized = props.isAuthorized;
  const data = props.data;

  const [isSaved, setIsSaved] = useState(data.is_saved);

  const profile = {
    id: data.id,
    companyName: data.name,
    activities: data.activities,
    region: regions.find((region) => region.key == data.region).value,
    address: data.address,
    categories: data.categories,
    isSaved: isSaved,
    commonInfo:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac condimentum nunc, eu bibendum odio. Donec porttitor tincidunt enim, at cursus diam efficitur sed. Cras sapien diam, efficitur in pretium sit amet, blandit vel nisi. Quisque facilisis sapien non mauris pharetra, sit amet tristique turpis placerat. Integer eleifend faucibus tristique. Etiam sed justo diam. Pellentesque vel elit at lectus elementum pellentesque quis vel erat.Proin laoreet, ipsum eget vestibulum ullamcorper, turpis nisl aliquam arcu, vitae dapibus ipsum nibh varius justo. Mauris dignissim iaculis libero non euismod. Maecenas massa purus, tincidunt sit amet enim et, scelerisque eleifend mauris. Aliquam euismod viverra mauris, ut interdum est venenatis nec. Mauris malesuada libero ut placerat semper. Cras sit amet vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam congue vestibulum neque, ac volutpat neque. Suspendisse semper turpis tincidunt elit pulvinar laoreet. Pellentesque convallis vitae risus at pellentesque. Ut eget viverra erat. Donec molestie mauris lacus, maximus sollicitudin nulla volutpat ullamcorper. Integer commodo cursus arcu ac ullamcorper. Donec vulputate eros est, at pretium neque faucibus eu.",
  };
  // FIXME: remove address for now
  const addressLine = `${profile.address ? profile.address + ", " : ""}${
    profile.region ? profile.region : ""
  }`;
  const activitiesLine = profile.activities
    .map(({ id, name }) => name)
    .join(", ");
  const categoriesList = profile.categories.map((category) => category.name);

  const filledStar = (
    <StarFilled
      style={{ color: "#FFD800", fontSize: "24px" }}
      onClick={onStarClick}
    />
  );
  const outlinedStar = (
    <StarOutlined
      style={{ color: "#FFD800", fontSize: "24px" }}
      onClick={onStarClick}
    />
  );

  // FIXME: refactor badges do they receive categories as param and then create jsx
  const badges = categoriesList.map((category) => (
    <Badge
      size="medium"
      count={category.toUpperCase()}
      style={{
        backgroundColor: "#1F9A7C",
        fontWeight: 600,
        fontFamily: "Inter",
        fontSize: 10,
      }}
    />
  ));
  // TODO: add loader to saved switch around post

  function onStarClick() {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_API_URL}/api/saved-list/`,
      withCredentials: true,
      data: {
        // FIXME: change user id to the one from the token
        user: 7,
        company_pk: profile.id,
      },
    })
      .then(() => setIsSaved(!isSaved))
      .catch((error) => console.log(error));
  }
  // TODO: add logo

  return (
    <div className={css["company-card"]}>
      <div className={css.logo}>
        <img
          src={`${process.env.PUBLIC_URL}/profilepage/initialCompanyLogo.png`}
        />
      </div>
      <div className={css.content}>
        <div className={css["content-header"]}>
          <div className={css["content-header__activity"]}>
            <p className={css["content-header__activity--text"]}>
              {activitiesLine}
            </p>
          </div>
          <div className={css["content-header__name"]}>
            {profile.companyName}
          </div>
          <div className={css["content-header__address"]}>{addressLine}</div>
        </div>
        <div className={css["content__common-info"]}>
          <Paragraph ellipsis={{ rows: 3, expandable: false }}>
            {profile.commonInfo}
          </Paragraph>
        </div>
        <div className={css["content__categories"]}>{badges}</div>
      </div>
      {isAuthorized ? (profile.isSaved ? filledStar : outlinedStar) : null}
    </div>
  );
}

ProfileCard.propTypes = {
  isAuthorized: PropTypes.bool,
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    region: PropTypes.string,
    categories: PropTypes.number,
    activities: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    common_info: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    is_saved: PropTypes.bool,
  }),
};
