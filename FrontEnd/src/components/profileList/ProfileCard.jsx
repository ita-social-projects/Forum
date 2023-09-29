import css from "./ProfileCard.module.css";
import { Badge, Typography } from "antd";
import { useState } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { PropTypes } from "prop-types";
import axios from "axios";

const { Paragraph } = Typography;

// FIXME: will be changed once serializer will be changed to return display_name
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
    activities: !data.activities.length ? null : data.activities,
    region: regions.find((region) => region.key == data.region).value,
    address: data.address,
    categories: !data.categories.length ? null : data.categories,
    isSaved: isSaved,
    commonInfo: data.common_info,
  };

  const addressLine = `${profile.region ? profile.region : ""}`;
  const activitiesLine = profile.activities.map((activity) => activity.name).join(", ");

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

  const CategoryBadges = ({ categories }) => {
    return (
      <>
        {categories
          ? categories.map((category) => (
              <Badge
                key={category.id}
                size="medium"
                count={category.name.toUpperCase()}
                style={{
                  backgroundColor: "#1F9A7C",
                  fontWeight: 600,
                  fontFamily: "Inter",
                  fontSize: 10,
                }}
              />
            ))
          : ""}
      </>
    );
  };

  // TODO: add loader to saved switch around post

  function onStarClick() {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_API_URL}/api/saved-list/`,
      withCredentials: true,
      data: {
        // FIXME: will be changed after Sofia's PR merged: user id removed
        user: 7,
        company_pk: profile.id,
      },
    })
      .then(() => setIsSaved(!isSaved))
      .catch((error) => console.log(error));
  }
  // TODO: add logo from db once it's implemented on the server side

  return (
    <div className={css["company-card"]}>
      <div className={css["logo-box"]}>
        <img
          className={css.logo}
          src={`${process.env.PUBLIC_URL}/companies-logos/1.png`}
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
        <div className={css["content__categories"]}>
          <CategoryBadges categories={profile.categories} />
        </div>
      </div>
      {isAuthorized ? (profile.isSaved ? filledStar : outlinedStar) : null}
    </div>
  );
}

// FIXME: add null acceptance for optional fields
ProfileCard.propTypes = {
  isAuthorized: PropTypes.bool,
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    region: PropTypes.string,
    categories: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    activities: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    common_info: PropTypes.string,
    is_saved: PropTypes.bool,
  }),
};
