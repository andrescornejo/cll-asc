import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order.model';
import { Product } from '../../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CargallamaService } from '../../../services/cargallama.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

@Component({
	selector: 'app-product-panel',
	templateUrl: './product-panel.component.html',
	styleUrls: ['./product-panel.component.scss']
})
export class ProductPanelComponent implements OnInit {

	tracking_number = '';
	client_nick = '';
	new_product: Product = {};
	products?: Product[];

	datepicker_out: NgbDateStruct;

	is_success = false;
	succ_msg = '';

	has_error = false;
	error_msg: any;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private cllservice: CargallamaService,
		private modalService: NgbModal) { }

	ngOnInit(): void {
		this.tracking_number = this.route.snapshot.params.tracking_number;
		this.client_nick = this.route.snapshot.params.nickname;
		this.getProducts(this.tracking_number);
	}

	private dateToString = (date) => `${date.year}-${date.month}-${date.day}`;

	getProducts(tracking_number: string): void {
		this.cllservice.productGetFromOrder(tracking_number)
			.subscribe(
				data => {
					this.products = data;
					console.log(data);
				},
				error => {
					console.log(error);
					this.error_msg = error.error.errors[0].message;
					this.is_success = false;
					this.has_error = true;
				});
	}

	insertProduct(): void {
		if (this.new_product.hyperlink === '') {
			this.new_product.hyperlink = null;
		}
		const query_data = {
			_name: this.new_product.name_,
			_hyperlink: this.new_product.hyperlink,
			_price: this.new_product.price,
			_order_date: this.dateToString(this.datepicker_out),
			_quantity: this.new_product.quantity
		};

		this.cllservice.productCreate(this.tracking_number, query_data)
			.subscribe(
				response => {
					console.log(response);
					this.has_error = false;
					this.getProducts(this.tracking_number);
					this.clearFields();
				},
				error => {
					this.error_msg = error.error.errors[0].message;
					this.has_error = true;
					this.is_success = false;
					console.log(error);
				}
			);
	}

	//Modal was not fucking working so just and unsafe delete.
	deleteProductConfirmed(name: string, tracking: any) {

		this.cllservice.productDelete(tracking, name)
			.subscribe(
				response => {
					console.log(response);
					this.getProducts(this.tracking_number);
					this.is_success = true;
					this.has_error = false;
					this.succ_msg = `Product ${name} deleted successfully.`
				},
				error => {
					console.log(error);
					this.is_success = false;
					this.has_error = true;
					this.succ_msg = `Error deleting product: ${name}.`
				});
		// Since this should never fail, error handling is pretty lax here. 
		// However if more should be needed in the future, it will be programmed.
	}

	clearFields(): void {
		this.new_product = {};
	}

}
