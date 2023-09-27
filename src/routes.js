import Default from "layouts/dashboards/default/index";
import SignInIllustration from "layouts/authentication/sign-in/index";
import SignUpIllustration from "layouts/authentication/sign-up/index";
import ResetIllustration from "layouts/authentication/reset-password";
import ForgetIllustration from "layouts/authentication/forget-password";
import ChangePasswordIllustration from "layouts/authentication/change-password";
import LockIllustration from "layouts/authentication/lock/illustration";
import VerificationIllustration from "layouts/authentication/2-step-verification/";
import Error404 from "layouts/authentication/error/404";
import Error500 from "layouts/authentication/error/500";

// Importing Icons
import Basket from "examples/Icons/Basket";
import CreditCard from "examples/Icons/CreditCard";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Cube from "examples/Icons/Cube";
import Shop from "examples/Icons/Shop";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import AssociateICO from "examples/Icons/AssociateICO";
import SalesICO from "examples/Icons/SalesICO";
import TeamICO from "examples/Icons/TeamICO";
import ProfileICO from "examples/Icons/ProfileICO";

import Products from "layouts/products";
//import CreateProduct from "layouts/products/create";
import ViewProduct from "layouts/products/view";
import Associates from "layouts/associates";
import ViewAssociate from "layouts/associates/view";
import CreateAssociates from "layouts/associates/create";
import Payments from "layouts/payments";
import CreateProduct from "layouts/payments/create";
import MyTeam from "layouts/myteam";
import Profile from "layouts/pages/profile/profile-overview";
import Logout from "layouts/authentication/logout/Logout";
import KycPending from "layouts/pages/users/KycPending";
import Directsponsor from "layouts/direct_sponsor";
import SupportPage from "layouts/chat";
import CreateSupport from "layouts/chat/create";
import ChatView from "layouts/chat/view";
import AssociatesTeam from "layouts/associates/team";

// website page routes
// import Home from "./newLayout/homePages/home/home"

const userData = JSON.parse(localStorage.getItem("userData"));
var setRoute;


