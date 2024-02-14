/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from "react";
import { Button, Dialog, DialogContent, Typography, Menu, MenuItem } from "@mui/material";
import ContrastIcon from '@mui/icons-material/Contrast';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
export const TuModalInformatico = () => {
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
        style={{marginTop:15}}
          id="basic-button"
          aria-controls={anchorEl ? 'basic-menu' : undefined}
          aria-haspopup="true"
          variant="outlined"
          aria-expanded={anchorEl ? 'true' : undefined}
          onClick={handleOpen}
        >
       <QuestionMarkIcon/>
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
            <Typography variant="body1" style={{ color: "#4CAF50", marginBottom: "8px" }}>
              <ContrastIcon fontSize="small" style={{ color: "#4CAF50", marginRight: 4 }} />
              Excelente (mas 80%)
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography variant="body1" style={{ color: "#FFC107", marginBottom: "8px" }}>
              <ContrastIcon fontSize="small" style={{ color: "#FFC107", marginRight: 4 }} />
              Regular (entre 60% y 80%)
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography variant="body1" style={{ color: "#F44336" ,marginTop:5}}>
              <ContrastIcon fontSize="small" style={{ color: "#F44336", marginRight: 4 }} />
              Deficiente (menos 60%)
            </Typography>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};
