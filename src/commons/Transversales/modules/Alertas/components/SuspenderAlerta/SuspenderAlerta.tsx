import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import {
    Button,

} from "@mui/material";


// eslint-disable-next-line @typescript-eslint/naming-convention
export const SuspenderAlerta: React.FC = () => {


    const asdf = (): void => { console.log(123443435) }

    return (
        <div>

            <Button
             onClick={asdf}

            >
                <DoNotDisturbOnIcon />
            </Button>

        </div>
    );
};