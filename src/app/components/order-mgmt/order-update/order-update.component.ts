import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CargallamaService } from '../../../services/cargallama.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-order-update',
	templateUrl: './order-update.component.html',
	styleUrls: ['./order-update.component.scss']
})
export class OrderUpdateComponent implements OnInit {

	old_tracking_no = '';
	client_nick = '';
	new_order: Order = {};

	datepicker_out: NgbDateStruct;

	// Boolean variable to verify that the order is updated correctly.
	is_updated = false;
	last_updated = '';

	has_error = false;
	error_msg: any;

	constructor(private location: Location,
		private route: ActivatedRoute,
		private router: Router,
		private cllservice: CargallamaService) { }

	ngOnInit(): void {
		this.old_tracking_no = this.route.snapshot.params.tracking_number;
		this.client_nick = this.route.snapshot.params.nickname;
		this.getOrder(this.old_tracking_no);
	}

	private dateToString = (date) => `${date.year}-${date.month}-${date.day}`;

	private dateToNgbDateStruct(date){
		var ngbDateStruct = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
		return ngbDateStruct;
	}

	stringToDate(_date:any, _format:string, _delimiter:string) {
		var formatLowerCase = _format.toLowerCase();
		var formatItems = formatLowerCase.split(_delimiter);
		var dateItems = _date.split(_delimiter);
		var monthIndex = formatItems.indexOf("mm");
		var dayIndex = formatItems.indexOf("dd");
		var yearIndex = formatItems.indexOf("yyyy");
		var month = parseInt(dateItems[monthIndex]);
		month -= 1;
		var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
		return formatedDate;
	}

	getOrder(tracking_number: string): void {
		this.cllservice.orderGet(tracking_number)
			.subscribe(
				data => {
					this.new_order = data;
					var newDate = this.stringToDate(data.delivery_date, 'yyyy-mm-dd', '-');
					this.datepicker_out = this.dateToNgbDateStruct(newDate);
					// For some reason reading the date into the datepicker doesnt work.
					//this.datepicker_out = data.delivery_date; 
					console.log(data);
				},
				error => {
					console.log(error);
					this.error_msg = error.error.errors[0].message;
					this.is_updated = false;
					this.has_error = true;
				});
	}

	updateOrder(): void {
		console.log(this.datepicker_out);
		console.log(this.dateToString(this.datepicker_out));
		const query_data = {
			new_tracking_no: this.new_order.tracking_number,
			new_correos_no: this.new_order.correos_tracking_number,
			new_service_fee: this.new_order.service_fee,
			new_del_state: this.new_order.delivery_state,
			new_is_first_p: this.new_order.is_first_payment,
			new_is_second_p: this.new_order.is_second_payment,
			new_delivery_date: this.dateToString(this.datepicker_out),
			new_is_completed: this.new_order.is_completed,
			new_desc: this.new_order.description_
		};

		this.cllservice.orderUpdate(this.old_tracking_no, query_data)
			.subscribe(
				response => {
					console.log(response);
					this.old_tracking_no = this.new_order.tracking_number;
					this.last_updated = this.new_order.tracking_number;
					this.getOrder(this.last_updated);
					this.is_updated = true;
					this.has_error = false;
				},
				error => {
					this.error_msg = error.error.errors[0].message;
					this.is_updated = false;
					this.has_error = true;
					console.log(error);
				}
			);
	}
	clearOrder(): void {
		this.new_order = {};
	}

}
