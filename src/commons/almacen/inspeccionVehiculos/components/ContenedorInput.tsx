import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const ContenedorInput: React.FC<Props> = ({children}) => {
  return (
    <Grid item sx={{
      width:'100%',
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between'
      }}>
        {children}
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default ContenedorInput;