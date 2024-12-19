import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import useSWR, {mutate}from 'swr';
import { Table, Pagination, Input, Button, Space } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, SearchOutlined } from '@ant-design/icons';
import CategoriesActions from './CategoriesActions';
import css from './CategoriesTable.module.scss';


const DEFAULT_PAGE_SIZE = 10;

function FormatCategories() {
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

    const ordering = sortInfo.field ? `&ordering=${sortInfo.order === 'ascend' ? sortInfo.field : '-' + sortInfo.field}` : '';
    const filtering = statusFilters ? statusFilters.map((filter) => `&${filter}=true`).join('') : '';
    const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/categories?page=${currentPage}&page_size=${pageSize}${ordering}${filtering}`;

    async function fetcher(url) {
        const response = await axios.get(url);
        return response.data;
    }
    const { data, isValidating: loading } = useSWR(url, fetcher);
    const users = data ? data.results : [];
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
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div className={css['dropdownMenu']}>
                <Input
                    placeholder="Пошук"
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
        filterIcon: (filtered) => <SearchOutlined className={filtered ? css['filteredIcon'] : css['icon']} />,
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

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            sortOrder: sortInfo.field === 'id' ? sortInfo.order : null,
            sortIcon: ({ sortOrder }) => getSortIcon(sortOrder),
            render: (_, record) => `${record.id}`,
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Категорія',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            sortOrder: sortInfo.field === 'name' ? sortInfo.order : null,
            sortIcon: ({ sortOrder }) => getSortIcon(sortOrder),
            render: (_, record) => `${record.name}`,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Дії',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, user) => (
                <CategoriesActions
                    user={user}
                    onActionComplete={() => {
                        mutate(url);
                    }}
                />
            ),
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
                dataSource={users}
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
            <Button
                size="small"
                className={css['ant-btn']}>
                Створити категорію
            </Button>
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

export default FormatCategories;
