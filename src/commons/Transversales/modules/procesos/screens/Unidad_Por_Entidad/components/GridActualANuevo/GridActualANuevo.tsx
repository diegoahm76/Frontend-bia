/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC /* useState */ } from 'react';
import { RenderDataGrid } from './../../../../../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { colOrgActANuevo } from './columns/collOrgActANuevo';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';

import Select from 'react-select';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { setGridActualANuevo, setUnidadesSeleccionadas } from '../../toolkit/UxE_slice/UxE_slice';
import { Button, Tooltip } from '@mui/material';
// import { Controller } from 'react-hook-form';
// import { use_u_x_entidad } from '../../hooks/use_u_x_entidad';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

export const GridActualANuevo: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();

  //* use states redux declaration
  const { gridActualANuevo, unidadesSeleccionadas } = useAppSelector((state) => state.u_x_e_slice);

  //* hook use_x_entidad
/*  const {
     control_grid_actual_a_nuevo
    reset_grid_actual_a_nuevo,
    watch_grid_actual_a_nuevo
  } = use_u_x_entidad(); */

  const title = 'Traslado masivo de organigrama actual a nuevo';

  // const [unidadesSeleccionadas, setUnidadesSeleccionadas] = useState<any[]>([]);

  const onChange = (idPersona: number, unidadSeleccionada: any) => {
    dispatch(setUnidadesSeleccionadas({
      ...unidadesSeleccionadas,
      [idPersona]: unidadSeleccionada
    }));
  };

  const handleLimpiarSelect = (idPersona: any) => {
    dispatch(setUnidadesSeleccionadas({
      ...unidadesSeleccionadas,
      [idPersona]: null
    }));
  };

  // const [rowData, setRowData] = useState<any[]>([]);

  /* useEffect(() => {
  const obtenerDatos = async () => {
    const datos = await obtenerDatosParaTraslado();
    const datosConPropiedades = datos.map((dato: any) => ({
      ...dato,
      seleccionado: dato.seleccionado || false,
      unidadesDisponiblesParaTraslado: dato.unidadesDisponiblesParaTraslado || '',
      unidadOrganizacional: dato.unidadOrganizacional || dato.unidadOrganizacionalActual
    }));
    setRowData(datosConPropiedades);
  };
  obtenerDatos();
}, []); */


  /* const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const unidadesSeleccionadas = rowData.filter(row => row.seleccionado);
  unidadesSeleccionadas.forEach(row => {
    row.unidadOrganizacional = row.unidadesDisponiblesParaTraslado;
  });
  console.log(unidadesSeleccionadas);
}; */

  const columnsModified = [
    ...colOrgActANuevo,
    {
      headerName: 'unidad organizacional nueva',
      field: ' unidad organizacional nueva',
      width: 220,
      renderCell: (params: any) => (
        <>
          {/*          <Controller
            name="nuevaUnidadParaTraslado"
            control={control_grid_actual_a_nuevo}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => ( */}
          <div>
            <Select
              styles={{
                container: (provided, state) => ({
                  ...provided,
                  width: '200px',
                  height: '30px',
                  zIndex: 9999,
                  borderRadius: '5px'
                  // padding: '5px'
                })
                /* menu: (provided, state) => ({
                      ...provided,
                      zIndex: 9999,
                      width: '200px'
                    }) */
              }}
              value={unidadesSeleccionadas[params.row.id_persona]}
              // value={value}
              onChange={(selectedOption) => {
                // onChange(selectedOption);
                onChange(params.row.id_persona, selectedOption);
              }}
              menuPortalTarget={document.body}
              // isDisabled={!control_format_documental_type._formValues.item.value}
              options={params?.row?.unidadesDisponiblesParaTraslado?.map(
                (unidad: any) => ({
                  value: unidad.id_unidad_organizacional,
                  label: unidad.nombre,
                  data: unidad
                })
              )}
              placeholder="Seleccionar"
            />
          </div>
          {/*  )}
          /> */}
        </>
      )
    },
    {
      headerName: 'Acciones',
      field: 'acción',
      width: 100,
      renderCell: (params: any) => (
        <>
        <Tooltip title="Limpiar lista desplegable">
          <Button
            variant="outlined"
            color="primary"
            sx={{
              marginLeft: '5px',
              width: '20px !important',
              border: 'none'
            }}
            startIcon={<CleaningServicesIcon />}
            onClick={() => {
              handleLimpiarSelect(params.row.id_persona);
            }}
          />
          </Tooltip>
        </>
      )

      /*  <select
          // value={params.data.unidadesDisponiblesParaTraslado}
          onChange={(event) => handleSelectChange(event, params.rowIndex)}
        >
          {params?.unidadesDisponiblesParaTraslado?.map((unidad: any) => (
            <option
              key={unidad.id_unidad_organizacional}
              value={unidad.id_unidad_organizacional}
            >
              {unidad.nombre}
            </option>
          ))}
        </select> */
    }
  ];

  return (
    //* renderiza los datos necesarios para el traslado unidades organizacionales actuales a nuevas
    <>
      <RenderDataGrid
        columns={columnsModified || []}
        rows={gridActualANuevo || []}
        title={title}
      />
      {/* <Select
                  
        
                  options={gridActualANuevo[0].unidadesDisponiblesParaTraslado.map(
                    (el: any) => ({
                      el,
                      value: el.id_unidad_organizacional,
                      label: el.nombre
                    })
                  )}
                  placeholder="Seleccionar"
         
                /> */}
    </>
  );
};
