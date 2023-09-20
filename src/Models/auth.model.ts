export interface AuthRequestModel {
  userName?: string;
  password?: string;
}

export interface AuthError {
  statusCode: number;
  message: string[];
  timestamp: Date;
  path: string;
}
