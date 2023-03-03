export const adapter_subsistemas_choices = (subsistemas_data: any): any => {
  const subsistemas_options_adapted = subsistemas_data.map(
    (subsistema: any) => ({
      label: subsistema[1],
      value: subsistema[0],
    })
  );
  return subsistemas_options_adapted;
};

export const adapter_modules_choices = (modules_data: any): any => {
  const modules_options_adapted = modules_data.map((module: any) => ({
    label: module.nombre_modulo,
    value: module.id_modulo,
  }));
  return modules_options_adapted;
};
