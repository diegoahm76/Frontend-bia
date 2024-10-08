import React from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  DialogContent,
  Box,
  Slide,
} from '@mui/material';
import { type TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '../../../../../hooks';
import type { IProps } from './types/types';
import OrganigramVisual from '../OrganigramaVisual/OrganigramVisual';

const transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const OrganigramVisualizerDialog = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  // Redux State Extraction
  const { organigram_current } = useAppSelector((state) => state.organigram);

  const handle_close_crear_organigrama = (): void => {
    set_is_modal_active(false);
  };

  return (
    <Dialog
      fullScreen
      open={is_modal_active}
      onClose={handle_close_crear_organigrama}
      TransitionComponent={transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {`Visualizando organigrama : ${organigram_current?.nombre}`}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handle_close_crear_organigrama}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box>
        <DialogContent sx={{ mb: '0px' }}>
          <OrganigramVisual />
        </DialogContent>
      </Box>
    </Dialog>
  );
};
