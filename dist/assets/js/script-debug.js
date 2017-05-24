'use strict';
var imagesArray = Object.keys(images);
var ImageLength = imagesArray.length;
function setRandomPicture(){
	
	var min = 0;
	var max = ImageLength - 1;
	var randomIndex =  Math.floor(Math.random() * (max - min +1)) + min;
	var randomImgUrl =  imagesArray[randomIndex];
	document.getElementById('picture').style.backgroundImage = 'url(dist/assets/img/' + randomImgUrl + ')';
	document.getElementById('picture').setAttribute('dataImgIndex', randomIndex);
}

function skipPicture(side){
	var imgIndex =  parseInt(document.getElementById('picture').getAttribute('dataImgIndex'));
	if (side === 'prev'){
		if (imgIndex > 0){
			var newIndex = imgIndex - 1;
		}else{
			var newIndex = ImageLength;
		}
		console.log(1,side, newIndex);
	}else {
			if (imgIndex < ImageLength){
			var newIndex = imgIndex + 1;
		}else{
			var newIndex = 0;
		}
		console.log(2, side, newIndex);
	}
	var newImgUrl =  imagesArray[newIndex];
	document.getElementById('picture').setAttribute('dataImgIndex', newIndex);
	document.getElementById('picture').style.backgroundImage = 'url(dist/assets/img/' + newImgUrl + ')';
}

setRandomPicture();
document.getElementById('prev').addEventListener("click", function() {skipPicture('prev')},false); 
document.getElementById('next').addEventListener("click", function() {skipPicture('next')},false);