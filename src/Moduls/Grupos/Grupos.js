import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import TableGrupos from "../../Components/Tables/TableGrupos";
import GruposContext from "../../Context/Grupos/GruposContext";

const Grupos = () => {
  const { grupos, GetGrupos } = useContext(GruposContext);

  useEffect(() => {
    GetGrupos();
  }, []);
  return (
    <Layout>
      <TableGrupos rows={grupos} />
    </Layout>
  );
};

export default Grupos;
