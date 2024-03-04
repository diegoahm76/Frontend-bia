import { Grid } from "@mui/material";
import { ReactNode } from "react";
import { Title } from "../../../../components";

interface Props {
  children: ReactNode;
  title: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const VehiculoConNovedad: React.FC<Props> = ({children, title}) => {
  return (
    <Grid container
      spacing={2}
      marginTop={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        boxShadow: '0px 3px 6px #042F4A26',
        p: '20px',
        mb: '20px',
      }}>
        <Title title="Novedades de inspección de vehículos" />
        {children}
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default VehiculoConNovedad;