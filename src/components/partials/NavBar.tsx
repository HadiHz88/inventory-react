import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Dashboard', path: '/dashboard'}
];

export default function NavBar() {
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          InventoryApp
        </Typography>
        <Box>
          {navItems.map(({ label, path }) => (
            <Button
              key={path}
              component={NavLink}
              to={path}
              sx={{
                color: 'white',
                mx: 1,
                '&.active': {
                  fontWeight: 'bold',
                  borderBottom: '2px solid white',
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
