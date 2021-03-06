var path;
var imageObj = new Image();
imageObj.onload = function() {
        draw();
};
imageObj.crossOrigin = "Anonymous";
imageObj.src = "https://dl.dropboxusercontent.com/u/139992952/stackoverflow/colorhouse.png";
function draw(){
    var canvas = document.getElementById('myCanvas');
	canvas.width = imageObj.width;
	canvas.height = imageObj.height;
    var context = canvas.getContext('2d');
	context.drawImage(imageObj,0,0);
}
function grayScale(){
	var canvas = document.getElementById('myCanvas');
	//var img = document.getElementById("imgLoaded");
    var context = canvas.getContext('2d');
	var imgData = context.getImageData(0,0,canvas.width,canvas.height);
	var data = imgData.data;
	for(var i = 0; i < data.length; i += 4) {
          var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
          // red
          data[i] = brightness;
          // green
          data[i + 1] = brightness;
          // blue
          data[i + 2] = brightness;
        }

	// overwrite original image
	context.putImageData(imgData, 0, 0);
	
}
var video , frameCan, frameCtx;
var vidTimer, knobMid, pixData, pixels, knob = 100;
var tempImg = new Image();
tempImg.crossOrigin = "Anonymous";
function init()
{
	video = document.getElementById("videoPlayer");
	frameCan= document.getElementById("frame");
	frameCan.width = 600;
	frameCan.height =400;
	frameCtx = frameCan.getContext('2d');
	video.addEventListener("play",vidSet(),false); 
	//video.addEventListener("ended",vidEnd(),false); 
	knobMid = knob.offsetWidth / 2;
    showVid();
	
}
function vidSet()
{
	clearTimeout(vidTimer);
    vidTimer = setTimeout(showVid, 25);
	
}
function showVid()
{
	imageObj = video;
	//console.log(imageObj);
	
	frameCtx.drawImage(video, 0, 0);
	processImage();
	if (!document.querySelector("video").paused)
	// Repeat 40 times a second to oversample 30 fps video
		vidTimer = setTimeout(showVid, 25);
}
 function processImage() {
	// get pixel data for entire canvas
	pixels = frameCtx.getImageData(0, 0, frameCan.width, frameCan.height);
	pixData = pixels.data;
	// set alpha value using slider
	var alphaVal =10;
	// for each pixel
	for (i = 0; i < frameCan.width * frameCan.height; i++) {
		// get combined rgb value to determine brightness
		var rgbVal = pixData[i*4] + pixData[i*4 + 1] + pixData[i*4 + 2];
		// set alpha value for dark pixels to knob value
		if (rgbVal < 150)
			pixData[i*4 + 3] = alphaVal;
	}
	 // put modified data back into image object
	 pixels.data = pixData;
	 // blit modified image object to screen
	 frameCtx.putImageData(pixels, 0, 0);
}

 
