import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import TableTipoCliente from "../../Components/Tables/TableTipoCliente";
import TipoClienteContext from "../../Context/TipoCliente/TipoClienteContext";

const TipoCliente = () => {
  const { tipoClientes, GetTipoClientes } = useContext(TipoClienteContext);
  console.log(tipoClientes, "los tipos clientes");

  useEffect(() => {
    GetTipoClientes();
  }, []);
  return (
    <Layout>
      <TableTipoCliente rows={tipoClientes} />
    </Layout>
  );
};

export default TipoCliente;
