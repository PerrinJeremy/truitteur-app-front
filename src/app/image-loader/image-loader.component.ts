import { Output, EventEmitter, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';


class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements OnInit {

  selectedFile: ImageSnippet;

  @Output() imageLoadedEvent = new EventEmitter<any>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.userService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {       
          console.log(res);
          this.imageLoadedEvent.emit(res.image.filename) 
        },
        (err) => {

        })
    });
    reader.readAsDataURL(file);
  }


}
