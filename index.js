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

document.getElementById('selectDisable').addEventListener('click', ()=>
{
	// alert("hey1");
  canvas.isDrawingMode = false;
  disableMovement = false;
});

canvas.on('mouse:down', function(o){
    if (disableMovement || selection) return;
    isDown = true;
    console.log('down')
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    var pointer = canvas.getPointer(o.e);
    rect = new fabric.Rect({
        left: origX,
        top: origY,
        originX: 'left',
        originY: 'top',
        width: pointer.x-origX,
        height: pointer.y-origY,
        angle: 0,
        fill: 'rgba(255,0,0,0.5)',
        transparentCorners: false,
        
    });
    canvas.add(rect);
});


var selection = false;
document.getElementById('cw').addEventListener('keydown', (e)=>{
	if (e.key==='Delete') deleteObjects();
  if (e.key!="s") return;
  if (!selection) {
  
  	selection = true;
    console.log(selection);
  	 canvas.isDrawingMode = false;
    disableMovement = true;
    isDown = false;
		 canvas.selection = true;
		canvas.forEachObject(function(object){ 
    	 if (object.id != 'image') { 	
       object.setCoords(); 
       object.selectable = true;
       }
       console.log(object);
        canvas  
        });
    
  } else {
  
  selection = false;
  console.log(selection);
  canvas.isDrawingMode = true;
  disableMovement = false;
   canvas.deactivateAll();
	 canvas.renderAll();
  isDown = false;
  canvas.selection = false;
	canvas.forEachObject(function(object){ 
  
       object.selectable = false; 
       console.log(object);
});
	canvas.discardActiveObject();
  canvas.requestRenderAll();
	 canvas.renderAll();
	};
 });
canvas.on('mouse:move', function(o){
     if (disableMovement) return;
    if (!isDown) return;
    var pointer = canvas.getPointer(o.e);
    
    if(origX>pointer.x){
        rect.set({ left: Math.abs(pointer.x) });
    }
    if(origY>pointer.y){
        rect.set({ top: Math.abs(pointer.y) });
    }
    
    rect.set({ width: Math.abs(origX - pointer.x) });
    rect.set({ height: Math.abs(origY - pointer.y) });
    
    rect.setCoords();
    rect.set({dirty:true});
    canvas.renderAll();
    
});

document.getElementById('cw').addEventListener('keydown', (e)=>{
		console.log(e)
});
canvas.on('mouse:up', function(o){
  isDown = false;
  canvas.isDrawingMode = false;
  
  });

function deleteObjects(){
	var activeObject = canvas.getActiveObject();
    
    if (activeObject) {
  
            canvas.remove(activeObject);
        }
   
}


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