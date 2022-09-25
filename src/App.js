import { Route, Routes } from 'react-router-dom';
import PaymentRoute from './authentication/PaymentRoute';
import PrivateRoute from './authentication/PrivateRoute';
import Layout from './components/Layout/Layout';
import ScrollToTop from './hooks/UseScrollTop';
import Footer from './layouts/Footer';
import Navbar from './layouts/Navbar';
import MySection from './pages/MySection';
import { privateRoutes } from './routes/privateRoutes';
import { publicRoutes } from './routes/publicRoutes';
import { paymentRoutes } from './routes/paymentRoutes';
import './styles/Global.css';

function App() {

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Layout>
        <Routes>
          {/* Public routes */}
          {publicRoutes.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />))}

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/my-section' element={<MySection />}>
              {privateRoutes.map(({ path, name, Component }, index) => (
                <Route key={index} path={path} index={name === 'Home'} element={<Component />} />))}
            </Route>
          </Route>

          {/* Payment routes */}
          <Route element={<PaymentRoute />}>
            {paymentRoutes.map(({ path, Component }, index) => (
              <Route key={index} path={path} element={<Component />} />))}
          </Route>

        </Routes>
      </Layout>
      <Footer />
    </>
  );
}

export default App;
