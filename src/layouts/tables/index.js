
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";

// Monitora Caju React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Button from '@mui/material/Button';

// Monitora Caju React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from "@mui/material/IconButton";
import Chip from '@mui/material/Chip';
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import { Tooltip } from "@mui/material";
import './modal.css'; // Importe seu arquivo CSS personalizado
import CloseIcon from '@mui/icons-material/Close';
import UserTable from "./UserTable"; // Importe o componente UserTable aqui
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import axios from "axios"; // Import axios for making HTTP requests

import UpdateUser from "./updateUser"; // Import the UpdateUser component
import CreateUser from "./createUser";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function createData(userId, nome, valor, data, protein) {
  return { userId, nome, valor, data };
}
function Users() {
  const [userData, setUserData] = useState([]);
  const [isNewUserVisible, setIsNewUserVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);  
  const [userByID, setUserByID] = useState([{}]);
  const [brocaData, setBrocaData] = useState([{}]);
  const [tracaData, setTracaData] = useState([{}]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [successSB, setSuccessSB] = useState(false);
  const [editSuccessSB, setEditSucessSB] = useState(false);
  const [deleteSuccessSB, setDeleteSucessSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const openEditSucessSB = () => setEditSucessSB(true);
  const closeEditSucessSB = () => setEditSucessSB(false);

  const openDeleteSucessSB = () => setDeleteSucessSB(true);
  const closeDeleteSucessSB = () => setDeleteSucessSB(false);

  const renderDeleteSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Usuário deletado com sucesso!"
      content="A conta do usuário foi deletada."
      open={deleteSuccessSB}
      onClose={closeDeleteSucessSB}
      close={closeDeleteSucessSB}
    />
  );
  
  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Usuário criado com sucesso!"
      content="A conta do novo usuário está pronta para ser utilizada."
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
    />
  );

  const renderSuccessEditSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Usuário atualizado com sucesso!"
      content="A conta do usuário foi atualizada."
      open={editSuccessSB}
      onClose={closeEditSucessSB}
      close={closeEditSucessSB}
    />
  );
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  const handleUpdateUserSuccess = () => {
    // Ative o renderSuccessEditSB
    openEditSucessSB();
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);


  const handleCloseModalEdit = () => {
    setIsModalEditOpen(false);
    setEditedUser(null);
    fetchData();
  };

  const handleDeleteConfirm = async (userId) => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
    setDeleteSucessSB(true);
    await handleDeleteUser(userId);

  };
  
  const handleUpdateUser = async (updatedUser) => {
    const authToken = localStorage.getItem("authToken");
  
    try {
      // Make an API call to update the user data
      const response = await axios.put(`${backendUrl}/users/${updatedUser._id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-access-token": authToken,
        },
      });
  
      // If the update is successful, you might want to refresh the user data
      fetchData();
      setIsModalEditOpen(false); // Close the edit modal
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error here, e.g., show an error message
    }
  };
  
  const handleDeleteUser = async (userId) => {
    const authToken = localStorage.getItem("authToken");
    
    try {
      await axios.delete(`${backendUrl}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-access-token": authToken,
        },
      });

      // After successfully deleting the user, you might want to refresh the user data
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error here, e.g., show an error message
    }
  };

  const handleUserID = async (userID) => {
    console.log('Clicked userID in Users:', userID);
    fetchUserData(userID);
  // Find the user object with the matching _id
  const user = userData.find(user => user._id === userID);

  console.log(user)
  
  if (user) {
    setSelectedUser(user);
    setIsModalOpen(true);
  } else {
    console.log('User not found');
  }
  }

  const handleEditUser = (userID) => {
    const userToEdit = userData.find((user) => user._id === userID);
    if (userToEdit) {
      setEditedUser(userToEdit);
      setIsModalEditOpen(true);

    }
  };

  

  const userId = localStorage.getItem("userId");
  const { columns, rows } = authorsTableData(
    userData,
    handleUserID,
    handleDeleteUser,
    setUserToDelete,
    setIsDeleteModalOpen,
    userId, // Pass the user ID
    handleEditUser // Pass the handleEditUser function
  );

  

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);




  const handleCreateUser = async () => {
  console.log('click')
  openSuccessSB();
  setIsNewUserVisible(false);
  //fetchUserData();
  fetchData();

  
  }
  
  function formatarData(dataOriginal) {
    const data = new Date(dataOriginal);
  
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }
  
  // Exemplo de uso:
  const dataOriginal = "2023-09-12T00:00:00.000Z";
  const dataFormatada = formatarData(dataOriginal);
  console.log(dataFormatada); // Saída: "12/09/2023"
  

  const fetchUserData = async (userId) => {
    const authToken = localStorage.getItem("authToken");
    console.log('fetchUserData>', userId)
    try {
      const response = await axios.get(`${backendUrl}/doencas/relatorio/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-access-token": authToken,
        },
      });

      const responseBroca = await axios.get(`${backendUrl}/pragas/relatorio/broca/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-access-token": authToken,
        },
      });
  
      const responseTraca = await axios.get(`${backendUrl}/pragas/relatorio/traca/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-access-token": authToken,
        },
      });

      

      
      console.log('fetchUserData>', response.data)
      setUserByID(response.data); // Store obtained data in the state
      setBrocaData(responseBroca.data);
      setTracaData(responseTraca.data);
  
      console.log('>>>>',userByID)

    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error here, e.g., show an error message
    }
  };

  const fetchData = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${backendUrl}/users`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-access-token": authToken,
        },
      });
      setUserData(response.data); // Store obtained data in the state
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error here, e.g., show an error message
    }
  };
  console.log(userByID)
  return (
    <DashboardLayout>
            <MDBox mb={2}>
           <MDBox  px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium" fontSize={40}>
            Usuários
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
            Esta seção facilita o controle de dados de usuários, incluindo edição, exclusão e criação conforme necessário. Clique no usuário para ver os dados cadastrados.
</MDTypography>
          </MDBox>
        </MDBox>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="success"
                borderRadius="lg"
                coloredShadow="success"
              >
                <MDTypography variant="h6" color="white">
                  {isNewUserVisible ? "Cadastrar novo usuário" : "Listagem de usuários"}
                </MDTypography>
              </MDBox>
           
<MDBox
  display="flex"
  justifyContent="flex-end" // Align items to the right
  alignItems="center" // Vertically center items
  px={2}
  py={1}
>
<MDTypography variant="body1">
    <IconButton onClick={() => setIsNewUserVisible(!isNewUserVisible)}>
    {isNewUserVisible ? <ListIcon /> : <Tooltip title="Criar usuário">
<PersonAddIcon /></Tooltip>}
    </IconButton>
  </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isNewUserVisible ? (
          <CreateUser onCancel={() => setIsNewUserVisible(false)} onCreateUser={handleCreateUser} />
          ) : (
            
            <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
            handleEditUser={(userID) => handleEditUser(userID)} // Use an arrow function to maintain context
          />
                )}
                
                <Modal
                  open={isModalOpen}
                  onClose={handleCloseModal}
                  
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                  className="custom-modal"
                >
                  <Box    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      boxShadow: 24,
      borderRadius: 1,

      bgcolor: '#dcdcdc',
      maxHeight: '80vh', // Defina uma altura máxima aqui
      overflowY: 'auto', // Habilita a rolagem vertical se necessário
      p: 4,
    }}
  >
   <MDBox
  display="flex"
  justifyContent="flex-end" // Align items to the right
  alignItems="center" // Vertically center items
  px={2}
  py={1}
