"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";

const drawerWidth = 240;

export interface AppNavigationItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface AppLayoutProps {
  title: string;
  navigationTitle: string;
  navigationItems: AppNavigationItem[];
  children: React.ReactNode;
  onLogout: () => void | Promise<void>;
  isLoggingOut?: boolean;
}

export function AppLayout({
  title,
  navigationTitle,
  navigationItems,
  children,
  onLogout,
  isLoggingOut = false,
}: AppLayoutProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = (
    <>
      <Toolbar>
        <Typography variant="h6" color="primary">
          {navigationTitle}
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1, pt: 2 }}>
        {navigationItems.map((item) => {
          const selected = pathname.startsWith(item.href);
          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={selected}
              onClick={() => setMobileOpen(false)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: selected ? "primary.main" : "inherit" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="باز کردن منو"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            loading={isLoggingOut}
            loadingPosition="start"
            onClick={onLogout}
          >
            {isLoggingOut ? "در حال خروج…" : "خروج"}
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex" }}>
        <Drawer
          anchor="left"
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          {navigation}
        </Drawer>
        <Drawer
          anchor="left"
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          {navigation}
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ py: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
