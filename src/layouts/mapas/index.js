import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MapHeat from './components/MapsHeat'
import Map from './components/Maps'
import MDTypography from "components/MDTypography";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Mapas() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <DashboardLayout>
      <MDBox mb={2}>
      <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium" fontSize={40}>
            Mapas
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
            Observe os mapas de calor e de ocorrência de doenças e pragas cadastrados no sistema Monitora Caju
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
        
        <Grid container spacing={5} justifyContent="center">
          
          <Grid item xs={12} lg={12}>
          
            <Card>
              <Box sx={{ width: '100%' }}  >
              
                <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: 2}} >
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" component={'div'}  >
                    <Tab label="Mapa de calor" {...a11yProps(0)} />
                    <Tab label="Mapa de ocorrência" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                
                <TabPanel value={value} index={0} >
                  <MDBox >
                    <MapHeat />
                  </MDBox>
                </TabPanel>
                <TabPanel value={value} index={1}  >
                  <MDBox >
                    <Map />
                  </MDBox>
                </TabPanel>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Mapas