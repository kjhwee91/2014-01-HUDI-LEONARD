oTouch = {
	nIndex : 0
};

_JE = {
	getViewport : function() {
		if (typeof window.innerWidth != 'undefined')
			var viewPortWidth = window.innerWidth;
		return viewPortWidth;
	},
	getSpecificProperty : function(ele, property) {
		return window.getComputedStyle(ele).getPropertyValue(property);
	},
	getElBySel : function(selector) {
		return document.querySelector(selector);
	},
	getElBySelWithParent : function(selector, parent) {
		var parent = document.querySelector(parent);
		return parent.querySelectorAll(selector);
	},
	getElByClass : function(name) {
		return document.getElementsByClassName(name);
	},
	getElById : function(name) {
		return document.getElementById(name);
	},
	toggleContents : function(e) {
		var tar = e.target;
		var wrapper = tar.parentNode.parentNode.children[1];
		var display = _JE.getSpecificProperty(wrapper, "display");
		wrapper.style.display = (display === 'none') ? 'block' : 'none';
	},
	setCSSStyle : function(element, propertyObject) {
		for(var property in propertyObject) {
			element.style[property]= propertyObject[property];
		}
	}
}

var S_DATA = {
		WEINRE_TEST_SERVER 	: "192.168.0.163",
		WEINRE_PORT 		: "9999",
		RIGHT_CARD_LEFT_VAL : 100,
		IMG_VIEWPORT_RATIO_PORTRAIT	: 0.6,
		IMG_VIEWPORT_RATIO_LANDSCAPE : 0.8
}

function handleTouchstart(e) {
	oTouch.touchstartX = e.touches[0].clientX;
	oTouch.touchstartY = e.touches[0].clientY;
}

function handleTouchmove(e) {
	var touch = e.touches[0];
	var touchX= touch.clientX;
	oTouch.nValue = touchX - oTouch.touchstartX;
	oTouch.sDirection = getDirection(oTouch.nValue);
	if(isInvalidFlicking()) 
		return false;
	else
		flickPage('.container');
}

function isInvalidFlicking() {
	if(isLeftInvalid() || isRightInvalid())
		return true;
	return false;

	function isLeftInvalid() {
		if(oTouch.nIndex <= 0 && oTouch.sDirection === "left")
			return true;
		return false;
	}

	function isRightInvalid() {
		if(oTouch.nIndex >= S_DATA.LAST_CARD_IDX && oTouch.sDirection === "right")
			return true;
		return false;
	}
}

function getDirection(value) {
	if(value > 0)
		return S_DATA.LEFT;
	else 
		return S_DATA.RIGHT;
}

function flickPage(sel) {
	var container = _JE.getElBySel(sel);
	container.style.webkitTransform = "translate(" + oTouch.nValue + "px)";
}

function handleTouchend(e) {
	var touch = e.changedTouches[0];
	oTouch.touchX = touch.clientX;
	oTouch.touchY = touch.clientY;

	var nTmpIndex = oTouch.nIndex;
	var container = _JE.getElBySel(".container");
	
	if(isToRight()) 
		oTouch.nIndex++;
	else 
		oTouch.nIndex--;

	if(isIndexInRange()) {
		setPositionWithClassName('about');
		setTranslateZero(container);
	}
	else
		oTouch.nIndex = nTmpIndex;
}

function isIndexInRange() {
	if(oTouch.nIndex >= 0 && oTouch.nIndex <= S_DATA.LAST_CARD_IDX)
		return true;
	return false;
}

function setTranslateZero(container) {
	container.style.webkitTransform = "translate(0)";
}

function isToRight() {
	if(oTouch.touchstartX - oTouch.touchX > 0)
		return true;
	return false;
}

function setPositionWithClassName(classname) {
	var nCenterIndex = oTouch.nIndex % S_DATA.NUM_CARDS;
	var nRightIndex = nCenterIndex + 1;
	var nLeftIndex = nCenterIndex - 1;
	var aChildNodes = _JE.getElByClass(classname);

	if(nLeftIndex < 0) {
		nLeftIndex = S_DATA.LAST_CARD_IDX;
	}
	if (nRightIndex > S_DATA.LAST_CARD_IDX) {
		nRightIndex = 0;
	}

	var left = S_DATA.RIGHT_CARD_LEFT_VAL + "%";
	console.log(left);
	aChildNodes[nLeftIndex].style.left = S_DATA.RIGHT_CARD_LEFT_VAL + "%";
	aChildNodes[nCenterIndex].style.left = "0%";
	aChildNodes[nRightIndex].style.left = "100%";
}

function getDirection() {
	return direction = (oTouch.touchendX - oTouch.touchstartX) > 0 ? S_DATA.LEFT : S_DATA.RIGHT;
}

