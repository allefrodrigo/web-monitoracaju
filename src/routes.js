
/** 
  All of the routes for the Monitora Caju React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Monitora Caju React layouts
import Dashboard from "layouts/dashboard";
import Users from "layouts/tables";
import Doencas from "layouts/tablesDoenca";
import Broca from "layouts/tablesBroca";
import Traca from "layouts/tablesTraca";

import FotoTraca from "layouts/tablesPhoto";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Links from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import Logout from "layouts/authentication/logout";
import Maps from "layouts/mapas";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Página Inicial",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Usuários",
    key: "Users",
    icon: <Icon fontSize="small">group</Icon>,
    route: "/Users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Oídio",
    key: "oidio",
    icon: <Icon fontSize="small">spa</Icon>,
    route: "/oidio",
    component: <Doencas />,
  },
  {
    type: "collapse",
    name: "Broca-das-pontas",
    key: "broca",
    icon: <Icon fontSize="small">pest_control</Icon>,
    route: "/broca",
    component: <Broca />,
  },
  {
    type: "collapse",
    name: "Traça-da-castanha",
    key: "traca",
    icon: <Icon fontSize="small">bug_report</Icon>,
    route: "/traca",
    component: <Traca />,
  },
  {
    type: "collapse",
    name: "Informações úteis",
    key: "links",
    icon: <Icon fontSize="small">link</Icon>,
    route: "/links",
    component: <Links />,

  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },

  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Meu Perfil",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
    {
    type: "collapse",
    name: "Mapas",
    key: "profile",
    icon: <Icon fontSize="small">map</Icon>,
    route: "/maps",
    component: <Maps />,
  },
  {
    type: "collapse",
    name: "Logar",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Deslogar",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/logout",
    component: <Logout />,
  },
];


export default routes;
