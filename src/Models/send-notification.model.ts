import { AuthError } from "./auth.model";

export interface RequestSendNotification {
  receiver: RequestReceiverSendNotification;
  campaignNameId: string;
  parameters?: HbsTemplateParams;
}

export interface RequestReceiverSendNotification {
  identificadorUsuario?: string;
  deviceId?: string;
  phone?: string;
  email?: string;
}

export interface SendNotificationProvider {
  name: string;
  credentials: string;
  providerAccountId: number;
  channel: string;
}

export type HbsTemplateParams = {
  [key: string]: number | string | HbsTemplateParams;
};

export interface NotificationResponse {
  id: string;
  dateTime: string;
  success: boolean;
  error?: Error;
}
