import {useEffect, useState} from 'react';
import css from './ProfilesTable.module.scss';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import { DEFAULT_PAGE_SIZE } from '../constants';
import {Button, Input, Pagination, Space, Table, Tag} from 'antd';
import {CaretDownOutlined, CaretUpOutlined, SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

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
            title: 'EDRPOU',
            dataIndex: 'edrpou',
            key: 'edrpou',
            sorter: true,
            sortOrder: sortInfo.field === 'edrpou' ? sortInfo.order : null,
            ...getColumnSearchProps('edrpou'),
        },
        {
            title: 'Адреса',
            dataIndex: 'address',
            key: 'address',
            sorter: true,
            sortOrder: sortInfo.field === 'address' ? sortInfo.order : null,
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            sorter: true,
            sortOrder: sortInfo.field === 'status' ? sortInfo.order : null,
        },
    ];
    return (
        <div className={css['table-container']}>
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
                onShowSizeChange={handlePageChange}
                showSizeChanger={false}
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
        </div>
    );
}

export default ProfilesTable;
