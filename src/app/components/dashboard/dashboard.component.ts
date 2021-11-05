import { Component, OnInit } from '@angular/core';
import { app_version, app_release_model } from '../../global-variables';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  version = app_version;
  release_model = app_release_model;

  constructor() { }

  ngOnInit(): void {
  }

}
