import React, { useEffect, useState } from 'react';
import AdminPanelMain from '../AdminPanelMain';
import Box from '@mui/material/Box';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
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

function Course() {


  const [open, setOpen] = React.useState(false);
  let [Course, SetCourse] = useState([]);

  let [InitialValues, SetInitialValues] = useState({ course_name: '' });

  let [UpdateID, SetUpdateID] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  let DELETE_HANDLER = (Delete_ID) => {

    axios.delete("http://localhost:8000/course/" + Delete_ID, {
      headers: {
        Authorization: localStorage.getItem("ADMIN_TOKEN")
      }
    })
      .then((res) => {
        console.log(res);
        tostify(res.data.message, 'success');
        COURSE_DATA();
      })
      .catch((err) => {
        console.log(err);
      })

  }

  let EDIT_HANDLER = (Edit_DATA, Edit_ID) => {
    handleClickOpen();
    SetInitialValues(Edit_DATA);
    SetUpdateID(Edit_ID);
  }

  useEffect(() => {

    AOS.init();
    COURSE_DATA();
  }, [])

  return (
    <Box sx={{ display: "flex", mt: 8 }}>
      <AdminPanelMain />
      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Box data-aos="fade-down" sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 4, py: 1, backgroundColor: "#1976d2d2", borderRadius: "5px" }}>
          <StyleRoundedIcon sx={{ fontSize: "30px", mr: 1, color: "white" }} />
          <Typography variant="h5" color={"white"} >COURSES</Typography>
        </Box>
        <Box data-aos="fade-up" >
          <React.Fragment>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 5, rowGap: 3 }} flexDirection={{ xl: "row", lg: "row", md: "row", sm: "column", xs: "column" }}>
              <Box>
                <Button variant="contained" sx={{ backgroundColor: "#1976d2d2", py: 1.2, height: "56px", width: { xl: "250px", lg: "250px", md: "300px", sm: "555px", xs: "365px" } }} onClick={handleClickOpen}>
                  <StyleRoundedIcon sx={{ fontSize: "26px", mr: 1 }} />
                  <Typography sx={{ textWrap: "nowrap", fontSize: "20px" }} >ADD COURSES</Typography>
                </Button>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ManageSearchIcon sx={{ border: "2px solid #1976d2", color: "rgba(0, 0, 0, 0.75)", fontSize: "56px", borderRadius: "5px", mr: 1.5, p: 0.8 }} />
                <TextField onChange={(e) => setSearchQuery(e.target.value)} placeholder='SEARCH COURSE HERE' id="" label="" sx={{ borderRadius: "5px", width: { xl: "300px", lg: "300px", md: "300px", sm: "485px", xs: "300px" } }} focused />
              </Box>
            </Box>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title">
              <Box sx={{ p: 6, width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 4 }}>
                  <StyleRoundedIcon sx={{ fontSize: "30px", mr: 1.5, color: "black" }} />
                  <Typography variant="h6" color={"black"} > ADD COURSES </Typography>
                </Box>
                <Box>
                  <Formik
                    initialValues={InitialValues}
                    enableReinitialize
                    onSubmit={async (values, action) => {


                      if (UpdateID) {

                        axios.put("http://localhost:8000/course/" + UpdateID, values, {
                          headers: {
                            Authorization: localStorage.getItem("ADMIN_TOKEN")
                          }
                        })
                          .then((res) => {

                            console.log(res);
                            tostify(res.data.message, 'success');
                            COURSE_DATA();
                            handleClose();
                            action.resetForm();

                          })
                          .catch((err) => {
                            console.log(err);
                            tostify(err.response.data.message, 'error')

                          })

                        SetUpdateID(null);
                        SetInitialValues({ course_name: '' });

                      } else {

                        axios.post("http://localhost:8000/course/add", values, {
                          headers: {
                            Authorization: localStorage.getItem("ADMIN_TOKEN")
                          }
                        })
                          .then((res) => {

                            console.log(res);
                            action.resetForm();
                            handleClose();
                            tostify(res.data.message, 'success');
                            COURSE_DATA();

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
                        <label htmlFor="course_name">COURSE NAME</label>
                        <Field as={TextField} id="course_name" name="course_name" placeholder="ENTER COURSE NAME" style={{ width: "500px", margin: "10px 0px 0px 0px" }} />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3, mt: 4 }} flexDirection={{ lg: "row", xl: "row", md: "column", sm: "column" }}>
                        <Button variant="contained" type='reset' fullWidth > RESET </Button>
                        <Button variant="contained" type='submit' fullWidth > {UpdateID ? 'UPDATE COURSE' : 'ADD COURSE'} </Button>
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
                  <TableCell sx={{ color: "white", fontSize: "16px" }} align="left">COURSES</TableCell>
                  <TableCell sx={{ color: "white", fontSize: "16px" }} align="center">EDIT</TableCell>
                  <TableCell sx={{ color: "white", fontSize: "16px" }} align="center">DELETE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  Course.filter((items) => {
                    if (searchQuery === "") {
                      return items
                    }
                    else if (items.course_name.toLowerCase().includes(searchQuery.toLowerCase())) {
                      return items
                    }
                  })
                    .map((el, index) => {
                      return (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row" align='center'> {index + 1} </TableCell>
                          <TableCell align="left">{el.course_name}</TableCell>
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

export default Course;