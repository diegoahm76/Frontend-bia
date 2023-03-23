import { useEffect } from "react";
import Button from "@mui/material/Button";
// import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from '@mui/icons-material/Delete';
// import BlockIcon from '@mui/icons-material/Block';
// import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Grid, Stack } from "@mui/material";
import { Title } from "../../../../../../components/Title";

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
export const CrearHojaVidaComputoScreen: React.FC = () => {
  //   const dispatch = useAppDispatch();
  //   const  [action, set_action ] = useState<string>("create");
  //   const { marca } = useAppSelector((state) => state.marca);
  //    const [add_marca_is_active, set_add_marca_is_active] =
  //   useState<boolean>(false);

  useEffect(() => {
    //  void dispatch(get_marca_service());
  }, []);

  return (
    <>
      <Grid
        container
        sx={{
          position: "relative",
          background: "#FAFAFA",
          borderRadius: "15px",
          p: "20px",
          mb: "20px",
          boxShadow: "0px 3px 6px #042F4A26",
        }}
      >
        <Grid item xs={12}>
          <Title title="Creación de la hoja de vida de un equipo de computo"></Title>
          <Stack direction="row" spacing={2} sx={{ m: "20px 0" }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                // dispatch(marca_seleccionada(initial_state_marca_seleccionada));
                // set_action("create")
                // set_add_marca_is_active(true);
              }}
            >
              CREAR MARCA
            </Button>
          </Stack>
          <Grid item>
            <Box sx={{ width: "100%" }}>
              <DataGrid
                density="compact"
                autoHeight
                // rows={}
                // columns={}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                columns={[]}
                rows={[]} // getRowId={(row) => } columns={[]} rows={[]}
              />
            </Box>
          </Grid>
          <h1>hla</h1>
        </Grid>
      </Grid>
    </>
  );
};
// eslint-disable-next-line no-restricted-syntax
