import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import TableMarcas from "../../Components/Tables/TableMarcas";
import MarcasContext from "../../Context/Marcas/MarcasContext";

const Marcas = () => {
  const { marcas, GetMarcas } = useContext(MarcasContext);  

  useEffect(() => {
    GetMarcas();
  }, []);
  return (
    <Layout>
      <TableMarcas rows={marcas} />
    </Layout>
  );
};

export default Marcas;
