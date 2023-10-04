import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import axios from "axios";
import MDBox from "components/MDBox";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function CreateUser({ onCancel, onCreateUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorSB, setErrorSB] = useState(false);

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const validateField = (fieldName) => {
    switch (fieldName) {
      case "name":
        if (name.trim() === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            name: "Este campo é obrigatório.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
        }
        break;
      case "email":
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email inválido.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        }
        break;
        case "password":
          if (password.trim() === "") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              password: "Este campo é obrigatório.",
            }));
            setPasswordsMatch(false); // Define como senhas não coincidentes quando o campo senha está vazio
          } else {
            setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
            setPasswordsMatch(password === confirmPassword); // Verifica a correspondência das senhas quando o campo senha é preenchido
          }
          break;
    
        case "confirmPassword":
          if (confirmPassword.trim() === "") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              confirmPassword: "Este campo é obrigatório.",
            }));
          } else if (!passwordsMatch) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              confirmPassword: "As senhas não coincidem.",
            }));
          } else {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
          }
          break;
      default:
        break;
    }
  };

  
  const handleCreateUser = async () => {
    // Validar todos os campos antes de prosseguir
    validateField("name");
    validateField("email");
    validateField("password");
  
    // Verificar se há algum erro nos campos
    if (Object.values(errors).some((error) => error !== "")) {
      return; // Não continue se houver erros nos campos
    }
  
    // Verificar a correspondência das senhas apenas se o campo de confirmação de senha estiver preenchido
    if (confirmPassword.trim() !== "") {
      validateField("confirmPassword");
    }
  
    // Continue apenas se não houver erros
    const newUser = {
      name,
      email,
      password,
      isAdmin,
    };
  
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(`${backendUrl}/users`, newUser, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-access-token": authToken,
        },
      });
  
      const createdUser = response.data;
      console.log("User created:", createdUser);
  
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsAdmin(false);
      setPasswordsMatch(true);
      onCreateUser();
    } catch (error) {
      console.error("Error creating user:", error.request.status);
      openErrorSB();
      if (error.request.status === 409) {
        console.log("User already exists");
      }
    }
  };
  const validatePasswordsMatch = (password, confirmPassword) => {
    setPasswordsMatch(password === confirmPassword);
  };
  
  
  return (
    <Grid item xs={12}>
      <Card >
        <MDBox p={2}>
        <form >
          <TextField
            required
            label="Nome"
            placeholder="Insira nome (Ex: João Maria de Araújo)"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => validateField("name")}
            error={!!errors.name}
            helperText={errors.name || "Campo obrigatório"}
          />

          <TextField
            required
            label="Email"
            placeholder="Insira email (Ex: example@email.com)"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateField("email")}
            error={!!errors.email}
            helperText={errors.email || "Campo obrigatório"}
          />

          <TextField
            required
            label="Senha"
            placeholder="Insira senha"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => validateField("password")}
            error={!!errors.password}
            helperText={errors.password || "Campo obrigatório"}
          />

          <TextField
            required
            label="Confirmar Senha"
            placeholder="Confirme a senha"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validatePasswordsMatch(password, e.target.value);
            }}
            onBlur={() => validateField("confirmPassword")}
            error={!!errors.confirmPassword || !passwordsMatch}
            helperText={errors.confirmPassword || (passwordsMatch ? "" : "As senhas não coincidem")}
          />

          <FormControlLabel
            required
            control={<Switch checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />}
            label="Usuário administrador?"
          />

          <MDButton variant="gradient" color="success" onClick={handleCreateUser}>
            Criar usuário
          </MDButton>
        </form>
        </MDBox>
      </Card>
      <MDSnackbar
        color="error"
        icon="warning"
        title="Atenção, houve um erro ao criar usuário!"
        content="Os dados inseridos podem estar incorretos ou o usuário já existe."
        open={errorSB}
        onClose={closeErrorSB}
        close={closeErrorSB}
      />
    </Grid>
  );
}

export default CreateUser;
