var _JE_Mobile = (function() {
	var _JE_Mobile = {};
	
	var imgDiameter 	= 0,
		viewportWidth	= 0;
	var IMG_RATIO_TO_VP = 0.8;
	
	//private functions
	function calCircleImgSize() {
		imgDiameter 	= parseInt(_JE.getElementSize('about').height) * IMG_RATIO_TO_VP;
	}
	
	function setImgSize(classname) {
		calCircleImgSize();
		var aImg = _JE.getElByClass(classname);
		for(var i = 0; i < aImg.length; i ++) {
			_JE.setCSSStyle(aImg[i], {
				width	: imgDiameter + 'px',
				height	: imgDiameter + 'px'
			});
		}
	}
	
	function putImgCenter(classname) {
		var marginL		= -1 * (imgDiameter / 2) + 'px';
		var marginT		= marginL;
		var aImg = _JE.getElByClass(classname);
		
		for(var i = 0; i < aImg.length; i ++) {
			_JE.setCSSStyle(aImg[i], {
				left			: '50%',
				top				: '50%',
				'margin-left'	: marginL,
				'margin-top'	: marginT
			});
		}
	}
	
	function doImgSetting(classname) {
		setImgSize(classname);
		putImgCenter(classname);
	}
	
	function setVideoFramesCenter(classname) {
		setViewportWidth();
		var aFrame = _JE.getElByClass(classname);
		console.log(setViewportWidth());
	}
	
	function setViewportWidth() {
		return viewportWidth = _JE.getViewport();
	}
	
	//public functions
	_JE_Mobile.init = function() {
		doImgSetting('aboutImg');
		setVideoFramesCenter('jamjar');
	};
	
	_JE_Mobile.orientChangeInit = function() {
		setVideoFramesCenter();
	};
	
	return _JE_Mobile;
}());

window.addEventListener('load', function() {
	_JE_Mobile.init();
}, false);

window.addEventListener('orientationchange', function() {
	_JE_Mobile.orientChangeInit();
}, false);