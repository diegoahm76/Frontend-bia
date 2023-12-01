/* eslint-disable @typescript-eslint/naming-convention */
export const permisosPRUEBA = [
  {
    subsistema: 'ALMA',
    desc_subsistema: 'Almacen',
    menus: [
      {
        id_menu: 31,
        desc_subsistema: 'Almacen',
        nombre: 'Gestión de Inventario',
        nivel_jerarquico: 1,
        orden_por_padre: 1,
        subsistema: 'ALMA',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 33,
            nombre_modulo: 'Catálogo de Bienes',
            descripcion:
              'Permite administrar el catálogo de los bienes de la entidad a manejar en el subsistema de Almacén',
            subsistema: 'ALMA',
            desc_subsistema: 'Almacen',
            ruta_formulario:
              '/#/app/almacen/entrada_salida_articulos/catalogo_bienes',
            nombre_icono: 'test',
            id_menu: 31,
            permisos: {
              crear: true,
              actualizar: true,
              borrar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 108,
            nombre_modulo: 'Vehículos Arrendados',
            descripcion:
              'Permite administrar los vehículos arrendados con que cuenta la entidad.',
            subsistema: 'ALMA',
            desc_subsistema: 'Almacen',
            ruta_formulario:
              '/#/app/almacen/administracion_vehiculo/arriendo_vehiculos',
            nombre_icono: 'test',
            id_menu: 31,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
              borrar: true,
            },
          },
        ],
        submenus: [
          {
            id_menu: 32,
            desc_subsistema: 'Almacen',
            nombre: 'Movimientos',
            nivel_jerarquico: 2,
            orden_por_padre: 1,
            subsistema: 'ALMA',
            id_menu_padre: 31,
            modulos: [
              {
                id_modulo: 46,
                nombre_modulo:
                  'Entrega de Donaciones, Resarcimientos y Compensaciones a Viveros',
                descripcion:
                  'permite a Almacén entregar los bienes de consumo de Viveros que ingresaron a la entidad mediante una Donación, Resarcimiento o Compensación',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario:
                  '/#/app/almacen/gestion_inventario/movimientos/entrega_donaciones_resarcimientos_compensaciones_viveros',
                nombre_icono: 'test',
                id_menu: 32,
                permisos: {
                  crear: true,
                  consultar: true,
                  actualizar: true,
                  anular: true,
                },
              },
            ],
            submenus: [
              {
                id_menu: 33,
                desc_subsistema: 'Almacen',
                nombre: 'Respuesta a Solicitudes',
                nivel_jerarquico: 3,
                orden_por_padre: 1,
                subsistema: 'ALMA',
                id_menu_padre: 32,
                modulos: [
                  {
                    id_modulo: 39,
                    nombre_modulo:
                      'Rechazo de Solicitudes de Bienes desde Almacén',
                    descripcion:
                      'Permite rechazar por parte de Almacén, solicitudes de bienes realizadas por las diferentes áreas de la entidad',
                    subsistema: 'ALMA',
                    desc_subsistema: 'Almacen',
                    ruta_formulario: '/#/app/almacen/rechazo_solicitudes',
                    nombre_icono: 'test',
                    id_menu: 33,
                    permisos: {
                      crear: true,
                      consultar: true,
                      actualizar: true,
                    },
                  },
                  {
                    id_modulo: 45,
                    nombre_modulo: 'Despacho de Bienes de Consumo',
                    descripcion:
                      'Permite a Almacén despachar los bienes de consumo de la entidad basados en una solicitud',
                    subsistema: 'ALMA',
                    desc_subsistema: 'Almacen',
                    ruta_formulario:
                      '/#/app/almacen/despacho_solicitud_aprobada',
                    nombre_icono: 'test',
                    id_menu: 33,
                    permisos: {
                      crear: true,
                      consultar: true,
                      actualizar: true,
                      anular: true,
                    },
                  },
                  {
                    id_modulo: 40,
                    nombre_modulo:
                      'Listado de Solicitudes de Bienes Pendientes por Despachar',
                    descripcion:
                      'Lista todas las solicitudes realizadas por la empresa y que no han sido gestionadas por Almacén',
                    subsistema: 'ALMA',
                    desc_subsistema: 'Almacen',
                    ruta_formulario:
                      '/#/app/almacen/gestion_inventario/movimientos/respuesta_solicitudes/listado_solicitudes_bienes_pendientes_por_despachar',
                    nombre_icono: 'test',
                    id_menu: 33,
                    permisos: {
                      consultar: true,
                    },
                  },
                  {
                    id_modulo: 47,
                    nombre_modulo:
                      'Cierre de Solicitudes de Bienes por No Disponibilidad',
                    descripcion:
                      'Permite cerrar por parte de Almacén una solicitud de bienes por no tener disponibilidad de ninguno de los items solicitados',
                    subsistema: 'ALMA',
                    desc_subsistema: 'Almacen',
                    ruta_formulario:
                      '/#/app/almacen/gestion_inventario/movimientos/respuesta_solicitudes/cierre_solicitudes_bienes_no_disponibilidad',
                    nombre_icono: 'lock',
                    id_menu: 33,
                    permisos: {
                      crear: true,
                      consultar: true,
                      actualizar: true,
                    },
                  },
                ],
                submenus: [],
              },
            ],
          },
          {
            id_menu: 34,
            desc_subsistema: 'Almacen',
            nombre: 'Hojas de Vida de Activos Fijos',
            nivel_jerarquico: 2,
            orden_por_padre: 2,
            subsistema: 'ALMA',
            id_menu_padre: 31,
            modulos: [
              {
                id_modulo: 18,
                nombre_modulo: 'Hoja de Vida Computadores',
                descripcion:
                  'Permite administrar la información de las hojas de vidas de los computadores',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario: '/#/app/almacen/gestion_inventario/cv_computo',
                nombre_icono: 'test',
                id_menu: 34,
                permisos: {
                  consultar: true,
                  actualizar: true,
                  borrar: true,
                },
              },
              {
                id_modulo: 19,
                nombre_modulo: 'Hoja de Vida Vehículos',
                descripcion:
                  'Permite administrar la información de las hojas de vidas de los vehículos',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario:
                  '/#/app/almacen/gestion_inventario/cv_vehiculo',
                nombre_icono: 'test',
                id_menu: 34,
                permisos: {
                  consultar: true,
                  actualizar: true,
                  borrar: true,
                },
              },
              {
                id_modulo: 20,
                nombre_modulo: 'Hoja de Vida Otros Activos',
                descripcion:
                  'Permite administrar la información de las hojas de vidas de otros activos',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario:
                  '/#/app/almacen/gestion_inventario/cv_otros_activos',
                nombre_icono: 'test',
                id_menu: 34,
                permisos: {
                  consultar: true,
                  actualizar: true,
                  borrar: true,
                },
              },
            ],
            submenus: [],
          },
          {
            id_menu: 35,
            desc_subsistema: 'Almacen',
            nombre: 'Mantenimiento de Equipos',
            nivel_jerarquico: 2,
            orden_por_padre: 3,
            subsistema: 'ALMA',
            id_menu_padre: 31,
            modulos: [
              {
                id_modulo: 23,
                nombre_modulo: 'Programación de Mantenimiento de Otros activos',
                descripcion:
                  'Permite administrar la información de las programaciones de mantenimiento de otros activos',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario:
                  '/#/app/almacen/gestion_inventario/mantenimiento_equipos/programacion_mantenimiento_otros_activos',
                nombre_icono: 'test',
                id_menu: 35,
                permisos: {
                  consultar: true,
                  actualizar: true,
                  crear: true,
                  anular: true,
                },
              },
              {
                id_modulo: 26,
                nombre_modulo: 'Ejecución de Mantenimiento de Otros activos',
                descripcion:
                  'Permite administrar la información de las ejecuciones de mantenimiento de otros activos',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario:
                  '/#/app/almacen/gestion_inventario/mantenimiento_equipos/ejecucion_mantenimiento_otros_activos',
                nombre_icono: 'test',
                id_menu: 35,
                permisos: {
                  crear: true,
                  actualizar: true,
                  borrar: true,
                  consultar: true,
                },
              },
              {
                id_modulo: 22,
                nombre_modulo: 'Programación de Mantenimiento de Vehículos',
                descripcion:
                  'Permite administrar la información de las programaciones de mantenimiento de vehículos',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario:
                  '/#/app/almacen/gestion_inventario/mantenimiento_equipos/programacion_mantenimiento_vehiculos',
                nombre_icono: 'test',
                id_menu: 35,
                permisos: {
                  consultar: true,
                  actualizar: true,
                  crear: true,
                  anular: true,
                },
              },
              {
                id_modulo: 24,
                nombre_modulo: 'Ejecución de Mantenimiento de Computadores',
                descripcion:
                  'Permite administrar la información de las ejecuciones de mantenimiento de computadores',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario:
                  '/#/app/almacen/gestion_inventario/mantenimiento_equipos/ejecucion_mantenimiento_computadores',
                nombre_icono: 'test',
                id_menu: 35,
                permisos: {
                  crear: true,
                  actualizar: true,
                  borrar: true,
                  consultar: true,
                },
              },
              {
                id_modulo: 25,
                nombre_modulo: 'Ejecución de Mantenimiento de Vehículos',
                descripcion:
                  'Permite administrar la información de las ejecuciones de mantenimiento de vehículos',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario:
                  '/#/app/almacen/gestion_inventario/mantenimiento_equipos/ejecucion_mantenimiento_vehiculos',
                nombre_icono: 'test',
                id_menu: 35,
                permisos: {
                  crear: true,
                  actualizar: true,
                  borrar: true,
                  consultar: true,
                },
              },
              {
                id_modulo: 21,
                nombre_modulo: 'Programación de Mantenimiento de Computadores',
                descripcion:
                  'Permite administrar la información de las programaciones de mantenimiento de computadores',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario:
                  '/#/app/almacen/gestion_inventario/mantenimiento_equipos/programacion_mantenimiento_computadores',
                nombre_icono: 'test',
                id_menu: 35,
                permisos: {
                  consultar: true,
                  actualizar: true,
                  crear: true,
                  anular: true,
                },
              },
            ],
            submenus: [],
          },
        ],
      },
      {
        id_menu: 36,
        desc_subsistema: 'Almacen',
        nombre: 'Entrada de Almacén',
        nivel_jerarquico: 1,
        orden_por_padre: 2,
        subsistema: 'ALMA',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 34,
            nombre_modulo: 'Entrada de Bienes de Almacén',
            descripcion:
              'Permite ingresar bienes al Almacén de la entidad para su control',
            subsistema: 'ALMA',
            desc_subsistema: 'Almacen',
            ruta_formulario:
              '/#/app/almacen/entrada_almacen/entrada_bienes_almacen',
            nombre_icono: 'test',
            id_menu: 36,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
              anular: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 37,
        desc_subsistema: 'Almacen',
        nombre: 'Registro de Solicitudes de Almacén',
        nivel_jerarquico: 1,
        orden_por_padre: 3,
        subsistema: 'ALMA',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 36,
            nombre_modulo: 'Solicitud de Bienes de Consumo para Viveros',
            descripcion:
              'Permite solicitar bienes de consumo para uso en la actividad misional de Viveros por parte del personal de Viveros al Almacén de la entidad',
            subsistema: 'ALMA',
            desc_subsistema: 'Almacen',
            ruta_formulario: '/#/app/almacen/solicitud_consumo_vivero',
            nombre_icono: 'test',
            id_menu: 37,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
              anular: true,
            },
          },
          {
            id_modulo: 35,
            nombre_modulo: 'Solicitud de Bienes de Consumo',
            descripcion:
              'Permite solicitar bienes de consumo por parte de la entidad al almacén de la misma',
            subsistema: 'ALMA',
            desc_subsistema: 'Almacen',
            ruta_formulario: '/#/app/almacen/solicitud_consumo',
            nombre_icono: 'test',
            id_menu: 37,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
              anular: true,
            },
          },
          {
            id_modulo: 37,
            nombre_modulo: 'Aprobación de Solicitudes de Bienes',
            descripcion:
              'Permite aprobar o rechazar solicitudes de bienes de las cuales se le elijió como responsable por parte del solicitante',
            subsistema: 'ALMA',
            desc_subsistema: 'Almacen',
            ruta_formulario: '/#/app/almacen/aprobacion_solicitud_consumo',
            nombre_icono: 'test',
            id_menu: 37,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
            },
          },
          {
            id_modulo: 38,
            nombre_modulo: 'Aprobación de Solicitudes de Consumo para Vivero',
            descripcion:
              'Permite aprobar o rechazar solicitudes de bienes de Consumo para la actividad misional de Vivero y sobre las cuales se le elijió como responsable por parte del solicitante',
            subsistema: 'ALMA',
            desc_subsistema: 'Almacen',
            ruta_formulario:
              '/#/app/almacen/aprobacion_solicitud_consumo_vivero',
            nombre_icono: 'test',
            id_menu: 37,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 40,
        desc_subsistema: 'Almacen',
        nombre: 'Reportes, Indicadores y Analítica',
        nivel_jerarquico: 1,
        orden_por_padre: 6,
        subsistema: 'ALMA',
        id_menu_padre: null,
        modulos: [],
        submenus: [
          {
            id_menu: 41,
            desc_subsistema: 'Almacen',
            nombre: 'Reportes',
            nivel_jerarquico: 2,
            orden_por_padre: 1,
            subsistema: 'ALMA',
            id_menu_padre: 40,
            modulos: [
              {
                id_modulo: 159,
                nombre_modulo: 'Central de Reportes',
                descripcion:
                  'Permite consultar diferentes reportes generados por el sistema con la información que se alimenta día a día por parte de los usuarios',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario: '',
                nombre_icono: 'test',
                id_menu: 41,
                permisos: {
                  consultar: true,
                },
              },
              {
                id_modulo: 158,
                nombre_modulo: 'Tablero de Control de Almacén',
                descripcion:
                  'Permite consultar mediante tableros de control información relevante del almacén de la entidad que requiera de atención especial',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario: '/#/app/almacen/tableros_control/almacen',
                nombre_icono: 'test',
                id_menu: 41,
                permisos: {
                  consultar: true,
                },
              },
            ],
            submenus: [],
          },
          {
            id_menu: 43,
            desc_subsistema: 'Almacen',
            nombre: 'Analítica',
            nivel_jerarquico: 2,
            orden_por_padre: 3,
            subsistema: 'ALMA',
            id_menu_padre: 40,
            modulos: [
              {
                id_modulo: 157,
                nombre_modulo: 'Control de Inventario de Almacén',
                descripcion:
                  'Permite consultar todo tipo de información sobre el inventario actual del Almacén de la entidad para su control',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario: '/#/app/almacen/control/inventario',
                nombre_icono: 'test',
                id_menu: 43,
                permisos: {
                  consultar: true,
                },
              },
            ],
            submenus: [],
          },
        ],
      },
      {
        id_menu: 44,
        desc_subsistema: 'Almacen',
        nombre: 'Configuración y Datos Básicos',
        nivel_jerarquico: 1,
        orden_por_padre: 7,
        subsistema: 'ALMA',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 12,
            nombre_modulo: 'Bodegas',
            descripcion:
              'Permite administrar las bodegas del Almacén creadas en el sistema',
            subsistema: 'ALMA',
            desc_subsistema: 'Almacen',
            ruta_formulario: '/#/app/almacen/configuracion/crear_bodega',
            nombre_icono: 'test',
            id_menu: 44,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
              borrar: true,
            },
          },
        ],
        submenus: [
          {
            id_menu: 45,
            desc_subsistema: 'Almacen',
            nombre: 'Datos Básicos',
            nivel_jerarquico: 2,
            orden_por_padre: 1,
            subsistema: 'ALMA',
            id_menu_padre: 44,
            modulos: [
              {
                id_modulo: 11,
                nombre_modulo: 'Marcas',
                descripcion:
                  'Permite administrar la información básica de las Marcas de artículos activos fijos',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario: '/#/app/almacen/configuracion/crear_marca',
                nombre_icono: 'test',
                id_menu: 45,
                permisos: {
                  crear: true,
                  actualizar: true,
                  consultar: true,
                  borrar: true,
                },
              },
              {
                id_modulo: 14,
                nombre_modulo: 'Unidades de Medida',
                descripcion:
                  'Permite administrar la información básica de las unidades de medida que manejará el sistema',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario:
                  '/#/app/almacen/configuracion/crear_marca_unidad_medida',
                nombre_icono: 'test',
                id_menu: 45,
                permisos: {
                  crear: true,
                  actualizar: true,
                  consultar: true,
                  borrar: true,
                },
              },
              {
                id_modulo: 13,
                nombre_modulo: 'Porcentajes de IVA',
                descripcion:
                  'Permite administrar la información básica de los porcentajes de IVA que manejará el sistema',
                subsistema: 'ALMA',
                desc_subsistema: 'Almacen',
                ruta_formulario:
                  '/#/app/almacen/configuracion/crear_marca_porcentajes',
                nombre_icono: 'test',
                id_menu: 45,
                permisos: {
                  crear: true,
                  actualizar: true,
                  consultar: true,
                  borrar: true,
                },
              },
            ],
            submenus: [],
          },
        ],
      },
    ],
  },
  {
    subsistema: 'CONS',
    desc_subsistema: 'Conservación',
    menus: [
      {
        id_menu: 20,
        desc_subsistema: 'Conservación',
        nombre: 'Gestor de Viveros',
        nivel_jerarquico: 1,
        orden_por_padre: 1,
        subsistema: 'CONS',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 41,
            nombre_modulo: 'Administración de Viveros',
            descripcion: 'Permite administrar los Viveros de la entidad',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/gestor_vivero/administrar_viveros',
            nombre_icono: 'test',
            id_menu: 20,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
              borrar: true,
            },
          },
          {
            id_modulo: 42,
            nombre_modulo: 'Ingresar/Retirar de Cuarentena un Vivero',
            descripcion:
              'módulo que permite ingresar o sacar de cuarentena un vivero de la entidad',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario: '/#/app/conservacion/gestor_vivero/cuarentena',
            nombre_icono: 'test',
            id_menu: 20,
            permisos: {
              crear: true,
            },
          },
          {
            id_modulo: 43,
            nombre_modulo: 'Aperturar/Cerrar un Vivero',
            descripcion:
              'módulo que permite aperturar o cerrar un vivero existente de la entidad',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/gestor_vivero/apertura_cierre',
            nombre_icono: 'test',
            id_menu: 20,
            permisos: {
              crear: true,
            },
          },
          {
            id_modulo: 48,
            nombre_modulo:
              'Recepción y Distribución de Despachos Entrantes a Vivero',
            descripcion:
              'Permite Distribuir las entradas de bienes de consumo de Viveros en los diferentes viveros de la entidad',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/gestor_vivero/recepcion_distribucion',
            nombre_icono: 'test',
            id_menu: 20,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
              borrar: true,
            },
          },
          {
            id_modulo: 55,
            nombre_modulo: 'Bajas de Herramientas, Insumos y Semillas',
            descripcion:
              'Permite dar de baja elementos del tipo Herramientas, Insumos y Semillas del inventario de un vivero',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario: '/#/app/conservacion/gestor_vivero/bajas',
            nombre_icono: 'test',
            id_menu: 20,
            permisos: {
              anular: true,
              actualizar: true,
              consultar: true,
              crear: true,
            },
          },
          {
            id_modulo: 68,
            nombre_modulo: 'Responsables de Viveros',
            descripcion:
              'Permite configurar los responsables de cada vivero en la entidad',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario: '/#/app/conservacion/gestor_vivero/viverista',
            nombre_icono: 'test',
            id_menu: 20,
            permisos: {
              consultar: true,
              crear: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 21,
        desc_subsistema: 'Conservación',
        nombre: 'Material Vegetal',
        nivel_jerarquico: 1,
        orden_por_padre: 2,
        subsistema: 'CONS',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 50,
            nombre_modulo: 'Siembra de Semillas',
            descripcion:
              'Permite crear y administrar las siembras de semillas de material vegetal realizadas en los diferentes viveros de la entidad',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/material_vegetal/siembra_semilla',
            nombre_icono: 'test',
            id_menu: 21,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
              borrar: true,
            },
          },
          {
            id_modulo: 53,
            nombre_modulo: 'Ingreso a Cuarentena de Material Vegetal',
            descripcion:
              'Permite registrar el ingreso de plantas y plántulas de un lote de un vivero a cuarentena',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/material_vegetal/ingreso_cuarentena',
            nombre_icono: 'test',
            id_menu: 21,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
              anular: true,
            },
          },
          {
            id_modulo: 54,
            nombre_modulo: 'Levantamiento de Cuarentena de Material Vegetal',
            descripcion:
              'Permite registrar el levantamiento de cuarentena de plantas y plántulas de un lote de un vivero que está en cuarentena',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/material_vegetal/levantamiento_cuarentena',
            nombre_icono: 'test',
            id_menu: 21,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
              anular: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 22,
        desc_subsistema: 'Conservación',
        nombre: 'Producción',
        nivel_jerarquico: 1,
        orden_por_padre: 3,
        subsistema: 'CONS',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 51,
            nombre_modulo: 'Cambio de Etapa del Material Vegetal',
            descripcion:
              'Permite realizar el cambio de etapa de unidades de material vegetal de un lote específico',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario: '/#/app/conservacion/produccion/cambio_etapa',
            nombre_icono: 'test',
            id_menu: 22,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
              anular: true,
            },
          },
          {
            id_modulo: 56,
            nombre_modulo: 'Mortalidad de Plantas y Plántulas',
            descripcion:
              'Permite registrar la mortalidad de plantas y plántulas de un vivero',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/produccion/mortalidad_plantas',
            nombre_icono: 'test',
            id_menu: 22,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
              anular: true,
            },
          },
          {
            id_modulo: 58,
            nombre_modulo: 'Preparación de Mezclas',
            descripcion:
              'Permite registrar la preparación de mezclas a utilizar en un vivero',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/produccion/preparacion_mezcla',
            nombre_icono: 'test',
            id_menu: 22,
            permisos: {
              anular: true,
              actualizar: true,
              consultar: true,
              crear: true,
            },
          },
          {
            id_modulo: 59,
            nombre_modulo: 'Registro de Incidencias de Material Vegetal',
            descripcion:
              'Permite registrar incidencias que se realicen o presenten sobre un lote de material vegetal de un vivero',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/produccion/incidencia_material_vegetal',
            nombre_icono: 'test',
            id_menu: 22,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
              anular: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 23,
        desc_subsistema: 'Conservación',
        nombre: 'Solicitudes de Material',
        nivel_jerarquico: 1,
        orden_por_padre: 4,
        subsistema: 'CONS',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 65,
            nombre_modulo:
              'Aprobación de Solicitudes a Viveros (Coordinador de Viveros)',
            descripcion:
              'Permite aprobar o rechazar por parte del coordinador de viveros las solicitudes a viveros.',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/solicitud_material/coordinador/aprobar_solicitud',
            nombre_icono: 'test',
            id_menu: 23,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 60,
            nombre_modulo: 'Solicitudes de Plantas e Insumos a Viveros',
            descripcion:
              'Permite registrar las solicitudes de Plantas e Insumos a un Vivero determinado',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/solicitud_material/solicitudes',
            nombre_icono: 'test',
            id_menu: 23,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
              anular: true,
            },
          },
          {
            id_modulo: 63,
            nombre_modulo: 'Aprobación de Solicitudes a Viveros (Funcionario)',
            descripcion:
              'Permite aprobar o rechazar por parte del funcionario responsable las solicitudes a viveros.',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/solicitud_material/funcionario/aprobar_solicitud',
            nombre_icono: 'test',
            id_menu: 23,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
            },
          },
          {
            id_modulo: 62,
            nombre_modulo:
              'Listado de Solicitudes pendientes de Aprobación (Funcionario)',
            descripcion:
              'Permite consultar las solicitudes realizadas a viveros pendientes de aprobación',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/solicitud_material/funcionario/solicitudes_pendientes',
            nombre_icono: 'test',
            id_menu: 23,
            permisos: {
              consultar: true,
            },
          },
          {
            id_modulo: 64,
            nombre_modulo:
              'Listado de Solicitudes pendientes de Aprobación (Coordinador Viveros)',
            descripcion:
              'Permite consultar las solicitudes realizadas a viveros pendientes de aprobación ya aprobadas por funcionario responsable',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/solicitud_material/coordinador/solicitudes_pendientes',
            nombre_icono: 'test',
            id_menu: 23,
            permisos: {
              consultar: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 24,
        desc_subsistema: 'Conservación',
        nombre: 'Distribución',
        nivel_jerarquico: 1,
        orden_por_padre: 5,
        subsistema: 'CONS',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 67,
            nombre_modulo: 'Despacho de Viveros',
            descripcion:
              'Permite despachar elementos desde viveros en base a una solicitud',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario: '/#/app/conservacion/distribucion/despacho',
            nombre_icono: 'test',
            id_menu: 24,
            permisos: {
              anular: true,
              actualizar: true,
              consultar: true,
              crear: true,
            },
          },
          {
            id_modulo: 52,
            nombre_modulo: 'Traslados entre viveros',
            descripcion:
              'Permite trasladar Insumos, Herramientas y Material Vegetal entre viveros',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario: '/#/app/conservacion/distribucion/traslado',
            nombre_icono: 'test',
            id_menu: 24,
            permisos: {
              crear: true,
              borrar: true,
              actualizar: true,
              anular: true,
            },
          },
          {
            id_modulo: 66,
            nombre_modulo:
              'Cierre de Solicitudes a Viveros por No Disponibilidad',
            descripcion:
              'Permite cerrar una solicitud a viveros por no tener disponibilidad de ninguno de los items solicitados',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/distribucion/cierre_solicitudes',
            nombre_icono: 'test',
            id_menu: 24,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 26,
        desc_subsistema: 'Conservación',
        nombre: 'Reportes, Indicadores y Analítica',
        nivel_jerarquico: 1,
        orden_por_padre: 7,
        subsistema: 'CONS',
        id_menu_padre: null,
        modulos: [],
        submenus: [
          {
            id_menu: 27,
            desc_subsistema: 'Conservación',
            nombre: 'Reportes',
            nivel_jerarquico: 2,
            orden_por_padre: 1,
            subsistema: 'CONS',
            id_menu_padre: 26,
            modulos: [
              {
                id_modulo: 132,
                nombre_modulo: 'Histórico de Movimientos por Módulo',
                descripcion:
                  'Conjunto de reportes de todos los movimientos por módulo en rango de fechas.',
                subsistema: 'CONS',
                desc_subsistema: 'Conservación',
                ruta_formulario: '/#/app/conservacion/reportes/historicos',
                nombre_icono: 'test',
                id_menu: 27,
                permisos: {
                  consultar: true,
                },
              },
              {
                id_modulo: 133,
                nombre_modulo: 'Compendios',
                descripcion:
                  'Conjunto de reportes consolidados que integran información de varios módulos.',
                subsistema: 'CONS',
                desc_subsistema: 'Conservación',
                ruta_formulario: '/#/app/conservacion/reportes/subsistema',
                nombre_icono: 'test',
                id_menu: 27,
                permisos: {
                  consultar: true,
                },
              },
            ],
            submenus: [],
          },
          {
            id_menu: 29,
            desc_subsistema: 'Conservación',
            nombre: 'Analítica',
            nivel_jerarquico: 2,
            orden_por_padre: 3,
            subsistema: 'CONS',
            id_menu_padre: 26,
            modulos: [
              {
                id_modulo: 134,
                nombre_modulo: 'Analítica de Datos',
                descripcion:
                  'Permite visualizar gráficamente información sobre las operaciones del subsistema de conservación.',
                subsistema: 'CONS',
                desc_subsistema: 'Conservación',
                ruta_formulario: '/#/app/conservacion/reportes/analitica',
                nombre_icono: 'test',
                id_menu: 29,
                permisos: {
                  consultar: true,
                },
              },
              {
                id_modulo: 131,
                nombre_modulo: 'Tablero de Control de Conservación',
                descripcion:
                  'Permite ver información consolidada sobre los inventarios registrados en el sistema.',
                subsistema: 'CONS',
                desc_subsistema: 'Conservación',
                ruta_formulario: '/#/app/conservacion/tablero_control/viveros',
                nombre_icono: 'test',
                id_menu: 29,
                permisos: {
                  consultar: true,
                },
              },
            ],
            submenus: [],
          },
        ],
      },
      {
        id_menu: 30,
        desc_subsistema: 'Conservación',
        nombre: 'Configuración y Datos Básicos',
        nivel_jerarquico: 1,
        orden_por_padre: 8,
        subsistema: 'CONS',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 44,
            nombre_modulo: 'Tipificación de Bienes de Consumo de Viveros',
            descripcion:
              'Permite tipificar los bienes de consumo utilizables en viveros para la producción',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/configuracion/tipificacion_bienes',
            nombre_icono: 'test',
            id_menu: 30,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 49,
            nombre_modulo: 'Administración de Camas de Germinación',
            descripcion:
              'Permite administrar las camas de germinación para los diferntes viveros de la entidad',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/configuracion/administrar_camas_germinacion',
            nombre_icono: 'test',
            id_menu: 30,
            permisos: {
              borrar: true,
              actualizar: true,
              consultar: true,
              crear: true,
            },
          },
          {
            id_modulo: 57,
            nombre_modulo: 'Mezclas',
            descripcion:
              'Permite administrar los nombres de las mezclas que se podrán crear en el sistema',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario: '/#/app/conservacion/configuracion/tipos_mezcla',
            nombre_icono: 'test',
            id_menu: 30,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
              borrar: true,
            },
          },
          {
            id_modulo: 128,
            nombre_modulo: 'Configuración de Alertas de Conservación',
            descripcion:
              'Permite configurar las alertas pertenecientes al subsistema de conservación.',
            subsistema: 'CONS',
            desc_subsistema: 'Conservación',
            ruta_formulario:
              '/#/app/conservacion/alertas/configuracion_alertas',
            nombre_icono: 'test',
            id_menu: 30,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
        ],
        submenus: [],
      },
    ],
  },
  {
    subsistema: 'GEST',
    desc_subsistema: 'Gestión Documental',
    menus: [
      {
        id_menu: 10,
        desc_subsistema: 'Gestión Documental',
        nombre: 'Ventanilla Única',
        nivel_jerarquico: 1,
        orden_por_padre: 1,
        subsistema: 'GEST',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 71,
            nombre_modulo: 'Creación de Personas desde Ventanilla',
            descripcion:
              'Permite crear personas que van a solicitar desde la ventanilla algún servicio a la entidad',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario:
              '/#/app/gestor_documental/ventanilla_unica/creacion_persona',
            nombre_icono: 'test',
            id_menu: 10,
            permisos: {
              crear: true,
              consultar: true,
              actualizar: true,
            },
          },
          {
            id_modulo: 173,
            nombre_modulo: 'Impresión de Rótulos de Radicados',
            descripcion:
              'Permite consultar para luego imprimir el rótulo de un número de radicado en un formato predefinido',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario: '',
            nombre_icono: 'test',
            id_menu: 10,
            permisos: {
              consultar: true,
            },
          },
          {
            id_modulo: 174,
            nombre_modulo: 'Central de Digitalización',
            descripcion:
              'Permite administrar y ejecutar las solicitudes de digitalización de documentos realizados por colaboradores de la entidad al área de digitalización',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario: '',
            nombre_icono: 'test',
            id_menu: 10,
            permisos: {
              actualizar: true,
              borrar: true,
              consultar: true,
              crear: true,
            },
          },
          {
            id_modulo: 177,
            nombre_modulo: 'Panel de Ventanilla',
            descripcion:
              'Permite consultar las solicitudes de PQRSDF, Trámites/Servicios, Otros, Complementos de PQRSDF y Respuestas de los usuarios titulares de las PQRSDF',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario: '/#/app/gestor_documental/panel_ventanilla',
            nombre_icono: 'test',
            id_menu: 10,
            permisos: {
              consultar: true,
            },
          },
        ],
        submenus: [
          {
            id_menu: 75,
            desc_subsistema: 'Gestión Documental',
            nombre: 'Solicitud de Servicios',
            nivel_jerarquico: 2,
            orden_por_padre: 1,
            subsistema: 'GEST',
            id_menu_padre: 10,
            modulos: [
              {
                id_modulo: 162,
                nombre_modulo: 'PQRSDF',
                descripcion:
                  'Permite solicitar a la entidad un PQRSDF a nombre de un usuario de la comunidad',
                subsistema: 'GEST',
                desc_subsistema: 'Gestión Documental',
                ruta_formulario: '',
                nombre_icono: 'test',
                id_menu: 75,
                permisos: {
                  crear: true,
                  actualizar: true,
                  consultar: true,
                  borrar: true,
                },
              },
              {
                id_modulo: 183,
                nombre_modulo: 'Otros',
                descripcion:
                  'Permite realizar una solicitud Otros a la entidad a nombre de un usuario de la comunidad',
                subsistema: 'GEST',
                desc_subsistema: 'Gestión Documental',
                ruta_formulario: '',
                nombre_icono: 'test',
                id_menu: 75,
                permisos: {
                  actualizar: true,
                  borrar: true,
                  consultar: true,
                  crear: true,
                },
              },
            ],
            submenus: [],
          },
          {
            id_menu: 76,
            desc_subsistema: 'Gestión Documental',
            nombre: 'Encuestas',
            nivel_jerarquico: 2,
            orden_por_padre: 2,
            subsistema: 'GEST',
            id_menu_padre: 10,
            modulos: [
              {
                id_modulo: 167,
                nombre_modulo: 'Administrador de Encuestas',
                descripcion:
                  'Permite crear  y administrar las encuestas creadas por la entidad para su uso.',
                subsistema: 'GEST',
                desc_subsistema: 'Gestión Documental',
                ruta_formulario:
                  '/#/app/gestor_documental/encuesta_configuracion/encuesta',
                nombre_icono: 'test',
                id_menu: 76,
                permisos: {
                  crear: true,
                  actualizar: true,
                  consultar: true,
                  borrar: true,
                },
              },
              {
                id_modulo: 168,
                nombre_modulo: 'Estadisticas de Encuestas',
                descripcion:
                  'Permite revisar estadísticas e informes sobre las encuestas resueltas.',
                subsistema: 'GEST',
                desc_subsistema: 'Gestión Documental',
                ruta_formulario:
                  '/#/app/gestor_documental/encuesta_datos/datos',
                nombre_icono: 'test',
                id_menu: 76,
                permisos: {
                  consultar: true,
                },
              },
            ],
            submenus: [],
          },
        ],
      },
      {
        id_menu: 11,
        desc_subsistema: 'Gestión Documental',
        nombre: 'Gestión Documental',
        nivel_jerarquico: 1,
        orden_por_padre: 2,
        subsistema: 'GEST',
        id_menu_padre: null,
        modulos: [],
        submenus: [
          {
            id_menu: 69,
            desc_subsistema: 'Gestión Documental',
            nombre: 'Plantillas',
            nivel_jerarquico: 2,
            orden_por_padre: 4,
            subsistema: 'GEST',
            id_menu_padre: 11,
            modulos: [
              {
                id_modulo: 141,
                nombre_modulo: 'Administrador de Plantillas Documentales',
                descripcion:
                  'Permite administrar las plantillas documentales creadas por la entidad para su uso por los colaboradores de la misma',
                subsistema: 'GEST',
                desc_subsistema: 'Gestión Documental',
                ruta_formulario:
                  '/#/app/gestor_documental/plantilladocumentos/plantilladocumentos',
                nombre_icono: 'test',
                id_menu: 69,
                permisos: {
                  crear: true,
                  actualizar: true,
                  consultar: true,
                  borrar: true,
                },
              },
              {
                id_modulo: 142,
                nombre_modulo: 'Centro de Plantillas Documentales',
                descripcion:
                  'Permite buscar y descargar las plantillas documentales existentes en el sistema por parte de los colaboradores de la entidad',
                subsistema: 'GEST',
                desc_subsistema: 'Gestión Documental',
                ruta_formulario:
                  '/#/app/gestor_documental/plantilladocumentos/centroplantillas',
                nombre_icono: 'test',
                id_menu: 69,
                permisos: {
                  consultar: true,
                },
              },
            ],
            submenus: [],
          },
          {
            id_menu: 70,
            desc_subsistema: 'Gestión Documental',
            nombre: 'Expedientes Documentales',
            nivel_jerarquico: 2,
            orden_por_padre: 3,
            subsistema: 'GEST',
            id_menu_padre: 11,
            modulos: [],
            submenus: [
              {
                id_menu: 71,
                desc_subsistema: 'Gestión Documental',
                nombre: 'Apertura',
                nivel_jerarquico: 3,
                orden_por_padre: 1,
                subsistema: 'GEST',
                id_menu_padre: 70,
                modulos: [
                  {
                    id_modulo: 129,
                    nombre_modulo: 'Cajas de Archivo Documental',
                    descripcion:
                      'Permite administrar las cajas que se encuentran en las bandejas de los estantes de los depósitos de archivo de la entidad',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario:
                      '/#/app/gestor_documental/configuracion_datos_basicos/archivo/cajas',
                    nombre_icono: 'test',
                    id_menu: 71,
                    permisos: {
                      crear: true,
                      actualizar: true,
                      consultar: true,
                      borrar: true,
                    },
                  },
                  {
                    id_modulo: 140,
                    nombre_modulo: 'Carpetas de Archivo Documental',
                    descripcion:
                      'Permite administrar las carpetas que se encuentran en las cajas en las bandejas de los estantes de los depósitos de archivo de la entidad',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario:
                      '/#/app/gestor_documental/configuracion_datos_basicos/archivo/administrar_carpetas',
                    nombre_icono: 'test',
                    id_menu: 71,
                    permisos: {
                      crear: true,
                      actualizar: true,
                      consultar: true,
                      borrar: true,
                    },
                  },
                  {
                    id_modulo: 160,
                    nombre_modulo: 'Apertura de Expedientes',
                    descripcion:
                      'Permite aperturar manualmente un expediente electrónico documental en el Gestor Documental',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario: '',
                    nombre_icono: 'test',
                    id_menu: 71,
                    permisos: {
                      crear: true,
                      actualizar: true,
                      consultar: true,
                      borrar: true,
                      anular: true,
                    },
                  },
                ],
                submenus: [],
              },
              {
                id_menu: 72,
                desc_subsistema: 'Gestión Documental',
                nombre: 'Gestión',
                nivel_jerarquico: 3,
                orden_por_padre: 2,
                subsistema: 'GEST',
                id_menu_padre: 70,
                modulos: [
                  {
                    id_modulo: 161,
                    nombre_modulo: 'Indexación de Documentos',
                    descripcion:
                      'Permite indexar o cargar manualmente Documentos Electrónicos de Archivo a un Expediente Electrónico Documental del Gestor Documental',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario: '',
                    nombre_icono: 'test',
                    id_menu: 72,
                    permisos: {
                      crear: true,
                      actualizar: true,
                      consultar: true,
                      borrar: true,
                      anular: true,
                    },
                  },
                  {
                    id_modulo: 166,
                    nombre_modulo: 'Reubicación Física de Expedientes',
                    descripcion:
                      'Permite indicarle al sistema cuando un expediente cambia de carpeta física en la que se encuentra almacenado.',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario: '',
                    nombre_icono: 'test',
                    id_menu: 72,
                    permisos: {
                      actualizar: true,
                      consultar: true,
                    },
                  },
                  {
                    id_modulo: 151,
                    nombre_modulo: 'Consulta de Índices Electrónicos',
                    descripcion:
                      'Permite realizar la consulta del índice electrónico de un expediente electrónico documental.',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario: '',
                    nombre_icono: 'test',
                    id_menu: 72,
                    permisos: {
                      consultar: true,
                    },
                  },
                  {
                    id_modulo: 152,
                    nombre_modulo: 'Consulta de Expedientes Documentales',
                    descripcion:
                      'Permite realizar la consulta de un expediente electrónico documental o de un documento electrónico de archivo a un usuario cuya unidad tiene permisos de consulta sobre el mismo.',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario: '',
                    nombre_icono: 'test',
                    id_menu: 72,
                    permisos: {
                      consultar: true,
                    },
                  },
                  {
                    id_modulo: 156,
                    nombre_modulo: 'Consulta del Archivo Físico',
                    descripcion:
                      'Permite consultar la ubicación del archivo físico de la entidad desde un arbol de navegación',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario: '',
                    nombre_icono: 'test',
                    id_menu: 72,
                    permisos: {
                      consultar: true,
                    },
                  },
                ],
                submenus: [],
              },
              {
                id_menu: 73,
                desc_subsistema: 'Gestión Documental',
                nombre: 'Cierre y Archivo',
                nivel_jerarquico: 3,
                orden_por_padre: 3,
                subsistema: 'GEST',
                id_menu_padre: 70,
                modulos: [
                  {
                    id_modulo: 146,
                    nombre_modulo: 'Cierre de Expedientes Documentales',
                    descripcion:
                      'Permite realizar el cierre de un expediente documental de la entidad.',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario: '',
                    nombre_icono: 'test',
                    id_menu: 73,
                    permisos: {
                      consultar: true,
                      crear: true,
                    },
                  },
                  {
                    id_modulo: 149,
                    nombre_modulo: 'Reapertura de Expedientes Documentales',
                    descripcion:
                      'Permite realizar la reapertura de un expediente documental que había sido previamente cerrado, de la entidad.',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario: '',
                    nombre_icono: 'test',
                    id_menu: 73,
                    permisos: {
                      consultar: true,
                      crear: true,
                    },
                  },
                  {
                    id_modulo: 150,
                    nombre_modulo: 'Firma y Cierre de Índice Electrónico',
                    descripcion:
                      'Permite realizar el cierre del índice electrónico de un expediente electrónico documental mediante la firma del mismo.',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario: '',
                    nombre_icono: 'test',
                    id_menu: 73,
                    permisos: {
                      consultar: true,
                      crear: true,
                    },
                  },
                ],
                submenus: [],
              },
            ],
          },
          {
            id_menu: 12,
            desc_subsistema: 'Gestión Documental',
            nombre: 'Instrumentos Archivísticos',
            nivel_jerarquico: 2,
            orden_por_padre: 1,
            subsistema: 'GEST',
            id_menu_padre: 11,
            modulos: [
              {
                id_modulo: 31,
                nombre_modulo: 'Tabla de Control de Acceso',
                descripcion:
                  'Permite administrar las Tablas de Control de Acceso de la entidad en el sistema',
                subsistema: 'GEST',
                desc_subsistema: 'Gestión Documental',
                ruta_formulario: '/#/app/gestor_documental/tca',
                nombre_icono: 'test',
                id_menu: 12,
                permisos: {
                  crear: true,
                  actualizar: true,
                  consultar: true,
                },
              },
              {
                id_modulo: 29,
                nombre_modulo: 'Tabla de Retención Documental',
                descripcion:
                  'Permite administrar las Tablas de Retención Documental de la entidad en el sistema',
                subsistema: 'GEST',
                desc_subsistema: 'Gestión Documental',
                ruta_formulario: '/#/app/gestor_documental/trd',
                nombre_icono: 'test',
                id_menu: 12,
                permisos: {
                  crear: true,
                  actualizar: true,
                  consultar: true,
                },
              },
              {
                id_modulo: 27,
                nombre_modulo: 'Cuadro de clasificación documental',
                descripcion:
                  'Permite administrar los Cuadros de Clasificación Documental de la entidad en el sistema',
                subsistema: 'GEST',
                desc_subsistema: 'Gestión Documental',
                ruta_formulario: '/#/app/gestor_documental/ccd',
                nombre_icono: 'test',
                id_menu: 12,
                permisos: {
                  crear: true,
                  actualizar: true,
                  consultar: true,
                },
              },
            ],
            submenus: [
              {
                id_menu: 67,
                desc_subsistema: 'Gestión Documental',
                nombre: 'Privilegios de Acceso',
                nivel_jerarquico: 3,
                orden_por_padre: 1,
                subsistema: 'GEST',
                id_menu_padre: 12,
                modulos: [
                  {
                    id_modulo: 135,
                    nombre_modulo: 'Permisos en Series Documentales',
                    descripcion:
                      'Permite administrar los permisos que las unidades organizacionales actuales tendrán sobre las series documentales y sus expedientes de los diferentes CCD de la entidad.',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario:
                      '/#/app/gestor_documental/ccd/permisos_sobre_series_documentales/',
                    nombre_icono: 'test',
                    id_menu: 67,
                    permisos: {
                      crear: true,
                      actualizar: true,
                      consultar: true,
                    },
                  },
                  {
                    id_modulo: 136,
                    nombre_modulo:
                      'Control de Acceso de Clasificación de Expedientes',
                    descripcion:
                      'Permite administrar los permisos de consulta y descarga que algunas unidades organizacionales actuales que poseen ciertas características tendrán sobre los expedientes de acuerdo a su clasificación.',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario:
                      '/#/app/gestor_documental/ccd/control_acceso_expedientes/',
                    nombre_icono: 'test',
                    id_menu: 67,
                    permisos: {
                      crear: true,
                      actualizar: true,
                      consultar: true,
                    },
                  },
                ],
                submenus: [],
              },
              {
                id_menu: 68,
                desc_subsistema: 'Gestión Documental',
                nombre: 'Actividades Previas a Cambio de CCD',
                nivel_jerarquico: 3,
                orden_por_padre: 2,
                subsistema: 'GEST',
                id_menu_padre: 12,
                modulos: [
                  {
                    id_modulo: 138,
                    nombre_modulo:
                      '2. Asignación de Secciones Responsables del CCD',
                    descripcion:
                      'Permite previo a cambio de CCD, indicarle al sistema cuales secciones del CCD nuevo serán las responsasbles del catálogo de series de las secciones de los CCD actual y anteriores.',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario:
                      '/#/app/gestor_documental/ccd/actividades_previas_cambio_ccd/asignaciones_unidades_responsables',
                    nombre_icono: 'test',
                    id_menu: 68,
                    permisos: {
                      crear: true,
                      actualizar: true,
                      consultar: true,
                    },
                  },
                  {
                    id_modulo: 137,
                    nombre_modulo:
                      '1. Homologacion Secciones Persistentes del CCD',
                    descripcion:
                      'Permite previo a cambio de CCD, indicarle al sistema cuales secciones y sus agrupaciones documentales del CCD actual persisten en el nuevo.',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario:
                      '/#/app/gestor_documental/ccd/actividades_previas_cambio_ccd/homologacion_secciones_persistentes',
                    nombre_icono: 'test',
                    id_menu: 68,
                    permisos: {
                      crear: true,
                      actualizar: true,
                      consultar: true,
                    },
                  },
                  {
                    id_modulo: 139,
                    nombre_modulo:
                      '3. Delegación de Oficinas Responsables de Expedientes',
                    descripcion:
                      'Permite previo a cambio de CCD, indicarle al sistema cuales unidades organizacionales del CCD nuevo serán las delegadas para responder por los expedientes y documentos existentes creados en el CCD actual y anteriores.',
                    subsistema: 'GEST',
                    desc_subsistema: 'Gestión Documental',
                    ruta_formulario:
                      '/#/app/gestor_documental/ccd/actividades_previas_cambio_ccd/delegacion_oficinas_responsables_expedientes',
                    nombre_icono: 'test',
                    id_menu: 68,
                    permisos: {
                      consultar: true,
                      crear: true,
                      actualizar: true,
                    },
                  },
                ],
                submenus: [],
              },
            ],
          },
          {
            id_menu: 13,
            desc_subsistema: 'Gestión Documental',
            nombre: 'Procesos',
            nivel_jerarquico: 2,
            orden_por_padre: 2,
            subsistema: 'GEST',
            id_menu_padre: 11,
            modulos: [
              {
                id_modulo: 28,
                nombre_modulo: 'Activación Instrumentos Archivísticos',
                descripcion:
                  'Permite adoptar una nueva versión de los Instrumentos Archivísticos de la entidad en el sistema',
                subsistema: 'GEST',
                desc_subsistema: 'Gestión Documental',
                ruta_formulario:
                  '/#/app/gestor_documental/activacion_instrumentos_archivisticos',
                nombre_icono: 'test',
                id_menu: 13,
                permisos: {
                  ejecutar: true,
                  consultar: true,
                },
              },
            ],
            submenus: [],
          },
        ],
      },
      {
        id_menu: 15,
        desc_subsistema: 'Gestión Documental',
        nombre: 'Reportes, Indicadores y Analítica',
        nivel_jerarquico: 1,
        orden_por_padre: 4,
        subsistema: 'GEST',
        id_menu_padre: null,
        modulos: [],
        submenus: [
          {
            id_menu: 16,
            desc_subsistema: 'Gestión Documental',
            nombre: 'Reportes',
            nivel_jerarquico: 2,
            orden_por_padre: 1,
            subsistema: 'GEST',
            id_menu_padre: 15,
            modulos: [
              {
                id_modulo: 145,
                nombre_modulo: 'Reporte de Permisos Sobre la Documentación',
                descripcion:
                  'Permite generar un reporte de los permisos que tienen las diferntes unidades organizacionales actuales de la entidad sobre las agrupaciones documentales de una sección o subsección de cualquier TRD',
                subsistema: 'GEST',
                desc_subsistema: 'Gestión Documental',
                ruta_formulario: '',
                nombre_icono: 'test',
                id_menu: 16,
                permisos: {
                  consultar: true,
                },
              },
            ],
            submenus: [],
          },
        ],
      },
      {
        id_menu: 19,
        desc_subsistema: 'Gestión Documental',
        nombre: 'Configuración y Datos Básicos',
        nivel_jerarquico: 1,
        orden_por_padre: 5,
        subsistema: 'GEST',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 74,
            nombre_modulo: 'Tipologías Documentales',
            descripcion:
              'Permite administrar las tipologías documentales de la entidad a manejar en el sistema',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario:
              '/#/app/gestor_documental/configuracion_datos_basicos/admin_tipologias_documentales',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
              borrar: true,
            },
          },
          {
            id_modulo: 143,
            nombre_modulo: 'Configuración de Tipos de Radicado Actuales',
            descripcion:
              'Permite configurar los tipos de radicado que la entidad quiere utilizar en el año en curso',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario:
              '/#/app/gestor_documental/configuracion_datos_basicos/radicado/actual',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 121,
            nombre_modulo: 'Depósitos de Archivo',
            descripcion:
              'Permite administrar los depósitos de archivo que se manejan en la entidad',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario:
              '/#/app/gestor_documental/configuracion_datos_basicos/archivo/depositos',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
              borrar: true,
            },
          },
          {
            id_modulo: 126,
            nombre_modulo: 'Estantes por Depósitos de Archivo',
            descripcion:
              'Permite administrar los estantes que se encuentran en los depósitos de archivo que se manejan en la entidad',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario:
              '/#/app/gestor_documental/configuracion_datos_basicos/archivo/estantes',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
              borrar: true,
            },
          },
          {
            id_modulo: 130,
            nombre_modulo: 'Configuración de Alertas de Gestión Documental',
            descripcion:
              'Permite configurar las alertas pertenecientes al subsistema de Gestión Documental.',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario: '/#/app/gestor_documental/alertas_gestor/alertas',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 147,
            nombre_modulo: 'Configuración de Tipos de Expedientes Actuales',
            descripcion:
              'Permite configurar los tipos de expedientes y sus consecutivos de las agrupaciones documentales sobre la cual se generarán para el año en curso.',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario: '',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 148,
            nombre_modulo:
              'Registrar Cambios en Tipos de Expedientes del Próximo Año',
            descripcion:
              'Permite registrar anticipadamente cambios con respecto al año actual en la configuración de los tipos de expedientes o cuando se requiere que un tipo no inicie en 1, para aplicar el próximo año.',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario: '',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 153,
            nombre_modulo: 'Tipos de PQRSDF',
            descripcion:
              'Permite configurar en el sistema los tipos de PQRSDF que tiene la entidad, especificando aspectos como el tiempo de respuesta de forma individual para cada uno.',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario: '',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 154,
            nombre_modulo: 'Tipos de Medios de Solicitud',
            descripcion:
              'Permite administrar la información de los tipos de medios de solicitud disponibles para solicitar PQRSDF, Trámites y Servicios y Otros en el sistema.',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario: '',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
              borrar: true,
            },
          },
          {
            id_modulo: 163,
            nombre_modulo: 'Configuración de Tiempos de Respuesta',
            descripcion:
              'Permite configurar los diferentes tiempos de respuesta que tendrá tanto la entidad como los usuarios de la misma para dar tramite a los posibles requerimientos de una u otra parte.',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario: '',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 164,
            nombre_modulo:
              'Configuración de Tipologías Documentales Año Actual',
            descripcion:
              'Permite realizar la configuración de las tipologías documentales manejadas en la entidad para el año actual, en la TRD Actual.',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario: '',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 165,
            nombre_modulo:
              'Registrar Cambios de Tipologías Docs para el Próximo Año',
            descripcion:
              'Permite registrar anticipadamente cambios con respecto al año actual en la configuración de las tipologías documentales del próximo año, cuando se requiere que algo de su configuración cambie, para la TRD Actual.',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario: '',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 75,
            nombre_modulo: 'Formatos de Archivos',
            descripcion:
              'Permite administrar los formatos de archivo de los documentos para medios físicos y digitales a manejar en el sistema',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario:
              '/#/app/gestor_documental/configuracion_datos_basicos/admin_formatos_documentales',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
              borrar: true,
            },
          },
          {
            id_modulo: 144,
            nombre_modulo: 'Configuración de Tipos de Radicado Próximo Año',
            descripcion:
              'Permite configurar anticipadamente los tipos de radicado que la entidad quiere utilizar el próximo año',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario:
              '/#/app/gestor_documental/configuracion_datos_basicos/radicado/siguiente',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 155,
            nombre_modulo: 'Metadatos Personalizados',
            descripcion:
              'Permite administrar los metadatos personalizados que la entidad tenga para los documentos y expedientes de Gestión Documental.',
            subsistema: 'GEST',
            desc_subsistema: 'Gestión Documental',
            ruta_formulario:
              '/#/gestor_documental/metadatos/configuracion_metadatos',
            nombre_icono: 'test',
            id_menu: 19,
            permisos: {
              borrar: true,
              consultar: true,
              actualizar: true,
              crear: true,
            },
          },
        ],
        submenus: [],
      },
    ],
  },
  {
    subsistema: 'RECA',
    desc_subsistema: 'Recaudo',
    menus: [
      {
        id_menu: 65,
        desc_subsistema: 'Recaudo',
        nombre: 'Gestor de Recaudo',
        nivel_jerarquico: 1,
        orden_por_padre: 1,
        subsistema: 'RECA',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 101,
            nombre_modulo: 'Compendio Datos Recaudo',
            descripcion:
              'Permite visualizar de forma rápida un compendio de los datos de Cartera',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '/#/app/recaudo/datos',
            nombre_icono: 'test',
            id_menu: 65,
            permisos: {
              consultar: true,
            },
          },
          {
            id_modulo: 102,
            nombre_modulo: 'Etapas del Proceso de Rentas',
            descripcion:
              'Permite visualizar las etapas de cada proceso generado en rentas y administrar sus atributos.',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '/#/app/recaudo/estados_proceso',
            nombre_icono: 'test',
            id_menu: 65,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 103,
            nombre_modulo: 'Flujo del Proceso',
            descripcion:
              'Permite administrar el flujo bpmn de los procesos generados en recaudo.',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '/#/app/recaudo/flujo_proceso',
            nombre_icono: 'test',
            id_menu: 65,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 59,
        desc_subsistema: 'Recaudo',
        nombre: 'Gestor de Deudores',
        nivel_jerarquico: 1,
        orden_por_padre: 2,
        subsistema: 'RECA',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 92,
            nombre_modulo: 'Consulta de Deudores',
            descripcion:
              'Permite consultar el listado de los deudores de la corporación y sus obligaciones pendientes por pago.',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '/#/app/recaudo/facilidades_pago/consulta',
            nombre_icono: 'test',
            id_menu: 59,
            permisos: {
              consultar: true,
            },
          },
          {
            id_modulo: 104,
            nombre_modulo: 'Gestión de Cartera',
            descripcion: 'Permite cambiar de estado la cartera de un deudor.',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '/#/app/recaudo/gestion_cartera',
            nombre_icono: 'test',
            id_menu: 59,
            permisos: {
              consultar: true,
              crear: true,
            },
          },
          {
            id_modulo: 175,
            nombre_modulo: 'Generador de Liquidaciones',
            descripcion:
              'Permite generar la liquidación individual por usuario.',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '/#/app/recaudo/proceso_liquidacion',
            nombre_icono: 'test',
            id_menu: 59,
            permisos: {
              actualizar: true,
              anular: true,
              borrar: true,
              consultar: true,
              crear: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 60,
        desc_subsistema: 'Recaudo',
        nombre: 'Facilidades de Pago',
        nivel_jerarquico: 1,
        orden_por_padre: 3,
        subsistema: 'RECA',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 94,
            nombre_modulo: 'Solicitudes de Facilidades de Pago Pendientes',
            descripcion:
              'Lista las solicitudes de facilidades de pago pendientes por gestionar y permite asignar su gestión a colaboradores del área.',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '/#/app/recaudo/facilidades_pago/admin',
            nombre_icono: 'test',
            id_menu: 60,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 95,
            nombre_modulo: 'Solicitudes de Facilidad de Pago Asignadas',
            descripcion:
              'Le permite a un usuario interno ver el listado de las solicitudes de facilidades de pago que le han asignado para su gestión.',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '/#/app/recaudo/facilidades_pago/asignadas',
            nombre_icono: 'test',
            id_menu: 60,
            permisos: {
              consultar: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 61,
        desc_subsistema: 'Recaudo',
        nombre: 'Portal de Deudores',
        nivel_jerarquico: 1,
        orden_por_padre: 4,
        subsistema: 'RECA',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 91,
            nombre_modulo: 'Listado de Obligaciones',
            descripcion:
              'Permite visualizar el listado de obligaciones pendientes por pago del usuario externo.',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '/#/app/recaudo/facilidades_pago',
            nombre_icono: 'test',
            id_menu: 61,
            permisos: {
              consultar: true,
            },
          },
          {
            id_modulo: 99,
            nombre_modulo: 'Listado de Facilidades de Pago',
            descripcion:
              'Permite al usuario externo ver un listado de sus facilidades de pago solicitadas, aprobadas y canceladas.',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '/#/app/recaudo/facilidades_pago/autorizadas',
            nombre_icono: 'test',
            id_menu: 61,
            permisos: {
              consultar: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 63,
        desc_subsistema: 'Recaudo',
        nombre: 'Reportes, Indicadores y Analítica',
        nivel_jerarquico: 1,
        orden_por_padre: 6,
        subsistema: 'RECA',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 105,
            nombre_modulo: 'Facilidades de Pago',
            descripcion:
              'Permite visualizar en detalle las facilidades de pago creadas.',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '#/app/recaudo/reportes/facilidad_pago',
            nombre_icono: 'test',
            id_menu: 63,
            permisos: {
              consultar: true,
            },
          },
          {
            id_modulo: 106,
            nombre_modulo: 'Listado de Cartera Detallado',
            descripcion: 'Permite visualizar un listado de Cartera detallada',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '#/app/recaudo/reportes/cartera_detallada',
            nombre_icono: 'test',
            id_menu: 63,
            permisos: {
              consultar: true,
            },
          },
          {
            id_modulo: 107,
            nombre_modulo: 'Cartera Totalizada a Fecha',
            descripcion:
              'Permite visualizar un informe de la Cartera totalizadad a una fecha elegida.',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '/#/app/recaudo/reportes/cartera_general',
            nombre_icono: 'test',
            id_menu: 63,
            permisos: {
              consultar: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 64,
        desc_subsistema: 'Recaudo',
        nombre: 'Configuración y Datos Básicos',
        nivel_jerarquico: 1,
        orden_por_padre: 7,
        subsistema: 'RECA',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 90,
            nombre_modulo: 'Constructor de Fórmulas para Liquidación',
            descripcion:
              'Permite crear de manera gráfica, fórmulas matemáticas para utilizarlas en el proceso de liquidación.',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '/#/app/recaudo/liquidacion',
            nombre_icono: 'test',
            id_menu: 64,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
              borrar: true,
            },
          },
          {
            id_modulo: 120,
            nombre_modulo: 'Configuración de Alertas de Recaudo',
            descripcion:
              'Permite configurar las Alertas disponbiles para el subsistema de Recaudo',
            subsistema: 'RECA',
            desc_subsistema: 'Recaudo',
            ruta_formulario: '/#/app/recaudo/alertas',
            nombre_icono: 'test',
            id_menu: 64,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
        ],
        submenus: [],
      },
    ],
  },
  {
    subsistema: 'RECU',
    desc_subsistema: 'Recurso Hídrico',
    menus: [
      {
        id_menu: 46,
        desc_subsistema: 'Recurso Hídrico',
        nombre: 'Gestor de Requerimientos',
        nivel_jerarquico: 1,
        orden_por_padre: 1,
        subsistema: 'RECU',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 110,
            nombre_modulo: 'Contenido Programático PORH',
            descripcion:
              'Permite registrar el contenido programático a Planes de Ordenamiento de Recurso Hídrico',
            subsistema: 'RECU',
            desc_subsistema: 'Recurso Hídrico',
            ruta_formulario:
              '/#/app/recurso_hidrico/biblioteca/porh/contenido_programatico',
            nombre_icono: 'test',
            id_menu: 46,
            permisos: {
              actualizar: true,
              consultar: true,
              crear: true,
              borrar: true,
            },
          },
          {
            id_modulo: 111,
            nombre_modulo: 'Registro de Avances de Proyectos',
            descripcion:
              'Permite registrar los avances a los proyectos pertenecientes a los programas de los PORH',
            subsistema: 'RECU',
            desc_subsistema: 'Recurso Hídrico',
            ruta_formulario:
              '/#/app/recurso_hidrico/biblioteca/proyectos/avances',
            nombre_icono: 'test',
            id_menu: 46,
            permisos: {
              consultar: true,
              actualizar: true,
              crear: true,
            },
          },
        ],
        submenus: [
          {
            id_menu: 66,
            desc_subsistema: 'Recurso Hídrico',
            nombre: 'Biblioteca',
            nivel_jerarquico: 2,
            orden_por_padre: 1,
            subsistema: 'RECU',
            id_menu_padre: 46,
            modulos: [
              {
                id_modulo: 118,
                nombre_modulo: 'Registro de Secciones de Biblioteca',
                descripcion:
                  'Permite registrar las secciones con sus subsecciones de la biblioteca de Recurso Hídrico',
                subsistema: 'RECU',
                desc_subsistema: 'Recurso Hídrico',
                ruta_formulario:
                  '/#/app/recurso_hidrico/biblioteca/registro/secion_sub_seccion',
                nombre_icono: 'test',
                id_menu: 66,
                permisos: {
                  consultar: true,
                  actualizar: true,
                  crear: true,
                  borrar: true,
                },
              },
              {
                id_modulo: 122,
                nombre_modulo: 'Administración de Instrumentos de Biblioteca',
                descripcion:
                  'Permite administrar los instrumentos de cada sección y subsección de la Biblioteca de Recurso Hídrico.',
                subsistema: 'RECU',
                desc_subsistema: 'Recurso Hídrico',
                ruta_formulario:
                  '/#/app/recurso_hidrico/biblioteca/instrumentos/administracion',
                nombre_icono: 'test',
                id_menu: 66,
                permisos: {
                  consultar: true,
                  actualizar: true,
                  crear: true,
                  borrar: true,
                },
              },
              {
                id_modulo: 119,
                nombre_modulo: 'Biblioteca Recurso Hídrico',
                descripcion:
                  'Permite consultar la biblioteca de Recurso Hídrico con sus secciones, subsecciones e instrumentos asociados.',
                subsistema: 'RECU',
                desc_subsistema: 'Recurso Hídrico',
                ruta_formulario:
                  '/#/app/recurso_hidrico/biblioteca/consulta/visualizacion',
                nombre_icono: 'test',
                id_menu: 66,
                permisos: {
                  consultar: true,
                },
              },
            ],
            submenus: [],
          },
        ],
      },
      {
        id_menu: 47,
        desc_subsistema: 'Recurso Hídrico',
        nombre: 'Aguas Superficiales',
        nivel_jerarquico: 1,
        orden_por_padre: 2,
        subsistema: 'RECU',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 123,
            nombre_modulo: 'Registro de Cuencas',
            descripcion:
              'Permite registrar las Cuencas Hídricas de la Biblioteca de Recurso Hídrico',
            subsistema: 'RECU',
            desc_subsistema: 'Recurso Hídrico',
            ruta_formulario:
              '/#/app/recurso_hidrico/biblioteca/configuraciones_basicas/cuencas',
            nombre_icono: 'test',
            id_menu: 47,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
              borrar: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 48,
        desc_subsistema: 'Recurso Hídrico',
        nombre: 'Aguas Subterraneas',
        nivel_jerarquico: 1,
        orden_por_padre: 3,
        subsistema: 'RECU',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 125,
            nombre_modulo: 'Registro de Parámetros de Laboratorio',
            descripcion:
              'Permite registrar los Parámetros que se usan en los Resultados de Laboratorio',
            subsistema: 'RECU',
            desc_subsistema: 'Recurso Hídrico',
            ruta_formulario:
              '/#/app/recurso_hidrico/biblioteca/configuraciones_basicas/parametros',
            nombre_icono: 'test',
            id_menu: 48,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
              borrar: true,
            },
          },
          {
            id_modulo: 124,
            nombre_modulo: 'Registro de Pozos',
            descripcion:
              'Permite registrar los Pozos de la Biblioteca de Recurso Hídrico',
            subsistema: 'RECU',
            desc_subsistema: 'Recurso Hídrico',
            ruta_formulario:
              '/#/app/recurso_hidrico/biblioteca/configuraciones_basicas/pozos',
            nombre_icono: 'test',
            id_menu: 48,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
              borrar: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 49,
        desc_subsistema: 'Recurso Hídrico',
        nombre: 'Estaciones Meteorológicas',
        nivel_jerarquico: 1,
        orden_por_padre: 4,
        subsistema: 'RECU',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 82,
            nombre_modulo: 'Geolocalización',
            descripcion:
              'Permite visualizar la ubicación geográfica de las Estaciones Meteorológicas y sus últimos datos, registradas en el sistema',
            subsistema: 'RECU',
            desc_subsistema: 'Recurso Hídrico',
            ruta_formulario:
              '/#/app/recurso_hidrico/estaciones/geolocalizacion',
            nombre_icono: 'test',
            id_menu: 49,
            permisos: {
              consultar: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 52,
        desc_subsistema: 'Recurso Hídrico',
        nombre: 'Reportes, Indicadores y Analítica',
        nivel_jerarquico: 1,
        orden_por_padre: 7,
        subsistema: 'RECU',
        id_menu_padre: null,
        modulos: [],
        submenus: [
          {
            id_menu: 53,
            desc_subsistema: 'Recurso Hídrico',
            nombre: 'Reportes',
            nivel_jerarquico: 2,
            orden_por_padre: 1,
            subsistema: 'RECU',
            id_menu_padre: 52,
            modulos: [],
            submenus: [
              {
                id_menu: 54,
                desc_subsistema: 'Recurso Hídrico',
                nombre: 'Estaciones',
                nivel_jerarquico: 3,
                orden_por_padre: 1,
                subsistema: 'RECU',
                id_menu_padre: 53,
                modulos: [
                  {
                    id_modulo: 87,
                    nombre_modulo: 'Historial de Alertas Internas',
                    descripcion:
                      'Reporte que muestra el historial por mes de las alertas emitidas hacia la corporación a causa de los datos generados por los diferentes sensores de las Estaciones Meteorológicas monitorizadas en el sistema',
                    subsistema: 'RECU',
                    desc_subsistema: 'Recurso Hídrico',
                    ruta_formulario:
                      '/#/app/recurso_hidrico/estaciones/historial_equipos',
                    nombre_icono: 'test',
                    id_menu: 54,
                    permisos: {
                      consultar: true,
                    },
                  },
                  {
                    id_modulo: 83,
                    nombre_modulo: 'Emisión de Datos Sensor',
                    descripcion:
                      'Reporte que muestra cuando se emitieron datos y cuando no de cada uno de los sensores de una Estación Meteorológica registrada en el sistema',
                    subsistema: 'RECU',
                    desc_subsistema: 'Recurso Hídrico',
                    ruta_formulario:
                      '/#/app/recurso_hidrico/estaciones/reportes',
                    nombre_icono: 'test',
                    id_menu: 54,
                    permisos: {
                      consultar: true,
                    },
                  },
                  {
                    id_modulo: 84,
                    nombre_modulo: 'Valores Extremos Sensor',
                    descripcion:
                      'Reporte que muestra los valores máximo, mínimo y promedio emitidos para cada variable por cada sensor de una Estación Meteorológica registrada en el sistema',
                    subsistema: 'RECU',
                    desc_subsistema: 'Recurso Hídrico',
                    ruta_formulario:
                      '/#/app/recurso_hidrico/estaciones/reportes',
                    nombre_icono: 'test',
                    id_menu: 54,
                    permisos: {
                      consultar: true,
                    },
                  },
                  {
                    id_modulo: 85,
                    nombre_modulo: 'Historial de Datos',
                    descripcion:
                      'Reporte que muestra el historial por mes de los valores generados por cada Estación Meteorológica monitorizada en el sistema',
                    subsistema: 'RECU',
                    desc_subsistema: 'Recurso Hídrico',
                    ruta_formulario:
                      '/#/app/recurso_hidrico/estaciones/historial_datos',
                    nombre_icono: 'test',
                    id_menu: 54,
                    permisos: {
                      consultar: true,
                    },
                  },
                  {
                    id_modulo: 86,
                    nombre_modulo:
                      'Historial de Alertas Emitidas a Interesados',
                    descripcion:
                      'Reporte que muestra el historial por mes de las alertas emitidas a la población interesada, a causa de los datos generados por los diferentes sensores de las Estaciones Meteorológicas monitorizadas en el sistema',
                    subsistema: 'RECU',
                    desc_subsistema: 'Recurso Hídrico',
                    ruta_formulario:
                      '/#/app/recurso_hidrico/estaciones/historial_alertas',
                    nombre_icono: 'test',
                    id_menu: 54,
                    permisos: {
                      consultar: true,
                    },
                  },
                ],
                submenus: [],
              },
            ],
          },
          {
            id_menu: 56,
            desc_subsistema: 'Recurso Hídrico',
            nombre: 'Analítica',
            nivel_jerarquico: 2,
            orden_por_padre: 3,
            subsistema: 'RECU',
            id_menu_padre: 52,
            modulos: [
              {
                id_modulo: 88,
                nombre_modulo: 'Comportamiento Variables de Estación',
                descripcion:
                  'Módulo que permite observar el comportamiento de una variable de una Estación Meteorológica en un rango de fechas',
                subsistema: 'RECU',
                desc_subsistema: 'Recurso Hídrico',
                ruta_formulario: '/#/app/recurso_hidrico/estaciones/dashboard',
                nombre_icono: 'test',
                id_menu: 56,
                permisos: {
                  consultar: true,
                },
              },
              {
                id_modulo: 89,
                nombre_modulo:
                  'Comparativa Variable de Estación en Rango de Fechas',
                descripcion:
                  'Módulo que permite comparar el comportamiento de una variable de una Estación Meteorológica entre 2 rangos de fechas',
                subsistema: 'RECU',
                desc_subsistema: 'Recurso Hídrico',
                ruta_formulario: '/#/app/recurso_hidrico/estaciones/analitica',
                nombre_icono: 'test',
                id_menu: 56,
                permisos: {
                  consultar: true,
                },
              },
            ],
            submenus: [],
          },
        ],
      },
      {
        id_menu: 57,
        desc_subsistema: 'Recurso Hídrico',
        nombre: 'Configuración y Datos Básicos',
        nivel_jerarquico: 1,
        orden_por_padre: 8,
        subsistema: 'RECU',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 112,
            nombre_modulo: 'Configuración de Alertas de Recurso Hídrico',
            descripcion:
              'Permite configurar las Alertas disponbiles para el subsistema de Recurso Hídrico',
            subsistema: 'RECU',
            desc_subsistema: 'Recurso Hídrico',
            ruta_formulario:
              '/#/app/recurso_hidrico/biblioteca/alertas/configuracion_alertas',
            nombre_icono: 'test',
            id_menu: 57,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
        ],
        submenus: [
          {
            id_menu: 58,
            desc_subsistema: 'Recurso Hídrico',
            nombre: 'Estaciones Meteorológicas',
            nivel_jerarquico: 2,
            orden_por_padre: 1,
            subsistema: 'RECU',
            id_menu_padre: 57,
            modulos: [
              {
                id_modulo: 81,
                nombre_modulo: 'Usuarios por Estación',
                descripcion:
                  'Permite administrar a las personas interesadas en recibir reportes de las Estaciones Meteorológicas registradas en el sistema',
                subsistema: 'RECU',
                desc_subsistema: 'Recurso Hídrico',
                ruta_formulario: '/#/app/recurso_hidrico/estaciones/usuarios',
                nombre_icono: 'test',
                id_menu: 58,
                permisos: {
                  crear: true,
                  actualizar: true,
                  consultar: true,
                  borrar: true,
                },
              },
              {
                id_modulo: 80,
                nombre_modulo: 'Mensajes de Alerta Externos',
                descripcion:
                  'Permite crear y configurar los mensajes de las alertas generadas por las Estaciones Hidrometeorológicas que se enviarán a los interesados desde el sistema',
                subsistema: 'RECU',
                desc_subsistema: 'Recurso Hídrico',
                ruta_formulario:
                  '/#/app/recurso_hidrico/estaciones/configuracion_alarma',
                nombre_icono: 'test',
                id_menu: 58,
                permisos: {
                  crear: true,
                  actualizar: true,
                  consultar: true,
                  borrar: true,
                },
              },
              {
                id_modulo: 78,
                nombre_modulo: 'Estaciones Hidrometeorológicas',
                descripcion:
                  'Permite administrar las Estaciones Hidrometeorológicas controladas por el sistema',
                subsistema: 'RECU',
                desc_subsistema: 'Recurso Hídrico',
                ruta_formulario: '/#/app/recurso_hidrico/estaciones/estacion',
                nombre_icono: 'test',
                id_menu: 58,
                permisos: {
                  actualizar: true,
                  consultar: true,
                  crear: true,
                  borrar: true,
                },
              },
              {
                id_modulo: 79,
                nombre_modulo: 'Parámetros de Referencia Sensores',
                descripcion:
                  'Permite administrar los valores de referencia de cada una de las variables monitorizadas por Estación Hidrometeorológica controlada por el sistema',
                subsistema: 'RECU',
                desc_subsistema: 'Recurso Hídrico',
                ruta_formulario:
                  '/#/app/recurso_hidrico/estaciones/parametros_referencia',
                nombre_icono: 'test',
                id_menu: 58,
                permisos: {
                  actualizar: true,
                  consultar: true,
                },
              },
            ],
            submenus: [],
          },
        ],
      },
    ],
  },
  {
    subsistema: 'SEGU',
    desc_subsistema: 'Seguridad',
    menus: [
      {
        id_menu: 8,
        desc_subsistema: 'Seguridad',
        nombre: 'Seguridad',
        nivel_jerarquico: 1,
        orden_por_padre: 3,
        subsistema: 'SEGU',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 5,
            nombre_modulo: 'Roles',
            descripcion: 'Permite administrar los roles del sistema',
            subsistema: 'SEGU',
            desc_subsistema: 'Seguridad',
            ruta_formulario: '/#/app/seguridad/roles',
            nombre_icono: 'test',
            id_menu: 8,
            permisos: {
              borrar: true,
              crear: true,
              consultar: true,
              actualizar: true,
            },
          },
          {
            id_modulo: 2,
            nombre_modulo: 'Administración de Usuarios',
            descripcion:
              'Permite administrar las credenciales de acceso de las personas al sistema',
            subsistema: 'SEGU',
            desc_subsistema: 'Seguridad',
            ruta_formulario: '/#/app/transversal/administracion_personas',
            nombre_icono: 'test',
            id_menu: 8,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 8,
            nombre_modulo: 'Delegación del Rol de SuperUsuario',
            descripcion:
              'Proceso que permite a un SuperUsuario delegar dicha función a otra persona',
            subsistema: 'SEGU',
            desc_subsistema: 'Seguridad',
            ruta_formulario: '/#/app/seguridad/delegacion_superusuario',
            nombre_icono: 'test',
            id_menu: 8,
            permisos: {
              consultar: true,
              ejecutar: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 9,
        desc_subsistema: 'Seguridad',
        nombre: 'Auditoría',
        nivel_jerarquico: 1,
        orden_por_padre: 4,
        subsistema: 'SEGU',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 77,
            nombre_modulo: 'Auditoría',
            descripcion: 'Módulo para realizar la auditoría del sistema',
            subsistema: 'SEGU',
            desc_subsistema: 'Seguridad',
            ruta_formulario: '/#/app/seguridad/auditoria',
            nombre_icono: 'test',
            id_menu: 9,
            permisos: {
              consultar: true,
            },
          },
        ],
        submenus: [],
      },
    ],
  },
  {
    subsistema: 'TRSV',
    desc_subsistema: 'Transversal',
    menus: [
      {
        id_menu: 1,
        desc_subsistema: 'Transversal',
        nombre: 'Personas',
        nivel_jerarquico: 1,
        orden_por_padre: 1,
        subsistema: 'TRSV',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 73,
            nombre_modulo: 'Datos Personales de Modificación Restringida',
            descripcion:
              'Permite actualizar los Datos Personales de modificación restringida en el sistema a cualquier persona creada en el mismo',
            subsistema: 'TRSV',
            desc_subsistema: 'Transversal',
            ruta_formulario: '/#/app/transversal/datos_restringidos',
            nombre_icono: 'test',
            id_menu: 1,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 72,
            nombre_modulo: 'Vinculación de Colaboradores',
            descripcion:
              'Permite vincular o desvincular personas como colaboradores de la entidad en el sistema',
            subsistema: 'TRSV',
            desc_subsistema: 'Transversal',
            ruta_formulario:
              '/#/app/transversal/vinculacion_colaboradores/vinculacion',
            nombre_icono: 'test',
            id_menu: 1,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 1,
            nombre_modulo: 'Administración de Personas',
            descripcion:
              'Permite administrar las personas registradas en el sistema',
            subsistema: 'TRSV',
            desc_subsistema: 'Transversal',
            ruta_formulario: '/#/app/seguridad/administracion_usuarios',
            nombre_icono: 'test',
            id_menu: 1,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 70,
            nombre_modulo: 'Autorización de Notificaciones Otras Cuentas',
            descripcion:
              'Permite administrar a una persona las autorizaciones de las personas acerca de las notificaciones de la entidad',
            subsistema: 'TRSV',
            desc_subsistema: 'Transversal',
            ruta_formulario: '/#/app/usuario/autorizacion_notificacion',
            nombre_icono: 'test',
            id_menu: 1,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 2,
        desc_subsistema: 'Transversal',
        nombre: 'Corporativo',
        nivel_jerarquico: 1,
        orden_por_padre: 2,
        subsistema: 'TRSV',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 15,
            nombre_modulo: 'Organigramas',
            descripcion: 'Permite administrar los organigramas del sistema',
            subsistema: 'TRSV',
            desc_subsistema: 'Transversal',
            ruta_formulario: '/#/app/gestor_documental/organigrama/crear',
            nombre_icono: 'test',
            id_menu: 2,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 116,
            nombre_modulo: 'Líderes por Unidad Organizacional',
            descripcion:
              'Permite administrar la asignación de líderes a las unidades organizacionales del organigrama de la entidad',
            subsistema: 'TRSV',
            desc_subsistema: 'Transversal',
            ruta_formulario:
              '/#/app/transversal/corporativo/lideres_unidad_organizacional',
            nombre_icono: 'test',
            id_menu: 2,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 3,
        desc_subsistema: 'Transversal',
        nombre: 'Procesos',
        nivel_jerarquico: 1,
        orden_por_padre: 3,
        subsistema: 'TRSV',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 115,
            nombre_modulo: 'Traslado Masivo de Unidad a Unidad',
            descripcion:
              'Permite realizar un cambio masivo de unidades organizacionales a las que pertenecen los colaboradores de la entidad, de una unidad en particular, después de activar un nuevo organigrama',
            subsistema: 'TRSV',
            desc_subsistema: 'Transversal',
            ruta_formulario:
              '/#/app/transversal/procesos/traslado_masivo_unidad_a_unidad',
            nombre_icono: 'test',
            id_menu: 3,
            permisos: {
              consultar: true,
              ejecutar: true,
            },
          },
          {
            id_modulo: 114,
            nombre_modulo: 'Traslado Masivo de Unidades por Entidad (previo)',
            descripcion:
              'Permite realizar un cambio masivo de las unidades organizacionales a las que pertenecen los colaboradores de la entidad antes y después de activar un nuevo organigrama',
            subsistema: 'TRSV',
            desc_subsistema: 'Transversal',
            ruta_formulario:
              '/#/app/transversal/procesos/traslado_masivo_unidad_organizacional',
            nombre_icono: 'test',
            id_menu: 3,
            permisos: {
              actualizar: true,
              consultar: true,
              ejecutar: true,
            },
          },
          {
            id_modulo: 16,
            nombre_modulo: 'Cambio de Organigrama Actual',
            descripcion:
              'Permite adoptar un nuevo organigrama de la entidad en el sistema',
            subsistema: 'TRSV',
            desc_subsistema: 'Transversal',
            ruta_formulario:
              '/#/app/transversal/procesos/cambio_organigrama_actual',
            nombre_icono: 'test',
            id_menu: 3,
            permisos: {
              ejecutar: true,
              consultar: true,
            },
          },
        ],
        submenus: [],
      },
      {
        id_menu: 4,
        desc_subsistema: 'Transversal',
        nombre: 'Configuración y Datos Básicos',
        nivel_jerarquico: 1,
        orden_por_padre: 4,
        subsistema: 'TRSV',
        id_menu_padre: null,
        modulos: [
          {
            id_modulo: 109,
            nombre_modulo: 'Configuración de la Entidad',
            descripcion:
              'Permite configurar los valores básicos de la entidad requeridos para la operación del sistema.',
            subsistema: 'TRSV',
            desc_subsistema: 'Transversal',
            ruta_formulario: '/#/app/transversal/configuracion_entidad',
            nombre_icono: 'test',
            id_menu: 4,
            permisos: {
              actualizar: true,
              consultar: true,
            },
          },
          {
            id_modulo: 113,
            nombre_modulo: 'Sucursales de la Entidad',
            descripcion:
              'Permite administrar las sucursales con que cuenta la entidad usuaria del software.',
            subsistema: 'TRSV',
            desc_subsistema: 'Transversal',
            ruta_formulario: '/#/app/seguridad/sucursal_entidad',
            nombre_icono: 'test',
            id_menu: 4,
            permisos: {
              crear: true,
              actualizar: true,
              consultar: true,
              borrar: true,
            },
          },
        ],
        submenus: [
          {
            id_menu: 5,
            desc_subsistema: 'Transversal',
            nombre: 'Datos Básicos',
            nivel_jerarquico: 2,
            orden_por_padre: 1,
            subsistema: 'TRSV',
            id_menu_padre: 4,
            modulos: [
              {
                id_modulo: 6,
                nombre_modulo: 'Estado Civil',
                descripcion:
                  'Permite administrar la información básica de los Estados Civiles del sistema',
                subsistema: 'TRSV',
                desc_subsistema: 'Transversal',
                ruta_formulario:
                  '/#/app/seguridad/configuraciones_basicas/estado_civil',
                nombre_icono: 'test',
                id_menu: 5,
                permisos: {
                  actualizar: true,
                  borrar: true,
                  consultar: true,
                  crear: true,
                },
              },
              {
                id_modulo: 7,
                nombre_modulo: 'Tipos de Documentos de ID',
                descripcion:
                  'Permite administrar los tipos de documentos de identificación',
                subsistema: 'TRSV',
                desc_subsistema: 'Transversal',
                ruta_formulario:
                  '/#/app/seguridad/configuraciones_basicas/tipos_documento',
                nombre_icono: 'test',
                id_menu: 5,
                permisos: {
                  actualizar: true,
                  borrar: true,
                  consultar: true,
                  crear: true,
                },
              },
              {
                id_modulo: 17,
                nombre_modulo: 'Cargos',
                descripcion:
                  'Permite administrar los cargos disponibles en el sistema',
                subsistema: 'TRSV',
                desc_subsistema: 'Transversal',
                ruta_formulario:
                  '/#/app/seguridad/configuraciones_basicas/cargos',
                nombre_icono: 'test',
                id_menu: 5,
                permisos: {
                  crear: true,
                  actualizar: true,
                  consultar: true,
                  borrar: true,
                },
              },
            ],
            submenus: [],
          },
        ],
      },
    ],
  },
];
