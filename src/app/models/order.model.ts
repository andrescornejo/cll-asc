import { Product } from "./product.model";
import { Client } from "./client.model";

export class Order {
	order_id?: any;
	tracking_number?: string;
	correos_tracking_number?: string;
	service_fee?: number;
	total_fee?: number;
	delivery_state?: string;
	description_?: string;
	is_first_payment?: boolean;
	is_second_payment?: boolean;
	delivery_date?: any;
	inserted_at?: any;
	is_completed?: boolean;
	products?: Product[];
	client_fk_client?: Client;
}
