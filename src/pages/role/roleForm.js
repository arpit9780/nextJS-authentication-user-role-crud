import { Box, Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { roleSchema } from '../../validation/schema';
import { editRole, roleList } from "../../redux/slices/roleSlice"
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { appRoutes, TIME_OUT } from '../../Constant';

const RolesForm = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { query, push } = useRouter()

  const { roles } = useSelector((state) => {
    return {
      roles: state?.RoleReducer?.roleList
    }
  })

  useEffect(() => {
    if (query.id !== undefined) {
      let current_obj = roles[query.id]
      formik.setFieldValue("roleLabel", current_obj?.roleLabel)
      formik.setFieldValue("roleKey", current_obj?.roleKey)
    }
  }, [query])
  const formik = useFormik({
    initialValues: { roleLabel: '', roleKey: '' },
    onSubmit: values => {
      if (query.id !== undefined) {
        let payload = [query.id, values]
        toast.success('Role Updated')
        setTimeout(() => {
          dispatch(editRole(payload))
          push(appRoutes.ROLE_LIST)
        }, TIME_OUT);
      }
      else {
        toast.success('New Role Created')
        setTimeout(() => {
          dispatch(roleList(values))
          push(appRoutes.ROLE_LIST)
        }, TIME_OUT);
      }
    },
    validationSchema: roleSchema,
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
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className='heading'>
            <h1>Role Details</h1>
          </div>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <TextField label="Role Label"
                fullWidth
                sx={{ m: 1 }}
                type="text"
                name="roleLabel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.roleLabel}
                error={formik.touched.roleLabel && Boolean(formik.errors.roleLabel)}
                helperText={formik.touched.roleLabel && formik.errors.roleLabel}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Role Key"
                fullWidth
                sx={{ m: 1 }}
                type="text"
                name="roleKey"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.roleKey}
                error={formik.touched.roleKey && Boolean(formik.errors.roleKey)}
                helperText={formik.touched.roleKey && formik.errors.roleKey}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="success" disabled={formik.isSubmitting} >
            Submit
          </Button>
        </form>
      </Box>
    </div>
  </>
  )
}

export default RolesForm;