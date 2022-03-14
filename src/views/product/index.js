import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardHeader, Grid, Snackbar, Alert } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ShoppingCart, StarOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { ConductorApi, EntityApi } from '../../api/restful';
import ComboBox from './ComboBox';
import SearchProduct from './SearchProduct';
import BuyModel from './BuyModel';
import AlertModel from './AlertModel';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [productsSort, setProductsSort] = useState([]);
    const [productsTime, setProductsTime] = useState([]);
    const [productsCurrent, setProductsCurrent] = useState([]);
    const [productsNotice, setProductsNotice] = useState([]);
    const [productsBig, setProductsBig] = useState([]);
    const [sortValue, setSortValue] = useState('');
    const [open, setOpen] = useState(false);
    const [buyProduct, setBuyProduct] = useState({});
    const [openStar, setOpenStar] = useState(false);
    const [msg, setMsg] = useState('');
    const [starProduct, setStarProduct] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [profileFlag, setProfileFlag] = useState(false);
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setSnackbarMsg('');
    };
    function updateProductStar() {
        const entityApi = new EntityApi(localStorage.getItem('customer_token'));
        const star = {
            cid: JSON.parse(localStorage.getItem('customer')).cid,
            pid: starProduct.pid
        };
        const productUpdate = products;
        if (starProduct.favorite !== '') {
            entityApi.deleteStar(starProduct.favorite).then((res) => {
                if (res.status === 200) {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < productUpdate.length; i++) {
                        if (starProduct.pid === productUpdate[i].pid) {
                            productUpdate[i].favorite = '';
                        }
                    }
                    setProducts(productUpdate);
                    const queueTime = [];
                    const queueCurrent = [];
                    const queueNotice = [];
                    const queueBig = [];
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < productUpdate.length; i++) {
                        if (productUpdate[i].productName.indexOf('定期') !== -1) {
                            queueTime.push(productUpdate[i]);
                        } else if (productUpdate[i].productName.indexOf('活期') !== -1) {
                            queueCurrent.push(productUpdate[i]);
                        } else if (productUpdate[i].productName.indexOf('通知') !== -1) {
                            queueNotice.push(productUpdate[i]);
                        } else if (productUpdate[i].productName.indexOf('大额') !== -1) {
                            queueBig.push(productUpdate[i]);
                        }
                    }
                    setProductsBig(queueBig);
                    setProductsCurrent(queueCurrent);
                    setProductsNotice(queueNotice);
                    setProductsTime(queueTime);
                    setOpenStar(false);
                    setStarProduct({});
                }
            });
        } else {
            entityApi.addStar(star).then((res) => {
                if (res.status === 200) {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < productUpdate.length; i++) {
                        if (star.pid === productUpdate[i].pid) {
                            productUpdate[i].favorite = res.data.msg;
                        }
                    }
                    setProducts(productUpdate);
                    const queueTime = [];
                    const queueCurrent = [];
                    const queueNotice = [];
                    const queueBig = [];
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < productUpdate.length; i++) {
                        if (productUpdate[i].productName.indexOf('定期') !== -1) {
                            queueTime.push(productUpdate[i]);
                        } else if (productUpdate[i].productName.indexOf('活期') !== -1) {
                            queueCurrent.push(productUpdate[i]);
                        } else if (productUpdate[i].productName.indexOf('通知') !== -1) {
                            queueNotice.push(productUpdate[i]);
                        } else if (productUpdate[i].productName.indexOf('大额') !== -1) {
                            queueBig.push(productUpdate[i]);
                        }
                    }
                    setProductsBig(queueBig);
                    setProductsCurrent(queueCurrent);
                    setProductsNotice(queueNotice);
                    setProductsTime(queueTime);
                    setOpenStar(false);
                    setStarProduct({});
                }
            });
        }
    }
    const handleClickOpenStar = (value) => {
        if (value.favorite) {
            setMsg('你确定要取消收藏产品吗?');
        } else {
            setMsg(' 你确定要收藏该产品吗?');
        }
        setStarProduct(value);
        setOpenStar(true);
    };

    const handleCloseStar = () => {
        setOpenStar(false);
        setStarProduct({});
    };

    const handleOpen = (value) => {
        const conductor = new ConductorApi();
        const entityApi = new EntityApi(localStorage.getItem('customer_token'));
        // eslint-disable-next-line no-loop-func
        entityApi.getProduct(value.pid).then((res) => {
            entityApi.getWorkFlow(res.data[0].fid).then((rs) => {
                conductor.getMetaDataWorkFlow(rs.data[0].name).then((data) => {
                    // eslint-disable-next-line no-plusplus
                    for (let i = 0; i < data.data.tasks.length; i++) {
                        if (data.data.tasks[i].name.indexOf('Profile') !== -1) {
                            setProfileFlag(true);
                            break;
                        }
                    }
                    entityApi.getCustomerProfile(JSON.parse(localStorage.getItem('customer')).cid).then((res) => {
                        if (
                            res.data[0].sid === '' ||
                            res.data[0].phoneNum === '' ||
                            res.data[0].address === '' ||
                            res.data[0].cardNum === '' ||
                            res.data[0].birthday === '' ||
                            res.data[0].sid === null ||
                            res.data[0].phoneNum === null ||
                            res.data[0].address === null ||
                            res.data[0].cardNum === null ||
                            res.data[0].birthday === null
                        ) {
                            setSnackbarMsg('请完善您的个人信息');
                            setSnackbarOpen(true);
                        } else {
                            setBuyProduct(value);
                            setOpen(true);
                        }
                    });
                });
            });
        });
    };

    const handleClose = () => {
        setProfileFlag(false);
        setOpen(false);
    };
    function updateProductSort(value) {
        setSortValue(value);
        if (!value) return;
        switch (value) {
            case '为您推荐':
                setProductsSort(products);
                break;
            case '定期存款':
                setProductsSort(productsTime);
                break;
            case '活期存款':
                setProductsSort(productsCurrent);
                break;
            case '通知存款':
                setProductsSort(productsNotice);
                break;
            case '大额存单':
                setProductsSort(productsBig);
                break;
            default:
                break;
        }
    }
    function updateSearchProduct(value) {
        if (value === '') {
            switch (sortValue) {
                case '为您推荐':
                    setProductsSort(products);
                    break;
                case '定期存款':
                    setProductsSort(productsTime);
                    break;
                case '活期存款':
                    setProductsSort(productsCurrent);
                    break;
                case '通知存款':
                    setProductsSort(productsNotice);
                    break;
                case '大额存单':
                    setProductsSort(productsBig);
                    break;
                default:
                    setProductsSort(products);
                    break;
            }
        } else {
            const queue = [];
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < products.length; i++) {
                if (products[i].productName.indexOf(value) !== -1) {
                    queue.push(products[i]);
                }
            }
            setProductsSort(queue);
        }
    }
    useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('customer_token'));
        entityApi.getProducts().then((res) => {
            setProducts(res.data);
            setProductsSort(res.data);
            entityApi.getStar(JSON.parse(localStorage.getItem('customer')).cid).then((starData) => {
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].favorite = '';
                    // eslint-disable-next-line no-plusplus
                    for (let j = 0; j < starData.data.length; j++) {
                        if (res.data[i].pid === starData.data[j].pid) {
                            res.data[i].favorite = starData.data[j].sid;
                        }
                    }
                }
                const queueTime = [];
                const queueCurrent = [];
                const queueNotice = [];
                const queueBig = [];
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].productName.indexOf('定期') !== -1) {
                        queueTime.push(res.data[i]);
                    } else if (res.data[i].productName.indexOf('活期') !== -1) {
                        queueCurrent.push(res.data[i]);
                    } else if (res.data[i].productName.indexOf('通知') !== -1) {
                        queueNotice.push(res.data[i]);
                    } else if (res.data[i].productName.indexOf('大额') !== -1) {
                        queueBig.push(res.data[i]);
                    }
                }
                setProductsBig(queueBig);
                setProductsCurrent(queueCurrent);
                setProductsNotice(queueNotice);
                setProductsTime(queueTime);
            });
        });
    }, []);
    return (
        <div>
            <AlertModel
                msg={msg}
                open={openStar}
                handleClose={handleCloseStar}
                /* eslint-disable-next-line react/jsx-no-bind */
                updateProductStar={updateProductStar}
            />
            <Grid container spacing={2}>
                <Grid item md={7.5} xs={12} sx={{ ml: 1 }}>
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <ComboBox updateProductSort={updateProductSort} />
                </Grid>
                <Grid item md={4} xs={12} sx={{ ml: 1 }}>
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <SearchProduct updateSearchProduct={updateSearchProduct} />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 0.3 }}>
                <BuyModel open={open} handleClose={handleClose} buyProduct={buyProduct} profileFlag={profileFlag} />
                {productsSort.map((product) => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid item key={product.pid} md={3} sm={6} xs={12}>
                        <Card>
                            <CardHeader
                                title={`名称:${product.productName}`}
                                subheader={product.subheader}
                                // titleTypographyProps={{ align: 'center' }}
                                action={
                                    <GridActionsCellItem
                                        icon={<StarOutlined color={product.favorite !== '' ? 'primary' : 'disabled'} />}
                                        label="Toggle Admin"
                                        onClick={() => {
                                            handleClickOpenStar(product);
                                        }}
                                    />
                                }
                                // subheaderTypographyProps={{
                                //     align: 'center'
                                // }}
                                sx={{
                                    backgroundColor: '#ffecb3'
                                }}
                            />
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex'
                                        // justifyContent: 'center',
                                        // alignItems: 'baseline'
                                        // mb: 2
                                    }}
                                >
                                    <Typography component="h2" variant="h3" color="text.primary">
                                        ￥{product.minAmount}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        /起存
                                    </Typography>
                                </Box>
                                <ul>
                                    <Typography component="li" variant="subtitle1">
                                        产品期限: {product.validityPeriod} 天
                                    </Typography>
                                    <Typography component="li" variant="subtitle1">
                                        年化利率: {Number(product.annualRate) * 100} %
                                    </Typography>
                                    <Typography component="li" variant="subtitle1">
                                        风险等级: {product.riskLevel} 级（数字越大风险越高）
                                    </Typography>
                                    <Typography component="li" variant="subtitle1">
                                        结息方式: {product.settlementMethod}
                                    </Typography>
                                </ul>
                                <GridActionsCellItem
                                    sx={{ position: 'relative', left: '89%' }}
                                    icon={<ShoppingCart />}
                                    label="Toggle Admin"
                                    onClick={() => handleOpen(product)}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert severity="warning" open={snackbarOpen} onClose={handleSnackbarClose}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}
