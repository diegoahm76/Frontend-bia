import { Grid } from "@mui/material";
import { HelloWorld } from "./components/HelloWorld"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const  Hello: React.FC = () => {
    return(
        <Grid>
            <HelloWorld text='HelloWorld'/>
        </Grid>
    );
}

// export default{
//     primary: <h1>primary</h1>
//   }