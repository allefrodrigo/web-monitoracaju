
// Monitora Caju React layouts
import Dashboard from "layouts/dashboard";
import Users from "layouts/tables";
import Doencas from "layouts/tablesDoenca";
import Broca from "layouts/tablesBroca";
import Traca from "layouts/tablesTraca";
import FotoTraca from "layouts/tablesPhoto";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import Logout from "layouts/authentication/logout";
import Maps from "layouts/mapas";

// @mui icons
import Icon from "@mui/material/Icon";


const dashboardRoutes = [
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


export default dashboardRoutes;
