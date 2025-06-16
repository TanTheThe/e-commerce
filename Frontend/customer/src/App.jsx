import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './Pages/Home'
import ProductListing from './Pages/ProductListing'
import Footer from './components/Footer'
import ProductDetails from './Pages/ProductDetails'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react'
import { createContext } from 'react'
import ProductZoom from './components/ProductZoom'
import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import ProductDetailsComponent from './components/ProductDetails'
import Login from './Pages/Login'
import Register from './Pages/Register'
import CartPage from './Pages/Cart'
import Verify from './Pages/Verify'
import toast, { Toaster } from 'react-hot-toast';
import ChangePassword from './Pages/ChangePassword'
import Checkout from './Pages/Checkout'
import MyAccount from './Pages/MyAccount'
import MyList from './Pages/MyList'
import Orders from './Pages/Orders'
import { getDataApi, fetchWithAutoRefresh } from './utils/api'
import ResetPasswordEmail from './Pages/ResetPasswordEmail'
import ResetPasswordOtp from './Pages/ResetPasswordOtp'
import EmailToChangePass from './Pages/EmailToChangePass'


const MyContext = createContext()

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [maxWidth, setMaxWidth] = useState('lg');
  const [fullWidth, setFullWidth] = useState(true);
  const [isLogin, setIsLogin] = useState(false)
  const [userData, setUserData] = useState(null)

  const [openCartPanel, setOpenCartPanel] = useState(false);

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal(false);
  };

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg)
    }
    if (status === "error") {
      toast.error(msg)
    }
  }

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("accesstoken");

      if (token) {
        const response = await fetchWithAutoRefresh("/customer/user", "GET");
        console.log(response);

        if (response?.success) {
          setIsLogin(true);
          setUserData(response.data);
        } else {
          setIsLogin(false);
          setUserData(null);
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("refreshtoken");
        }
      } else {
        setIsLogin(false);
        setUserData(null);
      }
    };

    checkLogin();
  }, [])


  const values = {
    setOpenProductDetailsModal,
    setOpenCartPanel,
    openCartPanel,
    toggleCartPanel,
    openAlertBox,
    isLogin,
    setIsLogin,
    setUserData,
    userData
  }

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path={"/"} exact={true} element={<Home />} />
            <Route path={"/productListing"} exact={true} element={<ProductListing />} />
            <Route path={"/product/:id"} exact={true} element={<ProductDetails />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} exact={true} element={<Register />} />
            <Route path={"/cart"} exact={true} element={<CartPage />} />
            <Route path={"/verify"} exact={true} element={<Verify />} />
            <Route path={"/change-password"} exact={true} element={<ChangePassword />} />
            <Route path={"/checkout"} exact={true} element={<Checkout />} />
            <Route path={"/my-account"} exact={true} element={<MyAccount />} />
            <Route path={"/my-list"} exact={true} element={<MyList />} />
            <Route path={"/my-orders"} exact={true} element={<Orders />} />
            <Route path={"/forgot-password-email"} element={<ResetPasswordEmail />} />
            <Route path={"/forgot-password-otp"} element={<ResetPasswordOtp />} />
            <Route path={"/send-mail"} element={<EmailToChangePass />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openProductDetailsModal}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='productDetailsModal'
      >
        <DialogContent>
          <div className='flex items-center w-full py-8 px-3 productDetailsModalContainer relative'>
            <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[0px] right-[0px]' onClick={handleCloseProductDetailsModal}>
              <IoCloseSharp className='text-[20px]' />
            </Button>
            <div className='col1 w-[40%]'>
              <ProductZoom />
            </div>

            <div className='col2 w-[60%] mb-3 px-8 productContent'>
              <ProductDetailsComponent />
            </div>
          </div>
        </DialogContent>
      </Dialog>


    </>
  )
}

export default App

export { MyContext }
