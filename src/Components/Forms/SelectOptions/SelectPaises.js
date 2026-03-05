import React, { useEffect, useState } from "react";
import SelectField from "../Select";
import MethodGet from "../../../Config/Service";

const SelectPaises = ({ name, label, register, rules, errors }) => {
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    const fetchPaises = async () => {
      const res = await MethodGet("/paises");
      setPaises(res.data);
    };

    fetchPaises();
  }, []);

  return (
    <SelectField
      name={name}
      label={label}
      register={register}
      rules={rules}
      errors={errors}
      options={paises}
    />
  );
};

export default SelectPaises;
