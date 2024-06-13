import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';;
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AccountCircleOutlined } from '@mui/icons-material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


let tostify = (Msg, Type) => {
    const Options = {
        position: "top-right",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    };

    toast[Type](Msg, Options);

}

function AdminLogin() {

    let history = useHistory();

    useEffect(() => {

        AOS.init();

    }, [])

    return (

        <Box>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={async (values, action) => {

                    axios.post("http://localhost:8000/admin/login", values)
                        .then((res) => {
                            console.log(res);
                            localStorage.setItem("ADMIN_TOKEN", res.data.TOKEN);
                            tostify(res.data.message, "success");
                            action.resetForm();

                            setTimeout(() => {
                                history.push("/admin/dashboard")
                            }, 1100);

                        })
                        .catch((err) => {
                            console.log(err.response.data.message);
                            tostify(err.response.data.message, "error");
                        })

                }}
            >
                <Form>

                    <Box data-aos="zoom-in" sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Container maxWidth="xl" sx={{ py: 10 }}>
                            <Grid container sx={{ boxShadow: "0px 0px 20px 1px gray", display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                                    <Box>
                                        <img src="../ADMIN_IMG2.jpg" alt="ERROR 404" style={{ width: "100%", height: "100%" }} />
                                    </Box>
                                </Grid>
                                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                                    <Box padding={{ xl: '0px 80px', lg: '0px 80px', md: '0px 80px', sm: '0px 80px', xs: "0px 30px" }} margin={{ xl: "none", lg: "none", md: "none", sm: "10px 0px 60px 0px", xs: "10px 0px 60px 0px" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 7, mb: 6, p: 1, border: "3px solid #1976d2d2", borderRadius: "10px" }} flexDirection={{ xl: "row", lg: "row", md: "row", sm: "row", xs: "column" }} >
                                            <AccountCircleOutlined sx={{ mr: 0.8, fontSize: "35px" }} />
                                            <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "" }}> ADMINISTARTION LOGIN</Typography>
                                        </Box>
                                        <Box>
                                            <Field as={TextField} name='email' type="email" hiddenLabel id="filled-hidden-label-normal1" variant="filled" placeholder='EXAMPLE@GMAIL.COM' sx={{ width: "100%" }} />
                                            <Field as={TextField} name='password' type='password' hiddenLabel id="filled-hidden-label-normal2" variant="filled" placeholder='PASSWORD' sx={{ width: "100%", mt: 3 }} />
                                        </Box>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="body1" color="initial" sx={{ textAlign: "right", mt: 3 }}> Forgot Password ? </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }} flexDirection={{ lg: "row", xl: "row", md: "column", sm: "column" }}>
                                            <Button variant="contained" fullWidth type='reset' >RESET</Button>
                                            <Button variant="contained" type='submit' fullWidth >LOG IN</Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>

                </Form>
            </Formik>
            <ToastContainer
                position="top-right"
                autoClose={1300}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </Box>
    )
}

export default AdminLogin;