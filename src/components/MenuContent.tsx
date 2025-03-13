import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Analytics from '@mui/icons-material/Analytics';
import Search from '@mui/icons-material/Search';
import Storage from '@mui/icons-material/Storage';
import Link from 'next/link';
import { Home } from '@mui/icons-material';
import { useRouter } from 'next/router';

export const mainListItems = [
  { text: 'Domů', icon: <Home />, route: '/' },
  { text: 'Statistiky', icon: <Analytics />, route: '/stats' },
  { text: 'Hledat', icon: <Search />, route: '/search' },
  { text: 'Prozkoumat databázi', icon: <Storage />, route: '/discover' }
];

export default function MenuContent() {
  const router = useRouter();
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <Link href={item.route}>
              <ListItemButton selected={item.route === router.pathname}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
