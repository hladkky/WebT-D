import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toggle = true;
  message;

  imagesArray = [
    'https://cdn.theculturetrip.com/wp-content/uploads/2017/09/field-2513145_1280.jpg',
    'https://wallpaperaccess.com/full/1330365.jpg',
    'https://ukrainetrek.com/blog/wp-content/uploads/2011/12/ukrainian-carpathians-landscape-4.jpg',
    'https://www.worldatlas.com/r/w1200-h701-c1200x701/upload/0e/90/a0/shutterstock-796737793.jpg'
  ];

  addImage(url) {
    if (url) {
      this.imagesArray.push(url);
    }
  }

  toggleImages() {
    document.getElementById('toggle-button').innerText = this.toggle ? 'Show Gallery' : 'Show Slider';
    this.toggle = !this.toggle;
  }

  receiveMessage($event) {
    this.imagesArray.splice($event, 1);
  }
}
