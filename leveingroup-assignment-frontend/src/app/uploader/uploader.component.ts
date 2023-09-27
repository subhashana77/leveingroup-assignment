import { Component, Input } from '@angular/core';
import {ApiService} from "../services/api.service";
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from "sweetalert2";

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
  constructor(private apiService: ApiService) {}

  @Input() username = '';

  loaded: boolean = false;
  imageSrc: string = '';
  caption = "";
  imageName = "";

  handleInputChange(e:any) {
    console.log("input change")
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.loaded = false;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e:any) {
    console.log("_handleReaderLoaded")
    var reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
  }

  onUpload() {
    if (!this.imageSrc) {
      Swal.fire(
        'Fail',
        'Post image is required!',
        'error'
      )
    } else if (!this.caption) {
      Swal.fire(
        'Fail',
        'Post caption is required!',
        'error'
      )
    } else {
      this.apiService.createPost({
        username: this.username,
        caption: this.caption,
        image: this.imageSrc
      }).subscribe({
        next: response => {
          Swal.fire(
            'Post Uploaded',
            'Post Uploaded Successfully!',
            'success'
          )
          this.caption = "";
          this.imageSrc = "";
          this.imageName = "";
        },
        error: err => {
          Swal.showValidationMessage(
            `Request failed: ${err}`
          )
        }
      });
    }
  }
}
