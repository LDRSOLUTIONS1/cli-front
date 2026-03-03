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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function AddClientes() {
  const { CreateClientes } = useContext(ClientesContext);
  const { tipoClientes, GetTipoClientes } = useContext(TipoClienteContext);
  const { grupos, GetGrupos } = useContext(GruposContext);
  const { modelos, GetModelos } = useContext(ModelosContext);
  const { regionales, GetRegionales } = useContext(RegionalesContext);
  const { regimenesFiscales, GetRegimenesFiscales } = useContext(
    RegimenesFiscalesContext,
  );

  useEffect(() => {
    GetTipoClientes();
    GetRegimenesFiscales();
    GetGrupos();
    GetModelos();
    GetRegionales();
  }, []);

  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data, e) => {
    CreateClientes(data);
  };

  const tipoPersonaSeleccionada = watch("tipo_persona");

  const tiposPersona = [
    { id: 1, nombre: "Física" },
    { id: 2, nombre: "Moral" },
  ];

  const tiposEstatus = [
    { id: 1, nombre: "Activo" },
    { id: 2, nombre: "Desarrollo" },
    { id: 3, nombre: "Inactivo" },
  ];

  const tiposNegocio = [
    { id: 1, nombre: "Matriz" },
    { id: 2, nombre: "Sucursal" },
  ];

  return (
    <Layout>
      <Grid container spacing={2} sx={{ padding: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold">
            Crear cliente
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Completa la información para registrar un nuevo cliente
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <SelectField
                name="tipo_cliente_id"
                label="Tipo de cliente"
                register={register}
                rules={{ required: "Debes seleccionar un tipo de cliente" }}
                errors={errors}
                options={tipoClientes}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <SelectField
                name="tipo_persona"
                label="Tipo de persona"
                register={register}
                rules={{ required: "Debes seleccionar un tipo de persona" }}
                errors={errors}
                options={tiposPersona}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                    })}
                    error={!!errors.curp}
                    helperText={errors.curp?.message}
                  />
                </Grid>
              </>
            )}
            {tipoPersonaSeleccionada === 2 && (
              <>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <SelectField
                name="grupo_id"
                label="Grupo"
                register={register}
                rules={{ required: "Debes seleccionar un grupo" }}
                errors={errors}
                options={grupos}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                })}
                error={!!errors.rfc}
                helperText={errors.rfc?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <SelectField
                name="estatus"
                label="Estatus"
                register={register}
                rules={{ required: "Debes seleccionar un estatus" }}
                errors={errors}
                options={tiposEstatus}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <SelectField
                name="tipo_negocio"
                label="Tipo de negocio"
                register={register}
                rules={{ required: "Debes seleccionar un tipo de negocio" }}
                errors={errors}
                options={tiposNegocio}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <MultiSelect
                name="modelo"
                control={control}
                label="Modelos"
                options={modelos}
                rules={{ required: "Debes seleccionar al menos un modelo" }}
                errors={errors}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
