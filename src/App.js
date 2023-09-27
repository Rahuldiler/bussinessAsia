/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate, useHistory } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard PRO React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Soft UI Dashboard PRO React routes
import routes from "routes";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logo-ct.png";
//import AutoLogoutTimer from "layouts/authentication/sign-in/AutoLogoutTimer";
import { loginUserDetails } from "../src/utils/constants";
import VerificationIllustration from "layouts/authentication/2-step-verification/";
import SignInIllustration from "layouts/authentication/sign-in/";
import axios from "axios";
import { user_token_expire } from "Api/Api";

export default function App()
{
  const navigate = useNavigate();
  const [locationKeys, setLocationKeys] = useState([]);
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const [lgTkn, setLgTkn] = useState(null);
  const [userId, setUserId] = useState(null)
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() =>
  {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () =>
  {
    if (miniSidenav && !onMouseEnter)
    {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () =>
  {
    if (onMouseEnter)
    {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() =>
  {
    document.body.setAttribute("dir", direction);

  }, [direction]);

  // Setting page scroll to 0 when changing the route
  const fetchUserToken = async () =>
  {
    if (userId)
    {
      const result = await axios.post(user_token_expire, {
        user_id: userId
      });
      try
      {
        if (result)
        {
          setLgTkn(result.data.token);
        }
      } catch (error)
      {
        console.log(error);
      }
    }

  }
  useEffect(() =>
  {
    const data = localStorage.getItem("userData");
    if (data)
    {
      const userDetails = JSON.parse(data);
      setUserId(userDetails.id)
    }
    fetchUserToken();
  }, [userId]);

  // useEffect(() =>
  // {
  //   const tkn = localStorage.getItem("token");
  //   if (tkn !== lgTkn)
  //   {
  //     navigate("/login");

  //   }

  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  // }, [setLgTkn]);


  // useEffect(() =>
  // {
  //   const checkToken = () =>
  //   {
  //     const tkn = localStorage.getItem("token");
  //     if (tkn !== lgTkn)
  //     {
  //       navigate("/login");
  //     }
  //   };
  //   checkToken();

  //   const intervalId = setInterval(checkToken, 60 * 60 * 1000); 
  //   return () =>
  //   {
  //     clearInterval(intervalId);
  //   };
  // }, []); 

  // force logout
  useEffect(() =>
  {
    if (loginUserDetails !== null)
    {
      var localStorageTime = localStorage.getItem("loginTime");
      var initialLoginTime = localStorage.getItem("InitialLoginTime");
      if (localStorageTime != null && localStorageTime != undefined)
      {
        var currentTime = new Date().getTime();
        var timeDifference = currentTime - localStorageTime;
        var minutes = Math.floor(timeDifference / 60000);

        var expiryTimeLeft = initialLoginTime - initialLoginTime;
        var minutes = Math.floor(expiryTimeLeft / 60000);

        if (minutes > 30)
        {
          alert("You need to be logged in to log out!");
          window.location.href = "/logout";
        } else
        {
          localStorage.setItem("loginTime", new Date().getTime());
        }
      }
    }
    // else
    // {
    //    navigate("/login");
    // }
  });

  const getRoutes = (allRoutes) =>
    // console.log(allRoutes);
    allRoutes.map((route) =>
    {
      if (route.collapse)
      {
        return getRoutes(route.collapse);
      }

      if (route.route)
      {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        <ToastContainer
          // position="top-center"
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            boxShadow: "0px 0px 5px #ddd",
            borderRadius: "25px",
            // background: "linear-gradient(310deg, #2152ff, #02c6f3)",
          }}
        />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName="Nuworld Business"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            {/* <Configurator /> */}
            {/* {configsButton} */}
          </>
        )}
        {/* {layout === "vr" && <Configurator />} */}
        <Routes>
          {getRoutes(routes)}
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && pathname !== "/kycpending" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Nuworld Business"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/* <Configurator /> */}
          {/* {configsButton} */}
        </>
      )}
      {/* {layout === "vr" && <Configurator />} */}
      <Routes>{getRoutes(routes)}</Routes>
    </ThemeProvider>
  );
}
