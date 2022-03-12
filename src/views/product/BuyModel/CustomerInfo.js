import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

export default function CustomerInfo({ setPhoneNum, setPayment, setPassword }) {
    return (
        <>
            <Typography variant="h4" gutterBottom>
                填写您的信息
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="phoneNum"
                        label="手机号"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setPhoneNum(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="password"
                        label="密码"
                        fullWidth
                        variant="standard"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        required
                        id="payment"
                        label="购买金额"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setPayment(e.target.value)}
                    />
                </Grid>
            </Grid>
        </>
    );
}

CustomerInfo.propTypes = {
    setPassword: PropTypes.func,
    setPhoneNum: PropTypes.func,
    setPayment: PropTypes.func
};
