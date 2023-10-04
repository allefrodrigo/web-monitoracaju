import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import axios from "axios";
import { Switch, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const UpdateUser = ({ onCancel, onUpdateUser, userToEdit, onUpdateSuccess  }) => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Add this state

console.log(isAdmin)
onUpdateUser = (data) => {
console.log('onUpdateUser', data)
}

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setIsAdmin(userToEdit.isAdmin);
      console.log(userToEdit.isAdmin)
    }
  }, [userToEdit]);
  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    onCancel();
  };
  const handleUpdateUser = async () => {
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    const updatedUser = {
      name: name,
      email: email,
      password: password,
      isAdmin: isAdmin,
    };
  
    
    try {
      const authToken = localStorage.getItem("authToken");
      console.log(`${backendUrl}/users/${updatedUser._id}`);
      console.log(updatedUser)
      const response = await axios.put(
        `${backendUrl}/users/${userToEdit._id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "x-access-token": authToken,
          },
        }
      );

      const updatedUserData = response.data;
      console.log("User updated:", updatedUserData);
      
      //setIsSuccessModalOpen(true);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsAdmin(false);
      setPasswordsMatch(true);
      onUpdateUser({status: true, message: 'Usuário atualizado com sucesso'} );
      onUpdateSuccess();
      handleCloseSuccessModal();


    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  console.log('isSucessModal',isSuccessModalOpen)

  return (
    <Grid item xs={12}>
        <MDBox p={2} >
          <Typography variant="h6" gutterBottom>
            Editar informações do usuário
          </Typography>

          <TextField
            required
            label="Nome"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Nova senha"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirmar nova senha"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordsMatch(password === e.target.value);
            }}
          />
          {passwordsMatch ? null : (
            <Typography variant="body2" color="error">
              Senhas não coincidem
            </Typography>
          )}
          <FormControlLabel
            required
            control={
              <Switch
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            }
            label="Usuário administrador?"
          />
          <MDButton
            variant="gradient"
            color="success"
            onClick={handleUpdateUser}
          >
            Atualizar usuário
          </MDButton>
          <MDButton variant="gradient" color="primary" onClick={onCancel} sx={{marginLeft: 2}}>
        Fechar
      </MDButton>
        </MDBox>
    </Grid>
  );
}

export default UpdateUser;
