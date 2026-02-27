import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import TablePuestos from "../../Components/Tables/TablePuestos";
import PuestosContext from "../../Context/Puestos/PuestosContext";

const Puestos = () => {
  const { puestos, GetPuestos } = useContext(PuestosContext);
  
  useEffect(() => {
    GetPuestos();
  }, []);
  return (
    <Layout>
      <TablePuestos rows={puestos} />
    </Layout>
  );
};

export default Puestos;
