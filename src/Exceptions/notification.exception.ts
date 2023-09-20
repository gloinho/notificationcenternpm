import { NotificationResponse } from "../Models/send-notification.model";
import { ExceptionModel } from "./exception.model";

export class NotificationException implements ExceptionModel {
  id: string;
  dateTime: string;
  success: boolean;
  error?: Error;
  constructor(response: NotificationResponse) {
    this.id = response.id;
    this.dateTime = response.dateTime.toString();
    this.success = response.success;
    this.error = response.error;
  }
}
