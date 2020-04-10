document.body.onload = function() {
  console.log(2)

  setTimeout(function() {
    var pre = document.getElementById('preloading');
    if ( !pre.classList.contains('finish') )
    {
      pre.classList.add('finish');
    }
  }, 1000)

  console.log(2)
}