import {Component} from "react";
import './Menu.css';



class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
    }

    onMenuItemClick = (index) => {
        this.setState({ activeIndex: index });
    };

    renderMenuItem = (text, index) => {
        const { activeIndex } = this.state;
        const isActive = activeIndex === index;
        const classNames = `menu-item${isActive ? '__active' : ''}`;
        const textNames = `menu-text${isActive ? '__active' : ''}`;

        return (
            <a href={`#${text}`} className={classNames} key={index} onClick={() => this.onMenuItemClick(index)}>
                <div className={textNames}>{text}</div>
            </a>
        );
    };

    render() {
        const menuItems = [
            'Головна',
            'Виноробство',
            'Сироварня',
            'Упакування',
            'Доставка',
            'Роздрібна торгівля',
            'Інше'
        ];

        return (
            <div>
                <div className="block-main">
                    <div className="block-main__menu">
                        <div className="block-main__menu__items">{menuItems.map(this.renderMenuItem)}</div>
                    </div>
                </div>
                <div className="divider"/>
            </div>
        );
    }
}

export default MainMenu;

