import React from "react";
import { Controller } from "react-hook-form";
import { Typography, Box } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function FileField({
  name,
  label,
  control,
  rules = {},
  errors,
  accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.svg",
  disabled = false,
  currentFiles = [],
  onDeleteCurrentFile, 
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      rules={rules}
      render={({ field: { onChange, value } }) => {
        const hasFile = Array.isArray(value) && value.length > 0;
        const hasCurrentFiles =
          Array.isArray(currentFiles) && currentFiles.length > 0;

        const fileName = hasFile
          ? value.length === 1
            ? value[0].name
            : `${value.length} documentos seleccionados`
          : null;

        const fileSize = hasFile
          ? (() => {
              const totalSize = value.reduce((sum, file) => sum + file.size, 0);
              return totalSize < 1024 * 1024
                ? `${Math.round(totalSize / 1024)} KB`
                : `${(totalSize / (1024 * 1024)).toFixed(1)} MB`;
            })()
          : null;

        return (
          <Box>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mb: 0.75,
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              {label}
            </Typography>

            <Box
              component="label"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                px: 1.5,
                py: 1.5,
                border: "1.5px dashed",
                borderColor: hasFile ? "info.main" : "divider",
                borderStyle: hasFile ? "solid" : "dashed",
                borderRadius: 2,
                bgcolor: hasFile ? "info.50" : "background.paper",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.5 : 1,
                transition: "all .15s ease",
                "&:hover": !disabled && {
                  borderColor: "action.active",
                  bgcolor: "action.hover",
                },
                minHeight: 56,
              }}
            >
              {hasFile ? (
                <FileDownloadDoneIcon
                  fontSize="small"
                  color="info"
                  sx={{ flexShrink: 0 }}
                />
              ) : (
                <UploadFileIcon
                  fontSize="small"
                  sx={{ color: "text.disabled", flexShrink: 0 }}
                />
              )}

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{ color: fileName ? "text.primary" : "text.disabled" }}
                >
                  {fileName ?? "Seleccionar uno o varios archivos"}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.disabled" }}>
                  {fileSize ?? "Puedes seleccionar múltiples archivos"}
                </Typography>
              </Box>

              <input
                type="file"
                hidden
                multiple
                accept={accept}
                disabled={disabled}
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (files.length) {
                    const currentSelected = Array.isArray(value) ? value : [];
                    const uniqueFiles = files.filter(
                      (newFile) =>
                        !currentSelected.some(
                          (existing) =>
                            existing.name === newFile.name &&
                            existing.size === newFile.size,
                        ),
                    );
                    onChange([...currentSelected, ...uniqueFiles]);
                  }
                  e.target.value = null;
                }}
              />
            </Box>

            {hasFile && (
              <Box
                sx={{
                  mt: 1,
                  maxHeight: 180,
                  overflowY: "auto",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  px: 1,
                }}
              >
                {value.map((file, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      py: 0.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        mr: 1,
                      }}
                    >
                      {file.name}
                    </Typography>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() =>
                        onChange(value.filter((_, i) => i !== index))
                      }
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}

            {hasCurrentFiles && (
              <Box
                sx={{
                  mt: 1,
                  maxHeight: 180,
                  overflowY: "auto",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                }}
              >
                {currentFiles.map((file) => (
                  <Box
                    key={file.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      py: 0.25,
                    }}
                  >
                    <Typography
                      component="a"
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontSize: 12,
                        color: "primary.main",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        mr: 1,
                      }}
                    >
                      v{file.version} — {file.name}
                    </Typography>
                    {onDeleteCurrentFile && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDeleteCurrentFile(file.versionId)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
            )}

            {errors?.[name] && (
              <Typography
                color="error"
                variant="caption"
                sx={{ mt: 0.5, display: "block" }}
              >
                {errors[name].message}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
}
