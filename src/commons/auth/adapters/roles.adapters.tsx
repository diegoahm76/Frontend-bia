export const get_permisos_adapter_select = (permisos: any): any => {
  const permisos_adapted = permisos.map((permiso: any) => ({
    // label: `${permiso.id_modulo.nombre_modulo} / ${permiso.cod_permiso.nombre_permiso}`,
    value: permiso.id_permisos_modulo,
  }));
  return permisos_adapted;
};

export const get_permisos_adapter_by_rol_for_select = (permisos: any): any => {
  const permisos_adapted = permisos.map((permiso: any) => ({
    // label: `${permiso.id_permiso_modulo.id_modulo.nombre_modulo} / ${permiso.id_permiso_modulo.cod_permiso.nombre_permiso}`,
    value: permiso.id_permiso_modulo.id_permisos_modulo,
  }));
  return permisos_adapted;
};

export const get_permisos_rol_post = (id_rol: any, permisos: any): any => {
  const permisos_por_rol_adapted = permisos.map((permiso: any) => ({
    id_permiso_modulo: permiso.id,
    id_rol,
  }));
  return permisos_por_rol_adapted;
};

export const get_permisos_adapter_general = (permisos: any): any => {
  const permisos_adapted = permisos.filter(
    (permiso: { id_modulo: { subsistema: any } }) =>
      permiso.id_modulo.subsistema === 'TRSV'
  );

  // //  console.log('')(permisos_adapted);
  return permisos_adapted;
};
