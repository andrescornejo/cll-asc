import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order.model';
import { Product } from '../../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CargallamaService } from '../../../services/cargallama.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-product-panel',
	templateUrl: './product-panel.component.html',
	styleUrls: ['./product-panel.component.scss']
})
export class ProductPanelComponent implements OnInit {

	trackingNumber = '';
	clientNick = '';
	newProduct: Product = {};
	products?: Product[];

	datePickerOut: NgbDateStruct;

	isSuccess = false;
	successMsg = '';

	hasError = false;
	errorMsg: any;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private cllservice: CargallamaService,
		private modalService: NgbModal) { }

	ngOnInit(): void {
		this.trackingNumber = this.route.snapshot.params.tracking_number;
		this.clientNick = this.route.snapshot.params.nickname;
		this.getProducts(this.trackingNumber);
	}


	getProducts(trackingNumber: string): void {
		this.cllservice.productGetFromOrder(trackingNumber)
			.subscribe(
				data => {
					this.products = data;
					console.log(data);
				},
				error => {
					console.log(error);
					this.errorMsg = error.error.errors[0].message;
					this.isSuccess = false;
					this.hasError = true;
				});
	}

	insertProduct(): void {
		if (this.newProduct.hyperlink === '') {
			this.newProduct.hyperlink = null;
		}
		const queryData = {
			_name: this.newProduct.name_,
			_hyperlink: this.newProduct.hyperlink,
			_price: this.newProduct.price,
			_order_date: this.dateToString(this.datePickerOut),
			_quantity: this.newProduct.quantity
		};

		this.cllservice.productCreate(this.trackingNumber, queryData)
			.subscribe(
				response => {
					console.log(response);
					this.hasError = false;
					this.getProducts(this.trackingNumber);
					this.clearFields();
				},
				error => {
					this.errorMsg = error.error.errors[0].message;
					this.hasError = true;
					this.isSuccess = false;
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
					this.getProducts(this.trackingNumber);
					this.isSuccess = true;
					this.hasError = false;
					this.successMsg = `Product ${name} deleted successfully.`;
				},
				error => {
					console.log(error);
					this.isSuccess = false;
					this.hasError = true;
					this.successMsg = `Error deleting product: ${name}.`;
				});
		// Since this should never fail, error handling is pretty lax here.
		// However if more should be needed in the future, it will be programmed.
	}

	clearFields(): void {
		this.newProduct = {};
	}

	private dateToString = (date) => `${date.year}-${date.month}-${date.day}`;

}
