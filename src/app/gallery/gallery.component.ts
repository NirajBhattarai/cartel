import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public imageArray: any = [];
  public startIndex = 1;
  public lastIndex = 100;
  // public imageArray = Array.from(Array(1000).keys());
  constructor(
    public _lightbox: Lightbox
  ) {
    this.fetchImages();
  }

  ngOnInit(): void {}

  open(index: number): void {
    this._lightbox.open(this.imageArray, index);
  }

  close(): void {
    this._lightbox.close();
  }

  fetchImages(){
    for (let i = this.startIndex; i <= this.lastIndex; i++) {
      const src = 'assets/img/gallery/' + i + '.png';
      const caption = 'Full Image';
      const thumb = 'assets/img/gallery/' + i + '.png';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };

      this.imageArray.push(album);
    }
  }

  onScroll(){
    if(this.lastIndex < 1000){
      this.startIndex = this.lastIndex + 1;
      this.lastIndex = this.lastIndex + 100;
      this.fetchImages();  
    }
    
  }

}
