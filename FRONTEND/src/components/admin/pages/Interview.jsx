import AssignmentReturnedRoundedIcon from '@mui/icons-material/AssignmentReturnedRounded';
import AdminPanelMain from '../AdminPanelMain';
import Box from '@mui/material/Box';
import SchoolRounded from '@mui/icons-material/SchoolRounded';
import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles'
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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


function interview() {

    const [open, setOpen] = React.useState(false);

    let [Interview, SetInterview] = useState([]);

    let [InitialValues, SetInitialValues] = useState({
        company_content: "",
        student_content: "",
        description: ""
    });

    let [UpdateID, SetUpdateID] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    let [Course, SetCourse] = useState([]);
    let [Companies, SetCompanies] = useState([]);
    let [Student, SetStudent] = useState([]);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let INTERVIEW_DATA = () => {
        axios.get("http://localhost:8000/interview", {
            headers: {
                Authorization: localStorage.getItem("ADMIN_TOKEN")
            }
        })
            .then((res) => {
                SetInterview(res.data.INTERVIEW_DATA);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let DELETE_HANDLER = (Delete_ID) => {

        axios.delete("http://localhost:8000/interview/" + Delete_ID, {
            headers: {
                Authorization: localStorage.getItem("ADMIN_TOKEN")
            }
        })
            .then((res) => {
                console.log(res);
                tostify(res.data.message, 'success');
                INTERVIEW_DATA();
            })
            .catch((err) => {
                console.log(err);
            })

    }

    let EDIT_HANDLER = (Edit_DATA, Edit_ID) => {
        handleClickOpen();
        SetInitialValues({

            company_content: Edit_DATA.company_content._id,
            student_content: Edit_DATA.student_content._id,
            status: Edit_DATA.status,
            description: Edit_DATA.description

        });
        SetUpdateID(Edit_ID);
    }

    let COURSE_DATA = () => {
        axios.get("http://localhost:8000/course", {
            headers: {
                Authorization: localStorage.getItem("ADMIN_TOKEN")
            }
        })
            .then((res) => {
                SetCourse(res.data.COURSE_DATA);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let COMPANY_DATA = () => {
        axios.get("http://localhost:8000/company", {
            headers: {
                Authorization: localStorage.getItem("ADMIN_TOKEN")
            }
        })
            .then((res) => {
                SetCompanies(res.data.COMPANY_DATA);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let STUDENT_DATA = () => {
        axios.get("http://localhost:8000/student", {
            headers: {
                Authorization: localStorage.getItem("ADMIN_TOKEN")
            }
        })
            .then((res) => {
                SetStudent(res.data.STUDENT_DATA);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {

        AOS.init();
        INTERVIEW_DATA();
        COURSE_DATA();
        COMPANY_DATA();
        STUDENT_DATA()
    }, [])

    return (
        <Box sx={{ display: "flex", mt: 8 }}>
            <AdminPanelMain />
            <Box sx={{ flexGrow: 1, p: 5 }}>
                <Box data-aos="fade-down" sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 4, py: 1, backgroundColor: "#1976d2d2", borderRadius: "5px" }}>
                    <AssignmentReturnedRoundedIcon sx={{ fontSize: "30px", mr: 1.5, color: "white" }} />
                    <Typography variant="h5" color={"white"} >INTERVIEWS</Typography>
                </Box>
                <Box data-aos="fade-up" >
                    <React.Fragment>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 5, rowGap: 3 }} flexDirection={{ xl: "row", lg: "row", md: "row", sm: "column", xs: "column" }}>
                            <Box>
                                <Button variant="contained" sx={{ backgroundColor: "#1976d2d2", py: 1.2, height: "56px", width: { xl: "250px", lg: "250px", md: "300px", sm: "555px", xs: "365px" } }} onClick={handleClickOpen}>
                                    <SchoolRounded sx={{ fontSize: "26px", mr: 1 }} />
                                    <Typography sx={{ textWrap: "nowrap", fontSize: "20px" }} >ADD INTERVIEWs</Typography>
                                </Button>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <ManageSearchIcon sx={{ border: "2px solid #1976d2", color: "rgba(0, 0, 0, 0.75)", fontSize: "56px", borderRadius: "5px", mr: 1.5, p: 0.8 }} />
                                <TextField onChange={(e) => setSearchQuery(e.target.value)} placeholder='COMPNAY / STUDENT INTERVIEW' id="" label="" sx={{ borderRadius: "5px", width: { xl: "300px", lg: "300px", md: "300px", sm: "485px", xs: "300px" } }} focused />
                            </Box>
                        </Box>
                        <Dialog
                            fullScreen={fullScreen}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title">
                            <Box sx={{ p: 6, width: "100%" }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 4 }}>
                                    <SchoolRounded sx={{ fontSize: "30px", mr: 1.5, color: "black" }} />
                                    <Typography variant="h6" color={"black"} > ADD INTERVIEW </Typography>
                                </Box>
                                <Box>
                                    <Formik
                                        initialValues={InitialValues}
                                        enableReinitialize
                                        onSubmit={async (values, action) => {


                                            if (UpdateID) {

                                                axios.put("http://localhost:8000/interview/" + UpdateID, values, {
                                                    headers: {
                                                        Authorization: localStorage.getItem("ADMIN_TOKEN")
                                                    }
                                                })
                                                    .then((res) => {

                                                        console.log(res);
                                                        tostify(res.data.message, 'success');
                                                        INTERVIEW_DATA();
                                                        handleClose();
                                                        action.resetForm();

                                                    })
                                                    .catch((err) => {
                                                        console.log(err);
                                                        tostify(err.response.data.message, 'error')

                                                    })

                                                SetUpdateID(null);
                                                SetInitialValues({
                                                    student_name: "",
                                                    contact: "",
                                                    course_content: "",
                                                    branch: "",
                                                    experience: "",
                                                    description: ""
                                                });

                                            } else {

                                                axios.post("http://localhost:8000/interview/add", values, {
                                                    headers: {
                                                        Authorization: localStorage.getItem("ADMIN_TOKEN")
                                                    }
                                                })
                                                    .then((res) => {

                                                        console.log(res);
                                                        action.resetForm();
                                                        handleClose();
                                                        tostify(res.data.message, 'success');
                                                        INTERVIEW_DATA();

                                                    })
                                                    .catch((err) => {
                                                        console.log(err);
                                                        tostify(err.response.data.message, 'error')

                                                    })

                                            }
                                        }}
                                    >
                                        <Form>
                                            <Box sx={{ display: "flex", flexDirection: "column" }}>

                                                <label htmlFor="company_content">COMPANY NAME</label>
                                                <FormControl fullWidth sx={{ my: 2.5 }}>
                                                    <InputLabel id="company_content">SELECT COMPANY HERE</InputLabel>
                                                    <Field as={Select} name="company_content" label="SELECT COMPANY HERE">
                                                        {
                                                            Companies.map((el, index) => {
                                                                return (
                                                                    <MenuItem key={index} value={el._id}>{el.company_name}</MenuItem>
                                                                )
                                                            })
                                                        }
                                                    </Field>
                                                </FormControl>

                                                <label htmlFor="student_content">STUDENT NAME</label>
                                                <FormControl fullWidth sx={{ my: 2.5 }}>
                                                    <InputLabel id="student_content">SELECT STUDENT HERE</InputLabel>
                                                    <Field as={Select} name="student_content" label="SELECT STUDENT HERE">
                                                        {
                                                            Student.map((el, index) => {
                                                                return (
                                                                    <MenuItem key={index} value={el._id}>{el.student_name}</MenuItem>
                                                                )
                                                            })
                                                        }
                                                    </Field>
                                                </FormControl>

                                                <Box display={UpdateID ? 'block' : 'none'}>
                                                    <label htmlFor="status">SELECT STATUS</label>
                                                    <FormControl fullWidth sx={{ my: 2.5 }}>
                                                        <InputLabel id="status">SELECT STATUS HERE</InputLabel>
                                                        <Field as={Select} name="status" label="SELECT STATUS HERE">
                                                            <MenuItem value="Pending">PANDING</MenuItem>
                                                            <MenuItem value="Reject">REJECT</MenuItem>
                                                            <MenuItem value="Done">DONE</MenuItem>
                                                        </Field>
                                                    </FormControl>
                                                </Box>

                                                <label htmlFor="description">DESCRIPTION</label>
                                                <Field as={TextField} id="description" name="description" placeholder="ENTER DESCRIPTION HERE" style={{ width: "485px", margin: "10px 0px 15px 0px" }} />

                                            </Box>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3, mt: 4 }} flexDirection={{ lg: "row", xl: "row", md: "column", sm: "column" }}>
                                                <Button variant="contained" type='reset' fullWidth > RESET </Button>
                                                <Button variant="contained" type='submit' fullWidth > {UpdateID ? 'UPDATE INTERVIEW' : 'ADD INTERVIEW'} </Button>
                                            </Box>
                                        </Form>
                                    </Formik>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1.5, mx: 1.5 }}>
                                <Button onClick={handleClose} autoFocus>
                                    CLOSE
                                </Button>
                            </Box>
                        </Dialog>
                    </React.Fragment>
                </Box>
                <Box data-aos="fade-up" >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#1976d2d2" }}>
                                    <TableCell sx={{ color: "white", fontSize: "16px" }} align="center">INDEX</TableCell>
                                    <TableCell sx={{ color: "white", fontSize: "16px" }} align="left">COMPANY NAME</TableCell>
                                    <TableCell sx={{ color: "white", fontSize: "16px" }} align="left">STUDENT NAME</TableCell>
                                    <TableCell sx={{ color: "white", fontSize: "16px" }} align="left">FOLLOW UPDATE</TableCell>
                                    <TableCell sx={{ color: "white", fontSize: "16px" }} align="left">STATUS</TableCell>
                                    <TableCell sx={{ color: "white", fontSize: "16px" }} align="left">DESCRIPTION</TableCell>
                                    <TableCell sx={{ color: "white", fontSize: "16px" }} align="center">EDIT</TableCell>
                                    <TableCell sx={{ color: "white", fontSize: "16px" }} align="center">DELETE</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Interview.filter((items) => {
                                        if (searchQuery === "") {
                                            return items
                                        }
                                        else if (items.company_content.company_name.toLowerCase().includes(searchQuery.toLowerCase()) || items.student_content.student_name.toLowerCase().includes(searchQuery.toLowerCase())) {
                                            return items
                                        }
                                    })
                                        .map((el, index) => {
                                            return (
                                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell component="th" scope="row" align='center'> {index + 1} </TableCell>
                                                    <TableCell align="left">{el.company_content.company_name}</TableCell>
                                                    <TableCell align="left">{el.student_content.student_name}</TableCell>
                                                    <TableCell align="left">{el.follow_update}</TableCell>
                                                    <TableCell align="left" sx={{ textTransform: "uppercase" }}>{el.status}</TableCell>
                                                    <TableCell align="left">{el.description}</TableCell>
                                                    <TableCell align="center"><Button startIcon={<EditIcon />} sx={{ backgroundColor: "#1976d2d2" }} variant='contained' onClick={() => EDIT_HANDLER(el, el._id)}>EDIT </Button></TableCell>
                                                    <TableCell align="center"><Button startIcon={<DeleteIcon />} sx={{ backgroundColor: "#1976d2d2" }} variant='contained' onClick={() => DELETE_HANDLER(el._id)}> DELETE </Button></TableCell>
                                                </TableRow>
                                            )
                                        })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    )
}

export default interview;