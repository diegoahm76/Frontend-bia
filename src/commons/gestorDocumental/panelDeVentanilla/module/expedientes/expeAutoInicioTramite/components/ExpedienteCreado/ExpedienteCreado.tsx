/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from "react";
import { AutoInicioContext } from "../../context/ExpedienteContext";
import { ModalAndLoadingContext } from "../../../../../../../../context/GeneralContext";
import { Button, Grid } from "@mui/material";
import { Loader } from "../../../../../../../../utils/Loader/Loader";
import { RenderDataGrid } from "../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid";
import  AutoStoriesIcon  from '@mui/icons-material/AutoStories';
export const ExpedienteCreado = (): JSX.Element => {
  //* context declaration
  const { expediente, setExpediente } = useContext(AutoInicioContext);
  const { generalLoading, openModalOne,  handleOpenModalOne, openModalTwo, handleOpenModalTwo } = useContext(ModalAndLoadingContext);

  // Asegurarse de que ambos, acto y archivo, sean tratados como arreglos incluso si son undefined
  // Ensure listaAutoDeInicio is not undefined before attempting to spread its properties
  // Asumiendo que 'actos' debe ser 'columns' o alguna otra variable definida correctamente
  const expedienteIni = expediente ? [expediente] : [];
  const columns = [
    {
      headerName: 'Unidad',
      field: 'codigo_exp_und_serie_subserie',
      minWidth: 250,
    },
    {
      headerName: 'Descripción expediente',
      field: 'descripcion_expediente',
      minWidth: 450,
    },
    {
      headerName: 'Acciones',
      field: 'acciones',
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                endIcon={<AutoStoriesIcon/>}
                onClick={() => handleOpenModalOne(true)}
              >
                auto de inicio
              </Button>
            </Grid>
          </Grid>
        );
      },
    }
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
    expedienteIni &&

    <RenderDataGrid
      title="Expediente relacionado al trámite"
      columns={columns ?? []}
      rows={expedienteIni ?? []}
    />
  );
};
