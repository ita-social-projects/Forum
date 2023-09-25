import React, { useState } from "react";
import { ConfigProvider, Radio } from 'antd';

import css from "./AllSavedGroup.module.css";
const options = [
  {
    label: "Усі",
    value: "all",
  },
  {
    label: "Збережені",
    value: "saved",
  },
];

const AllSavedGroup = () => {
  const [value, setValue] = useState("all");

  const onChange = ({ target: { value } }) => {
    console.log("radio checked", value);
    setValue(value);
  };

  return (
    <div className={css.group}>
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              colorPrimary: "#1f9a7c",
              borderRadius: 2,
              colorBorder: "#DEE1E8",
              buttonColor: "#25292C",
              fontFamily: "Inter",
              fontSize: 16,
              algorithm: true, // Enable algorithm
            }
          },
        }}
      >
        <Radio.Group
          options={options}
          onChange={onChange}
          value={value}
          optionType="button"
          buttonStyle="solid"
          size="large"
        />
      </ConfigProvider>
    </div>
  );
};
export default AllSavedGroup;
