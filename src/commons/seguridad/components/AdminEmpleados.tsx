import { Grid } from "@mui/material";
// import type { DataRegistePortal } from "../../auth/interfaces";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { use_register } from "../../auth/hooks/registerHooks";
// import SearchIcon from '@mui/icons-material/Search';
// import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { BuscadorPersona } from "../../../components/BuscadorPersona";
import { type InfoPersona } from "../../../interfaces/globalModels";
// eslint-disable-next-line @typescript-eslint/naming-convention
export function AdminEmpleados(): JSX.Element {

  const on_result = (data: InfoPersona): void => {
    //  console.log('')(data);
  };

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <BuscadorPersona onResult={on_result} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
