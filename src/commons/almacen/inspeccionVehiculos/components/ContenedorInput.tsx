import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * Componente que representa un contenedor para un input.
 * 
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los elementos hijos del contenedor.
 * @returns {React.ReactNode} El contenedor con los elementos hijos.
*/
// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
const ContenedorInput: React.FC<Props> = ({children}) => {
  return (
    <Grid item sx={{
      width:'100%',
      display:'flex',
      alignItems:'center',
      paddingX:'15px',
      justifyContent:'space-between'
      }}>
        {children}
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default ContenedorInput;