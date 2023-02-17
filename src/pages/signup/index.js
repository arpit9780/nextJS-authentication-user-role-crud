import { Box, Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import { appRoutes, TIME_OUT } from '../../Constant';
import { registerUser } from '../../redux/slices/signupSlice';
import { signupSchema } from '../../validation/schema';

const UserSignup = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  

  const formik = useFormik({
    initialValues: { fullName:'', email: '', password: '',confirmPassword:'', },
    onSubmit: values => {
        setLoading(true)
        toast.success("Signup successfull")
        setTimeout(() => {
            dispatch(registerUser(values))
            router.push(appRoutes.AUTH_LOGIN)
        }, TIME_OUT);
      },
      validationSchema: signupSchema
    })
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
            <h1>Sign up Details</h1>
          </div>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
            <TextField label="Full Name"
                fullWidth
                sx={{ m: 1 }}
                type="text"
                name="fullName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
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
              <TextField label="Confirm Password"
                fullWidth
                sx={{ m: 1 }}
                type="text"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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

export default UserSignup;