function alignJarFramesWithClassName(classname) {
	var viewPortWidth = _JE.getViewport();
	var aFrames = _JE.getElByClass(classname);
	var frameWidth = aFrames[0].offsetWidth;
	var margin = (viewPortWidth - frameWidth) / 2;

	for(var i = 0; i < aFrames.length; i ++) {
		aFrames[i].style.marginLeft = margin + 'px';
		aFrames[i].style.marginRight = margin + 'px';
	}

	var eleWrapper = _JE.getElById('jar-wrapper');
}

function adjustCardFrameWidth(card, container) {
	var viewPortWidth = _JE.getViewport();
	var aFrames = _JE.getElByClass(card);
	var eleContainer = _JE.getElBySel(container);
	var numOfPanels = aFrames.length;
	for(var i = 0; i < aFrames.length; i ++) 
		aFrames[i].style.width = viewPortWidth + 'px';
	
	eleContainer.style.width = (viewPortWidth * numOfPanels) + 'px';
}

function adjustImgWidthOnPortrait(classname) {
	if(screen.height < screen.width) return;
	
	var parentHeight = getParentHeight(classname);
	var imgWidth = parseInt(parentHeight) * S_DATA.IMG_VIEWPORT_RATIO_PORTRAIT;
	var eleImg = _JE.getElByClass(classname);
    var eleImgLen = eleImg.length;

	for(var i = 0; i < eleImgLen; i ++) {
		_JE.setCSSStyle(eleImg[i], {
			width 			: imgWidth + 'px',
			height 			: imgWidth + 'px',
			left 			: '50%',
			'margin-left' 	: -1 * (imgWidth / 2) + 'px',
			top 			: '10%'
		});
		//eleImg[i].style.width = imgWidth + 'px';
		//eleImg[i].style.height = imgWidth + 'px';
		//eleImg[i].style.left = '50%';
		//eleImg[i].style.marginLeft = -1 * (imgWidth/2) + 'px';
		//eleImg[i].style.top = '10%';
	}
}

function adjustImgWidthOnLandscape(classname) {
	if(screen.height > screen.width) return;
	
	var parentHeight = getParentHeight(classname);
	var imgWidth = parseInt(parentHeight) * S_DATA.IMG_VIEWPORT_RATIO_LANDSCAPE;
	var eleImg = _JE.getElByClass(classname);
    var eleImgLen = eleImg.length;
    
	for(var i = 0; i < eleImgLen; i ++) {		
		_JE.setCSSStyle(eleImg[i], {
			width 			: imgWidth + 'px',
			height 			: imgWidth + 'px',
			top 			: '50%',
			'margin-top' 	: -1 * (imgWidth / 2) + 'px',
			left 			: '10%'
		});
//		eleImg[i].style.width = imgWidth + 'px';
//		eleImg[i].style.height = imgWidth + 'px';
//		eleImg[i].style.top = '50%';
//		eleImg[i].style.marginTop = -1 * (imgWidth/2) + 'px';
//		eleImg[i].style.left = '10%';
	}
}

function getParentHeight(classname) {
	var parent = _JE.getElByClass(classname)[0].parentNode;
	return _JE.getSpecificProperty(parent, 'height');
}

function addScriptForWeinre() {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.src = getScriptSrc();
	head.appendChild(script);
}

function getScriptSrc() {
	return "http://" + S_DATA.WEINRE_TEST_SERVER + ":" + S_DATA.WEINRE_PORT + "/target/target-script-min.js#anonymous";
}

function initVariableForNumOfCard() {
	S_DATA.NUM_CARDS = _JE.getElBySelWithParent(".about", ".container").length;
	S_DATA.LAST_CARD_IDX = S_DATA.NUM_CARDS - 1;
}

function initVariables() {
	initVariableForNumOfCard();
}

function registerFlickingEvent(eleId) {
	var flickView = _JE.getElById(eleId);
	flickView.addEventListener('touchstart', handleTouchstart, false);
	flickView.addEventListener('touchmove', handleTouchmove, false);
	flickView.addEventListener('touchend', handleTouchend, false);
}

function registerToggleMenuEvent(classname) {
	var aToggler = _JE.getElByClass(classname);
	for(var i = 0; i < aToggler.length; i ++)
		aToggler[i].addEventListener('touchstart', _JE.toggleContents, false);
}

function registerEvents() {
	registerToggleMenuEvent('toggler');
	registerFlickingEvent('flickView');
}

function init() {
	adjustCardFrameWidth('about', ".container");
	adjustImgWidthOnPortrait('aboutImg');
	adjustImgWidthOnLandscape('aboutImg');
	alignJarFramesWithClassName('jamjar');
	initVariables();
}

window.addEventListener('load', function() {
	registerEvents();
	init();
	//addScriptForWeinre();
}, false);

window.addEventListener('orientationchange', function() {
	alignJarFramesWithClassName('jamjar');
	adjustCardFrameWidth('about', ".container");
	
	adjustImgWidthOnPortrait('aboutImg');
	adjustImgWidthOnLandscape('aboutImg');
}, false);

window.mTouch = (function() {
	var _static = {
			RIGHT_CARD_LEFT_VAL : 100
	}
})();


