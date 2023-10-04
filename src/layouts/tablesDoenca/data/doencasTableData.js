/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import MDTypography from "components/MDTypography";
import { format } from 'date-fns';

export default function data(diseaseData) {
  console.log('diseaseDataReceived', diseaseData);

  

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
      { Header: "ID Do Usuário", accessor: "nome", width: "45%", align: "left" },
      { Header: "Valor Calculado", accessor: "value", align: "center" },
      { Header: "Data de Cálculo", accessor: "create", align: "center" },
      { Header: "Latitude", accessor: "lat", align: "center"},
      { Header: "Longitude", accessor: "long", align: "center"},
    ],

    rows
  };
}
