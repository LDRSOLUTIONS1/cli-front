import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import TableUsuarios from "../../Components/Tables/TableUsuarios";
import UsuariosContext from "../../Context/Usuarios/UsuariosContext";

const Usuarios = () => {
  const { usuarios, GetUsuarios } = useContext(UsuariosContext);  
  
  useEffect(() => {
    GetUsuarios();
  }, []);

  return (
    <Layout>
      <TableUsuarios rows={usuarios} />
    </Layout>
  );
};

export default Usuarios;
