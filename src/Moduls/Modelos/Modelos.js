import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import TableModelos from "../../Components/Tables/TableModelos";
import ModelosContext from "../../Context/Modelos/ModelosContext";

const Modelos = () => {
  const { modelos, GetModelos } = useContext(ModelosContext);

  useEffect(() => {
    GetModelos();
  }, []);
  return (
    <Layout>
      <TableModelos rows={modelos} />
    </Layout>
  );
};

export default Modelos;
