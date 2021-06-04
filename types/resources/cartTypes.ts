import { IOrder, IOrderAddresses } from "./orderTypes";

export interface IAddAddressesToCart {
    (adresses: IOrderAddresses & { email: string }): Promise<IOrder>
}