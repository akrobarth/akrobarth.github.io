'use strict';
var imagesArray = Object.keys(images);
var ImageLength = imagesArray.length -1;

function setRandomPicture(){
	var randomIndex = Math.floor(Math.random() * (ImageLength));
	var randomImgUrl =  imagesArray[randomIndex];
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
	}else {
		if (imgIndex < ImageLength){
			var newIndex = imgIndex + 1;
		}else{
			var newIndex = 0;
		}
	}
	var newImgUrl =  imagesArray[newIndex];
	setPicture(newIndex,newImgUrl);
}

function setPicture(imgIndex,imgName){
	console.log(imgIndex,imgName);
	document.getElementById('picture').setAttribute('dataImgIndex', imgIndex);
	document.getElementById('picture').style.backgroundImage = 'url(dist/assets/img/' + imgName + ')';
}

setRandomPicture();
document.getElementById('prev').addEventListener("click", function() {skipPicture('prev')},false); 
document.getElementById('next').addEventListener("click", function() {skipPicture('next')},false);