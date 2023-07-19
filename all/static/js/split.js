/**
 * name:   split.js
 * author:  biaochen
 * date:    2018-12-26
 *
 */
$(function() {
	//鼠标横向、竖向、和改变父高度的上下 操作对象
	var thisTransverseObject, thisVerticalObject, thisArrowObject;
	//文档对象
	var doc = document;
	//横向分割栏
	var transverseLabels = $(".hj-wrap").find(".hj-transverse-split-label");
	//竖向分割栏
	var verticalLabels = $(".hj-wrap").find(".hj-vertical-split-label");

	var transverseDivs = $(".hj-transverse-split-div");
	$(transverseDivs[0]).css({
		width: '70%'
	});
	$(transverseDivs[1]).css({
		width: '30%'
	});
	// 设置宽
	function setWidth(type) {
		if (type === "init") {
			var length = $(".hj-wrap").length;

		} else {
			// 设置百分比
			var transverseDivs = $(".hj-transverse-split-div");
			var width01 = $(transverseDivs[0]).width();
			var parentWidth01 = $(transverseDivs[0])
				.parent()
				.width();
			var rate01 = (width01 / parentWidth01) * 100 + "%";
			$(transverseDivs[0]).css({
				width: rate01
			});
			var rate02 = (1-(width01 / parentWidth01)) * 100 + "%";
			$(transverseDivs[1]).css({
				width: rate02
			});
		}
	}

	// 设置高
	function setHeight(type) {
		if (type === "init") {
			var verticalsParentDivs = $(".verticals");
			var parentLengths = verticalsParentDivs.length;
			for (var i = 0; i < parentLengths; i++) {
				var parentHeight = $(verticalsParentDivs[i]).height();
				var childrenNum = $(verticalsParentDivs[i]).children(
					".hj-vertical-split-div"
				).length;
				var defaultHeight = Math.floor(parentHeight / childrenNum);
				// var rate = Math.floor((height / parentHeight)* 100)  + '%'
				var defaultHeight = Math.floor(100 / childrenNum);
				$(verticalsParentDivs[i])
					.children(".hj-vertical-split-div")
					.height(defaultHeight + "%");
				// .height(defaultHeight + "px");
			}
		} else {
			// 设置百分比
			var verticalsDivs = $(".hj-vertical-split-div");
			var heightLength = verticalsDivs.length;
			for (var i = 0; i < heightLength; i++) {
				var height = $(verticalsDivs[i]).height();
				var parentHeight = $(verticalsDivs[i])
					.parent()
					.height();
				var rate = (height / parentHeight) * 100 + "%";
				$(verticalsDivs[i]).css({
					height: rate
				});
			}
		}
	}

	setWidth('init')
	setHeight("init");
	//var transverseDivs = $(".hj-transverse-split-div");
	//$(transverseDivs[0]).css({ width: 75% });
	//定义一个对象
	function PointerObject() {
		this.el = null; //当前鼠标选择的对象
		this.clickX = 0; //鼠标横向初始位置
		this.clickY = 0; //鼠标竖向初始位置
		this.transverseDragging = false; //判断鼠标可否横向拖动
		this.verticalDragging = false; //判断鼠标可否竖向拖动
	}
	//横向分隔栏绑定事件
	transverseLabels.bind("mousedown", function(e) {
		thisTransverseObject = new PointerObject();
		thisTransverseObject.transverseDragging = true; //鼠标可横向拖动
		thisTransverseObject.el = this;
		thisTransverseObject.clickX = e.pageX; //记录鼠标横向初始位置
	});

	//竖向分隔栏绑定事件
	verticalLabels.bind("mousedown", function(e) {
		//console.log("mousedown");
		thisVerticalObject = new PointerObject();
		thisVerticalObject.verticalDragging = true; //鼠标可竖向拖动
		thisVerticalObject.el = this;
		thisVerticalObject.clickY = e.pageY; //记录鼠标竖向初始位置
	});

	doc.onmousemove = function(e) {
		//鼠标横向拖动
		if (thisTransverseObject != null) {
			if (thisTransverseObject.transverseDragging) {
				var changeDistance = 0;
				if (thisTransverseObject.clickX >= e.pageX) {
					//鼠标向左移动
					changeDistance =
						Number(thisTransverseObject.clickX) - Number(e.pageX);
					if (
						$(thisTransverseObject.el)
						.parent()
						.width() -
						changeDistance <
						20
					) {} else {
						$(thisTransverseObject.el)
							.parent()
							.width(
								$(thisTransverseObject.el)
								.parent()
								.width() - changeDistance
							);
						$(thisTransverseObject.el)
							.parent()
							.next()
							.width(
								$(thisTransverseObject.el)
								.parent()
								.next()
								.width() + changeDistance
							);
						thisTransverseObject.clickX = e.pageX;
						$(thisTransverseObject.el).offset({
							left: e.pageX
						});
					}
				} else {
					//鼠标向右移动
					changeDistance =
						Number(e.pageX) - Number(thisTransverseObject.clickX);
					if (
						$(thisTransverseObject.el)
						.parent()
						.next()
						.width() -
						changeDistance <
						20
					) {} else {
						$(thisTransverseObject.el)
							.parent()
							.width(
								$(thisTransverseObject.el)
								.parent()
								.width() + changeDistance
							);
						$(thisTransverseObject.el)
							.parent()
							.next()
							.width(
								$(thisTransverseObject.el)
								.parent()
								.next()
								.width() - changeDistance
							);
						thisTransverseObject.clickX = e.pageX;
						$(thisTransverseObject.el).offset({
							left: e.pageX
						});
					}
				}
				$(thisTransverseObject.el).width(2);
			}
		}
		//鼠标竖向拖动
		if (thisVerticalObject != null) {
			if (thisVerticalObject.verticalDragging) {
				var changeDistance = 0;
				if (thisVerticalObject.clickY >= e.pageY) {
					//鼠标向上移动
					changeDistance = Number(thisVerticalObject.clickY) - Number(e.pageY);
					if (
						$(thisVerticalObject.el)
						.parent()
						.height() -
						changeDistance <
						20
					) {} else {
						$(thisVerticalObject.el)
							.parent()
							.height(
								$(thisVerticalObject.el)
								.parent()
								.height() - changeDistance
							);
						$(thisVerticalObject.el)
							.parent()
							.next()
							.height(
								$(thisVerticalObject.el)
								.parent()
								.next()
								.height() + changeDistance
							);
						thisVerticalObject.clickY = e.pageY;
						$(thisVerticalObject.el).offset({
							top: e.pageY
						});
					}
				} else {
					//鼠标向下移动
					changeDistance = Number(e.pageY) - Number(thisVerticalObject.clickY);
					if (
						$(thisVerticalObject.el)
						.parent()
						.next()
						.height() -
						changeDistance <
						20
					) {} else {
						$(thisVerticalObject.el)
							.parent()
							.height(
								$(thisVerticalObject.el)
								.parent()
								.height() + changeDistance
							);
						$(thisVerticalObject.el)
							.parent()
							.next()
							.height(
								$(thisVerticalObject.el)
								.parent()
								.next()
								.height() - changeDistance
							);
						thisVerticalObject.clickY = e.pageY;
						$(thisVerticalObject.el).offset({
							top: e.pageY
						});
					}
				}
				$(thisVerticalObject.el).height(2);
			}
		}
	};

	$(doc).mouseup(function(e) {
		setHeight("setHeight");
		setWidth("setWidth");
		// 鼠标弹起时设置不能拖动
		if (thisTransverseObject != null) {
			thisTransverseObject.transverseDragging = false;
			thisTransverseObject = null;
		}
		if (thisVerticalObject != null) {
			thisVerticalObject.verticalDragging = false;
			thisVerticalObject = null;
		}
		e.cancelBubble = true;
	});
});
