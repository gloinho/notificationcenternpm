import { AuthError } from "../Models/auth.model";
import { ExceptionModel } from "./exception.model";

export class AuthException implements ExceptionModel {
  statusCode: number;
  message: string[];
  timestamp: string;
  path: string;
  constructor(response: AuthError) {
    this.statusCode = response.statusCode;
    this.timestamp = response.timestamp.toString();
    this.message = response.message;
    this.path = response.path;
  }
}
