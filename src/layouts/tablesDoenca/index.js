
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";

// Monitora Caju React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Monitora Caju React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { CircularProgress } from "@mui/material";
// Data
import doencasTable from "layouts/tablesDoenca/data/doencasTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
import axios from "axios"; // Import axios for making HTTP requests
import FotoTraca from "layouts/tablesPhoto";
const backendUrl = process.env.REACT_APP_BACKEND_URL;




function Doencas() {
  const [allDoencas, setAllDoencas] = useState([]);
  const { columns, rows } = doencasTable(allDoencas);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${backendUrl}/doencas`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-access-token": authToken,
        },
      });
      setAllDoencas(response.data); // Store obtained data in the state

      if(response.data === undefined || response.data.length === 0){
        setDataLoading(false);
        return;
      }


      setDataLoading(true); // Update the loading state
    } catch (error) {
      console.error("Error fetching doencas data:", error);
    }
  };

  return (
    <DashboardLayout>
<MDBox mb={2}>
           <MDBox  px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium" fontSize={40}>
            Oídio
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
          Observe aqui os dados enviados pela plataforma mobile Monitora Caju, tal como a listagem de ocorrências de Oídio e suas respectivas fotos.
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
                  Listagem de Oídio
                </MDTypography>
              </MDBox>
              <MDBox pt={3} display="flex" justifyContent="center" alignItems="center" m={3}>
              {/* {isLoading ? ( // If loading, show Skeleton
      <CircularProgress color="success" />
      ) : ( */}
                  {dataLoading ? (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                ) : (<> Não há dados disponíveis</>)}
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <FotoTraca apiUrl={`${backendUrl}/doencas`}/>
          </Grid>
        </Grid>
      </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Doencas;
