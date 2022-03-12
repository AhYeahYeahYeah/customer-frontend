import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardHeader, Grid } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ShoppingCart, StarOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { EntityApi } from '../../api/restful';
import ComboBox from './ComboBox';
import SearchProduct from './SearchProduct';
import BuyModel from './BuyModel';

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

    const handleOpen = (value) => {
        // console.log(JSON.parse(localStorage.getItem('customer')));
        setBuyProduct(value);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function updateProductSort(value) {
        console.log(value);
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
        console.log(value);
        if (value === '') {
            console.log();
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
            console.log(res.data);
            const queueTime = [];
            const queueCurrent = [];
            const queueNotice = [];
            const queueBig = [];
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].favorite = false;
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
    }, []);
    return (
        <div>
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
                <BuyModel open={open} handleClose={handleClose} buyProduct={buyProduct} />
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
                                        icon={<StarOutlined color={product.favorite ? 'disabled' : 'primary'} />}
                                        label="Toggle Admin"
                                        onClick={() => {
                                            product.favorite = !product.favorite;
                                            console.log(product.favorite);
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
        </div>
    );
}
