import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Paper } from '@mui/material';
import { Box } from '@mui/system';
import AdapterDateFns from '@mui/lab/modern/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import City from './tool/City';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { EntityApi } from '../../../../api/restful';

// eslint-disable-next-line react/prop-types
export default function FormDialog({ open, handleClose, customer }) {
    const [value, setValue] = useState('');
    const [data, setData] = useState('');
    const [customerProfile, setCustomerProfile] = useState({});
    const [sid, setSid] = useState('');
    const [nickName, setNickName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [cardNum, setCardNum] = useState('');
    const handleCityChange = (value) => {
        setData(value);
    };
    const handleSubmit = () => {
        // eslint-disable-next-line no-use-before-define
        const queue = customerProfile.address.trim().split(/\s+/);
        // eslint-disable-next-line no-unreachable
        const customerBase = {
            // eslint-disable-next-line react/prop-types
            cid: customer.cid,
            nickName
        };
        const customerPro = {
            // eslint-disable-next-line react/prop-types
            cid: customer.cid,
            sid,
            birthday: value,
            phoneNum,
            // eslint-disable-next-line no-nested-ternary
            address: `${data.province === undefined ? queue[0] : data.province === '' ? queue[0] : data.province} ${
                // eslint-disable-next-line no-nested-ternary
                data.city === undefined ? queue[1] : data.city === '' ? queue[1] : data.city
                // eslint-disable-next-line no-nested-ternary
            } ${data.country === undefined ? queue[2] : data.country === '' ? queue[2] : data.country}`,
            cardNum
        };
        const entityApi = new EntityApi(localStorage.getItem('customer_token'));
        entityApi.updateCustomer(customerBase).then();
        entityApi.updateCustomerProfile(customerPro).then();
        entityApi.getCustomerProfile(JSON.parse(localStorage.getItem('customer')).cid).then((res) => {
            setCustomerProfile(res.data[0]);
            setData('');
            handleClose();
        });
    };
    useEffect(() => {
        const entityApi = new EntityApi(localStorage.getItem('customer_token'));
        entityApi.getCustomerProfile(JSON.parse(localStorage.getItem('customer')).cid).then((res) => {
            if (res.status === 200) {
                setCustomerProfile(res.data[0]);
                setValue(res.data[0].birthday);
                setData(res.data[0].address);
            }
        });
    }, [open]);
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>用户详细信息</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            '& .MuiTextField-root': { m: 2, width: '30ch' },
                            '& .MuiPaper-root': { m: 2.0 },
                            '& .MuiAvatar-root': { m: 1.5 }
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            {/* eslint-disable-next-line react/prop-types */}
                            <Avatar alt="Remy Sharp" src={customer.avatar} sx={{ borderSpacing: 10 }} />
                            <Grid container>
                                <Grid item xs={6}>
                                    {/* eslint-disable-next-line react/prop-types */}
                                    <TextField disabled name="account" label="账号" defaultValue={customer.account} />
                                </Grid>
                                <Grid item xs={6}>
                                    {/* eslint-disable-next-line react/prop-types */}
                                    <TextField disabled name="cname" label="姓名" defaultValue={customer.cname} />
                                </Grid>
                                <Grid item xs={6}>
                                    {/* eslint-disable-next-line react/prop-types */}
                                    <TextField
                                        name="nickname"
                                        label="昵称"
                                        /* eslint-disable-next-line react/prop-types */
                                        defaultValue={customer.nickName}
                                        onChange={(e) => setNickName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    {/* eslint-disable-next-line react/prop-types */}
                                    <TextField
                                        name="sid"
                                        label="身份证号"
                                        defaultValue={customerProfile.sid}
                                        onChange={(e) => setSid(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    {/* eslint-disable-next-line react/prop-types */}
                                    <TextField
                                        name="phonenum"
                                        label="手机号"
                                        defaultValue={customerProfile.phoneNum}
                                        onChange={(e) => setPhoneNum(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="出生日期"
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        name="cardnum"
                                        label="银行卡号"
                                        defaultValue={customerProfile.cardNum}
                                        onChange={(e) => setCardNum(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper variant="outlined" sx={{ width: 290 }}>
                                        <div>
                                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,react/style-prop-object */}
                                            <label style={{ fontSize: 9, color: '#6c6262', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                                                &nbsp;&nbsp;&nbsp;家庭住址
                                            </label>
                                        </div>
                                        <div>
                                            <Card variant="outlined" sx={{ width: 50 }}>
                                                <City cityName={data} callbackParent={handleCityChange} />
                                            </Card>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleSubmit}>保存</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

FormDialog.protoTypes = {
    handleClose: PropTypes.func,
    open: PropTypes.bool,
    customer: PropTypes.object,
    customerProfile: PropTypes.object
};
