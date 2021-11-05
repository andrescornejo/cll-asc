// This service handles all the http requests to the rest api.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { base_url } from '../global-variables';

@Injectable({
	providedIn: 'root'
})
export class CargallamaService {

	constructor(private http: HttpClient) { }

	//All client CRUD operations.

	clientCreate(data: any): Observable<any> {
		return this.http.post(`${base_url}/client`, data);
	}

	clientGetAll(): Observable<Client[]> {
		return this.http.get<Client[]>(`${base_url}/client`);
	}

	clientGetSimilar(query: any): Observable<Client[]> {
		return this.http.get<Client[]>(`${base_url}/client/search/${query}`);
	}

	clientGetIndividual(nickname: any): Observable<Client> {
		return this.http.get(`${base_url}/client/${nickname}`);
	}

	clientUpdate(nickname: any, data: any): Observable<any> {
		return this.http.put(`${base_url}/client/${nickname}`, data);
	}

	clientDelete(nickname: any): Observable<any> {
		return this.http.delete(`${base_url}/client/${nickname}`);
	}

	// Order CRUD operations.
	orderCreate(client_nickname: string): Observable<any> {
		return this.http.post(`${base_url}/order/${client_nickname}`, null);
	}

	orderGet(tracking_number: any): Observable<Order> {
		return this.http.get<Order>(`${base_url}/order/${tracking_number}`);
	}

	orderGetAll(): Observable<Order[]> {
		return this.http.get<Order[]>(`${base_url}/order`);
	}

	orderGetActive(): Observable<Order[]> {
		return this.http.get<Order[]>(`${base_url}/active-orders`);
	}

	orderGetCompleted(): Observable<Order[]> {
		return this.http.get<Order[]>(`${base_url}/completed-orders`);
	}

	orderGetFromClient(client_nick: any): Observable<Order[]> {
		return this.http.get<Order[]>(`${base_url}/orders/client/${client_nick}`);
	}

	orderUpdate(tracking_number: any, data: any): Observable<any> {
		return this.http.put(`${base_url}/order/${tracking_number}`, data);
	}

	orderDelete(tracking_number: any): Observable<any> {
		return this.http.delete(`${base_url}/order/${tracking_number}`);
	}

	// Product CRUD operations.

	productCreate(tracking_number: any, data: any): Observable<any> {
		console.log(data);
		return this.http.post(`${base_url}/product/${tracking_number}`, data);
	}

	productGetAll(): Observable<Product[]> {
		return this.http.get<Product[]>(`${base_url}/product`);
	}

	productGetFromOrder(tracking_number: any): Observable<Product[]> {
		return this.http.get<Product[]>(`${base_url}/product/${tracking_number}`);
	}

	productDelete(tracking_number:any, name:any): Observable<any> {
		return this.http.delete(`${base_url}/product/${tracking_number}/${name}`);
	}

}
