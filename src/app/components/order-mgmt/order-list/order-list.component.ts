import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order.model';
import { CargallamaService } from '../../../services/cargallama.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'

@Component({
	selector: 'app-order-list',
	templateUrl: './order-list.component.html',
	styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

	a_orders?: Order[];
	c_orders?: Order[];
	//Variables for future table pagination.
	a_page = 1;
	c_page = 1;
	a_size = 0;
	c_size = 0;
	a_count = 0;
	c_count = 0;
	page_size = 12;
	constructor(private cllservice: CargallamaService, private modalService: NgbModal) { }

	ngOnInit(): void {
		this.retrieveActiveOrders();
		this.retrieveCompletedOrders();
	}

	retrieveActiveOrders(): void {
		this.cllservice.orderGetActive()
			.subscribe(
				data => {
					this.a_orders = data;
					this.a_size = data.length;
					this.refreshAList();
					console.log(data);
				},
				error => {
					console.log(error);
				});
	}

	retrieveCompletedOrders(): void {
		this.cllservice.orderGetCompleted()
			.subscribe(
				data => {
					this.c_orders = data;
					this.c_size = data.length;
					this.refreshCList();
					console.log(data);
				},
				error => {
					console.log(error);
				});
	}

	refreshAList(): void {
		this.a_orders
			.map((order, i) => ({ a_count: i + 1, ...order}))
			.slice((this.a_page - 1) * this.page_size, (this.a_page - 1) * this.page_size + this.page_size);

	}

	refreshCList(): void {
		this.c_orders
			.map((country, i) => ({ id: i + 1, ...country }))
			.slice((this.c_page - 1) * this.page_size, (this.c_page - 1) * this.page_size + this.page_size);
	  
	}

	openDeleteModal(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-delete-client' });
	}

	orderDeleteConfirmed(tracking_number:any) {
		this.cllservice.orderDelete(tracking_number)
			.subscribe(
				response => {
					console.log(response);
					this.retrieveActiveOrders();
					this.retrieveCompletedOrders();
				},
				error => {
					console.log(error);
				});
		// Since this should never fail, error handling is pretty lax here. 
		// However if more should be needed in the future, it will be programmed.
		//this.modalService.dismissAll();
	}

}
