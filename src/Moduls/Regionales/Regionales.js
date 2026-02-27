import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import TableRegionales from "../../Components/Tables/TableRegionales";
import RegionalesContext from "../../Context/Regionales/RegionalesContext";

const Regionales = () => {
  const { regionales, GetRegionales } = useContext(RegionalesContext);  

  useEffect(() => {
    GetRegionales();
  }, []);
  return (
    <Layout>
      <TableRegionales rows={regionales} />
    </Layout>
  );
};

export default Regionales;