>
  <MDTypography variant="body1">
    <IconButton onClick={() => setIsModalOpen(false)} >
      <CloseIcon  />
    </IconButton>
  </MDTypography>
</MDBox>
          <MDBox mb={2} px={2} lineHeight={1.25}>         
<Typography textAlign={'center'} id="modal-title" fontWeight={800} color={'#464646'} fontSize={24}>
                      Informações do usuário
                    </Typography>
                    <Typography textAlign={'center'} fontWeight={300} color={'#464646'} fontSize={16} mb={2}>
                      Aqui você pode ver os dados coletados do selecionado.
                    </Typography>
                   
       <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight={500} color={'#464646'}>Dados do índice de Oídio</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <UserTable data={userByID} />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight={500} color={'#464646'}>Dados de índice Broca-das-pontas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <UserTable data={brocaData}  />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" fontWeight={500} color={'#464646'}>Dados de índice Traça da castanha</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <UserTable data={tracaData} />
              </AccordionDetails>
            </Accordion>
</MDBox>
                  </Box>
                </Modal>
       
               
                <Modal
      open={isModalEditOpen}
      onClose={handleCloseModalEdit}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
<Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    boxShadow: 24,
                    borderRadius: 1,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Center items horizontally
                    justifyContent: 'center', // Center items vertically
                    bgcolor: '#FFF',
                    


                  }}>    
    {editedUser !== null && (
      <UpdateUser
      onCancel={() => handleCloseModalEdit()} // Close the modal
      onUpdateUser={() => fetchData()} // Refresh the data
      userToEdit={editedUser}
      onUpdateSuccess={handleUpdateUserSuccess} // Adicione esta propriedade
    />
    )}
  </Box>
</Modal>


        
                <Modal
  open={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  aria-labelledby="delete-modal-title"
  aria-describedby="delete-modal-description"
>
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    bgcolor: '#FFF',
  }}>
    <Typography id="delete-modal-title" variant="h6" component="h2">
      Confirme sua ação
    </Typography>
    <Typography id="delete-modal-description" fontWeight={300} sx={{ mt: 2, textAlign: "center" }}>
      Você tem certeza que deseja deletar este usuário?
    </Typography>
    <MDButton onClick={() => handleDeleteConfirm(userToDelete)} color="error" sx={{ mt: 2 }}>
      Sim
    </MDButton>
    <MDButton onClick={() => setIsDeleteModalOpen(false)} sx={{ mt: 1 }}>
      Cancelar
    </MDButton>
  </Box>
</Modal>


              </MDBox>
            </Card>
          </Grid>
        </Grid>
        {renderSuccessSB}
        {renderSuccessEditSB}
        {renderDeleteSuccessSB}
      </MDBox>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Users;
