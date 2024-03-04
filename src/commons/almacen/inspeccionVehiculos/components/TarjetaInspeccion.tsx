import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const TarjetaInspeccion: React.FC<Props> = ({children, title}) => {
  return (
    <Grid item xs={12} lg={5.9} sx={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      borderRadius: '10px',
      border: '1px solid #e5e5e5',
      background: '#FAFAFA',
      boxShadow: '0px 3px 6px #042F4A26',
      padding:'20px',
      marginY:'10px',
      }}>
      <Grid item sx={{
        width:'100%',
        display:'flex',
        paddingX:'15px',
        paddingY:'10px',
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