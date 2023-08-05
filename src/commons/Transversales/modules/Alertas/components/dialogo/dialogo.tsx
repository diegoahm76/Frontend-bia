import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Switch from '@mui/material/Switch';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const ButtonOfDialog: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    return (
        <div>
            <Button style={{border:0}} onClick={handleClick}>
                < MoreVertIcon />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >  
           
              
                <Typography sx={{ p: 2 }}>  <Switch {...label} defaultChecked />Mostrar leidos</Typography>
                <Typography sx={{ p: 2 }}>  <Switch {...label} />Mostrar No leidos</Typography>
              
            </Popover>
        </div>
    );
}