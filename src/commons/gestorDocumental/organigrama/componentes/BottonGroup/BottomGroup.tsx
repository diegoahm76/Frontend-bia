import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { options } from './utils/constants';
// eslint-disable-next-line no-restricted-syntax, @typescript-eslint/explicit-function-return-type
export default function SplitButton() {
  const [open, set_open] = React.useState(false);
  const anchor_ref = React.useRef<HTMLDivElement>(null);
  const [selected_index, set_selected_index] = React.useState(1);

  const handle_click = (): void => {
    console.info(`You clicked ${options[selected_index]}`);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handle_menu_item_click = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    set_selected_index(index);
    set_open(false);
  };

  const handle_toggle = (): void => {
    set_open((prevOpen) => !prevOpen);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handle_close = (event: Event) => {
    if (
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      anchor_ref.current != null &&
      anchor_ref.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    set_open(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchor_ref}
        aria-label="split button"
      >
        <Button onClick={handle_click}>{options[selected_index]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handle_toggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchor_ref.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handle_close}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selected_index}
                      onClick={(event) => {
                        handle_menu_item_click(event, index);
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
