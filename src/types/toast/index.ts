export interface ToastSetting {
  _id?: string;
  telegramChatId?: string;
  telegramToken?: string;
  discordWebhook?: string;
  toastDiscord?: boolean;
  toastTelegram?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
