'use strict';
var imagesArray = Object.keys(images);
var ImageLength = imagesArray.length;

function setRandomPicture(){
	var randomImgUrl =  imagesArray[Math.floor(Math.random() * (ImageLength))];
	setPicture(randomIndex,randomImgUrl);
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
	setPicture(newIndex,newImgUrl);
}

function setPicture(imgIndex,imgName){
	document.getElementById('picture').setAttribute('dataImgIndex', imgIndex);
	document.getElementById('picture').style.backgroundImage = 'url(dist/assets/img/' + imgName + ')';
}

setRandomPicture();
document.getElementById('prev').addEventListener("click", function() {skipPicture('prev')},false); 
document.getElementById('next').addEventListener("click", function() {skipPicture('next')},false);