import { AxiosResponse } from "axios";
import { BaseService } from ".";

export type Resource = "container";
class ResourceService {
  private baseService: BaseService;

  private resource: Resource;

  public constructor(resource: Resource) {
    this.baseService = BaseService.getInstance();
    this.resource = resource;
  }

  public get<T, TParams>(params?: TParams) {
    return this.baseService.get<T>(this.resource, {
      params,
    });
  }

  public create<T, TParams>(data: TParams): Promise<AxiosResponse<T>> {
    return this.baseService.post<T>(this.resource, data);
  }

  public update<T, TParams>(data: TParams): Promise<AxiosResponse<T>> {
    return this.baseService.put<T>(this.resource, data);
  }

  public delete<T, TParams>(params?: TParams): Promise<AxiosResponse<T>> {
    return this.baseService.delete<T>(this.resource, {
      params,
    });
  }
}

export { ResourceService };
