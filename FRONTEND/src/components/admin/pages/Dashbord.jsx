import React, { useEffect, useState } from 'react';
import AdminPanelMain from '../AdminPanelMain';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Divider } from '@mui/material';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import AssignmentReturnedRoundedIcon from '@mui/icons-material/AssignmentReturnedRounded';
import ApartmentRounded from '@mui/icons-material/ApartmentRounded';
import DashboardRounded from '@mui/icons-material/DashboardRounded';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import CountUp from 'react-countup';


function Dashbord() {

    let [Course, SetCourse] = useState([]);
    let [Student, SetStudent] = useState([]);
    let [Companies, SetCompanies] = useState([]);
    let [Interview, SetInterview] = useState([]);

    let TOKEN = localStorage.getItem("ADMIN_TOKEN");


    let COURSE_DATA = () => {
        axios.get("http://localhost:8000/course", {
            headers: {
                Authorization: TOKEN
            }
        })
            .then((res) => {
                SetCourse(res.data.COURSE_DATA);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let STUDENT_DATA = () => {
        axios.get("http://localhost:8000/student", {
            headers: {
                Authorization: TOKEN
            }
        })
            .then((res) => {
                SetStudent(res.data.STUDENT_DATA);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let COMPANY_DATA = () => {
        axios.get("http://localhost:8000/company", {
            headers: {
                Authorization: TOKEN
            }
        })
            .then((res) => {
                SetCompanies(res.data.COMPANY_DATA);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let INTERVIEW_DATA = () => {
        axios.get("http://localhost:8000/interview", {
            headers: {
                Authorization: TOKEN
            }
        })
            .then((res) => {
                SetInterview(res.data.INTERVIEW_DATA);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    useEffect(() => {
        AOS.init();
        COURSE_DATA();
        STUDENT_DATA();
        COMPANY_DATA();
        INTERVIEW_DATA();
    }, [])


    return (
        <Box sx={{ display: "flex", mt: 8 }} >
            <AdminPanelMain />
            <Box sx={{ flexGrow: 1, p: 5 }}>
                <Box data-aos="fade-down" sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 4, py: 1, backgroundColor: "#1976d2d2", borderRadius: "5px" }}>
                    <DashboardRounded sx={{ fontSize: "30px", mr: 1, color: "white" }} />
                    <Typography variant="h5" sx={{ color: "white" }}>DASH BOARD</Typography>
                </Box>
                <Grid container spacing={6} data-aos="fade-up">
                    <Grid item xl={4} lg={4} md={6} sm={12}>
                        <Card sx={{ minWidth: "250px" }}>
                            <CardActionArea>
                                <CardContent sx={{ textAlign: "center" }} className='BgCard'>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ mb: 1.5, lineHeight: 0 }}>
                                        <StyleRoundedIcon sx={{ fontSize: "40px" }} />
                                        <Typography sx={{ my: 1 }} variant='h6' color="white"> COURES </Typography>
                                    </Typography>
                                    <Divider sx={{ backgroundColor: "white", my: 1 }} />
                                    <Typography variant="h4">
                                        <CountUp start={0} end={Course.length} duration={1} />
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} sm={12}>
                        <Card sx={{ minWidth: "250px" }}>
                            <CardActionArea>
                                <CardContent sx={{ textAlign: "center" }} className='BgCard'>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ mb: 1.5, lineHeight: 0 }}>
                                        <SchoolRoundedIcon sx={{ fontSize: "40px" }} />
                                        <Typography sx={{ my: 1 }} variant='h6' color="white"> STUDENTS </Typography>
                                    </Typography>
                                    <Divider sx={{ backgroundColor: "white", my: 1 }} />
                                    <Typography variant="h4">
                                        <CountUp start={0} end={Student.length} duration={1} />
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} sm={12}>
                        <Card sx={{ minWidth: "250px" }}>
                            <CardActionArea>
                                <CardContent sx={{ textAlign: "center" }} className='BgCard'>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ mb: 1.5, lineHeight: 0 }}>
                                        <ApartmentRounded sx={{ fontSize: "40px" }} />
                                        <Typography sx={{ my: 1 }} variant='h6' color="white"> COMPANIES </Typography>
                                    </Typography>
                                    <Divider sx={{ backgroundColor: "white", my: 1 }} />
                                    <Typography variant="h4">
                                        <CountUp start={0} end={Companies.length} duration={1} />
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} sm={12}>
                        <Card sx={{ minWidth: "250px" }}>
                            <CardActionArea>
                                <CardContent sx={{ textAlign: "center" }} className='BgCard'>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ mb: 1.5, lineHeight: 0 }}>
                                        <AssignmentReturnedRoundedIcon sx={{ fontSize: "40px" }} />
                                        <Typography sx={{ my: 1 }} variant='h6' color="white"> INTERVIEWS </Typography>
                                    </Typography>
                                    <Divider sx={{ backgroundColor: "white", my: 1 }} />
                                    <Typography variant="h4">
                                        <CountUp start={0} end={Interview.length} duration={1} />
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Dashbord;