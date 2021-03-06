import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProductInfo from './ProductInfo';
import CustomerInfo from './CustomerInfo';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ConductorApi, EntityApi } from '../../../api/restful';
import sha1 from 'js-sha1';

const steps = ['产品信息', '填写信息'];

export default function BuyModel({ open, handleClose, buyProduct, profileFlag }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [orderStatus, setOrderStatus] = React.useState(-1);
    const [phoneNum, setPhoneNum] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [payment, setPayment] = React.useState('');
    const [resultMsg, setRusultMsg] = React.useState('');
    function getStepContent(step) {
        switch (step) {
            case 0:
                return <ProductInfo buyProduct={buyProduct} />;
            case 1:
                return (
                    <CustomerInfo setPhoneNum={setPhoneNum} setPassword={setPassword} setPayment={setPayment} profileFlag={profileFlag} />
                );
            default:
                throw new Error('Unknown step');
        }
    }
    const handleNext = () => {
        setActiveStep(activeStep + 1);
        if (activeStep + 1 === steps.length) {
            setOrderStatus(0);
            const entityApi = new EntityApi(localStorage.getItem('customer_token'));
            const date = new Date().getTime();
            const orderData = {
                pid: buyProduct.pid,
                cid: JSON.parse(localStorage.getItem('customer')).cid,
                payment,
                orderDate: date,
                expireDate: date + Number(buyProduct.validityPeriod) * 86400000,
                phoneNum,
                password: sha1(password)
            };
            setPassword('');
            setPhoneNum('');
            // console.log(orderData);
            entityApi.addOrder(orderData).then((res) => {
                // console.log(res.data);
                if (res.status === 200) {
                    const socket = new WebSocket(`ws://conductor.rinne.top:10451/websocket/${res.data.msg}`);
                    socket.addEventListener('message', (event) => {
                        // console.log(event);
                        if (event.data !== '连接成功') {
                            const conductor = new ConductorApi();
                            conductor.startQuery(event.data).then((re) => {
                                // console.log(re);
                                if (re.data.status === 'COMPLETED') {
                                    setOrderStatus(1);
                                    entityApi.updateOrder({ oid: res.data.msg, workflowId: event.data, status: 1 }).then((r) => {
                                        console.log(r);
                                        socket.close();
                                    });
                                } else {
                                    setOrderStatus(2);
                                    // console.log(re.data.tasks);
                                    // eslint-disable-next-line no-plusplus
                                    for (let i = 0; i < re.data.tasks.length; i++) {
                                        if (re.data.tasks[i].status !== 'COMPLETED') {
                                            if (re.data.tasks[i].taskDefName.indexOf('Region') !== -1) {
                                                setRusultMsg('您所在的地域不符合条件！');
                                            } else if (re.data.tasks[i].taskDefName.indexOf('Profile') !== -1) {
                                                setRusultMsg('您的手机号或者密码错误！');
                                            } else if (re.data.tasks[i].taskDefName.indexOf('Credential') !== -1) {
                                                setRusultMsg('您的身份证号错误！');
                                            } else {
                                                setRusultMsg('您不在购买人群范围内！');
                                            }
                                            break;
                                        }
                                    }
                                    entityApi.updateOrder({ oid: res.data.msg, workflowId: event.data, status: 2 }).then((r) => {
                                        console.log(r);
                                        socket.close();
                                    });
                                }
                            });
                        }
                        // console.log('Message from server ', event.data);
                        // if (event.data) {
                        //     setOrderStatus(1);
                        // } else {
                        //     setOrderStatus(2);
                        // }
                    });
                    // socket.addEventListener('open', () => {
                    //     socket.send(res.data.msg);
                    // });
                }
            });
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const restore = () => {
        setActiveStep(0);
        setOrderStatus(-1);
        handleClose();
    };

    React.useEffect(() => {}, []);
    return (
        <Dialog open={open} fullWidth onClose={restore}>
            <DialogTitle id="scroll-dialog-title">
                <Paper sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
                    <Typography variant="h2" align="center">
                        购买
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 1, pb: 1 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>
            </DialogTitle>
            <PerfectScrollbar
                component="div"
                sx={{
                    height: '100%',
                    paddingLeft: '16px',
                    paddingRight: '16px'
                }}
            >
                <DialogContent dividers>
                    <>
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {activeStep === steps.length ? (
                            // eslint-disable-next-line no-nested-ternary
                            orderStatus === 0 ? (
                                <CircularProgress sx={{ ml: 32 }} />
                            ) : orderStatus === 1 ? (
                                <Typography variant="h4" align="center">
                                    您的订单生成成功
                                </Typography>
                            ) : (
                                <Typography variant="h4" align="center">
                                    您的订单生成失败,{resultMsg}
                                </Typography>
                            )
                        ) : (
                            <>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Box sx={{ position: 'relative', height: '80%' }}>{getStepContent(activeStep)}</Box>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </>
                </DialogContent>
            </PerfectScrollbar>
            {orderStatus === -1 ? (
                <DialogActions>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {activeStep !== 0 && (
                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                上一步
                            </Button>
                        )}

                        <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                            {activeStep === steps.length - 1 ? '确认' : '下一步'}
                        </Button>
                    </Box>
                </DialogActions>
            ) : (
                ''
            )}
        </Dialog>
    );
}

BuyModel.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    handleClose: PropTypes.func.isRequired,
    // onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    buyProduct: PropTypes.object,
    profileFlag: PropTypes.bool
};
