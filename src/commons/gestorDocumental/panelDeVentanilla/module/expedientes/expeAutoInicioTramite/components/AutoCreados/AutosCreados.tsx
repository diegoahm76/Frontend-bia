import { Grid } from '@mui/material';
import { useContext } from 'react';
import { AutoInicioContext } from '../../context/ExpedienteContext';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { actos } from './columsAutosCreados/columnsAutosCreados';

/* eslint-disable @typescript-eslint/naming-convention */
export const AutosCreados = (): JSX.Element => {
  //* context declaration
  const { listaAutoDeInicio } = useContext(AutoInicioContext);
  const { generalLoading } = useContext(ModalAndLoadingContext);

  // Asegurarse de que ambos, acto y archivo, sean tratados como arreglos incluso si son undefined
  // Ensure listaAutoDeInicio is not undefined before attempting to spread its properties
  const autosIni = listaAutoDeInicio
  ? [
      ...(listaAutoDeInicio.acto ? [listaAutoDeInicio.acto] : []),
      ...(listaAutoDeInicio.archivo ? [listaAutoDeInicio.archivo] : []),
    ]
  : [];
  console.log('iniiii', autosIni);

  // Asumiendo que 'actos' debe ser 'columns' o alguna otra variable definida correctamente
  const columns = [
    ...actos, // Esto necesita ser definido o corregido
  ];

  if (generalLoading) {
    return (
      <Grid
        container
        sx={{
          position: 'relative',
          justifyContent: 'center',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Loader altura={270} />
      </Grid>
    );
  }

  // Eliminada la condición redundante de autosIni
  return (
    <RenderDataGrid
      title="Autos de inicio creados por expediente"
      columns={columns ?? []}
      rows={[...autosIni]}
    />
  );
};
