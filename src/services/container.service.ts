import { ResourceService } from "./resource.service";

export interface IContainer {
  name: string;
  type: string;
  weight: string;
  capacity: string;
}
export class ContainerService extends ResourceService {
  private static instance: ContainerService;

  public static getInstance(): ContainerService {
    if (!ContainerService.instance) {
      ContainerService.instance = new ContainerService("container");
    }
    return ContainerService.instance;
  }
}
const containerService = ContainerService.getInstance();
Object.freeze(containerService);

export { containerService };
