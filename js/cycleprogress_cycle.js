

var circles = [];
var width = 0,
	radius = 0;

//window.innerWidt; 才是与CSS 响应 布局所参考的宽度。
function size() {
	var windowWidth = window.innerWidth;
	if(windowWidth > 440) {
		width = 10;
		radius = 60;
	} else {
		width = 8;
		radius = 50;
	}
}

(function() {

	var canvas = document.getElementById('w3-icon-grid1'),
		circlesCreated = false;

	function onScroll() {
		if(!circlesCreated && elementInViewport(canvas)) {
			circlesCreated = true;
			createCircles();
		}
	}

	function elementInViewport(el) {
		var rect = el.getBoundingClientRect();
		return(
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.top <= (window.innerHeight || document.documentElement.clientHeight)
		);
	}

	function createCircle(id, value, radius, width, color) {
		circle = Circles.create({
			id: id,
			value: value,
			radius: radius,
			width: width,
			colors: color,
			text: function() {
				return value + '%';
			}
		});
	}

	function createCircles() {

		size();
		var colors = [
			['#D3B6C6', '#4B253A'],
			['#FCE6A4', '#EFB917'],
			['#BEE3F7', '#45AEEA'],
			['#D3B6C6', '#4B253A'],
			['#FCE6A4', '#EFB917'],
			['#BEE3F7', '#45AEEA']
		];
		var ids = new Array('indicatorContainerHTML',
			'indicatorContainerCSS',
			'indicatorContainerJS',
			'indicatorContainerJquery',
			'indicatorContainerBootstrap',
			'indicatorContainerUIdesgin');
		var values = [90, 80, 50, 50, 55, 30];
		for(var i = 0; i < 6; i++) {
			createCircle(ids[i], values[i], radius, width, colors[i]);
			circles.push(circle);
		}
	}
	window.onscroll = onScroll;
})();

window.onload = function() {
	//	alert(window.innerWidth);
	function upatecycle(radius, width) {
		for(var i = 0; i < 6; i++) {
			circles[i].updateRadius(radius);
			circles[i].updateWidth(width);
		};
	}
	window.onresize = function() {

		size();
		upatecycle(radius, width);
	}
}