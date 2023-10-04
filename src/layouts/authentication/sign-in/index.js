
import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import { Navigate } from "react-router-dom"; // Importe o Navigate


// Monitora Caju React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { useAuth } from "../../../AuthContext";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
// Images
import bgImage from "assets/images/bg-profile.jpg";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false); // Novo estado para controle do redirecionamento
  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Erro ao fazer login!"
      content="Email ou senha incorretos. Por favor, tente novamente."
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
    />
  );

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleLogin = async () => {
    try {
      const response = await fetch(`${backendUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        // Aqui você pode lidar com o sucesso do login, por exemplo, redirecionando o usuário para a página principal.
        const data = await response.json();
        console.log("Login bem-sucedido!");
        console.log("Auth:", data.auth);
        console.log("Token:", data.token);
        console.log("UserID:", data.userId);
        console.log("Login bem-sucedido!");
        setLoginSuccess(true);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.userId);

      } else {
        // Aqui você pode lidar com um erro de login, por exemplo, exibindo uma mensagem de erro para o usuário.
        console.log("Erro no login.");
        console.log(response.status);
        console.log(response.statusText);
        openErrorSB();
        
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  };
  
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="success"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography fontWeight="light" color="white" mt={1}>
            Informe suas credenciais
          </MDTypography>
      
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={2}>
            <MDInput
              type="email"
              label="Digite seu email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="password"
              label="Digite sua senha"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </MDBox>
        
            <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              color="success"
              fullWidth
              onClick={handleLogin}
            >
              Realizar login
            </MDButton>
            </MDBox>

          </MDBox>
        </MDBox>
      </Card>
      {renderErrorSB}

      {loginSuccess && <Navigate to="/dashboard"  />} {/* Redirecionar após o login */}

    </BasicLayout>
  );
}

export default Basic;
