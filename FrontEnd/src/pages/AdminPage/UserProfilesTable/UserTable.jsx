import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import css from './UserTable.module.css';
import axios from 'axios';
import useSWR from 'swr';
import { Table, Tag, Tooltip, Pagination } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';


const LENGTH_EMAIL = 14;
const DEFAULT_PAGE_SIZE = 3;

function UserTable() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const pageNumber = Number(queryParams.get('page')) || 1;
    const initialPageSize = Number(queryParams.get('page_size')) || DEFAULT_PAGE_SIZE;
    const [currentPage, setCurrentPage] = useState(pageNumber);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [sortInfo, setSortInfo] = useState({ field: null, order: null });
    const [statusFilters, setStatusFilters] = useState([]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const updatedPageNumber = Number(queryParams.get('page')) || 1;
        const updatedPageSize = Number(queryParams.get('page_size')) || DEFAULT_PAGE_SIZE;
        setCurrentPage(updatedPageNumber);
        setPageSize(updatedPageSize);
    }, [location.search]);

    const ordering = sortInfo.field ? `&ordering=${sortInfo.order === 'ascend' ? sortInfo.field : '-' + sortInfo.field}` : '';
    const filtering = statusFilters ? statusFilters.map((filter) => `&${filter}=true`).join('') : '';
    const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/users?page=${currentPage}&page_size=${pageSize}${ordering}${filtering}`;

    async function fetcher(url) {
        const response = await axios.get(url);
        return response.data;
    }

    const { data, isValidating: loading } = useSWR(url, fetcher);
    const users = data ? data.results : [];
    const totalItems = data ? data.total_items : 0;

    const updateQueryParams = (newPage, newPageSize) => {
        queryParams.set('page', newPage);
        queryParams.set('page_size', newPageSize);
        navigate(`?${queryParams.toString()}`);
    };

    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
        updateQueryParams(page, size);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        if (sorter.field && (sorter.field !== sortInfo.field || sorter.order !== sortInfo.order)) {
            if (sorter.field === sortInfo.field) {
                let newOrder;
                if (sortInfo.order === 'ascend') {
                    newOrder = 'descend';
                } else if (sortInfo.order === 'descend') {
                    newOrder = null;
                } else {
                    newOrder = 'ascend';
                }

                setSortInfo({
                    field: newOrder ? sorter.field : null,
                    order: newOrder,
                });
            } else {
                setSortInfo({ field: sorter.field, order: 'ascend' });
            }
        }

        setStatusFilters(filters.status);
        setCurrentPage(1);
        updateQueryParams(1, pageSize);
    };

    const getSortIcon = (sortOrder) => {
        if (!sortOrder) return <span className={css['empty-icon']} />;
        return sortOrder === 'ascend' ? (
            <CaretUpOutlined className={css['icon']} />
        ) : (
            <CaretDownOutlined className={css['icon']} />
        );
    };

    const renderStatusTags = (status) => {
        const tags = [];

        if (status.is_active) {
            tags.push(<Tag color="green" key="active">Активний</Tag>);
        }
        if (status.is_staff) {
            tags.push(<Tag color="blue" key="staff">Адміністратор</Tag>);
        }
        if (status.is_superuser) {
            tags.push(<Tag color="purple" key="superuser">Суперадмін</Tag>);
        }
        if (status.is_deleted) {
            tags.push(<Tag color="volcano" key="deleted">Видалений</Tag>);
        }

        return <>{tags}</>;
    };

    const columns = [
        {
            title: 'Прізвище та ім\'я',
            dataIndex: 'surname',
            key: 'surname',
            sorter: true,
            sortOrder: sortInfo.field === 'surname' ? sortInfo.order : null,
            sortIcon: ({ sortOrder }) => getSortIcon(sortOrder),
            render: (_, record) => `${record.surname} ${record.name}`,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: true,
            sortOrder: sortInfo.field === 'email' ? sortInfo.order : null,
            sortIcon: ({ sortOrder }) => getSortIcon(sortOrder),
            render: (email) => (
                <p>
                    {email.length > LENGTH_EMAIL ? (
                        <Tooltip title={email} placement="top">
                            <span>{`${email.slice(0, LENGTH_EMAIL)}...`}</span>
                        </Tooltip>
                    ) : (
                        <span>{email}</span>
                    )}
                </p>
            ),
        },
        {
            title: 'Компанія',
            dataIndex: 'company_name',
            key: 'company_name',
            sorter: true,
            sortOrder: sortInfo.field === 'company_name' ? sortInfo.order : null,
            sortIcon: ({ sortOrder }) => getSortIcon(sortOrder),
            render: (company_name) => (
                <p>
                    {company_name && company_name.length > LENGTH_EMAIL ? (
                        <Tooltip title={company_name} placement="top">
                            <span>{`${company_name.slice(0, LENGTH_EMAIL)}...`}</span>
                        </Tooltip>
                    ) : (
                        <span>{company_name}</span>
                    )}
                </p>
            ),
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status) => renderStatusTags(status),
            filters: [
                { text: 'Aктивні', value: 'is_active' },
                { text: 'Aдміністратори', value: 'is_staff' },
                { text: 'Суперюзер', value: 'is_superuser' },
                { text: 'Видалені', value: 'is_deleted' },
            ],
            onFilter: (value) => value
        },
        {
            title: 'Дата реєстрації',
            dataIndex: 'registration_date',
            key: 'registration_date',
            sorter: true,
            sortOrder: sortInfo.field === 'registration_date' ? sortInfo.order : null,
            sortIcon: ({ sortOrder }) => getSortIcon(sortOrder),
        },
        {
            title: 'Дії',
            dataIndex: 'actions',
            key: 'actions',
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
                style={{ marginTop: '16px', textAlign: 'center', marginBottom: '16px' }}
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
        </div>
    );
}

export default UserTable;
