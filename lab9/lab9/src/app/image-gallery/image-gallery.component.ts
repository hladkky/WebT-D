import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent {
  @Input() imagesArray;
  @Output() messageEvent = new EventEmitter();
  faildedIds = new Set();
  uploadedImgs = new Set();
  defaultUrl = 'assets/images/error.png';
  errorHandler(index) {
    this.faildedIds.add(index);
  }
  sendIdxFromArray(index) {
    this.messageEvent.emit(index);
  }
}
