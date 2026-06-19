import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Button,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";

const DOCUMENT_LABELS = {
  convocatoria: "Convocatoria",
  bases: "Bases",
  anexos: "Anexos",
  acta_junta_aclaraciones: "Acta de junta de aclaraciones",
  acta_presentacion_apertura_proposiciones: "Acta de presentación y apertura",
  acta_fallo: "Acta de fallo",
  contrato: "Contrato",
  fianza: "Fianza",
  acta_entrega: "Acta de entrega",
  facturas: "Facturas",
  cancelacion_garantia: "Cancelación de garantía",
  otros: "Otros",
};

const ALL_TYPES = Object.keys(DOCUMENT_LABELS);

export default function TabDocumentosCliente({ cliente }) {
  const [clienteDocuments, setClienteDocuments] = useState({});

  useEffect(() => {
    if (!cliente) return;

    const baseUrl = (process.env.REACT_APP_BACKEND_URL || "").replace(
      /\/api$/,
      "",
    );
    const docsMap = {};

    (cliente.documents ?? []).forEach((doc) => {
      if (!docsMap[doc.type]) docsMap[doc.type] = [];

      const versionsOrdenadas = [...(doc.versions ?? [])].sort(
        (a, b) => b.version - a.version,
      );

      versionsOrdenadas.forEach((ver) => {
        docsMap[doc.type].push({
          id: doc.id,
          versionId: ver.id,
          name: ver.original_name ?? doc.name,
          url: ver.file_path ? `${baseUrl}/storage/${ver.file_path}` : null,
          version: ver.version,
          created_at: ver.created_at,
        });
      });
    });

    setClienteDocuments(docsMap);
  }, [cliente]);

  return (
    <Box>
      {(cliente.no_licitacion || cliente.no_contrato) && (
        <Stack
          direction="row"
          spacing={4}
          sx={{ mb: 3, p: 1.5, bgcolor: "grey.50", borderRadius: 2 }}
        >
          {cliente.no_licitacion && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                No. de licitación
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {cliente.no_licitacion}
              </Typography>
            </Box>
          )}
          {cliente.no_contrato && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                No. de contrato
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {cliente.no_contrato}
              </Typography>
            </Box>
          )}
        </Stack>
      )}

      <Grid container spacing={1.5}>
        {ALL_TYPES.map((type) => {
          const versions = clienteDocuments[type] ?? [];
          const hasDoc = versions.length > 0;

          return (
            <Grid key={type} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  border: "0.5px solid",
                  borderColor: hasDoc ? "info.light" : "divider",
                  borderRadius: 2,
                  p: 1.75,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  height: "100%",
                }}
              >
                {/* Encabezado del tipo */}
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <InsertDriveFileIcon
                    fontSize="small"
                    color={hasDoc ? "info" : "disabled"}
                    sx={{ mt: 0.25, flexShrink: 0 }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={500}
                    sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    {DOCUMENT_LABELS[type]}
                  </Typography>
                </Stack>

                {/* Lista de versiones */}
                {hasDoc ? (
                  <Stack spacing={0.75} sx={{ pt: 0.5 }}>
                    {versions.map((file) => (
                      <Box
                        key={file.versionId}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          p: 0.75,
                          borderRadius: 1,
                          bgcolor: "grey.50",
                          border: "0.5px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Chip
                          label={`v${file.version}`}
                          size="small"
                          color="info"
                          variant="outlined"
                          sx={{ flexShrink: 0 }}
                        />
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography variant="body2" noWrap title={file.name}>
                            {file.name}
                          </Typography>
                          <Typography variant="caption" color="text.disabled">
                            {new Date(file.created_at).toLocaleDateString(
                              "es-MX",
                            )}
                          </Typography>
                        </Box>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ flexShrink: 0 }}
                        >
                          <Tooltip title="Ver">
                            <IconButton
                              size="small"
                              href={file.url}
                              target="_blank"
                              component="a"
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Descargar">
                            <IconButton
                              size="small"
                              href={file.url}
                              download={file.name}
                              target="_blank"
                              component="a"
                            >
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Typography
                    variant="body2"
                    color="text.disabled"
                    sx={{ pl: 3.5 }}
                  >
                    Sin documento
                  </Typography>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
