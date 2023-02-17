import { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { Box, Button, Grid, MenuItem, Paper, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, userList } from '../../redux/slices/userSlice';
import { UserSchema } from '../../validation/schema';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { BeatLoader } from 'react-spinners';
import { appRoutes, TIME_OUT } from '../../Constant';

const UserForm = () => {
    const { query, push } = useRouter()
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)

    const { roles, users } = useSelector((state) => {
        return {
            roles: state?.RoleReducer?.roleList,
            users: state?.UserReducer?.usersList
        }
    })

    useEffect(() => {
        if (query.id !== undefined) {
            let current_obj = users[query.id]
            formik.setFieldValue("name", current_obj?.name)
            formik.setFieldValue("email", current_obj?.email)
            formik.setFieldValue("rolelabel", current_obj?.rolelabel)
            formik.setFieldValue("username", current_obj?.username)
            formik.setFieldValue("mobile", current_obj?.mobile)
        }
    }, [query])
    const formik = useFormik({
        initialValues: { name: '', email: '', password: '', username: '', mobile: '', rolelabel: '' },
        onSubmit: (values) => {
            if (query.id !== undefined) {
                let payload = [query.id, values]
                toast.success('Updated User')
                setLoading(true)
                setTimeout(() => {
                    dispatch(editUser(payload))
                    push(appRoutes.USER_LIST)
                    setLoading(false)
                }, TIME_OUT);
            }
            else {
                toast.success('Created User')
                setLoading(true)
                setTimeout(() => {
                    dispatch(userList(values))
                    push(appRoutes.USER_LIST)
                    setLoading(false)
                }, TIME_OUT)
            } 
        },
        validationSchema: UserSchema
    });


    return (
        <div className='form-style'>
            <Box sx={{
                mx: 'auto',
                width: "auto", m: 2, p: 1,
                borderRadius: '16px',
                backgroundColor: '#F0FFFF',
            }
            } >
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className='heading'>
                        <h1>User Details</h1>
                    </div>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                type="text"
                                name="name"
                                fullWidth
                                sx={{ m: 1 }}
                                disabled={loading}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                            <TextField
                                label="User Name"
                                variant="outlined"
                                type="text"
                                name="username"
                                fullWidth
                                sx={{ m: 1 }}
                                disabled={loading}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                type="email"
                                name="email"
                                fullWidth
                                sx={{ m: 1 }}
                                disabled={loading}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Mobile No."
                                variant="outlined"
                                type="number"
                                name="mobile"
                                fullWidth
                                sx={{ m: 1 }}
                                disabled={loading}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.mobile}
                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                helperText={formik.touched.mobile && formik.errors.mobile}
                            />
                            <TextField
                                id="demo-simple-select"
                                label="Role"
                                select
                                fullWidth
                                sx={{ width: "600px", m: 1 }}
                                disabled={loading}
                                value={formik.values.rolelabel}
                                name="rolelabel"
                                onChange={formik.handleChange}
                                error={formik.touched.rolelabel && Boolean(formik.errors.rolelabel)}
                                helperText={formik.touched.rolelabel && formik.errors.rolelabel}
                            >
                                {roles?.map((item, i) =>
                                    <MenuItem key={i} value={item?.roleLabel}>{item?.roleLabel}</MenuItem>
                                )}
                            </TextField>

                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                name="password"
                                fullWidth
                                sx={{ m: 1 }}
                                disabled={loading}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                    </Grid>
                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                        <Button type="submit" variant="contained" color="success" disabled={formik.isSubmitting} >
                           {loading ?<BeatLoader color="#2d4dd7" /> : "Submit"} 
                        </Button>
                    </Grid>
                </form>
            </Box>
            <ToastContainer />
        </div>

    )
}

export default UserForm