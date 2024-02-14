/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from "react";
import { Button, Dialog, DialogContent, Typography, Menu, MenuItem } from "@mui/material";
import ContrastIcon from '@mui/icons-material/Contrast';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


export const BotonInfo = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div>
                <Button
                    style={{ marginTop: 15 }}
                    id="basic-button"
                    aria-controls={anchorEl ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    variant="outlined"
                    aria-expanded={anchorEl ? 'true' : undefined}
                    onClick={handleOpen}
                >
                    <QuestionMarkIcon />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    <MenuItem onClick={handleClose}>
                        <Typography variant="body1" style={{ marginBottom: "8px" }}>

                            Este módulo proporciona la capacidad de configurar
                        </Typography>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                        <Typography variant="body1" style={{ marginBottom: "8px" }}>

                            el uso de consecutivos de las tipologías documentales
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Typography variant="body1" style={{ marginBottom: "8px" }}>

                            del sistema para el próximo año.
                        </Typography>

                    </MenuItem>
                </Menu>
            </div>
        </>
    );
};
