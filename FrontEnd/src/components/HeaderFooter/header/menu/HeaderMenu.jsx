import css from './HeaderMenu.module.css';

const SERVICES_LINKS = [
    {
        id: 'sl0',
        title: 'Виробники',
        link: '#'
    },
    {
        id: 'sl1',
        title: 'Імпортери',
        link: '#'
    },
    {
        id: 'sl2',
        title: 'Роздрібні мережі',
        link: '#'
    },
    {
        id: 'sl3',
        title: 'HORECA',
        link: '#'
    },
    {
        id: 'sl4',
        title: 'Інші послуги',
        link: '#'
    }
];

function HeaderMenu() {
    return (
        <div className={css['menu']}>
            <div className={css['menu-section']}>
                <div className={css['menu-section-content']}>
                    {SERVICES_LINKS.map((element) => (
                        <div className={css['menu-element']} key={element.id}>
                            <a className={css['menu-element__text']}
                               href={element.link}
                            >{element.title}</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HeaderMenu;
