
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";

// Monitora Caju React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Skeleton from "@mui/material/Skeleton";

// Monitora Caju React example components
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import PhotoCard from "examples/Cards/InfoCards/PhotoCard";
import { Pagination } from "@mui/material";
// Data
import Typography from "@mui/material/Typography"; // Importe o Typography
import axios from "axios"; // Import axios for making HTTP requests
import CircularProgress from '@mui/material/CircularProgress';

let urlFoto = "https://images.tcdn.com.br/img/img_prod/840618/tempero_completo_caseiro_especial_pt_300g_419_1_885fa8156198b5e059f20c92b095ecfc.jpg"


function FotoTraca({apiUrl}) {
  const [allDoencas, setAllDoencas] = useState([]);
  const [fotosDoentes, setFotosDoentes] = useState([]);
  const [fotosSadias, setFotosSadias] = useState([]);
  const [fotosLoading, setFotosLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    fetchData();
  }, [page, tabValue]);

  const fetchData = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-access-token": authToken,
        },
      });
      setAllDoencas(response.data); // Store obtained data in the state
      const fotosDoentesArray = response.data.map((item) => {
        return {
          foto: item.fotoDoente,
          valorCalculado: item.valorCalculado,
          id: item._id
        }
      });
      const fotosSadiasArray = response.data.map((item) => {
        return {
          foto:item.fotoSadia,
          valorCalculado: item.valorCalculado,
          id: item._id
        }
      });
  
      setFotosDoentes(fotosDoentesArray);
      setFotosSadias(fotosSadiasArray);
   //   console.log(fotosDoentesArray);
      setFotosLoading(false);
//      console.log(response.data)
    } catch (error) {
      console.error("Error fetching doencas data:", error);
    }
  };

  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
    setPage(1); // Reset page to 1 when switching tabs
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const renderPhotos = () => {
    const photos = tabValue === 0 ? fotosDoentes : fotosSadias;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPhotos = photos.slice(startIndex, endIndex);

    return currentPhotos.map((item, index) => (
      <Grid item xs={12} sm={4} md={2} key={index} m={1}>
{item.foto !== null  ? (<PhotoCard src={item.foto} tipo={"envio"}/>) : (<PhotoCard src={item.foto} tipo={"vazio"} />) }
        <Typography variant="body2" textAlign={"center"} fontSize={8}>
          {item.id}
        </Typography>
        <Typography variant="body2" gutterBottom textAlign={"center"} fontSize={12}>
          Valor Calculado: {item.valorCalculado}
        </Typography>
      </Grid>
    ));
  };
  return (

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
                  Listagem de Fotos
                </MDTypography>
              </MDBox>
              { fotosLoading ? 
        <MDBox display="flex" justifyContent="center" alignItems="center" m={4}>
<Skeleton variant="rectangular" width="100%" height={"light"} />
              </MDBox>
               : 
              <MDBox pt={3} m={2} >
            <Tabs orientation={"horizontal"} value={tabValue} onChange={handleSetTabValue} m={10}>
                <Tab
                  label="Fotos Doentes"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      error
                    </Icon>
                  }
                />
                <Tab
                  label="Fotos Sadias"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      check_circle
                    </Icon>
                  }
                />
                
              </Tabs>
              {tabValue === 0 ? (
              <Grid container spacing={1} display="flex" justifyContent="center">
                {renderPhotos()}
              </Grid>
            ) : (
              <Grid container spacing={1} display="flex" justifyContent="center">
                {renderPhotos()}
              </Grid>
            )}
              
              </MDBox>
              
}
<Pagination
            count={Math.ceil((tabValue === 0 ? fotosDoentes : fotosSadias).length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="success"
            variant="outlined"
            shape="rounded"

            
            sx={{ display: "flex", justifyContent: "center", padding: 3, color: '#FFFF' }}
          />
            </Card>
          </Grid>
        </Grid>
  );
}

export default FotoTraca;
