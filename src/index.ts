import { AuthError } from "./Models/auth.model";
import * as dotenv from "dotenv";
import axios, { AxiosError, AxiosResponse } from "axios";
import { parse } from "cookie";
import {
  NotificationResponse,
  RequestSendNotification,
} from "./Models/send-notification.model";
import { Configuration } from "./Models/configuration.model";
import { AuthException } from "./Exceptions/auth.exception";
import { NotificationException } from "./Exceptions/notification.exception";

dotenv.config();

export class NotificationCenter {
  private readonly configuration: Configuration;

  constructor() {
    this.configuration = {
      authBaseUrl: process.env.CUSTOMER_BASE_URL,
      enginerBaseUrl: process.env.ENGINER_BASE_URL,
      user: {
        password: process.env.CUSTOMER_PASSWORD,
        userName: process.env.CUSTOMER_USERNAME,
      },
    };
  }

  async authenticate(): Promise<string | undefined> {
    const accessToken = await this.getAccessToken();
    return accessToken;
  }

  async sendNotification(request: RequestSendNotification, token: string) {
    const body = JSON.stringify(request);
    const options = {
      method: "POST",
      url: `${this.configuration.enginerBaseUrl}/api/notification/send`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer : ${token}`,
      },
      data: body,
    };

    const response = await axios.request(options);
    const notificationResponse: NotificationResponse = Object.assign(
      {},
      response.data
    );
    if (!notificationResponse.success) {
      throw new NotificationException(notificationResponse);
    }
    return notificationResponse;
  }

  private async getAccessToken(): Promise<string | undefined> {
    const body = JSON.stringify(this.configuration.user);
    const options = {
      method: "POST",
      url: `${this.configuration.authBaseUrl}/api/notification/authentication/sign-in`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };
    try {
      const response = await axios.request(options);
      return this.getCookie(response);
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new AuthException(axiosError.response?.data as AuthError);
    }
  }

  private getCookie(response: AxiosResponse): string | undefined {
    const cookies = response.headers["set-cookie"];
    if (cookies) {
      const cookieObject = parse(cookies.join(";"));
      if (cookieObject.access_token) {
        return cookieObject.access_token;
      }
    }
    return undefined;
  }
}

async function main() {
  const center = new NotificationCenter();
  const token = await center.authenticate();
  const teste = await center.sendNotification(
    {
      receiver: {
        deviceId: "exemplo_sms",
      },
      campaignNameId: "exemplo_sms",
    },
    token ? token : ""
  );
  console.log(teste);
}

main();
