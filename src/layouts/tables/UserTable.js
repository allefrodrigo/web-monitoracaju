import React from "react";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import MDBox from "components/MDBox";

function UserTable({ data }) {
  if (data.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        Nenhum dado disponível.
      </Typography>
    );
  }

  return (
    <MDBox mb={2}>
    <TableContainer component={Paper}  >
      <Table aria-label="user-table">
        <TableHead> 
        
        </TableHead>
        
        <TableBody>
        <TableRow>
            <TableCell component="th" scope="row">ID do usuário</TableCell>
                <TableCell component="th" scope="row">Nome</TableCell>
                <TableCell component="th" scope="row">Valor Calculado</TableCell>
                <TableCell component="th" scope="row">Status</TableCell>
                <TableCell component="th" scope="row">Data</TableCell>
            </TableRow>
          {data.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.nome}</TableCell>
              <TableCell>{user.valorCalculado}</TableCell>
              <TableCell>
                <Chip
                  label={user.valorCalculado > 10 ? "Crítico" : "Sadio"}
                  color={user.valorCalculado > 10 ? "error" : "success"}
                  sx={{ borderRadius: 1, fontWeight: 400 }}
                ><Typography variant="body2" color="white" > 
                {user.valorCalculado > 10 ? "Crítico" : "Sadio"}
                </Typography>

                </Chip>
              </TableCell>
              <TableCell>{formatarData(user.dataCalculo)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </MDBox>
  );
}

function formatarData(dataOriginal) {
  const data = new Date(dataOriginal);
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export default UserTable;
