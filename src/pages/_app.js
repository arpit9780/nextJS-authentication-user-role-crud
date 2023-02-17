import '../styles/Home.module.css'
import { wrapper, store } from '../redux/Store';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from '../Routers/PrivateRoute';
// import Layout from '../components/Layout'

function App({ Component, pageProps }) {

  return (
    <>
      <Provider store={store}>
        <PrivateRoute>
        {/* <Layout> */}
          <Component {...pageProps} />
        {/* </Layout> */}
        </PrivateRoute>
      </Provider>
    </>
  )
}

export default wrapper.withRedux(App);