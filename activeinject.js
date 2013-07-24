(function(){

function getStyle(el, styleProp) {
	return window.getComputedStyle(el, null).getPropertyValue(styleProp);
}

function grayscaleColors(color) {
	var colorValues = color.split(',');
	var r = parseInt(colorValues[0].split('rgb(')[1], 10);
	var g = parseInt(colorValues[1], 10);
	var b = parseInt(colorValues[2].split(')')[0], 10);
	var total = Math.floor( (r + g + b)/3 );
	return 'rgb('+ total +', '+ total +', '+ total +')';
}

function isGrayScale(color, foo){
	var colorValues = color.split(',');
	var r = parseInt(colorValues[0].split('rgb(')[1], 10);
	var g = parseInt(colorValues[1], 10);
	var b = parseInt(colorValues[2].split(')')[0], 10);
	return r == g && g == b;
}

var TAG_NAMES = {
	IMG: true,
	OBJECT: true,
	EMBED: true
};

window.tamoJuntoGaloIntervalId = window.setInterval(applyTags, 10000);
window.tamoJuntoGaloActive = true;

function applyTags(){
	if (!window.tamoJuntoGaloActive) {
		window.clearInterval(window.tamoJuntoGaloIntervalId);
		return;
	}
	var elements = document.getElementsByTagName('*');
	for ( var i in elements ) {
		if ( elements[i].nodeName === 'HTML' ) {
			if ( getStyle(document.body, 'background-image' ) != 'none') {
				elements[i].style.webkitFilter='grayscale(100%)';
				continue;
			}
		}
		if ( elements[i].nodeName in TAG_NAMES ) {
			elements[i].style.webkitFilter='grayscale(100%)';
			continue;
		}
		if ( elements[i] && elements[i].style ){
			if ( getStyle(elements[i], 'background-image' ) != 'none') {
				elements[i].style.webkitFilter='grayscale(100%)';
				continue;
			}
			if ( getStyle(elements[i], 'color') != 'rgb(0, 0, 0)' &&
					!isGrayScale(getStyle(elements[i], 'color')) &&
					!elements[i].dataset.colorvalue) {
				elements[i].setAttribute('data-colorvalue', getStyle(elements[i], 'color'));
				elements[i].style.setProperty( 'color', grayscaleColors( getStyle(elements[i], 'color') ), 'important');
			}
			if ( getStyle(elements[i], 'background-color') != 'rgba(0, 0, 0, 0)' &&
					!elements[i].dataset.backgroundcolor) {
				elements[i].setAttribute('data-backgroundcolor', getStyle(elements[i], 'background-color'));
				elements[i].style.setProperty( 'background-color', grayscaleColors( getStyle(elements[i], 'background-color') ) );
			}
			if ( getStyle(elements[i], 'border-color') != 'rgb(0, 0, 0)' &&
					!elements[i].dataset.bordercolor) {
				elements[i].setAttribute('data-bordercolor', getStyle(elements[i], 'border-color'));
				elements[i].style.setProperty( 'border-color', grayscaleColors( getStyle(elements[i], 'border-color') ) );
			}
		}
	}
}

applyTags();

if (document.getElementById('tamojuntogalo')) {
	document.getElementById('tamojuntogalo').style.display='block';
} else {
	document.body.innerHTML += '<a id=\"tamojuntogalo\" href=\"#\" style=\"position:fixed;top:0;left:0;z-index:9999999\"><img src=\"' + chrome.extension.getURL('badge_browser.png') + '\"alt=\"#tamojuntogalo\"/></a>';
}

})();
