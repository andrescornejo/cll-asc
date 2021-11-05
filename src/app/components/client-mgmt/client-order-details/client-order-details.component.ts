import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client.model';
import { Order } from '../../../models/order.model';
import { CargallamaService } from '../../../services/cargallama.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'

@Component({
	selector: 'app-client-order-details',
	templateUrl: './client-order-details.component.html',
	styleUrls: ['./client-order-details.component.scss']
})
export class ClientOrderDetailsComponent implements OnInit {

	client_nick = '';
	currentIndex = -1;
	orders?: Order[];
	current_order: Order = {};

	constructor(private cllservice: CargallamaService,
		private route: ActivatedRoute,
		private router: Router,
		private modalService: NgbModal) { }

	ngOnInit(): void {
		this.client_nick = this.route.snapshot.params.nickname;
		this.refreshList();
	}

	retrieveOrders(): void {
		this.cllservice.orderGetFromClient(this.client_nick)
			.subscribe(
				data => {
					console.log(data);
					this.orders = data;
				},
				error => {
					console.log(error);
				}
			);
	}

	refreshList(): void {
		this.retrieveOrders();
		this.current_order = {};
		this.currentIndex = -1;
	}

	setActiveOrder(order: Order, index: number): void {
		this.current_order = order;
		this.currentIndex = index;
	}

	addNewOrder(): void {
		this.cllservice.orderCreate(this.client_nick)
			.subscribe(
				response => {
					console.log(response);
					this.refreshList();
				},
				error => {
					console.log(error);
				}
			);
	}

	openDeleteModal(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-delete-client' });
	}

	clientDeleteConfirmed() {
		this.cllservice.orderDelete(this.current_order.tracking_number)
			.subscribe(
				response => {
					console.log(response);
					this.refreshList();
				},
				error => {
					console.log(error);
				});
		// Since this should never fail, error handling is pretty lax here. 
		// However if more should be needed in the future, it will be programmed.
		this.modalService.dismissAll();
	}

}
