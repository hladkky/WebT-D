class ImageGallery extends HTMLTableElement {
    constructor() {
        super();

        var tr = document.createElement('tr');
        var imgsArray = this.getAttribute('imageList').split(";");

        for (var i = 0 ; i < imgsArray.length; i++)
        {
            var td = document.createElement('td');

            var img = document.createElement('img');
            img.src = imgsArray[i];
            img.setAttribute("width", "100%");
            img.setAttribute("height", "100%");

            img.setAttribute("onclick", "mDown(this)");
            img.setAttribute("onerror", "errorHandler(this)");
            img.style.cursor = "pointer";
            img.style.verticalAlign = "middle";
            td.appendChild(img);
            tr.appendChild(td);
        }

        this.appendChild(tr);
    }
}

customElements.define('image-gallery', ImageGallery, {extends:'table'});


function errorHandler(img) {
  img.setAttribute("src", "resources/error.png");
  img.setAttribute("height", "100%");
  img.setAttribute("width", "auto");
  img.onclick = function() {
     return false;
  }
  img.style.cursor = 'auto';
}

let html = document.documentElement;

function mDown(obj) {

  const source = obj.src;
  new_item = document.createElement('img');
  new_item.setAttribute('src', source);
  new_item.setAttribute('class', 'new_item');
  new_item.setAttribute('onclick', 'remfunc(this)');

  new_item.style.zIndex=3;

  let html_width = html.clientWidth;
  let html_height = html.clientHeight;
  let img_ratio = new_item.height / new_item.width;
  let html_ratio = html_height / html_width;

  console.log(new_item.height, new_item.width)

  if (img_ratio > html_ratio) {
    new_item.setAttribute('height', "100%");
    new_item.setAttribute('width', "auto");
  }
  else {
    new_item.setAttribute('width', "100%");
    new_item.setAttribute('height', "auto");
  }


  new_div = document.createElement('div');
  new_div.setAttribute('class', 'new_div');
  new_div.setAttribute('id', 'temp_div');
  new_div.style.zIndex=2;


  document.body.appendChild(new_item);
  document.body.appendChild(new_div);
}


function remfunc(obj) {
  obj.setAttribute('class', 'clear_item')
  div_to_clear = document.getElementById('temp_div');

  setTimeout(function() {
  document.body.removeChild(obj);
  document.body.removeChild(div_to_clear);
  }, 500)
}
