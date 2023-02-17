
import{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteUser, deleteUserFromList } from '../../redux/slices/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';


const UserList = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [userDataArr, setUserDataArr] = useState([])

  const dispatch = useDispatch()

  const { data, status } = useSelector((state) => {
    return {
      data: state?.UserReducer?.usersList,
      status: state?.UserReducer?.status
    }
  })

  useEffect(() => {
    setUserDataArr(data)
  }, [data, userDataArr])


  const handleOpen = (i) => {
    setId(i)
    setOpen(true);
  }

  const handleConfirmDelete = () => {
    toast.success(status)
    dispatch(deleteUser(id))
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={6} textAlign="left">
          <Typography variant='h5'><strong>User List</strong></Typography>
        </Grid>
        <Grid item xs={6} textAlign="right">
        <Link href={'/user/create'} style={{ color: "white", textDecoration: "none" }}><Button variant="contained" sx={{ m: 2, mx: 'auto', width: 200 }}>Add</Button></Link>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">User Name</TableCell>
              <TableCell align="left">Mobile</TableCell>
              <TableCell align="left">Role Label</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userDataArr?.length ? userDataArr?.map((row, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.username}</TableCell>
                <TableCell align="left">{row.mobile}</TableCell>
                <TableCell align="left">{row.rolelabel}</TableCell>
                <TableCell align="left">
                <Link href={`/user/${i}`}> <Button variant="outlined" ><EditIcon /></Button></Link>
                  <Button variant="outlined" onClick={() => { handleOpen(i) }}><DeleteIcon /></Button>
                </TableCell>
              </TableRow>
            ))
              :
              <TableRow >
                <TableCell colSpan={7} style={{ textAlign: "center" }}>
                  Data Not Found
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"User delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure delete this user
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => handleConfirmDelete()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  )
}
export default UserList