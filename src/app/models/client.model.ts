import { Order } from "./order.model";
import { Address } from "./address.model";

export class Client{
  client_id?: any;
  nickname?: string;
  name_?: string;
  surnames?: string;
  is_active?: boolean;
  orders?: Order[];
  addresses?: Address[];
}
