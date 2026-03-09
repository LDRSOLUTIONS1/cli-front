import React, { useEffect, useState } from "react";
import SelectField from "../Select";
import MethodGet from "../../../Config/Service";

const SelectMunicipios = ({
  name,
  label,
  control,
  rules,
  errors,
  estadoId,
  disabled,
}) => {
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    if (!estadoId) {
      setMunicipios([]);
      return;
    }

    const fetchMunicipios = async () => {
      const res = await MethodGet(`/municipios/estado/${estadoId}`);
      setMunicipios(res.data);
    };

    fetchMunicipios();
  }, [estadoId]);

  return (
    <SelectField
      name={name}
      label={label}
      control={control}
      rules={rules}
      errors={errors}
      options={municipios}
      disabled={disabled}
    />
  );
};

export default SelectMunicipios;
