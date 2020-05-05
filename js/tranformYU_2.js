function YUthreeD(container, threetranformobject, stylefoucs, styleout) {

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
		mousePosY = 0,
		PosX = 0,
		PosY = 0;

	//  获取中间元素在文档中的中点坐标
	var divX = getElementLeft(threetranformobject) + threetranformobject.clientWidth / 2,
		divY = getElementTop(threetranformobject) + threetranformobject.clientHeight / 2;

	function getElementLeft(element) {　　　　
		var actualLeft = element.offsetLeft;　　　　
		var current = element.offsetParent;
		while(current !== null) {　　　　　　
			actualLeft += current.offsetLeft;　　　　　　
			current = current.offsetParent;　　　　
		}
		return actualLeft;　　
	}

	function getElementTop(element) {　　　　
		var actualTop = element.offsetTop;　　　　
		var current = element.offsetParent;
		while(current !== null) {　　　　　　
			actualTop += current.offsetTop;　　　　　　
			current = current.offsetParent;　　　　
		}
		return actualTop;　　
	}
	var disleft = divX - getElementLeft(container),
		disright = container.clientWidth - disleft, //左侧距离
		distop = divY + getElementTop(container), //距离顶部
		disbottom = container.clientHeight - distop; //距离dibu;
	//alert("左" + disleft + "右" + disright + "上" + distop + "下" + disbottom);

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

		PosX = divX - mousePosX;
		PosY = divY - mousePosY;

		//		alert("鼠标距离div中心上Y"+PosY+"鼠标距离div中心左"+PosX); 

		//---------------------计算旋转 角度----------
		var totatey = -PosX / (container.clientWidth),
			totatex = PosY / (container.clientHeight);
		if(PosX >= 0) {
			totatey = totatey / disleft;
		} else {
			totatey = totatey / disright;
		};
		if(PosY >= 0) {
			totatex = totatex / distop;
		} else {
			totatex = totatex / disbottom;
		};
		totatey = totatey * 10000;
		totatex = totatex * 10000;
		//		console.log("x轴旋转"+totatex + "y轴旋转" + totatey);
		//		alert("在div上:" + PosY + ",在div右:" + PosX);
		changestyletramform(threetranformobject, 0.1, totatex, totatey, 0, 0, 0, 50);

	}

	container.onmousemove = mouseMove;

	container.onmouseover = function() {
		//遍历一个JSON
		for(var p in stylefoucs) {
			//参考circle.js写出
			threetranformobject.style[p] = stylefoucs[p];
		};
	}

	container.onmouseout = function() {
		changestyletramform(threetranformobject, 0, 0, 0, 0, 0, 0, 0);
		for(var p in styleout) {
			threetranformobject.style[p] = styleout[p];
		};
	}
}