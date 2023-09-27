import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApiService} from "../services/api.service";
import Swal from "sweetalert2";


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
  constructor(private apiService: ApiService) {}

  @Input() username = '';
  @Output("loadAllPost") loadAllPost: EventEmitter<any> = new EventEmitter<any>();

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
        'Error',
        'Post image is required!',
        'error'
      );
    } else if (!this.caption) {
      Swal.fire(
        'Error',
        'Post caption is required!',
        'error'
      );
    } else {
      this.apiService.createPost({
        username: this.username,
        caption: this.caption,
        image: this.imageSrc,
      }).subscribe({
        next: response => {
          Swal.fire(
            'Uploaded',
            'Your post has updated successfully!',
            'success'
          );
          this.loadAllPost.emit();
          this.caption = "";
          this.imageSrc = "";
          this.imageName = "";
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
}
