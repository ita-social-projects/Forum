import { useState, useMemo } from "react";

import { Badge, Typography } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { PropTypes } from "prop-types";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

import css from "./ProfileCard.module.css";

const { Paragraph } = Typography;


export default function ProfileCard({ isAuthorized, data }) {
  const { mutate } = useSWRConfig();
  const [isSaved, setIsSaved] = useState(data.is_saved);
  const profile = useMemo(() => {
    return {
      id: data.id,
      name: data.name,
      activities: !data.activities.length
        ? null
        : data.activities.map((activity) => activity.name).join(", "),
      region: data.region_display
        ? data.region_display
        : "",
      categories:
        data.categories.length > 4
          ? data.categories.slice(0, 4)
          : data.categories,
      isSaved: data.is_saved,
      commonInfo: data.common_info,
    };
  }, [data]);

  async function sendRequest(url, { arg: data }) {
    const authToken = localStorage.getItem("Token");
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify(data),
    }).then((res) => console.log(res));
  }

  const { trigger } = useSWRMutation(
    `${process.env.REACT_APP_BASE_API_URL}/api/saved-list/`,
    sendRequest
  );

  const handleClick = async () => {
    try {
      await trigger(
        { company_pk: profile.id },
        { optimisticData: () => setIsSaved(!isSaved) }
      );
    } catch (error) {
      console.error(error);
    }
  };

  mutate((key) => typeof key === "string" && key.startsWith("/api/profiles/"), {
    revalidate: true,
  });

  const filledStar = (
    <StarFilled
      style={{ color: "#FFD800", fontSize: "24px" }}
      onClick={handleClick}
    />
  );
  const outlinedStar = (
    <StarOutlined
      style={{ color: "#FFD800", fontSize: "24px" }}
      onClick={handleClick}
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
          <div className={css["content-header__name"]}>{profile.name}</div>
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
    region_display: PropTypes.string,
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
