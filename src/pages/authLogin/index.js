import { Box, Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import { TIME_OUT } from '../../Constant';
import { authLogin } from '../../redux/slices/authSlice';
import { loginSchema } from '../../validation/schema';

const token = "Bearer thisIsMyToken546542135796546354"

const AuthLogin = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [regisUser,setRegisUser] = useState()

  const { authToken, registered } = useSelector((state) => {
    return {
      authToken: state?.AuthLogin,
      registered: state?.SignupSlice?.users
    }
  })

  useEffect(() => {
    setRegisUser(JSON.parse(registered))
  }, [authToken,registered])

  
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: values => {
      console.log(96,values.email,regisUser.email,values.password,regisUser.password)
      if (values.email !== regisUser.email || values.password !== regisUser.password) {
        toast.error("Please try again")
      } else {
        setLoading(true)
        toast.success("Log in successfull")
        setTimeout(() => {
          dispatch(authLogin(token))
        }, TIME_OUT);
      }
    },
    validationSchema: loginSchema

  });
  return (<>
    <div className='form-style'>
      <Box sx={{
        mx: 'auto',
        width: "auto", m: 2, p: 1,
        borderRadius: '16px',
        backgroundColor: '#F0FFFF',
      }
      } >
        <form onSubmit={formik.handleSubmit}>
          <div className='heading'>
            <h1>Login Details</h1>
          </div>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <TextField label="Email"
                fullWidth
                sx={{ m: 1 }}
                type="text"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Password"
                fullWidth
                sx={{ m: 1 }}
                type="text"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center">
              <Button type="submit" variant="contained" color="success" disabled={loading}  >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
    <ToastContainer />

    {loading ? <BeatLoader color="#2d4dd7" style={{ marginLeft: "50%" }} /> : null}

  </>
  )
}

export default AuthLogin;