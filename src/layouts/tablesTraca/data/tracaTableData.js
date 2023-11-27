/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Monitora Caju React components
import MDTypography from "components/MDTypography";

import { format, parseISO  } from 'date-fns';
import { da, ptBR } from 'date-fns/locale';
export default function data(diseaseData) {

  const rows = diseaseData.map((disease) => {
    // Extrair os componentes da data da string ISO
    const [year, month, day] = disease.dataCalculo.split('T')[0].split('-').map(Number);
  
    // Criar uma nova data com os componentes extraídos
    const date = new Date(year, month - 1, day);
  
    return {
      nome: disease.userId,
      value: disease.valorCalculado,
      create: (
        <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
          {format(date, 'dd/MM/yyyy', { locale: ptBR })}
        </MDTypography>
      ),
      lat: disease.latitude,
      long: disease.longitude,
    };
  });



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
