function YUthreeD(container, tranformObjectlist, stylefoucs, styleout) {

	function changestyletramform(div, time, rotatex, rotatey, rotatez, translatex, translatey, translatez) {
		//传入的参数里面确保设置了这个属性，也可以在这里开启
		//div.style.transformStyle = "preserve-3d";
		//旋转
		div.style.transform = "rotateX(" + rotatex + "deg)";
		div.style.transform += "rotateY(" + rotatey + "deg)";
		div.style.transform += "rotateZ(" + rotatez + "deg)";

		//平移
		div.style.transform += "translateX(" + translatex + "px)";
		div.style.transform += "translateY(" + translatey + "px)";
		div.style.transform += "translateZ(" + translatez + "px)";

		//时间
		div.style.transform += time + "s";

	}

	//--------------------------------------------------------------------------------

	//得到鼠标、div位置，计算偏移量

	var mousePosX = 0,
		mousePosY = 0;
	var PosXlist = new Array(tranformObjectlist.length),
		PosYlist = new Array(tranformObjectlist.length);
	var divXlist = new Array(tranformObjectlist.length),
		divYlist = new Array(tranformObjectlist.length);

	//  获取中间元素在文档中的中点坐标
	for(var i = 0; i < tranformObjectlist.length; i++) {
		//		console.log(tranformObjectlist[i]);
		divXlist[i] = getElementLeft(tranformObjectlist[i]) + tranformObjectlist[i].clientWidth / 2;
		divYlist[i] = getElementTop(tranformObjectlist[i]) + tranformObjectlist[i].clientHeight / 2;
	};

	function getElementLeft(elementdiv) {　　　　
		var actualLeft = elementdiv.offsetLeft;　　　　
		var current = elementdiv.offsetParent;
		while(current !== null) {　　　　　　
			actualLeft += current.offsetLeft;　　　　　　
			current = current.offsetParent;　　　　
		}
		return actualLeft;　　
	}

	function getElementTop(elementdiv) {　　　　
		var actualTop = elementdiv.offsetTop;　　　　
		var current = elementdiv.offsetParent;
		while(current !== null) {　　　　　　
			actualTop += current.offsetTop;　　　　　　
			current = current.offsetParent;　　　　
		}
		return actualTop;　　
	}
	var disleftlist = new Array(tranformObjectlist.length),
		disrightlist = new Array(tranformObjectlist.length),
		distoplist = new Array(tranformObjectlist.length),
		disbottomlist = new Array(tranformObjectlist.length);

	for(var i = 0; i < tranformObjectlist.length; i++) {
		disleftlist[i] = divXlist[i] - getElementLeft(container);
		disrightlist[i] = container.clientWidth - disleftlist[i]; //左侧距离
		distoplist[i] = divYlist[i] + getElementTop(container); //距离顶部
		disbottomlist[i] = container.clientHeight - distoplist[i]; //距离
	};

	//-------------------------鼠标事件响应----------------------------------------------
	function mouseCoords(ev) {
		if(ev.pageX || ev.pageY) {
			return {
				x: ev.pageX,
				y: ev.pageY
			};
		}
		return {
			x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
			y: ev.clientY + document.body.scrollTop - document.body.clientTop
		};
	}

	function mouseMove(ev) {
		//-------------获取鼠标性对于文档的定位-------
		ev = ev || window.event;
		var mousePos = mouseCoords(ev);
		//鼠标距离窗口顶部
		mousePosX = mousePos.x;
		//鼠标距离窗口左侧
		mousePosY = mousePos.y;
		//		alert("鼠标距离窗口顶部" + mousePosY + "鼠标距离窗口左侧" + mousePosX);

		for(var i = 0; i < tranformObjectlist.length; i++) {
			PosXlist[i] = divXlist[i] - mousePosX;
			PosYlist[i] = divYlist[i] - mousePosY;
		};

		//alert("鼠标距离div中心上Y"+PosY+"鼠标距离div中心左"+PosX); 

		//---------------------计算旋转 角度----------

		var totateylist = new Array(tranformObjectlist.length),
			totatexlist = new Array(tranformObjectlist.length);
		for(var i = 0; i < tranformObjectlist.length; i++) {
			totateylist[i] = -PosXlist[i] / (container.clientWidth);
			totatexlist[i] = PosYlist[i] / (container.clientHeight);
			if(PosXlist[i] >= 0) {
				totateylist[i] = totateylist[i] / disleftlist[i];
			} else {
				totateylist[i] = totateylist[i] / disrightlist[i];
			};
			if(PosYlist[i] >= 0) {
				totatexlist[i] = totatexlist[i] / distoplist[i];
			} else {
				totatexlist[i] = totatexlist[i] / disbottomlist[i];
			};
			totateylist[i] = totateylist[i] * 10000;
			totatexlist[i] = totatexlist[i] * 10000;
		};

		for(var i = 0; i < tranformObjectlist.length; i++) {
			changestyletramform(tranformObjectlist[i], 0.1, totatexlist[i], totateylist[i], 0, 0, 0, 20);
		};

	}

	container.onmousemove = mouseMove;

	container.onmouseover = function() {
		for(var p in stylefoucs) {
			for(var i = 0; i < tranformObjectlist.length; i++) {
				tranformObjectlist[i].style[p] = stylefoucs[p];
			};

		};
	}

	container.onmouseout = function() {

		for(var i = 0; i < tranformObjectlist.length; i++) {
			changestyletramform(tranformObjectlist[i], 0, 0, 0, 0, 0, 0, 0);
		};

		for(var p in styleout) {
			for(var i = 0; i < tranformObjectlist.length; i++) {
				tranformObjectlist[i].style[p] = styleout[p];
			};

		};
	}
}