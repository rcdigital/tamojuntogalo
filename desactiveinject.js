(function(){

var elements = document.getElementsByTagName('*');

function getStyle(el, styleProp) {
	return window.getComputedStyle(el, null).getPropertyValue(styleProp);
}

var TAG_NAMES = {
	IMG: true,
	OBJECT: true,
	EMBED: true
};

window.clearInterval(window.tamoJuntoGaloIntervalId);
window.tamoJuntoGaloActive = false;

for ( var i in elements ) {
	if ( elements[i].nodeName in TAG_NAMES ) {
		elements[i].style.webkitFilter=null;
		continue;
	}
	if ( elements[i].nodeName === 'HTML' ) {
		if ( getStyle(document.body, 'background-image' ) != 'none') {
			elements[i].style.webkitFilter=null;
			continue;
		}
	}
	if ( elements[i] && elements[i].style ){
		if ( getStyle(elements[i], 'background-image') != 'none') {
			elements[i].style.webkitFilter=null;
			continue;
		}
		if ( elements[i].dataset.colorvalue ) {
			elements[i].style.setProperty('color', elements[i].dataset.colorvalue, 'important');
			elements[i].removeAttribute('data-colorvalue');
		}
		if ( elements[i].dataset.backgroundcolor ) {
			elements[i].style.setProperty('background-color', elements[i].dataset.backgroundcolor);
			elements[i].removeAttribute('data-backgroundcolor');
		}
		if ( elements[i].dataset.bordercolor ) {
			elements[i].style.setProperty('border-color', elements[i].dataset.bordercolor);
			elements[i].removeAttribute('data-bordercolor');
		}
	}
}

if (document.getElementById('tamojuntogalo')) {
	document.getElementById('tamojuntogalo').style.display='none';
}

})();
