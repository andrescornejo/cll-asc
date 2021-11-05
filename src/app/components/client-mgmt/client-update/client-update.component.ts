import { Component, OnInit } from '@angular/core';
import { CargallamaService } from '../../../services/cargallama.service';
import { Client } from '../../../models/client.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class ClientUpdateComponent implements OnInit {
  
  old_nick = '';
  
  new_client: Client = {
    nickname: '',
    name_: '',
    surnames: ''
  }

  client: Client = {
    nickname: '',
    name_: '',
    surnames: ''
  };
  
  // Boolean variable to verify that the client is inserted correctly.
  is_updated = false;
  last_updated = ''; 

  has_insert_error = false;
  error_msg:any ; 

  constructor(private cllservice: CargallamaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.old_nick = this.route.snapshot.params.nickname
    this.getClient(this.old_nick);
  }  
  
  getClient(nickname: string): void {
    this.cllservice.clientGetIndividual(nickname)
      .subscribe(
        data => {
          this.client= data;
          console.log(data);
        },
        error => {
          console.log(error);
          this.error_msg = error.error.errors[0].message;
          this.is_updated = false;
          this.has_insert_error = true;
        });
  }
  
  updateClient(): void{
    const query_data = {
      new_nick: this.new_client.nickname,
      new_name: this.new_client.name_,
      new_surnames: this.new_client.surnames
    };
    
    this.cllservice.clientUpdate(this.client.nickname, query_data)
      .subscribe(
        response => {
          console.log(response);
          this.last_updated = this.new_client.nickname;
          this.getClient(this.last_updated);
          this.is_updated = true;
          this.has_insert_error = false;
          this.clearClient();
        },
        error => {
          this.error_msg = error.error.errors[0].message;
          this.is_updated = false;
          this.has_insert_error = true;
          console.log(error);  
        }
      );
  }
  clearClient(): void{
    this.new_client = {
      nickname: '',
      name_: '',
      surnames: ''
    };
  }

}
