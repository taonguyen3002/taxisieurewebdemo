"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Grid, Switch, Stack } from "@mui/material";

import { ToastSetting } from "@/types/toast";
import { getToast, updateToast, deleteToastField, createToast } from "@/api/toast";

import { sanitize } from "@/untils/sanitize";

export default function ToastAdminPage() {
  const [toast, setToast] = useState<ToastSetting | null>(null);

  const [telegramChatId, setChatId] = useState("");
  const [telegramToken, setToken] = useState("");
  const [discordWebhook, setWebhook] = useState("");

  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const [discordEnabled, setDiscordEnabled] = useState(true);

  const load = async () => {
    const res = await getToast();

    if (!res.data || res.data.length === 0) return;

    const data = res.data[0];

    setToast(data);

    setChatId(data.telegramChatId || "");
    setToken(data.telegramToken || "");
    setWebhook(data.discordWebhook || "");

    setTelegramEnabled(data.toastTelegram);
    setDiscordEnabled(data.toastDiscord);
  };

  useEffect(() => {
    load();
  }, []);

  /* ================= CREATE ================= */

  const createSetting = async () => {
    if (telegramChatId && !telegramToken) {
      alert("Telegram cần bot token");
      return;
    }

    const payload = {
      telegramChatId: sanitize(telegramChatId),
      telegramToken: sanitize(telegramToken),
      discordWebhook: sanitize(discordWebhook),
      toastTelegram: telegramEnabled,
      toastDiscord: discordEnabled,
    };

    const res = await createToast(payload);

    setToast(res.data);

    load();
  };

  /* ================= UPDATE ================= */

  const updateTelegram = async () => {
    if (!toast) return;

    if (telegramChatId && !telegramToken) {
      alert("Telegram cần bot token");
      return;
    }

    await updateToast(toast._id ?? "", {
      telegramChatId: sanitize(telegramChatId),
      telegramToken: sanitize(telegramToken),
      toastTelegram: telegramEnabled,
    });

    load();
  };

  const updateDiscord = async () => {
    if (!toast) return;

    await updateToast(toast._id ?? "", {
      discordWebhook: sanitize(discordWebhook),
      toastDiscord: discordEnabled,
    });

    load();
  };

  /* ================= DELETE FIELD ================= */

  const deleteField = async (field: string) => {
    if (!toast) return;

    await deleteToastField(toast._id ?? "", field);

    load();
  };

  return (
    <Stack spacing={4}>
      {/* CREATE BUTTON */}

      {!toast && (
        <Button variant="contained" color="success" onClick={createSetting}>
          Create Toast Setting
        </Button>
      )}

      {/* TELEGRAM */}

      <Card>
        <CardContent>
          <Typography variant="h6">Telegram Settings</Typography>

          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Telegram Chat ID"
                value={telegramChatId}
                onChange={(e) => setChatId(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Telegram Bot Token"
                value={telegramToken}
                onChange={(e) => setToken(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              Enable Telegram
              <Switch checked={telegramEnabled} onChange={(e) => setTelegramEnabled(e.target.checked)} />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                {toast && (
                  <Button variant="contained" onClick={updateTelegram}>
                    Update
                  </Button>
                )}

                <Button color="error" onClick={() => deleteField("telegramChatId")}>
                  Delete ChatId
                </Button>

                <Button color="error" onClick={() => deleteField("telegramToken")}>
                  Delete Token
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* DISCORD */}

      <Card>
        <CardContent>
          <Typography variant="h6">Discord Settings</Typography>

          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Discord Webhook"
                value={discordWebhook}
                onChange={(e) => setWebhook(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              Enable Discord
              <Switch checked={discordEnabled} onChange={(e) => setDiscordEnabled(e.target.checked)} />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                {toast && (
                  <Button variant="contained" onClick={updateDiscord}>
                    Update
                  </Button>
                )}

                <Button color="error" onClick={() => deleteField("discordWebhook")}>
                  Delete Webhook
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
}
