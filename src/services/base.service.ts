/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class BaseService {
  private static instance: BaseService;
  private client: AxiosInstance;

  private constructor() {
    this.client = axios.create({
      baseURL: "https://api.example.com",
      timeout: 1000,
      headers: { "Content-Type": "application/json" },
    });

    this.client.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // You can add authorization tokens or modify request here
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) => {
        // Handle response errors here
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): BaseService {
    if (!BaseService.instance) {
      BaseService.instance = new BaseService();
    }
    return BaseService.instance;
  }

  public get<T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  public post<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  public put<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  public delete<T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}

export { BaseService };
