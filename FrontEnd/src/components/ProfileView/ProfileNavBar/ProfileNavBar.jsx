import React, { Component } from "react";
import classes from "./ProfileNavBar.module.css";

class ProfileNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  onMenuItemClick = (index) => {
    this.setState({ activeIndex: index });

    const anchors = ["about-company", "startup", "goods-services", "logistics", "cooperation"];
    const targetAnchorId = anchors[index];
    const targetAnchor = document.getElementById(targetAnchorId);

    if (targetAnchor) {
      window.scrollTo({
        top: targetAnchor.offsetTop,
        behavior: "smooth",
      });
    }
  };

  renderMenuItem = (text, index) => {
    const { activeIndex } = this.state;
    const isActive = activeIndex === index;
    const menuItemClass = isActive ? classes["active-nav-bar-item"] : classes["inactive-nav-bar-item"];
    const dividerClass = isActive ? classes["active-divider"] : classes["inactive-divider"];

    return (
      <div>
        <div className={`${classes["profile-view-nav-bar__item"]}`} key={index}
             onClick={() => this.onMenuItemClick(index)}>
            <div className={menuItemClass}>{text}</div>
        </div>
        <div className={`${classes["divider"]} ${dividerClass}`} />
      </div>
    );
  };

  render() {
    const menuItems = [
      "Про компанію",
      "Стартап",
      "Товари / послуги",
      "Логістика товарів / послуг",
      "Формат співпраці",
    ];

    return (
      <div className={classes["profile-view-nav-bar"]}>
        {menuItems.map(this.renderMenuItem)}
      </div>
    );
  }
}

export default ProfileNavBar;