if(userData){
  if(userData.existing_user === "0" && userData.esignin === "0"){
    setRoute = [
      {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        route: "/",
        icon: <Shop size="12px" />,
        noCollapse: true,
        component: <Default />,
      },
    
      //
      {
        route: "/products/view/:id",
        component: <ViewProduct />,
      },
     
    
      //
      {
        route: "/kycpending",
        component: <KycPending />,
      },
    
      //
      {
        route: "/associates/view/:id/",
        component: <ViewAssociate />,
      },
      {
        route: "/support/view/:id",
        component: <ChatView />,
      },
    
      {
        type: "collapse",
        name: "Products",
        key: "products",
        icon: <Shop size="12px" />,
        collapse: [
          {
            name: "Product List",
            key: "products",
            route: "/products",
            component: <Products />,
          },
          
        ],
      },
    
      // {
      //   type: "collapse",
      //   name: "Direct Sponsors",
      //   key: "direct-sponsors",
      //   icon: <AssociateICO size="12px" />,
      //   collapse: [
      //     {
      //       name: "Direct Sponsors List",
      //       key: "direct-sponsors",
      //       route: "/direct-sponsors",
      //       component: <Directsponsor />,
      //     }
      //   ],
      // },
    
      // {
      //   type: "collapse",
      //   name: "Associates",
      //   key: "associates",
      //   icon: <AssociateICO size="12px" />,
      //   collapse: [
      //     {
      //       name: "Associate List",
      //       key: "associates",
      //       route: "/associates",
      //       component: <Associates />,
      //     }
      //   ],
      // },
    
      // {
      //   type: "collapse",
      //   name: "Sale List",
      //   key: "sale-list",
      //   icon: <SalesICO size="12px" />,
      //   collapse: [
      //     {
      //       name: "Sale List",
      //       key: "sale-list",
      //       route: "/sale-list",
      //       component: <Payments />,
      //     }
      //   ],
      // },
    
      // {
      //   type: "collapse",
      //   name: "My Team",
      //   key: "my-team",
      //   icon: <TeamICO size="12px" />,
      //   collapse: [
      //     {
      //       name: "My Team",
      //       key: "my-team",
      //       route: "/dashboards/my-team",
      //       component: <MyTeam />,
      //     },
      //   ],
      // },
      {
        type: "collapse",
        name: "Support",
        key: "support",
        icon: <Shop size="12px" />,
        collapse: [
          {
            name: "Support Ticket List",
            key: "support",
            route: "/support",
            component: <SupportPage />,
          },
          {
            name: "Add Create Support Ticket",
            key: "create-support-ticket",
            route: "/create-support-ticket",
            component: <CreateSupport />,
          },
        ],
      },
    
      {
        type: "collapse",
        name: "Profile",
        key: "profile",
        route: "/profile",
        icon: <ProfileICO size="12px" />,
        noCollapse: true,
        component: <Profile />,
      },
    
      // {
      //   type: "collapse",
      //   name: "Profile",
      //   key: "profile",
      //   icon: <Shop size="12px" />,
      //   collapse: [
      //     {
      //       name: "Profile",
      //       key: "profile",
      //       route: "/dashboards/profile",
      //       component: <Profile />,
      //     },
      //   ],
      // },
    
      //
      {
        type: "collapse",
        name: "Logout",
        key: "logout",
        route: "/logout",
        icon: <Cube size="12px" />,
        noCollapse: true,
        component: <Logout />,
      },  
      {
        type: "collapse",
        name: "Authentication",
        key: "authentication",
        icon: <Document size="12px" />,
        collapse: [
          {
            name: "Sign In",
            key: "sign-in",
            collapse: [
              {
                name: "Illustration",
                key: "illustration",
                route: "/login",
                component: <SignInIllustration />,
              },
            ],
          },
              {
                name: "Sign Up",
                key: "sign-up",
                collapse: [
                  {
                    name: "Illustration",
                    key: "illustration",
                    route: "/authentication/sign-up",
                    component: <SignUpIllustration />,
                  },
                ],
              },
          //     {
          //       name: "Reset Password",
          //       key: "reset-password",
          //       collapse: [
          //         {
          //           name: "Illustration",
          //           key: "illustration",
          //           route: "/authentication/reset-password",
          //           component: <ResetIllustration />,
          //         },
          //       ],
          //     },
          //     {
          //       name: "Forget Password",
          //       key: "forget-password",
          //       collapse: [
          //         {
          //           name: "Illustration",
          //           key: "illustration",
          //           route: "/authentication/forget-password",
          //           component: <ForgetIllustration />,
          //         },
          //       ],
          //     },
          //     {
          //       name: "Change Password",
          //       key: "change-password",
          //       collapse: [
          //         {
          //           name: "Illustration",
          //           key: "illustration",
          //           route: "/authentication/change-password",
          //           component: <ChangePasswordIllustration />,
          //         },
          //       ],
          //     },
          //     {
          //       name: "Lock",
          //       key: "lock",
          //       collapse: [
          //         {
          //           name: "Illustration",
          //           key: "illustration",
          //           route: "/authentication/lock/illustration",
          //           component: <LockIllustration />,
          //         },
          //       ],
          //     },
          {
            name: "2-Step Verification1111",
            key: "2-step-verification",
            collapse: [
              {
                name: "Illustration",
                key: "illustration",
                route: "/verification",
                component: <VerificationIllustration />,
              },
            ],
          },
          /*       {
            name: "Logout",
            key: "logout",
            collapse: [
              {
                name: "Logout",
                key: "logout",
                route: "/logout",
                component: <Logout />,
              },
            ],
          }, */
    
          //     {
          //       name: "Error",
          //       key: "error",
          //       collapse: [
          //         {
          //           name: "Error 404",
          //           key: "error-404",
          //           route: "/authentication/error/404",
          //           component: <Error404 />,
          //         },
          //         {
          //           name: "Error 500",
          //           key: "error-500",
          //           route: "/authentication/error/500",
          //           component: <Error500 />,
          //         },
          //       ],
          //     },
        ],
      },
    ];
  }
  if(userData.existing_user === "1" && userData.esignin === "0"){
    setRoute = [
      {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        route: "/",
        icon: <Shop size="12px" />,
        noCollapse: true,
        component: <Default />,
      },
    
      //
      {
        route: "/products/view/:id",
        component: <ViewProduct />,
      },
    
      //
      {
        route: "/kycpending",
        component: <KycPending />,
      },
    
      //
      {
        route: "/associates/view/:id",
        component: <ViewAssociate />,
      },
      {
        route: "/support/view/:id",
        component: <ChatView />,
      },
    
      {
        type: "collapse",
        name: "Products",
        key: "products",
        icon: <Shop size="12px" />,
        collapse: [
          {
            name: "Product List",
            key: "products",
            route: "/products",
            component: <Products />,
          },
          
        ],
      },
    
      // {
      //   type: "collapse",
      //   name: "Direct Sponsors",
      //   key: "direct-sponsors",
      //   icon: <AssociateICO size="12px" />,
      //   collapse: [
      //     {
      //       name: "Direct Sponsors List",
      //       key: "direct-sponsors",
      //       route: "/direct-sponsors",
      //       component: <Directsponsor />,
      //     }
      //   ],
      // },
    
      {
        type: "collapse",
        name: "Associates",
        key: "associates",
        icon: <AssociateICO size="12px" />,
        collapse: [
          {
            name: "Associate List",
            key: "associates",
            route: "/associates",
            component: <Associates />,
          },
          {
            name: "Add Associates",
            key: "addassociates",
            route: "/associates/create",
            component: <CreateAssociates />,
          },
        ],
      },
    
    
      {
        type: "collapse",
        name: "Sale List",
        key: "sale-list",
        icon: <SalesICO size="12px" />,
        collapse: [
          {
            name: "Sale List",
            key: "sale-list",
            route: "/sale-list",
            component: <Payments />,
          },
          {
            name: "Add Sale",
            key: "addSale",
            route: "/payment/create",
            component: <CreateProduct />,
          },
        ],
      },
    
      {
        type: "collapse",
        name: "My Team",
        key: "my-team",
        icon: <TeamICO size="12px" />,
        collapse: [
          {
            name: "My Team",
            key: "my-team",
            route: "/my-team",
            component: <MyTeam />,
          },
        ],
      },
      {
        type: "collapse",
        name: "Support",
        key: "support",
        icon: <Shop size="12px" />,
        collapse: [
          {
            name: "Support Ticket List",
            key: "support",
            route: "/support",
            component: <SupportPage />,
          },
          {
            name: "Add Create Support Ticket",
            key: "create-support-ticket",
            route: "/create-support-ticket",
            component: <CreateSupport />,
          },
        ],
      },
    
      {
        type: "collapse",
        name: "Profile",
        key: "profile",
        route: "/profile",
        icon: <ProfileICO size="12px" />,
        noCollapse: true,
        component: <Profile />,
      },
    
      // {
      //   type: "collapse",
      //   name: "Profile",
      //   key: "profile",
      //   icon: <Shop size="12px" />,
      //   collapse: [
      //     {
      //       name: "Profile",
      //       key: "profile",
      //       route: "/dashboards/profile",
      //       component: <Profile />,
      //     },
      //   ],
      // },
    
      //
      {
        type: "collapse",
        name: "Logout",
        key: "logout",
        route: "/logout",
        icon: <Cube size="12px" />,
        noCollapse: true,
        component: <Logout />,
      },  
      {
        type: "collapse",
        name: "Authentication",
        key: "authentication",
        icon: <Document size="12px" />,
        collapse: [
          {
            name: "Sign In",
            key: "sign-in",
            collapse: [
              {
                name: "Illustration",
                key: "illustration",
                route: "/login",
                component: <SignInIllustration />,
              },
            ],
          },
          //     {
          //       name: "Sign Up",
          //       key: "sign-up",
          //       collapse: [
          //         {
          //           name: "Illustration",
          //           key: "illustration",
          //           route: "/authentication/sign-up",
          //           component: <SignUpIllustration />,
          //         },
          //       ],
          //     },
          //     {
          //       name: "Reset Password",
          //       key: "reset-password",
          //       collapse: [
          //         {
          //           name: "Illustration",
          //           key: "illustration",
          //           route: "/authentication/reset-password",
          //           component: <ResetIllustration />,
          //         },
          //       ],
          //     },
          //     {
          //       name: "Forget Password",
          //       key: "forget-password",
          //       collapse: [
          //         {
          //           name: "Illustration",
          //           key: "illustration",
          //           route: "/authentication/forget-password",
          //           component: <ForgetIllustration />,
          //         },
          //       ],
          //     },
          //     {
          //       name: "Change Password",
          //       key: "change-password",
          //       collapse: [
          //         {
          //           name: "Illustration",
          //           key: "illustration",
          //           route: "/authentication/change-password",
          //           component: <ChangePasswordIllustration />,
          //         },
          //       ],
          //     },
          //     {
          //       name: "Lock",
          //       key: "lock",
          //       collapse: [
          //         {
          //           name: "Illustration",
          //           key: "illustration",
          //           route: "/authentication/lock/illustration",
          //           component: <LockIllustration />,
          //         },
          //       ],
          //     },
          {
            name: "2-Step Verification1111",
            key: "2-step-verification",
            collapse: [
              {
                name: "Illustration",
                key: "illustration",
                route: "/verification",
                component: <VerificationIllustration />,
              },
            ],
          },
          /*       {
            name: "Logout",
            key: "logout",
            collapse: [
              {
                name: "Logout",
                key: "logout",
                route: "/logout",
                component: <Logout />,
              },
            ],
          }, */
    
          //     {
          //       name: "Error",
          //       key: "error",
          //       collapse: [
          //         {
          //           name: "Error 404",
          //           key: "error-404",
          //           route: "/authentication/error/404",
          //           component: <Error404 />,
          //         },
          //         {
          //           name: "Error 500",
          //           key: "error-500",
          //           route: "/authentication/error/500",
          //           component: <Error500 />,
          //         },
          //       ],
          //     },
        ],
      },
    ];
  }
  if(userData.existing_user === "0" && userData.esignin === "1"){
    setRoute = [
      {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        route: "/",
        icon: <Shop size="12px" />,
        noCollapse: true,
        component: <Default />,
      },
    
      //
      {
        route: "/products/view/:id",
        component: <ViewProduct />,
      },
    
      //
      {
        route: "/kycpending",
        component: <KycPending />,
      },
    
      //
      {
        route: "/associates/view/:id",
        component: <ViewAssociate />,
      },
      {
        route: "/support/view/:id",
        component: <ChatView />,
      },
    
      {
        type: "collapse",
        name: "Products",
        key: "products",
        icon: <Shop size="12px" />,
        collapse: [
          {
            name: "Product List",
            key: "products",
            route: "/products",
            component: <Products />,
          },
          
        ],
      },
      {
        type: "collapse",
        name: "Sale List",
        key: "sale-list",
        icon: <SalesICO size="12px" />,
        collapse: [
          {
            name: "Sale List",
            key: "sale-list",
            route: "/sale-list",
            component: <Payments />,
          },
          {
            name: "Add Sale",
            key: "addSale",
            route: "/payment/create",
            component: <CreateProduct />,
          },
        ],
      },
      {
        type: "collapse",
        name: "Support",
        key: "support",
        icon: <Shop size="12px" />,
        collapse: [
          {
            name: "Support Ticket List",
            key: "support",
            route: "/support",
            component: <SupportPage />,
          },
          {
            name: "Add Create Support Ticket",
            key: "create-support-ticket",
            route: "/create-support-ticket",
            component: <CreateSupport />,
          },
        ],
      },
    
      {
        type: "collapse",
        name: "Profile",
        key: "profile",
        route: "/profile",
        icon: <ProfileICO size="12px" />,
        noCollapse: true,
        component: <Profile />,
      },
      {
        type: "collapse",
        name: "Logout",
        key: "logout",
        route: "/logout",
        icon: <Cube size="12px" />,
        noCollapse: true,
        component: <Logout />,
      },  
      {
        type: "collapse",
        name: "Authentication",
        key: "authentication",
        icon: <Document size="12px" />,
        collapse: [
          {
            name: "Sign In",
            key: "sign-in",
            collapse: [
              {
                name: "Illustration",
                key: "illustration",
                route: "/login",
                component: <SignInIllustration />,
              },
            ],
          },
          {
            name: "2-Step Verification1111",
            key: "2-step-verification",
            collapse: [
              {
                name: "Illustration",
                key: "illustration",
                route: "/verification",
                component: <VerificationIllustration />,
              },
            ],
          }
        ],
      },
    ];
  }
  if(userData.existing_user === "1" && userData.esignin === "1"){
    setRoute = [
      {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        route: "/",
        icon: <Shop size="12px" />,
        noCollapse: true,
        component: <Default />,
      },
    
      //
      {
        route: "/products/view/:id",
        component: <ViewProduct />,
      },
    
      //
      {
        route: "/kycpending",
        component: <KycPending />,
      },
    
      //
      {
        route: "/associates/view/:id",
        component: <ViewAssociate />,
      },
      {
        route: "/support/view/:id",
        component: <ChatView />,
      },
    
      {
        type: "collapse",
        name: "Products",
        key: "products",
        icon: <Shop size="12px" />,
        collapse: [
          {
            name: "Product List",
            key: "products",
            route: "/products",
            component: <Products />,
          },
          
        ],
      },
    
      // {
      //   type: "collapse",
      //   name: "Direct Sponsors",
      //   key: "direct-sponsors",
      //   icon: <AssociateICO size="12px" />,
      //   collapse: [
      //     {
      //       name: "Direct Sponsors List",
      //       key: "direct-sponsors",
      //       route: "/direct-sponsors",
      //       component: <Directsponsor />,
      //     }
      //   ],
      // },
    
      {
        type: "collapse",
        name: "Associates",
        key: "associates",
        icon: <AssociateICO size="12px" />,
        collapse: [
          {
            name: "Associate List",
            key: "associates",
            route: "/associates",
            component: <Associates />,
          },
          {
            name: "Add Associates",
            key: "addassociates",
            route: "/associates/create",
            component: <CreateAssociates />,
          },
        ],
      },
    
    
      {
        type: "collapse",
        name: "Sale List",
        key: "sale-list",
        icon: <SalesICO size="12px" />,
        collapse: [
          {
            name: "Sale List",
            key: "sale-list",
            route: "/sale-list",
            component: <Payments />,
          },
          {
            name: "Add Sale",
            key: "addSale",
            route: "/payment/create",
            component: <CreateProduct />,
          },
        ],
      },
    
      {
        type: "collapse",
        name: "My Team",
        key: "my-team",
        icon: <TeamICO size="12px" />,
        collapse: [
          {
            name: "My Team",
            key: "my-team",
            route: "/dashboards/my-team",
            component: <MyTeam />,
          },
        ],
      },
      {
        type: "collapse",
        name: "Support",
        key: "support",
        icon: <Shop size="12px" />,
        collapse: [
          {
            name: "Support Ticket List",
            key: "support",
            route: "/support",
            component: <SupportPage />,
          },
          {
            name: "Add Create Support Ticket",
            key: "create-support-ticket",
            route: "/create-support-ticket",
            component: <CreateSupport />,
          },
        ],
      },
    
      {
        type: "collapse",
        name: "Profile",
        key: "profile",
        route: "/profile",
        icon: <ProfileICO size="12px" />,
        noCollapse: true,
        component: <Profile />,
      },
    
      // {
      //   type: "collapse",
      //   name: "Profile",
      //   key: "profile",
      //   icon: <Shop size="12px" />,
      //   collapse: [
      //     {
      //       name: "Profile",
      //       key: "profile",
      //       route: "/dashboards/profile",
      //       component: <Profile />,
      //     },
      //   ],
      // },
    
      //
      {
        type: "collapse",
        name: "Logout",
        key: "logout",
        route: "/logout",
        icon: <Cube size="12px" />,
        noCollapse: true,
        component: <Logout />,
      },  
      {
        type: "collapse",
        name: "Authentication",
        key: "authentication",
        icon: <Document size="12px" />,
        collapse: [
          {
            name: "Sign In",
            key: "sign-in",
            collapse: [
              {
                name: "Illustration",
                key: "illustration",
                route: "/login",
                component: <SignInIllustration />,
              },
            ],
          },
          //     {
          //       name: "Sign Up",
          //       key: "sign-up",
          //       collapse: [
          //         {
          //           name: "Illustration",
          //           key: "illustration",
          //           route: "/authentication/sign-up",
          //           component: <SignUpIllustration />,
          //         },
          //       ],
          //     },
          //     {
          //       name: "Reset Password",
          //       key: "reset-password",
          //       collapse: [
          //         {
          //           name: "Illustration",
          //           key: "illustration",
          //           route: "/authentication/reset-password",
          //           component: <ResetIllustration />,
          //         },
          //       ],
          //     },
          //     {
          //       name: "Forget Password",
          //       key: "forget-password",
          //       collapse: [
          //         {
          //           name: "Illustration",
          //           key: "illustration",
          //           route: "/authentication/forget-password",
          //           component: <ForgetIllustration />,
          //         },
          //       ],
          //     },
          //     {
          //       name: "Change Password",
          //       key: "change-password",
          //       collapse: [
          //         {
          //           name: "Illustration",
          //           key: "illustration",
          //           route: "/authentication/change-password",
          //           component: <ChangePasswordIllustration />,
          //         },
          //       ],
          //     },
          //     {
          //       name: "Lock",
          //       key: "lock",
          //       collapse: [
          //         {
          //           name: "Illustration",
          //           key: "illustration",
          //           route: "/authentication/lock/illustration",
          //           component: <LockIllustration />,
          //         },
          //       ],
          //     },
          {
            name: "2-Step Verification1111",
            key: "2-step-verification",
            collapse: [
              {
                name: "Illustration",
                key: "illustration",
                route: "/verification",
                component: <VerificationIllustration />,
              },
            ],
          },
          /*       {
            name: "Logout",
            key: "logout",
            collapse: [
              {
                name: "Logout",
                key: "logout",
                route: "/logout",
                component: <Logout />,
              },
            ],
          }, */
    
          //     {
          //       name: "Error",
          //       key: "error",
          //       collapse: [
          //         {
          //           name: "Error 404",
          //           key: "error-404",
          //           route: "/authentication/error/404",
          //           component: <Error404 />,
          //         },
          //         {
          //           name: "Error 500",
          //           key: "error-500",
          //           route: "/authentication/error/500",
          //           component: <Error500 />,
          //         },
          //       ],
          //     },
        ],
      },
    ];
  }
}else{
  setRoute = [
    {
      type: "collapse",
      name: "Authentication",
      key: "authentication",
      icon: <Document size="12px" />,
      collapse: [
        {
          name: "Sign In",
          key: "sign-in",
          collapse: [
            {
              name: "Illustration",
              key: "illustration",
              route: "/login",
              component: <SignInIllustration />,
            },
          ],
        },
        {
          name: "Sign In",
          key: "sign-in",
          collapse: [
            {
              name: "Illustration",
              key: "illustration",
              route: "/login",
              component: <SignInIllustration />,
            },
          ],
        },
        {
          name: "2-Step Verification1111",
          key: "2-step-verification",
          collapse: [
            {
              name: "Illustration",
              key: "illustration",
              route: "/verification",
              component: <VerificationIllustration />,
            },
          ],
        }
      ],
    },
    // {
    //   name: "home",
    //   key: "home",
    //   route: "/",
    //   component: <Home />,
    // }
  ];
}
const routes = setRoute;

export default routes;
