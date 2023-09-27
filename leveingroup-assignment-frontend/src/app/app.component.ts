import {Component, OnInit} from '@angular/core';
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  randomUsername: string = '';
  name = 'Angular 5';

  caption: string = '';
  imageBase64: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getRandomUsername().subscribe({
      next: response => {
        this.randomUsername = response?.data;
      },
      error: err => {
        console.log(err);
      }
    });
  }



}
