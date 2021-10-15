import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client.model';
import { CargallamaService } from '../../../services/cargallama.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {
  
  client: Client = {
    nickname: '',
    name_: '',
    surnames: ''
  };
  
  // Boolean variable to verify that the client is inserted correctly.
  is_inserted = false;
  last_inserted = ''; 

  has_insert_error = false;
  error_msg:any ; 

  constructor(private cllservice: CargallamaService) { }

  ngOnInit(): void {
  }
  
  insertClient(): void{
    const query_data = {
      nickname: this.client.nickname,
      name_: this.client.name_,
      surnames: this.client.surnames
    };
    
    this.cllservice.clientCreate(query_data)
      .subscribe(
        response => {
          console.log(response);
          this.last_inserted = this.client.nickname;
          this.is_inserted = true;
          this.has_insert_error = false;
          this.clearClient();
        },
        error => {
          this.error_msg = error.error.errors[0].message;
          this.is_inserted = false;
          this.has_insert_error = true;
          console.log(error);  
        }
      );
  }
  
  clearClient(): void{
    this.client = {
      nickname: '',
      name_: '',
      surnames: ''
    };
  }
}
