var canvas = new fabric.Canvas('c');

var rect, isDown, origX, origY;
var disableMovement = false;
document.getElementById('select').addEventListener('click', ()=>
{
// alert("hey");
canvas.isDrawingMode = false;
disableMovement = true;
canvas.selection = true;
canvas.forEachObject(function(object){ 
       object.setCoords(); 
       console.log(object);
        canvas.renderAll();
       });
});
fabric.Image.fromURL('http://i.imgur.com/8rmMZI3.jpg', function(oImg) {
  oImg.selectable = false;
  oImg.id = 'image';
//   var img1 = myImg.set({ left: 0, top: 0 ,width:350,height:350});
  canvas.add(oImg);
});

fabric.Image.fromURL('http://fabricjs.com/assets/pug_small.jpg', function(myImg) {
 //i create an extra var for to change some image properties
 var img1 = myImg.set({ left: 0, top: 0 ,width:350,height:350});
 canvas.add(img1); 
});

canvas.on('mouse:wheel', function(opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom = zoom + delta/200;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
});

document.getElementById('myImg').onchange = function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) { console.log('fdsf');
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
            // start fabricJS stuff
            
            var image = new fabric.Image(imgObj);
            image.set({
                left: 250,
                top: 250,
                angle: 0,
                padding: 10,
                cornersize: 10
            });
            canvas.add(image);
            
            // end fabricJS stuff
        }
        
    }
    reader.readAsDataURL(e.target.files[0]);
}