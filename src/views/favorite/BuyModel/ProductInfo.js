import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function ProductInfo({ buyProduct }) {
    return (
        <>
            <Typography variant="h4" gutterBottom>
                产品信息
            </Typography>
            <List disablePadding>
                <ListItem>
                    <ListItemText primary="产品名称" />
                    <Typography variant="body2">{buyProduct.productName}</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary="产品期限" />
                    <Typography variant="body2">{buyProduct.validityPeriod}天</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary="年化利率" />
                    <Typography variant="body2">{(Number(buyProduct.annualRate) * 100).toFixed(2)}%</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary="起存金额" />
                    <Typography variant="body2">{Number(buyProduct.minAmount)}￥</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary="递增金额" />
                    <Typography variant="body2">{Number(buyProduct.increAmount)}￥</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary="单人限额" />
                    <Typography variant="body2">{Number(buyProduct.singlePersonLimit)}￥</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary="单日限额" />
                    <Typography variant="body2">{Number(buyProduct.singleDayLimit)}￥</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary="风险等级" secondary="等级越高风险越大" />
                    <Typography variant="body2">{Number(buyProduct.riskLevel)}级</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary="结息方式" />
                    <Typography variant="body2">{buyProduct.settlementMethod}</Typography>
                </ListItem>
                <ListItem>
                    <ListItemText primary="备注：" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        请确认所要购买的产品信息
                    </Typography>
                </ListItem>
            </List>
        </>
    );
}

ProductInfo.propTypes = {
    buyProduct: PropTypes.object
};
