import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {
  @Input() imagesArray;
  imageObject: Array<object> = [];

  constructor() { }

  ngOnInit(): void {
    for (const imageUrl of this.imagesArray) {
      this.imageObject.push({
        image: imageUrl,
        thumbImage: imageUrl
      });
    }
  }
}
