
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

const userRoutes = [

  {
    type: "collapse",
    name: "Deslogar",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/logout",
    component: <Logout />,
  },
];

export default userRoutes;
