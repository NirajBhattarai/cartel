import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public imageArray: any = [];
  // public imageArray = Array.from(Array(1000).keys());
  constructor(
    public _lightbox: Lightbox
  ) {
    for (let i = 1; i <= 1000; i++) {
      const src = 'assets/img/gallery/' + i + '.png';
      const caption = 'Full Image';
      const thumb = 'assets/img/gallery/thumnail/' + i + '.jpg';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };

      this.imageArray.push(album);
    }
  }

  ngOnInit(): void {}

  open(index: number): void {
    this._lightbox.open(this.imageArray, index);
  }

  close(): void {
    this._lightbox.close();
  }

}
