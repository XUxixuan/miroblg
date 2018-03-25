var demo = document.querySelector('#appended-demo');
var container = demo.querySelector('.masonry');
var button = demo.querySelector('button');
var msnry = new Masonry( container, {
  columnWidth: 60
});

eventie.bind( button, 'click', function() {
  // create new item elements
  var elems = [];
  var fragment = document.createDocumentFragment();
  for ( var i = 0; i < 5; i++ ) {
    var elem = getItemElement();
    fragment.appendChild( elem );
    elems.push( elem );
  }
  // append elements to container
  container.appendChild( fragment );
  // add and lay out newly appended elements
  msnry.appended( elems );
});
