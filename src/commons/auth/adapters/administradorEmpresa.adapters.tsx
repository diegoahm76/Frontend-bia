export const data_update_empresa_adapter = (data: any): any => {
  const update_empresa = {
    numero_documento: data.numeroDocumento2,
    digito_verificacion: data.codVerificacion,
    nombre_comercial: data.nombreComercial,
    razon_social: data.razonSocial,
    representante_legal: data.representanteLegal,
    email: data.eMail,
    email_empresarial: data.emailNotificacion,
    // telefono_celular_empresa: `57 ${data.celular}`,
    telefono_empresa: data.telefonoEmpresa,
    telefono_empresa_2: data.telefonoAlterno,
    direccion_notificaciones: data.direccionDeNotificacion,
  };
  return update_empresa;
};

export const data_overrite_empresa_adapter = (data_empresa: any): any => {
  const overrite_data = {
    numeroDocumento2: data_empresa.numero_documento,
    codVerificacion: data_empresa.digito_verificacion,
    nombreComercial: data_empresa.nombre_comercial,
    razonSocial: data_empresa.razon_social,
    // representanteLegal: data_empresa.representante_legal !== ''
    //   ? `${data_empresa.representante_legal.primer_nombre} ${data_empresa.representante_legal?.primer_apellido}`
    //   : '',
    numero_documento_representante:
      data_empresa.representante_legal !== ''
        ? data_empresa.representante_legal.numero_documento
        : 0,
    eMail: data_empresa.email,
    emailNotificacion: data_empresa.email_empresarial,
    celular: data_empresa.telefono_celular_empresa.slice(2),
    telefonoEmpresa: data_empresa.telefono_empresa,
    telefonoAlterno: data_empresa.telefono_empresa_2,
    direccionDeNotificacion: data_empresa.direccion_notificaciones,
    digito_verificacion: data_empresa.digito_verificacion,
  };
  return overrite_data;
};
