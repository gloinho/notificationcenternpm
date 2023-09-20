export interface ExceptionModel {
  statusCode?: number;
  message?: string[];
  timestamp?: string;
  path?: string;
  id?: string;
  dateTime?: string;
  success?: boolean;
  error?: Error;
}
