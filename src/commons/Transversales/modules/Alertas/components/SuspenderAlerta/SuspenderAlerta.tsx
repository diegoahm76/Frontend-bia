import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { Button } from "@mui/material";
import { useState } from 'react';

    // eslint-disable-next-line @typescript-eslint/naming-convention
export const SuspenderAlerta: React.FC = () => {

       // eslint-disable-next-line @typescript-eslint/naming-convention
 const [visible, setVisible] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const visibleIcon = visible;
    const asdf = (): void => { setVisible(true) }

    return (
        <div>
            <Button onClick={asdf}>
                <DoNotDisturbOnIcon sx={{ color: visibleIcon ? undefined : 'rgba(0, 0, 0, 0.3)' }} />
            </Button>
        </div>
    );
};