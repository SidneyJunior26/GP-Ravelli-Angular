import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

export class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file?: File) {}
}

@Component({
  selector: 'image-upload',
  templateUrl: 'image-upload.component.html',
  styleUrls: ['image-upload.component.css'],
})
export class ImageUploadComponent {
  selectedFile: ImageSnippet;

  constructor(private http: HttpClient) {}

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  protected processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.onSuccess();
    });

    reader.readAsDataURL(file);
  }

  carregarImagem(idEvento: number) {
    const imageName = idEvento + '.jpeg';
    var imageFile: File;
    var imageBlob: Blob;
    var base64data = '';

    this.http
      .get('/assets/Images/' + idEvento + '.jpeg', { responseType: 'blob' })
      .subscribe((res) => {
        const reader = new FileReader();
        imageBlob = res;

        imageFile = new File([imageBlob!], imageName, {
          type: 'image/jpeg',
        });

        reader.addEventListener('load', () => {
          base64data = reader.result!.toString();

          this.selectedFile = new ImageSnippet(base64data, imageFile);

          this.selectedFile.pending = true;
          this.onSuccess();
        });

        reader.readAsDataURL(imageFile);
      });
  }
}
