import React, { useContext, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import ClientesContext from "../../Context/Clientes/ClientesContext";
import TableClientes from "../../Components/Tables/TableClientes";

const Clientes = () => {
  const { clientes, GetClientes } = useContext(ClientesContext);

  useEffect(() => {
    GetClientes();
  }, []);
  return (
    <Layout>
      <TableClientes rows={clientes}/>
    </Layout>
  );
};

export default Clientes;
