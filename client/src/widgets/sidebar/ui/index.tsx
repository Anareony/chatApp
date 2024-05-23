import React from "react";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import SettingsIcon from "@mui/icons-material/Settings";
import ModeNightIcon from "@mui/icons-material/ModeNight";

import { SignOutButton } from "@/features/auth/signout";
import { ROUTES } from "@/shared/constants/router";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideBar() {
  const pathname = usePathname();
  return (
    <Box sx={{ height: "100%" }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          position: "relative",
          display: "flex",
          height: "100%",
          minWidth: "275px",
          "& .MuiDrawer-paper": {
            position: "relative",
            paddingRight: "10px",
            borderRight: "none",
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: "#11141b",
          },
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <ListItem>Anareon</ListItem>
          <Divider variant="middle" />
          <ListItem>
            <ListItemButton
              href={`${ROUTES.HOME}`}
              selected={ROUTES.HOME === pathname}
              LinkComponent={Link}
              sx={{ borderRadius: "10px" }}
            >
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <ForumIcon color={"primary"} sx={{ fontSize: "26px" }} />
              </ListItemIcon>
              <ListItemText sx={{ fontSize: "14px", fontWeight: 500 }}>
                Messages
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              href={`${ROUTES.EDIT}`}
              selected={ROUTES.EDIT === pathname}
              LinkComponent={Link}
              sx={{ borderRadius: "10px" }}
            >
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <SettingsIcon sx={{ fontSize: "26px" }} />
              </ListItemIcon>
              <ListItemText sx={{ fontSize: "14px", fontWeight: 500 }}>
                Settings
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <ModeNightIcon sx={{ fontSize: "26px" }} />
              </ListItemIcon>
              <ListItemText sx={{ fontSize: "14px", fontWeight: 500 }}>
                Night mode
              </ListItemText>
              <ListItemSecondaryAction>
                <Switch />
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ marginTop: "auto" }}>
            <SignOutButton />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
