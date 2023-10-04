/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Monitora Caju React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import { Tooltip } from "@mui/material";

export default function data(userData, handleUserID, handleDeleteUser, setUserToDelete, setIsDeleteModalOpen, userID, handleEditUser) {
  console.log('userDataRecieved', userData)
  
  const handleCreateDateClick = (userID) => {
    // Call the callback function with the userID as an argument
    handleUserID(userID);
  };
  const handleEditClick = (userID) => {
    // Call the callback function with the userID as an argument
    handleEditUser(userID);
  };
  

  const handleDeleteClick = (userID) => {
    // Call the callback function with the userID as an argument
    handleDeleteUser(userID);
  };


  const Author = ({ name, email, userID }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}      onClick={() => handleCreateDateClick(userID)}
      style={{ cursor: "pointer" }}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      {/* <MDTypography display="block" variant="caption" color="text" fontWeight="medium"> */}
      <MDBox ml={-1}>
      <MDBadge badgeContent={title} color={title === 'Admin' ? "success" : "primary"} variant="gradient" size="sm" />
        
        </MDBox>

      {/* </MDTypography> */}
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const rows = userData.map((user) => ({
    nome: <Author name={user.name} email={user.email} userID={user._id} />, // Pass userID as a prop
    function: <Job title={user.isAdmin ? "Admin" : "User"} description="" />,
    status: (
      <MDBox ml={-1}>
        <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
      </MDBox>
    ),
    create: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {user.createdAt}
      </MDTypography>
    ),
    action: (
      <>
<MDButton variant="text" color="dark" onClick={() => handleEditClick(user._id)}>
        <Icon fontSize="small">edit</Icon>
      </MDButton>
      {user._id !== userID ? (
              <Tooltip title="Deletar usuário">

      <MDButton variant="text" color="error" onClick={() => {
          setUserToDelete(user._id);
          setIsDeleteModalOpen(true);
        }}>
          <Icon fontSize="small">delete</Icon>
        </MDButton>
        </Tooltip>
        ) :
        <MDButton variant="text" color="error" disabled>
          <Icon fontSize="small">delete</Icon>
        </MDButton>
      }
    </>
    ),
  }));

  return {
    columns: [
      { Header: "Nome", accessor: "nome", width: "45%", align: "left" },
      { Header: "Função", accessor: "function", align: "left" },

      { Header: "Data de Criação", accessor: "create", align: "center" },
      { Header: "Ação", accessor: "action", align: "center" },
    ],

    rows
  };
}
