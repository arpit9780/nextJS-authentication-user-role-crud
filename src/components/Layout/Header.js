
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { appRoutes, TIME_OUT } from '../../Constant';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../../redux/slices/authSlice';
import { BeatLoader } from 'react-spinners';

function Header() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)

  const { authentication } = useSelector((state) => {
    return {
      authentication: state?.AuthLogin?.authToken
    }
  })

  React.useEffect(() => {
  }, [authentication])

  const userLogout = () => {
    setLoading(true)
    setTimeout(() => {
      dispatch(authLogout())
      setLoading(false)
    }, TIME_OUT);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* ----------------------------For Mobile ------------------------------ */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* ------------------------------For Big Screen------------------------- */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {
              authentication === null ?
              <>
                <Link href={appRoutes.AUTH_LOGIN} style={{ color: "white", textDecoration: "none" }}>
                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >Login
                  </Button>
                </Link>
                 <Link href={appRoutes.USER_SIGNUP} style={{ color: "white", textDecoration: "none" }}>
                 <Button
                   sx={{ my: 2, color: 'white', display: 'block' }}
                   >Sign up
                 </Button>
               </Link>
                   </>
                :
                <>
                  <Link href={appRoutes.USER_LIST} style={{ color: "white", textDecoration: "none" }}>
                    <Button
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >User
                    </Button>
                  </Link>
                  <Link href={appRoutes.ROLE_LIST} style={{ color: "white", textDecoration: "none" }}>
                    <Button
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >Role
                    </Button>
                  </Link>
                  <Button
                    sx={{ my: 2, color: 'white', display: 'block', position: "absolute", right: "10px" }}
                    onClick={() => userLogout()}
                    disabled={loading}
                  >
                    {loading ? <BeatLoader color="white" /> : "Logout"}
                  </Button>
                </>
            }

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header