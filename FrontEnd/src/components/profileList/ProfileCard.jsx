import { useState, useMemo } from "react";

import axios from "axios";
import { Badge, Typography } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { PropTypes } from "prop-types";

import css from "./ProfileCard.module.css";

import { useSWRConfig } from "swr";
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

export default function ProfileCard({ isAuthorized, data }) {
  const [isSaved, setIsSaved] = useState(data.is_saved);

  const profile = useMemo(() => {
    return {
      id: data.id,
      companyName: data.name,
      activities: !data.activities.length
        ? null
        : data.activities.map((activity) => activity.name).join(", "),
      region: data.region
        ? regions.find((region) => region.key === data.region).value
        : "",
      categories:
        data.categories.length > 4
          ? data.categories.slice(0, 4)
          : data.categories,
      isSaved: data.is_saved,
      commonInfo: data.common_info,
    };
  }, [data]);

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

  // FIXME: fix race condition when switching from saved to all w/saved changes
  function onStarClick() {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_API_URL}/api/saved-list/`,
      withCredentials: true,
      data: {
        company_pk: profile.id,
      },
    })
      .then(() => setIsSaved(!isSaved))
      .catch((error) => console.error(error));
  }
  // TODO: add logo from db once it's implemented on the server side

  return (
    <div className={css["company-card"]}>
      <div className={css["logo-box"]}>
        <img
          className={css.logo}
          src={`${process.env.PUBLIC_URL}/companies-logos/1.png`}
          alt=""
        />
      </div>
      <div className={css.content}>
        <div className={css["content-header"]}>
          <div className={css["content-header__activity"]}>
            <p className={css["content-header__activity--text"]}>
              {profile.activities}
            </p>
          </div>
          <div className={css["content-header__name"]}>
            {profile.companyName}
          </div>
          <div className={css["content-header__address"]}>{profile.region}</div>
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
      {isAuthorized ? (isSaved ? filledStar : outlinedStar) : null}
    </div>
  );
}

ProfileCard.propTypes = {
  isAuthorized: PropTypes.bool,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    region: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    common_info: PropTypes.string,
    is_saved: PropTypes.bool.isRequired,
  }).isRequired,
};
