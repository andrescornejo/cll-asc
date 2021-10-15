import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { Client } from '../../../models/client.model';
import { CargallamaService } from '../../../services/cargallama.service';

@Component({
	selector: 'app-client-list',
	templateUrl: './client-list.component.html',
	styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

	clients?: Client[];
	currentClient: Client = {};
	currentIndex = -1;
	nickname = '';

	constructor(private cllService: CargallamaService,
		private modalService: NgbModal) { }

	ngOnInit(): void {
		this.retrieveClients();
	}

	retrieveClients(): void {
		this.cllService.clientGetAll()
			.subscribe(
				data => {
					this.clients = data;
					console.log(data);
				},
				error => {
					console.log(error);
				});
	}

	refreshList(): void {
		this.retrieveClients();
		this.currentClient = {};
		this.currentIndex = -1;
	}

	setActiveClient(client: Client, index: number): void {
		this.currentClient = client;
		this.currentIndex = index;
	}

	searchByNickname(): void {
		this.currentClient = {};
		this.currentIndex = -1;

		// If the search criterium is empty refresh the list
		if (this.nickname == '') {
			this.refreshList();
		} else {
			// Else do the search.
			this.cllService.clientGetSimilar(this.nickname)
				.subscribe(
					data => {
						this.clients = data;
						console.log(data);
					},
					error => {
						console.log(error);
					});
		}

	}

	openDeleteModal(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-delete-client' });
	}

	clientDeleteConfirmed() {
		this.cllService.clientDelete(this.currentClient.nickname)
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
