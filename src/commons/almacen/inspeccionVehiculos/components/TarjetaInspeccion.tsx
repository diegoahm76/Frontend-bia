import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TarjetaInspeccion: React.FC<Props> = ({children, title}) => {
  return (
    <Grid item xs={5} sx={{
      display:'flex',
      flexDirection:'column',
      alignItems:'start',
      borderRadius: '10px',
      border: '1px solid #e5e5e5',
      background: '#FAFAFA',
      boxShadow: '0px 3px 6px #042F4A26',
      paddingX:'20px',
      paddingY:'10px',
      margin:'20px 0px'
      }}>
      <Grid item sx={{
        width:'100%',
        display:'flex',
        justifyContent:'space-between'
      }}>
        <b>{title}</b>
        <div style={{display:'flex', gap:'17px',marginRight:'5px', marginTop:'25px'}}>
          <b>Bueno</b>
          <b>Malo</b>
        </div>
      </Grid>
        {children}
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default TarjetaInspeccion;