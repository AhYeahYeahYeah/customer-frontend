import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TableFooter, TablePagination } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { EntityApi } from '../../api/restful';

function createData(
    oid,
    productName,
    payment,
    orderDate,
    expireDate,
    status,
    productNum,
    annualRate,
    validityPeriod,
    riskLevel,
    settlementMethod
) {
    return {
        oid,
        productName,
        payment,
        orderDate,
        expireDate,
        status,
        detail: [
            {
                productNum,
                annualRate,
                validityPeriod,
                riskLevel,
                settlementMethod
            }
        ]
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.oid}
                </TableCell>
                <TableCell align="right">{row.productName}</TableCell>
                <TableCell align="right">{row.payment}</TableCell>
                <TableCell align="right">{row.orderDate}</TableCell>
                <TableCell align="right">{row.expireDate}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h5" gutterBottom component="div">
                                Detail
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>产品编号</TableCell>
                                        <TableCell>年化利率</TableCell>
                                        <TableCell>产品期限</TableCell>
                                        <TableCell>风险指数</TableCell>
                                        <TableCell>结息方式</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.detail.map((detailRow) => (
                                        <TableRow key={detailRow.productNum}>
                                            <TableCell component="th" scope="row">
                                                {detailRow.productNum}
                                            </TableCell>
                                            <TableCell>{detailRow.annualRate}%</TableCell>
                                            <TableCell>{detailRow.validityPeriod}天</TableCell>
                                            <TableCell>{detailRow.riskLevel}级</TableCell>
                                            <TableCell>{detailRow.settlementMethod}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}
Row.propTypes = {
    row: PropTypes.shape({
        oid: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        payment: PropTypes.number.isRequired,
        orderDate: PropTypes.string.isRequired,
        expireDate: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        detail: PropTypes.arrayOf(
            PropTypes.shape({
                productNum: PropTypes.string.isRequired,
                annualRate: PropTypes.number.isRequired,
                validityPeriod: PropTypes.string.isRequired,
                riskLevel: PropTypes.number.isRequired,
                settlementMethod: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
};
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};

export default function CollapsibleTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const [rows, setRows] = React.useState([]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('customer_token'));
        entityApi.getByCustomer(JSON.parse(localStorage.getItem('customer')).cid).then((res) => {
            if (res.status === 200) {
                // console.log(res);
                const queue = [];
                // eslint-disable-next-line no-plusplus
                const productInfo = [];
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < res.data.length; i++) {
                    queue.push(entityApi.getProduct(res.data[i].pid));
                }
                Promise.all(queue).then((re) => {
                    // console.log(re);
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < re.length; i++) {
                        productInfo.push(re[i].data[0]);
                    }
                    // console.log(productInfo);
                    const orderData = [];
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < res.data.length; i++) {
                        orderData.push(
                            createData(
                                res.data[i].oid,
                                productInfo[i].productName,
                                res.data[i].payment,
                                new Date(Number(res.data[i].orderDate)).toLocaleString(),
                                new Date(Number(res.data[i].expireDate)).toLocaleString(),
                                res.data[i].status === 1 ? '交易成功' : '交易失败',
                                productInfo[i].productNum,
                                Number(productInfo[i].annualRate) * 100,
                                productInfo[i].validityPeriod,
                                Number(productInfo[i].riskLevel),
                                productInfo[i].settlementMethod
                            )
                        );
                    }
                    setRows(orderData);
                });
            }
        });
    }, []);
    return (
        <>
            <Box>
                <TableContainer component={Paper} sx={{ position: 'absolute', height: '80%', width: '95%' }}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>订单ID</TableCell>
                                <TableCell align="right">产品名称</TableCell>
                                <TableCell align="right">花费金额</TableCell>
                                <TableCell align="right">起始时间</TableCell>
                                <TableCell align="right">到期时间</TableCell>
                                <TableCell align="right">订单状态</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
                                <Row key={row.oid} row={row} />
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow sx={{ mt: 1, position: 'relative', right: '15%', top: '85%' }}>
                                <TablePagination
                                    rowsPerPageOptions={[6, 12, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page'
                                        },
                                        native: true
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
