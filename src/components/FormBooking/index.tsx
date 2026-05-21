"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { setOrder } from "@/api/order/setOrder";
import { useUser } from "@/context/UserContext";
import generateVisitorId from "@/helpers/createVisitId.helpper";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const FormBooking: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  //state để lưu trữ dữ liệu form
  const [addressFrom, setAddressFrom] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [serviceType, setServiceType] = useState<
    | "Grap Bike"
    | "Grap Express"
    | "Grap 4 Chỗ"
    | "Grap 7 Chỗ"
    | "Grap 16 Chỗ"
    | "Grap 29 Chỗ"
    | ""
  >("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const { user } = useUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Kiểm tra các trường bắt buộc
    if (!addressFrom) {
      setSnackbar({
        open: true,
        message: "Vui lòng nhập địa chỉ đón.",
        severity: "error",
      });
      return;
    } else if (!addressTo) {
      setSnackbar({
        open: true,
        message: "Vui lòng nhập địa chỉ đến.",
        severity: "error",
      });
      return;
    } else if (!phoneNumber) {
      setSnackbar({
        open: true,
        message: "Vui lòng nhập số điện thoại.",
        severity: "error",
      });
      return;
    } else if (!serviceType) {
      setSnackbar({
        open: true,
        message: "Vui lòng nhập loại dịch vụ.",
        severity: "error",
      });
      return;
    }
    try {
      const BookingData = {
        addressFrom,
        addressTo,
        phoneNumber,
        serviceType,
        additionalInfo,
      };
      let visitorId = localStorage.getItem("visitor_id");
      if (!visitorId) {
        visitorId = generateVisitorId();
      }
      const userId = user?._id ?? "";
      const info = user
        ? { ...BookingData, userId, visitorId }
        : { ...BookingData, visitorId };
      const res = await setOrder(info);
      if (res && res.success) {
        setSnackbar({
          open: true,
          message: "Đặt xe thành công!",
          severity: "success",
        });
        setTimeout(() => {
          onClose?.();
        }, 2000);
      } else {
        setSnackbar({
          open: true,
          message: "Đặt xe thất bại. Vui lòng thử lại.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setSnackbar({
        open: true,
        message: "Vui lòng thử lại. Hoặc Gọi Tổng Đài Hỗ Trợ ",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
    // Đóng form khi snackbar đóng
    if (snackbar.severity === "success") {
      onClose();
    }
  };

  return (
    <>
      <Box
        autoComplete="on"
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          margin: { xs: "0 auto", sm: "0 auto", xl: "0 auto" },
          maxWidth: "100%",
          width: { xs: "100%", sm: "400px", xl: "550px" },
          padding: "5px 0 0 0",
        }}
      >
        <TextField
          value={addressFrom}
          onChange={(e) => setAddressFrom(e.target.value)}
          label="Địa Chỉ Đón"
          variant="outlined"
        />
        <TextField
          value={addressTo}
          onChange={(e) => setAddressTo(e.target.value)}
          label="Địa Chỉ Đến"
          variant="outlined"
        />
        <TextField
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          label="Số điện thoại"
          variant="outlined"
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="service-type-label">Loại Dịch Vụ</InputLabel>
          <Select
            labelId="service-type-label"
            value={serviceType}
            onChange={(e) =>
              setServiceType(
                e.target.value as
                  | "Grap Bike"
                  | "Grap Express"
                  | "Grap 4 Chỗ"
                  | "Grap 7 Chỗ"
                  | "Grap 16 Chỗ"
                  | "Grap 29 Chỗ"
                  | ""
              )
            }
            label="Loại Dịch Vụ"
          >
            <MenuItem value="">
              <em>Chọn dịch vụ</em>
            </MenuItem>
            <MenuItem value="Grap Bike">Grab Xe Máy</MenuItem>
            <MenuItem value="Grap Express">Grab Giao Hàng</MenuItem>
            <MenuItem value="Grap 4 Chỗ">Taxi Grab 4 chỗ</MenuItem>
            <MenuItem value="Grap 7 Chỗ">Taxi Grab 7 chỗ</MenuItem>
            <MenuItem value="Grap 16 Chỗ">Taxi Grab 16 Chỗ</MenuItem>
            <MenuItem value="Grap 29 Chỗ">Taxi Grab 29 Chỗ</MenuItem>
            {/* Thêm các dịch vụ khác nếu cần */}
          </Select>
        </FormControl>
        <TextField
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          label="Thông tin thêm"
          variant="outlined"
          multiline
          rows={4}
          sx={{ marginBottom: "20px" }} // Thêm margin dưới cùng
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}>
          <Button
            onClick={() => {
              onClose();
            }}
            variant="contained"
            color="warning"
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Gửi
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FormBooking;
