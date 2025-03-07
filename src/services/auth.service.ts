import { AxiosResponse } from "axios";
import { BaseService } from ".";

class AuthService {
  private static instance: AuthService;
  private baseService: BaseService;

  private constructor() {
    this.baseService = BaseService.getInstance();
  }

  public loginUrl = "/auth/login";
  public logoutUrl = "/auth/logout";

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public login<T>(
    username: string,
    password: string
  ): Promise<AxiosResponse<T>> {
    const data = {
      username,
      password,
    };
    return this.baseService.post<T>(this.loginUrl, data);
  }

  public logout<T>(): Promise<AxiosResponse<T>> {
    return this.baseService.post<T>(this.logoutUrl, {});
  }
}

const authService = AuthService.getInstance();
Object.freeze(authService);

export { authService };
