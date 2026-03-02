import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import TableContactos from "../../Components/Tables/TableContactos";
import ContactosContext from "../../Context/Contactos/ContactosContext";

const Contactos = () => {
  const { contactos, GetContactos } = useContext(ContactosContext);

  useEffect(() => {
    GetContactos();
  }, []);
  return (
    <Layout>
      <TableContactos rows={contactos} />
    </Layout>
  );
};

export default Contactos;
