import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { AppRegistration, Login } from '@mui/icons-material';
import img from '../../assets/images/shouji1.png';
import LogoSection from '../../layout/MainLayout/LogoSection';

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}.
//         </Typography>
//     );
// }

const theme = createTheme();

export default function RootPage() {
    // eslint-disable-next-line camelcase
    const [loading_l, setLoading_l] = React.useState(false);
    // eslint-disable-next-line camelcase
    function handleClick_l() {
        setLoading_l(true);
        window.location.href = '/login';
        setLoading_l(false);
    }

    // eslint-disable-next-line camelcase
    const [loading_r, setLoading_r] = React.useState(false);
    // eslint-disable-next-line camelcase
    function handleClick_r() {
        setLoading_r(true);
        window.location.href = '/register';
        setLoading_r(false);
    }
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Box component="span" sx={{ position: 'fixed', top: '2%', ml: 2 }}>
                    <LogoSection />
                </Box>
                <Grid item xs={12} sm={12} md={6.5} sx={{ background: 'white' }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Grid container sx={{ mt: 30 }}>
                            <LoadingButton
                                /* eslint-disable-next-line camelcase,react/jsx-no-bind */
                                onClick={handleClick_l}
                                endIcon={<Login />}
                                /* eslint-disable-next-line camelcase */
                                loading={loading_l}
                                loadingPosition="end"
                                variant="contained"
                                sx={{ left: '15%', borderRadius: 15, width: 120, height: 50 }}
                                size="large"
                                color="primary"
                            >
                                登 录
                            </LoadingButton>

                            <LoadingButton
                                /* eslint-disable-next-line camelcase,react/jsx-no-bind */
                                onClick={handleClick_r}
                                endIcon={<AppRegistration />}
                                /* eslint-disable-next-line camelcase */
                                loading={loading_r}
                                loadingPosition="end"
                                variant="outlined"
                                sx={{
                                    left: '32%',
                                    borderRadius: 15,
                                    width: 120,
                                    height: 50
                                }}
                                size="large"
                                color="success"
                            >
                                注 册
                            </LoadingButton>
                        </Grid>
                        {/* <Copyright sx={{ mt: 30 }} /> */}
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={false}
                    md={5.5}
                    sx={{
                        backgroundImage: `url(${img})`,
                        backgroundRepeat: 'no-repeat',
                        // backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                {/* <Box sx={{ mt: 9.5, ml: 8 }}> */}
                {/*    <img src={img} alt="" /> */}
                {/* </Box> */}
            </Grid>
        </ThemeProvider>
    );
}
