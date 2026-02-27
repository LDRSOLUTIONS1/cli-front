import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import TableDepartamentos from "../../Components/Tables/TableDepartamentos";
import DepartamentosContext from "../../Context/Departamentos/DepartamentosContext";

const Departamentos = () => {
  const { departamentos, GetDepartamentos } = useContext(DepartamentosContext);

  useEffect(() => {
    GetDepartamentos();
  }, []);
  return (
    <Layout>
      <TableDepartamentos rows={departamentos} />
    </Layout>
  );
};

export default Departamentos;
