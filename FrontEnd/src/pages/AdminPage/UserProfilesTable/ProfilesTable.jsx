import {useEffect, useState} from 'react';
import css from './ProfilesTable.module.scss';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import {Button, Input, Pagination, Space, Table, Tag} from 'antd';
import {CaretDownOutlined, CaretUpOutlined, SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


const DEFAULT_PAGE_SIZE = 10;

function ProfilesTable() {

    // const routeChange = (id) => {
    //     const path = `../../customadmin/profile/${id}`;
    //     navigate(path);
    // };
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const pageNumber = Number(queryParams.get('page')) || 1;

    const [currentPage, setCurrentPage] = useState(pageNumber);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [sortInfo, setSortInfo] = useState({ field: null, order: null });
    const [statusFilters, setStatusFilters] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const updatedPageNumber = Number(queryParams.get('page')) || 1;
        setCurrentPage(updatedPageNumber);
    }, [location.search]);

    const ordering = sortInfo.field
        ? `&ordering=${sortInfo.order === 'ascend' ? sortInfo.field : '-' + sortInfo.field}`
        : '';
    const filtering = statusFilters ? statusFilters.map((filter) => `&${filter}=true`).join('') : '';

    const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/profiles?page=${currentPage}&page_size=${pageSize}${ordering}${filtering}`;
    async function fetcher(url) {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    }

    const { data, isValidating: loading } = useSWR(url, fetcher);
    const profiles = data ? data.results : [];
    const totalItems = data ? data.total_items : 0;

    const updateQueryParams = (newPage) => {
        queryParams.set('page', newPage);
        navigate(`?${queryParams.toString()}`);
    };

    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
        updateQueryParams(page);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        if (sorter.field) {
            const newSortInfo =
                sorter.order === null || sorter.order === undefined
                    ? { field: null, order: null }
                    : { field: sorter.field, order: sorter.order };

            setSortInfo(newSortInfo);
        } else {
            setSortInfo({ field: null, order: null });
        }

        setStatusFilters(filters.status);
        setCurrentPage(1);
        updateQueryParams(1);
    };
    const getSortIcon = (sortOrder) => {
        if (!sortOrder) return <span className={css['empty-icon']} />;
        return sortOrder === 'ascend' ? (
            <CaretUpOutlined className={css['icon']} />
        ) : (
            <CaretDownOutlined className={css['icon']} />
        );
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
  };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div className={css['dropdownMenu']}>
                <Input
                    placeholder="Пошук"
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value]: [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    className={css['antInput']}
                ></Input>
                <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                className={css['antBtn']}
              >
                Пошук
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                className={css['ant-btn']}
              >
                Скинути
              </Button>
            </Space>
          </div>
            ),
        filterIcon: (filtered) => <SearchOutlined className={ filtered ? css['filteredIcon'] : css['icon']}/>,
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const renderCompanyTypeTags = (type) => {
        const tags = [];

        if (type === 'ФОП') {
            tags.push(<Tag color="blue" key="active">ФОП</Tag>);
        }
        if (type === 'Стартап') {
            tags.push(<Tag color="yellow" key="deleted">Стартап</Tag>);
        }

        return <>{tags}</>;
    };

    const renderStatusTags = (status) => {
        const tags = [];

        if (status === 'undefined') {
            tags.push(<Tag color="geekblue" key="active">Undefined</Tag>);
        }
        if (status === 'pending') {
            tags.push(<Tag color="yellow" key="deleted">Pending</Tag>);
        }
        if (status === 'blocked') {
            tags.push(<Tag color="red-inverse" key="deleted">Blocked</Tag>);
        }
        if (status === 'active') {
            tags.push(<Tag color="green" key="deleted">Active</Tag>);
        }
        if (status === 'approved') {
            tags.push(<Tag color="green-inverse" key="deleted">Approved</Tag>);
        }
        if (status === 'auto_approved') {
            tags.push(<Tag color="lime" key="deleted">Auto Approved</Tag>);
        }

        return <>{tags}</>;
    };

    const renderCategoryTags = (categories) => {
    const tags = [];
    categories.forEach((category) => {
        if (category.name === 'Їжа') {
            tags.push(<Tag color="gold" key={category.name}>Їжа</Tag>);
        }
        if (category.name === 'Напої') {
            tags.push(<Tag color="green" key={category.name}>Напої</Tag>);
        }
        if (category.name === 'Пакування') {
            tags.push(<Tag color="cyan" key={category.name}>Пакування</Tag>);
        }
        if (category.name === 'Перевезення') {
            tags.push(<Tag color="purple" key={category.name}>Перевезення</Tag>);
        }
        if (category.name === 'Кейтеринг') {
            tags.push(<Tag color="orange" key={category.name}>Кейтеринг</Tag>);
        }
    });
    return <>{tags}</>;
};
    const columns = [
        {
            title: 'Назва компанії',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            sortOrder: sortInfo.field === 'name' ? sortInfo.order : null,
            sortIcon: ({ sortOrder }) => getSortIcon(sortOrder),
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Тип компанії',
            dataIndex: 'company_type',
            key: 'company_type',
            render: (company_type) => renderCompanyTypeTags(company_type),
            filters: [
                { text: 'ФОП', value: 'ФОП' },
                { text: 'Стартап', value: 'Стартап' },
            ],
            onFilter: (value, record) => record.company_type === value,
        },
        {
            title: 'Вид діяльності',
            dataIndex: 'categories',
            key: 'categories',
            render: (category) => renderCategoryTags(category),
            filters: [
                { text: 'Їжа', value: 'Їжа' },
                { text: 'Напої', value: 'Напої' },
                { text: 'Пакування', value: 'Пакування' },
                { text: 'Перевезення', value: 'Перевезення' },
                { text: 'Кейтенинг', value: 'Кейтенинг' },
            ],
            onFilter: (value, record) =>
                record.categories && record.categories.some((category) => category.name === value),
            width: 160
            },
        {
            title: (<div className={css['TableSubject']}>
                Суб&apos;єкт <br/> господарювання
            </div>),
            dataIndex: 'official_name',
            key: 'official_name',
            sorter: true,
            sortOrder: sortInfo.field === 'official_name' ? sortInfo.order : null,
            sortIcon: ({sortOrder}) => getSortIcon(sortOrder),
            ...getColumnSearchProps('official_name'),
            width: 180
        },
        {
            title: 'Дата реєстрації',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: true,
            sortOrder: sortInfo.field === 'created_at' ? sortInfo.order : null,
            sortIcon: ({sortOrder}) => getSortIcon(sortOrder),
            ...getColumnSearchProps('created_at'),
            width: 170
        },
        {
            title: 'Дата оновлення',
            dataIndex: 'updated_at',
            key: 'updated_at',
            sorter: true,
            sortOrder: sortInfo.field === 'updated_at' ? sortInfo.order : null,
            sortIcon: ({sortOrder}) => getSortIcon(sortOrder),
            ...getColumnSearchProps('updated_at'),
            width: 170
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status) => renderStatusTags(status),
            filters: [
                { text: 'Їжа', value: 'Їжа' },
                { text: 'Напої', value: 'Напої' },
                { text: 'Пакування', value: 'Пакування' },
                { text: 'Перевезення', value: 'Перевезення' },
                { text: 'Кейтенинг', value: 'Кейтенинг' },
            ],
            onFilter: (value, record) => record.status === value,

        },
        {
            title: 'Представник',
            dataIndex: 'person',
            key: 'person',
            render: (person) => person.name,
            sorter: true,
            sortOrder: sortInfo.field === 'person' ? sortInfo.order : null,
            ...getColumnSearchProps('person'),
        },
        {
            title: 'Адреса',
            dataIndex: 'address',
            key: 'address',
            sorter: true,
            sortOrder: sortInfo.field === 'address' ? sortInfo.order : null,
        },
    ];
    return (
        <div className={css['table-container']}>
            <Pagination
                showSizeChanger
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
                onShowSizeChange={handlePageChange}
                showTitle={false}
                className={css['pagination']}
            />
            <Table
                columns={columns}
                dataSource={profiles}
                onChange={handleTableChange}
                pagination={false}
                loading={loading}
                tableLayout="fixed"
                locale={{
                    triggerDesc: 'Сортувати в порядку спадання',
                    triggerAsc: 'Сортувати в порядку зростання',
                    cancelSort: 'Відмінити сортування',
                }}
            />
            <Pagination
                showSizeChanger
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
                onShowSizeChange={handlePageChange}
                showTitle={false}
                className={css['pagination']}
            />
        </div>
    );
}

export default ProfilesTable;
