
// @mui material components
import Grid from "@mui/material/Grid";

// Monitora Caju React components
import MDBox from "components/MDBox";

// Monitora Caju React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import MDSnackbar from "components/MDSnackbar";
// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { Typography } from "@mui/material";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Dashboard(isLogged) {
  const { sales, tasks } = reportsLineChartData;
  const [totalUsers, setTotalUsers] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState("");
  const [totalDoenca, setTotalDoenca] = useState(0);
  const [totalFoto, setTotalFoto] = useState(0);
  const [totalPraga, setTotalPraga] = useState(0);
  const [totalIndices, setTotalIndices] = useState(0);
  const [userData, setUserData] = useState({}); // Estado para armazenar os dados do usuário
  const {isAdmin, setIsAdmin } = useAuth();
  
  useEffect(() => {
    // Recuperar o token do localStorage
    const authToken = localStorage.getItem("authToken");
    // Recuperar o userId do localStorage
    const userId = localStorage.getItem("userId");

    // Certificar-se de que o authToken e userId estão definidos antes de fazer a requisição
    if (authToken && userId) {
      const config = {
        headers: {
          "x-access-token": authToken,
          "Authorization": `Bearer ${authToken}`
        }
      };

      async function fetchUserData() {
        try {
          const response = await axios.get(`${backendUrl}/users/${userId}`, config);
          const userData = response.data;
          // Use os dados do usuário conforme necessário
        //  console.log("Dados do usuário:", userData);
          setUserData(userData);
          setIsAdmin(userData.isAdmin)

        } catch (error) {
          console.error("Erro ao buscar os dados do usuário:", error);
        }
      }

      fetchUserData();
    }
  }, []); 
  async function fetchData() {
       try {
      // Requisição para obter o total de usuários
     // console.log(`${backendUrl}/users/count`)
      const usersResponse = await axios.post(`${backendUrl}/users/count`);
      console.log(usersResponse)

      const { count: usersCount } = usersResponse.data;

      // Requisição para obter o total de doenças
      const doencasResponse = await axios.post(`${backendUrl}/doencas/count`);
      const { count: doencasCount } = doencasResponse.data;

      // Requisição para obter o total de pragas
      const pragasResponse = await axios.post(`${backendUrl}/pragas/count`);
      const { count: pragasCount } = pragasResponse.data;

      const fotosResponse = await axios.post(`${backendUrl}/doencas/count/fotos`);
      const pragasFotoResponse = await axios.post(`${backendUrl}/pragas/count/fotos`);
    //  console.log(pragasFotoResponse.data.totalCount)
      // Atualizar o estado totalIndices com a soma dos valores
      setTotalIndices(doencasCount + pragasCount);
      const now = new Date();
      const updateTime = now.toLocaleTimeString();
      setTotalUsers(usersCount);
      setTotalFoto(fotosResponse.data.totalCount + pragasFotoResponse.data.totalCount);
      setLastUpdateTime(updateTime);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
 

    fetchData();
  }, []);

  return (
      <DashboardLayout>
      <DashboardNavbar />
      
      <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
            Olá, {userData.name} 
      </Typography>
      <MDBox py={3}>
        { isAdmin ? (
        <Grid container spacing={3}>
          
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="camera"
                title="Total de Fotos"
                count={totalFoto}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `Última atualização às ${lastUpdateTime}`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="person"
                title="Total de Usuários"
                count={totalUsers}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `Última atualização às ${lastUpdateTime}`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="calculate"
                title="Índices Calculados"
                count={totalIndices}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `Última atualização às ${lastUpdateTime}`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="landscape"
                title="Cidades Atingidas"
                count={0}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `Última atualização às ${lastUpdateTime}`,
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        ) : (

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h4" fontWeight="100" color="white" mt={1}>
            Você não é um administrador, portanto não tem acesso aos dados da página
      </Typography>
              </Grid>
              
        </Grid>
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>) 
}

export default Dashboard;
