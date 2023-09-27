import {Component, OnInit} from '@angular/core';
import {ApiService} from "./services/api.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  randomUsername: string = '';
  caption: string = '';
  imageBase64: string = '';
  list:any = [];
  STATIC_IMAGE_URL_PATH: string = 'http://localhost:8000/images/';
  comment: any;

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

    this.loadAllPost();
  }

  loadAllPost() {
    this.apiService.getAllPosts().subscribe({
      next: response => {
        if (response) {
          console.log(response);
          this.list = response;
          console.log(this.list);
        } else {
          console.log("Not any post to display");
        }
      }
    });
  }

  trackByFn(index: any, posts: any) {
    return index;
  }

  onComment(id: any) {
    if (!this.comment) {
      Swal.fire(
        'Error',
        'Comment is required!',
        'error'
      );
    } else {
      this.apiService.createComment({
        postId: id,
        comment: this.comment,
      }).subscribe({
        next: response=> {
          this.comment = "doom";
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }
}
