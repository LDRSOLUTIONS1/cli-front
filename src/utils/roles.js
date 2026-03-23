export const ROLES = {
  1: "Super Administrador",
  2: "Administrador",
  3: "Interno",
  4: "Externo",
  5: "Gubernamental",
  6: "Distribuidor",
};

// Obtener nombre del rol
export const getRolNombre = (rolid) => {
  return ROLES[Number(rolid)] || "Sin rol";
};

// Validar si tiene un rol específico
export const isRol = (rolid, rolesPermitidos = []) => {
  return rolesPermitidos.includes(Number(rolid));
};

export const tienePermisoCard = (rolid, permiso) => {
  return PERMISOS_POR_ROL_CARDS[Number(rolid)]?.includes(permiso);
};

export const PERMISOS_POR_ROL_CARDS = {
  1: [1, 2, 3, 4], // SUPER_ADMIN ve todo
  2: [1, 2, 3, 4], // ADMINISTRADOR
  3: [1], // INTERNO
  4: [2], // EXTERNO
  5: [3], // GUBERNAMENTAL
  6: [4], // DISTRIBUIDOR
};

export const tienePermisoMenu = (rolid, permiso) => {
  return PERMISOS_POR_ROL_MENU[Number(rolid)]?.includes(permiso);
};

const PERMISOS_POR_ROL_MENU = {
  1: [1, 2, 3, 31, 32, 33, 34, 35, 4, 5, 6, 7], // SUPER_ADMIN ve todo
  2: [1, 2, 3, 31, 32, 33, 34, 35, 4, 5, 6], // ADMINISTRADOR
  3: [1], // INTERNO
  4: [2], // EXTERNO
  5: [1, 3, 31], // GUBERNAMENTAL
  6: [1, 3, 31, 33, 34, 35, 4, 5, 6], // DISTRIBUIDOR
};
