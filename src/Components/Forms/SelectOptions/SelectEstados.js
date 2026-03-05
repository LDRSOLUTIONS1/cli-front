import React, { useEffect, useState } from "react";
import SelectField from "../Select";
import MethodGet from "../../../Config/Service";

const SelectEstados = ({
  name,
  label,
  register,
  rules,
  errors,
  paisId,
  disabled,
}) => {
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    if (!paisId) {
      setEstados([]);
      return;
    }

    const fetchEstados = async () => {
      const res = await MethodGet(`/estados/pais/${paisId}`);
      setEstados(res.data);
    };

    fetchEstados();
  }, [paisId]);

  return (
    <SelectField
      name={name}
      label={label}
      register={register}
      rules={rules}
      errors={errors}
      options={estados}
      disabled={disabled}
    />
  );
};

export default SelectEstados;
