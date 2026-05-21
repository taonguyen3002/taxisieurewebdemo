"use client";
import React, { useState } from "react";
import { Fab, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ZaloIcon from "@/components/IconCustom/zalo";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import FormBooking from "@/components/FormBooking";
import { siteConfig } from "@/config/default.config";

interface Props {
  phone?: string;
}
const ActionButton = ({ phone = siteConfig.contactInfo.phone }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMessage = () => {
    window.location.href = `https://zalo.me/${phone}`; // Gửi tin nhắn
  };
  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 60, md: 40 },
          right: 16,
          display: "flex",
          flexDirection: "column",
          gap: 1, // Khoảng cách giữa các nút
          zIndex: 48, // Đảm bảo luôn nổi lên trên
        }}
      >
        {/* Nút gọi điện */}
        <a href={`tel:${phone}`}>
          <Fab
            color="primary"
            aria-label="call"
            sx={{
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#45A049" },
            }}
          >
            <PhoneIcon />
          </Fab>
        </a>

        {/* Nút gửi tin nhắn */}
        <Fab
          color="primary"
          aria-label="message"
          onClick={handleMessage}
          sx={{
            backgroundColor: "#2196F3",
            "&:hover": { backgroundColor: "#1976D2" },
          }}
        >
          <ZaloIcon />
        </Fab>

        {/* Nút đặt form */}
        <Fab
          color="primary"
          aria-label="form"
          onClick={handleOpen}
          sx={{
            backgroundColor: "#FF5722",
            "&:hover": { backgroundColor: "#E64A19" },
          }}
        >
          <AssignmentIcon />
        </Fab>
        <Dialog fullWidth={true} open={open} onClose={handleClose}>
          <DialogTitle sx={{ textAlign: "center" }}>Đặt Xe Online</DialogTitle>
          <DialogContent>
            <FormBooking onClose={handleClose} />
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ActionButton;
