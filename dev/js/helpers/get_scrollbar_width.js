window.cust = window.cust ? window.cust : {};
window.cust.getScrollBarWidth = function () {
	var inner = document.createElement('p');
	inner.style.height = "200px";
	inner.style.width = "100%";
	var outer = document.createElement('div');
	outer.style.visibility = "hidden";
	outer.style.position = "absolute";
	outer.style.overflow = "hidden";
	outer.style.height = "150px";
	outer.style.width = "200px";
	outer.style.left = "0px";
	outer.style.top = "0px";
	outer.appendChild (inner);
	document.body.appendChild (outer);
	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	var w2 = inner.offsetWidth;
	if (w1 == w2) w2 = outer.clientWidth;
	document.body.removeChild (outer);
	window.cust.scrollBarWidth = w1 - w2;
	return window.cust.scrollBarWidth;
};
window.cust.is_scroll = function(){
	return $(document).height() > $(window).height();
};

window.cust.getScrollBarWidth();