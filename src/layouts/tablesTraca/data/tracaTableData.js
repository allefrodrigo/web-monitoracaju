/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Monitora Caju React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import { format } from 'date-fns';
export default function data(diseaseData) {
  console.log('diseaseDataReceived', diseaseData);

  const Author = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const rows = diseaseData.map((disease) => ({
    nome: disease.userId,
    value: disease.valorCalculado,
    create: (
      <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
      {format(new Date(disease.dataCalculo), 'dd/MM/yyyy')}
      </MDTypography>
    ),
    lat: disease.latitude,
    long: disease.longitude,

  }));

  return {
    columns: [
      { Header: "ID do Usuário", accessor: "nome", width: "45%", align: "left" },
      { Header: "Valor Calculado", accessor: "value", align: "center" },
      { Header: "Data de Cálculo", accessor: "create", align: "center" },
      { Header: "Latitude", accessor: "lat", align: "center"},
      { Header: "Longitude", accessor: "long", align: "center"},
    ],

    rows
  };
}
