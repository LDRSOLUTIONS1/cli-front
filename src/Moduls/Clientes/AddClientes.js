import * as React from "react";
import TextField from "@mui/material/TextField";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Grid, Typography, Box, Button, Divider } from "@mui/material";
import ClientesContext from "../../Context/Clientes/ClientesContext";
import MultiSelect from "../../Components/Forms/MultiSelect";
import SelectField from "../../Components/Forms/Select";
import Layout from "../../Components/Layout/Layout";
import TipoClienteContext from "../../Context/TipoCliente/TipoClienteContext";
import RegimenesFiscalesContext from "../../Context/RegimenesFiscales/RegimenesFiscalesContext";
import GruposContext from "../../Context/Grupos/GruposContext";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import ModelosContext from "../../Context/Modelos/ModelosContext";
import RegionalesContext from "../../Context/Regionales/RegionalesContext";
import { Checkbox, FormControlLabel } from "@mui/material";
import SelectPaises from "../../Components/Forms/SelectOptions/SelectPaises";
import SelectEstados from "../../Components/Forms/SelectOptions/SelectEstados";
import SelectMunicipios from "../../Components/Forms/SelectOptions/SelectMunicipios";
import MarcasContext from "../../Context/Marcas/MarcasContext";

export default function AddClientes() {
  const { clientes, GetClientes, CreateClientes } = useContext(ClientesContext);
  const { tipoClientes, GetTipoClientes } = useContext(TipoClienteContext);
  const { grupos, GetGrupos } = useContext(GruposContext);
  const { modelos, GetModelos } = useContext(ModelosContext);
  const { regionales, GetRegionales } = useContext(RegionalesContext);
  const { marcas, GetMarcas } = useContext(MarcasContext);
  const { regimenesFiscales, GetRegimenesFiscales } = useContext(
    RegimenesFiscalesContext,
  );

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const direccionFiscalDiferente = watch("direccion_fiscal_diferente");
  const tipoPersonaSeleccionada = watch("tipo_persona");
  const tipoNegocioSeleccionado = watch("tipo_negocio");

  const paisSeleccionado = watch("pais_id");
  const estadoSeleccionado = watch("estado_id");

  const fiscalPaisSeleccionado = watch("fiscal_pais_id");
  const fiscalEstadoSeleccionado = watch("fiscal_estado_id");

  useEffect(() => {
    setValue("estado_id", "");
    setValue("municipio_id", "");
  }, [paisSeleccionado]);

  useEffect(() => {
    setValue("municipio_id", "");
  }, [estadoSeleccionado]);

  useEffect(() => {
    setValue("fiscal_estado_id", "");
    setValue("fiscal_municipio_id", "");
  }, [fiscalPaisSeleccionado]);

  useEffect(() => {
    setValue("fiscal_municipio_id", "");
  }, [fiscalEstadoSeleccionado]);

  useEffect(() => {
    GetTipoClientes();
    GetGrupos();
    GetModelos();
    GetRegionales();
    GetClientes();
    GetMarcas();
  }, []);

  useEffect(() => {
    if (tipoPersonaSeleccionada) {
      GetRegimenesFiscales(tipoPersonaSeleccionada);
    }
  }, [tipoPersonaSeleccionada]);

  useEffect(() => {
    if (!direccionFiscalDiferente) {
      setValue("tipo_direccion_fiscal", "");
      setValue("fiscal_calle", "");
      setValue("fiscal_numero_ext", "");
      setValue("fiscal_numero_int", "");
      setValue("fiscal_colonia", "");
      setValue("fiscal_codigo_postal", "");
      setValue("fiscal_pais_id", "");
      setValue("fiscal_estado_id", "");
      setValue("fiscal_municipio_id", "");
    }
  }, [direccionFiscalDiferente]);

  const onSubmit = (data) => {
    const {
      calle,
      numero_ext,
      numero_int,
      colonia,
      codigo_postal,
      pais_id,
      estado_id,
      municipio_id,

      fiscal_calle,
      fiscal_numero_ext,
      fiscal_numero_int,
      fiscal_colonia,
      fiscal_codigo_postal,
      fiscal_pais_id,
      fiscal_estado_id,
      fiscal_municipio_id,

      modelo,
      regional,

      ...rest
    } = data;

    const direccionPrincipal = {
      tipo: data.tipo,
      calle,
      numero_ext,
      numero_int,
      colonia,
      codigo_postal,
      pais_id: Number(pais_id),
      estado_id: Number(estado_id),
      municipio_id: Number(municipio_id),
    };

    const payload = {
      ...rest,
      marca_id: Number(data.marca_id),
      tipo_cliente_id: Number(data.tipo_cliente_id),
      tipo_persona: Number(data.tipo_persona),
      regimen_fiscal_id: Number(data.regimen_fiscal_id),
      grupo_id: Number(data.grupo_id),
      estatus: data.estatus,
      tipo_negocio: data.tipo_negocio,
      matriz_id: data.matriz_id ? Number(data.matriz_id) : null,

      modelo: modelo || [],
      regional: regional || [],

      direccion_principal: direccionPrincipal,

      direccion_fiscal: data.direccion_fiscal_diferente
        ? {
            tipo: "Fiscal",
            calle: fiscal_calle,
            numero_ext: fiscal_numero_ext,
            numero_int: fiscal_numero_int,
            colonia: fiscal_colonia,
            codigo_postal: fiscal_codigo_postal,
            pais_id: Number(fiscal_pais_id),
            estado_id: Number(fiscal_estado_id),
            municipio_id: Number(fiscal_municipio_id),
          }
        : {
            ...direccionPrincipal,
            tipo: "Fiscal",
          },
    };

    CreateClientes(payload);
    // reset();
  };

  const tiposPersona = [
    { id: 1, nombre: "Física" },
    { id: 2, nombre: "Moral" },
  ];

  const tiposEstatus = [
    { id: "Activo", nombre: "Activo" },
    { id: "Desarrollo", nombre: "Desarrollo" },
    { id: "Inactivo", nombre: "Inactivo" },
  ];

  const tiposNegocio = [
    { id: "Matriz", nombre: "Matriz" },
    { id: "Sucursal", nombre: "Sucursal" },
  ];

  const tiposDireccion = [
    { id: "Comercial", nombre: "Comercial" },
    { id: "Taller", nombre: "Taller" },
    { id: "Sucursal", nombre: "Sucursal" },
  ];

  return (
    <Layout>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Divider sx={{ mt: 2, mb: 2 }}>
            <Typography variant="button" gutterBottom sx={{ display: "block" }}>
              Información general
            </Typography>
          </Divider>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SelectField
                name="marca_id"
                label="Marca"
                register={register}
                rules={{ required: "Debes seleccionar una marca" }}
                errors={errors}
                options={marcas}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SelectField
                name="tipo_cliente_id"
                label="Tipo de cliente"
                register={register}
                rules={{ required: "Debes seleccionar un tipo de cliente" }}
                errors={errors}
                options={tipoClientes}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SelectField
                name="tipo_persona"
                label="Tipo de persona"
                register={register}
                rules={{ required: "Debes seleccionar un tipo de persona" }}
                errors={errors}
                options={tiposPersona}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SelectField
                name="regimen_fiscal_id"
                label="Régimen fiscal"
                register={register}
                rules={{ required: "Debes seleccionar un régimen fiscal" }}
                errors={errors}
                options={regimenesFiscales}
                getOptionLabel={(item) =>
                  `${item.c_regimen_fiscal} - ${item.descripcion}`
                }
              />
            </Grid>

            {tipoPersonaSeleccionada === 1 && (
              <>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    {...register("nombre_fisica", {
                      required: "El nombre es obligatorio",
                      minLength: { value: 1, message: "Mínimo 1 caracteres" },
                      maxLength: {
                        value: 200,
                        message: "Máximo 200 caracteres",
                      },
                    })}
                    error={!!errors.nombre_fisica}
                    helperText={errors.nombre_fisica?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Apellido Paterno"
                    {...register("apellido_paterno", {
                      required: "El apellido paterno es obligatorio",
                      minLength: { value: 1, message: "Mínimo 1 caracteres" },
                      maxLength: {
                        value: 200,
                        message: "Máximo 200 caracteres",
                      },
                    })}
                    error={!!errors.apellido_paterno}
                    helperText={errors.apellido_paterno?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Apellido Materno"
                    {...register("apellido_materno", {
                      required: "El apellido materno es obligatorio",
                      minLength: { value: 1, message: "Mínimo 1 caracteres" },
                      maxLength: {
                        value: 200,
                        message: "Máximo 200 caracteres",
                      },
                    })}
                    error={!!errors.apellido_materno}
                    helperText={errors.apellido_materno?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Fecha de nacimiento"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("fecha_nacimiento", {
                      required: "La fecha de nacimiento es obligatoria",
                    })}
                    error={!!errors.fecha_nacimiento}
                    helperText={errors.fecha_nacimiento?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="CURP"
                    {...register("curp", {
                      required: "El CURP es obligatorio",
                      minLength: {
                        value: 18,
                        message: "El CURP debe tener 18 caracteres",
                      },
                      maxLength: {
                        value: 18,
                        message: "El CURP debe tener 18 caracteres",
                      },
                      pattern: {
                        value: /^[A-Z]{4}[0-9]{6}[A-Z0-9]{8}$/,
                        message: "Ingresa un CURP válido",
                      },
                      onChange: (e) => {
                        e.target.value = e.target.value.toUpperCase();
                      },
                    })}
                    error={!!errors.curp}
                    helperText={errors.curp?.message}
                  />
                </Grid>
              </>
            )}
            {tipoPersonaSeleccionada === 2 && (
              <>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Representante Legal"
                    {...register("representante_legal", {
                      required: "El representante legal es obligatorio",
                      minLength: { value: 1, message: "Mínimo 1 caracteres" },
                      maxLength: {
                        value: 200,
                        message: "Máximo 200 caracteres",
                      },
                    })}
                    error={!!errors.representante_legal}
                    helperText={errors.representante_legal?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Domicilio Fiscal"
                    {...register("domicilio_fiscal", {
                      required: "El domicilio fiscal es obligatorio",
                      minLength: { value: 1, message: "Mínimo 1 caracteres" },
                      maxLength: {
                        value: 200,
                        message: "Máximo 200 caracteres",
                      },
                    })}
                    error={!!errors.domicilio_fiscal}
                    helperText={errors.domicilio_fiscal?.message}
                  />
                </Grid>
              </>
            )}
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                type="email"
                fullWidth
                label="Correo electrónico"
                {...register("correo", {
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingresa un correo electrónico válido",
                  },
                })}
                error={!!errors.correo}
                helperText={errors.correo?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SelectField
                name="grupo_id"
                label="Grupo"
                register={register}
                rules={{ required: "Debes seleccionar un grupo" }}
                errors={errors}
                options={grupos}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                fullWidth
                label="Nombre comercial"
                {...register("nombre_comercial", {
                  required: "El nombre comercial es obligatorio",
                  minLength: { value: 1, message: "Mínimo 1 caracteres" },
                  maxLength: {
                    value: 200,
                    message: "Máximo 200 caracteres",
                  },
                })}
                error={!!errors.nombre_comercial}
                helperText={errors.nombre_comercial?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                fullWidth
                label="Razón social"
                {...register("razon_social", {
                  required: "La razón social es obligatoria",
                  minLength: { value: 1, message: "Mínimo 1 caracteres" },
                  maxLength: {
                    value: 200,
                    message: "Máximo 200 caracteres",
                  },
                })}
                error={!!errors.razon_social}
                helperText={errors.razon_social?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                fullWidth
                label="RFC"
                {...register("rfc", {
                  required: "El RFC es obligatorio",
                  minLength: {
                    value: 12,
                    message: "El RFC debe tener al menos 12 caracteres",
                  },
                  maxLength: {
                    value: 13,
                    message: "El RFC debe tener como máximo 13 caracteres",
                  },
                  pattern: {
                    value: /^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$/,
                    message: "Ingresa un RFC valido",
                  },
                  onChange: (e) => {
                    e.target.value = e.target.value.toUpperCase().trim();
                  },
                })}
                error={!!errors.rfc}
                helperText={errors.rfc?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                fullWidth
                label="No. repuve"
                {...register("repve", {
                  required: "El no. repuve es obligatorio",
                  minLength: {
                    value: 1,
                    message: "Mínimo 1 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "Máximo 50 caracteres",
                  },
                })}
                error={!!errors.repve}
                helperText={errors.repve?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                fullWidth
                label="Plaza"
                {...register("plaza", {
                  required: "La plaza es obligatoria",
                  minLength: {
                    value: 1,
                    message: "Mínimo 1 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "Máximo 100 caracteres",
                  },
                })}
                error={!!errors.plaza}
                helperText={errors.plaza?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                fullWidth
                label="Clasificación"
                {...register("clasificacion", {
                  required: "La clasificación es obligatoria",
                  minLength: {
                    value: 1,
                    message: "Mínimo 1 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "Máximo 100 caracteres",
                  },
                })}
                error={!!errors.clasificacion}
                helperText={errors.clasificacion?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SelectField
                name="estatus"
                label="Estatus"
                register={register}
                rules={{ required: "Debes seleccionar un estatus" }}
                errors={errors}
                options={tiposEstatus}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SelectField
                name="tipo_negocio"
                label="Tipo de negocio"
                register={register}
                rules={{ required: "Debes seleccionar un tipo de negocio" }}
                errors={errors}
                options={tiposNegocio}
              />
            </Grid>
            {tipoNegocioSeleccionado === "Sucursal" && (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <SelectField
                  name="matriz_id"
                  label="¿A qué matriz pertenece la sucursal?"
                  register={register}
                  rules={{ required: "Debes seleccionar una matriz" }}
                  errors={errors}
                  options={clientes}
                  getOptionLabel={(item) => item.razon_social}
                />
              </Grid>
            )}
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                type="number"
                fullWidth
                label="Teléfono"
                {...register("telefono", {
                  required: "El teléfono es obligatorio",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "El teléfono debe tener 10 dígitos",
                  },
                })}
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                type="number"
                fullWidth
                label="Teléfono alternativo"
                {...register("telefono_alt", {
                  pattern: {
                    value: /^\d{10}$/,
                    message: "El teléfono alternativo debe tener 10 dígitos",
                  },
                })}
                error={!!errors.telefono_alt}
                helperText={errors.telefono_alt?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <MultiSelect
                name="modelo"
                control={control}
                label="Modelos"
                options={modelos}
                rules={{ required: "Debes seleccionar al menos un modelo" }}
                errors={errors}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <MultiSelect
                name="regional"
                control={control}
                label="Regionales"
                options={regionales}
                rules={{ required: "Debes seleccionar al menos una regional" }}
                errors={errors}
              />
            </Grid>
          </Grid>

          <Divider sx={{ mt: 2, mb: 2 }}>
            <Typography variant="button" gutterBottom sx={{ display: "block" }}>
              Dirección
            </Typography>
          </Divider>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SelectField
                name="tipo"
                label="Tipo de dirección"
                register={register}
                rules={{ required: "Debes seleccionar un tipo de dirección" }}
                errors={errors}
                options={tiposDireccion}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                fullWidth
                label="Calle"
                {...register("calle", {
                  required: "La calle es obligatoria",
                  minLength: {
                    value: 1,
                    message: "Mínimo 1 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "Máximo 100 caracteres",
                  },
                })}
                error={!!errors.calle}
                helperText={errors.calle?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                fullWidth
                label="Número exterior"
                {...register("numero_ext", {
                  required: "El número exterior es obligatorio",
                  minLength: {
                    value: 1,
                    message: "Mínimo 1 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "Máximo 20 caracteres",
                  },
                })}
                error={!!errors.numero_ext}
                helperText={errors.numero_ext?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                fullWidth
                label="Número interior"
                {...register("numero_int", {
                  minLength: {
                    value: 1,
                    message: "Mínimo 1 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "Máximo 20 caracteres",
                  },
                })}
                error={!!errors.numero_int}
                helperText={errors.numero_int?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                fullWidth
                label="Colonia"
                {...register("colonia", {
                  required: "La colonia es obligatoria",
                  minLength: {
                    value: 1,
                    message: "Mínimo 1 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "Máximo 100 caracteres",
                  },
                })}
                error={!!errors.colonia}
                helperText={errors.colonia?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <TextField
                type="number"
                fullWidth
                label="Código postal"
                {...register("codigo_postal", {
                  required: "El código postal es obligatorio",
                  pattern: {
                    value: /^\d{5}$/,
                    message: "El código postal debe tener 5 dígitos",
                  },
                })}
                error={!!errors.codigo_postal}
                helperText={errors.codigo_postal?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SelectPaises
                name="pais_id"
                label="País"
                register={register}
                rules={{ required: "Debes seleccionar un país" }}
                errors={errors}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SelectEstados
                name="estado_id"
                label="Estado"
                register={register}
                rules={{ required: "Debes seleccionar un estado" }}
                errors={errors}
                paisId={paisSeleccionado}
                disabled={!paisSeleccionado}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SelectMunicipios
                name="municipio_id"
                label="Municipio"
                register={register}
                rules={{ required: "Debes seleccionar un municipio" }}
                errors={errors}
                estadoId={estadoSeleccionado}
                disabled={!estadoSeleccionado}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox {...register("direccion_fiscal_diferente")} />
                }
                label="¿La dirección fiscal es diferente a la dirección principal?"
              />
            </Grid>
          </Grid>
          {direccionFiscalDiferente && (
            <>
              <Divider sx={{ mt: 2, mb: 2 }}>
                <Typography
                  variant="button"
                  gutterBottom
                  sx={{ display: "block" }}
                >
                  Dirección Fiscal
                </Typography>
              </Divider>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Calle"
                    {...register("fiscal_calle", {
                      required: "La calle es obligatoria",
                      minLength: {
                        value: 1,
                        message: "Mínimo 1 caracteres",
                      },
                      maxLength: {
                        value: 100,
                        message: "Máximo 100 caracteres",
                      },
                    })}
                    error={!!errors.fiscal_calle}
                    helperText={errors.fiscal_calle?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Número exterior"
                    {...register("fiscal_numero_ext", {
                      required: "El número exterior es obligatorio",
                      minLength: {
                        value: 1,
                        message: "Mínimo 1 caracteres",
                      },
                      maxLength: {
                        value: 20,
                        message: "Máximo 20 caracteres",
                      },
                    })}
                    error={!!errors.fiscal_numero_ext}
                    helperText={errors.fiscal_numero_ext?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Número interior"
                    {...register("fiscal_numero_int", {
                      minLength: {
                        value: 1,
                        message: "Mínimo 1 caracteres",
                      },
                      maxLength: {
                        value: 20,
                        message: "Máximo 20 caracteres",
                      },
                    })}
                    error={!!errors.fiscal_numero_int}
                    helperText={errors.fiscal_numero_int?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    fullWidth
                    label="Colonia"
                    {...register("fiscal_colonia", {
                      required: "La colonia es obligatoria",
                      minLength: {
                        value: 1,
                        message: "Mínimo 1 caracteres",
                      },
                      maxLength: {
                        value: 100,
                        message: "Máximo 100 caracteres",
                      },
                    })}
                    error={!!errors.fiscal_colonia}
                    helperText={errors.fiscal_colonia?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <TextField
                    type="number"
                    fullWidth
                    label="Código postal"
                    {...register("fiscal_codigo_postal", {
                      required: "El código postal es obligatorio",
                      pattern: {
                        value: /^\d{5}$/,
                        message: "El código postal debe tener 5 dígitos",
                      },
                    })}
                    error={!!errors.fiscal_codigo_postal}
                    helperText={errors.fiscal_codigo_postal?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <SelectPaises
                    name="fiscal_pais_id"
                    label="País"
                    register={register}
                    rules={{ required: "Debes seleccionar un país" }}
                    errors={errors}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <SelectEstados
                    name="fiscal_estado_id"
                    label="Estado"
                    register={register}
                    rules={{ required: "Debes seleccionar un estado" }}
                    errors={errors}
                    paisId={fiscalPaisSeleccionado}
                    disabled={!fiscalPaisSeleccionado}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <SelectMunicipios
                    name="fiscal_municipio_id"
                    label="Municipio"
                    register={register}
                    rules={{ required: "Debes seleccionar un municipio" }}
                    errors={errors}
                    estadoId={fiscalEstadoSeleccionado}
                    disabled={!fiscalEstadoSeleccionado}
                  />
                </Grid>
              </Grid>
            </>
          )}

          <Box
            sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<FileDownloadDoneIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Guardar cliente
            </Button>
          </Box>
        </form>
      </Grid>
    </Layout>
  );
}
