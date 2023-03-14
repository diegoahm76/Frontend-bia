import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Collapse,
  Avatar,
} from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { open_drawer_desktop, open_drawer_mobile } from '../store/layoutSlice';

interface Props {
  window?: () => Window;
  drawer_width: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SideBar: React.FC<Props> = ({ window, drawer_width }: Props) => {
  const dispatch = useDispatch();
  const [open, set_open] = useState(false);

  const { mobile_open, desktop_open, mod_dark } = useSelector(
    (state: {
      layout: {
        mobile_open: boolean;
        desktop_open: boolean;
        mod_dark: boolean;
      };
    }) => state.layout
  );

  const handle_drawer_toggle = (): void => {
    dispatch(open_drawer_mobile(!mobile_open));
  };

  const handle_drawer_toggle_desktop = (): void => {
    dispatch(open_drawer_desktop(!desktop_open));
  };

  const handle_click = (): void => {
    set_open(!open);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const conten_drawer = (
    <Box
      className="drawer"
      sx={{
        bgcolor: 'customColor.main',
        margin: '10px 0 10px 10px',
        pb: '30px',
        borderRadius: '15px 0 0 15px',
        height: 'calc(98vh - 10px)',
        overflowY: 'scroll',
        boxShadow: '0px 2px 10px #041926',
      }}
    >
      <Toolbar
        sx={{
          display: 'grid',
          height: '100px',
          background: '#041926 !important',
        }}
      >
        <img
          alt="Imagen de perfil"
          src="../image/logos/Web-Bia-logo.png"
          style={{ height: 55, justifySelf: 'center' }}
        />
      </Toolbar>
      <Divider className={mod_dark ? 'divider' : 'divider2'} />
      <List sx={{ margin: '0 20px', color: 'secondary.main' }}>
        <ListItemButton onClick={handle_click} sx={{ borderRadius: '10px' }}>
          <ListItemIcon>
            <Avatar alt="Cristian Mendoza" src="/static/images/avatar/1.jpg" />
          </ListItemIcon>
          <ListItemText primary="Cristian Mendoza" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          sx={{
            bgcolor: 'background.default',
            mt: '5px',
            borderRadius: '10px',
          }}
        >
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'secondary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'secondary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'secondary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider className={mod_dark ? 'divider' : 'divider2'} />
      <List sx={{ margin: '0 20px', color: 'secondary.main' }}>
        <ListItemButton onClick={handle_click}>
          <ListItemIcon>
            <AssignmentOutlinedIcon sx={{ color: 'secondary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'secondary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider className={mod_dark ? 'divider' : 'divider2'} />
      <List sx={{ margin: '0 20px', color: 'secondary.main' }}>
        <ListItemButton onClick={handle_click}>
          <ListItemIcon>
            <InboxIcon sx={{ color: 'secondary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'secondary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handle_click}>
          <ListItemIcon>
            <InboxIcon sx={{ color: 'secondary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'secondary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handle_click}>
          <ListItemIcon>
            <InboxIcon sx={{ color: 'secondary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'secondary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handle_click}>
          <ListItemIcon>
            <InboxIcon sx={{ color: 'secondary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'secondary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handle_click}>
          <ListItemIcon>
            <InboxIcon sx={{ color: 'secondary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'secondary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handle_click}>
          <ListItemIcon>
            <InboxIcon sx={{ color: 'secondary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'secondary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handle_click}>
          <ListItemIcon>
            <InboxIcon sx={{ color: 'secondary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'secondary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handle_click}>
          <ListItemIcon>
            <InboxIcon sx={{ color: 'secondary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'secondary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handle_click}>
          <ListItemIcon>
            <InboxIcon sx={{ color: 'secondary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: 'secondary.main' }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <>
      <Box
        component="nav"
        sx={{ flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobile_open}
          onClose={handle_drawer_toggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawer_width,
              bgcolor: 'background.default',
            },
          }}
        >
          {conten_drawer}
        </Drawer>
        <Drawer
          variant="persistent"
          open={desktop_open}
          onClose={handle_drawer_toggle_desktop}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawer_width,
              bgcolor: 'background.default',
              borderRight: 'none',
            },
          }}
        >
          {conten_drawer}
        </Drawer>
      </Box>
      <Box
        sx={{
          padding: '0px 20px 0 20px',
          mt: 8,
          width: '100vw',
          ml: { sm: desktop_open ? `${drawer_width}px` : '0px' },
          bgcolor: 'background.default',
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};
