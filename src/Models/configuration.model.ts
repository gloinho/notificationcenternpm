import { AuthRequestModel } from "./auth.model";

export interface Configuration {
  user: AuthRequestModel;
  authBaseUrl?: string;
  enginerBaseUrl?: string;
}
