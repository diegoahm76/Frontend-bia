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
  // IconButton,
  // useTheme,
} from '@mui/material';

// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
      sidebar: {
        mobile_open: boolean;
        desktop_open: boolean;
        mod_dark: boolean;
      };
    }) => state.sidebar
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
        {/* {mobile_open && (
          <IconButton onClick={handle_drawer_toggle}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        )} */}
        <img
          alt="Imagen de perfil"
          src="data:image/png;base64,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"
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
