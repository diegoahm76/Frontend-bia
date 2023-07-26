import { Button, Grid } from "@mui/material";
import { useState, type ReactNode } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface IProps {
  texto_boton: string;
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CollapsibleButton = ({ texto_boton, children }: IProps): JSX.Element => {
  const [open, set_open] = useState(false);
  return (
    <Grid
      container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '10px 0',
      }}
    >
      <Button
        size='small'
        variant='contained'
        fullWidth
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '18px',
        }}
        endIcon={open ? <RemoveIcon /> : <AddIcon />}
        onClick={() => {
          set_open(previousState => !previousState);
        }}
      >
        {texto_boton}
      </Button>
      <Grid
        item
        xs={12}
        sx={{
          overflow: 'hidden',
          maxHeight: open ? 'auto' : '0px',
        }}
      >
        <Grid item sx={{ m: '20px' }}>
          {children}
        </Grid>
      </Grid>
    </Grid >
  );
};