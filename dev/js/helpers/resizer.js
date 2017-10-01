window.cust = window.cust ? window.cust : {};
window.cust.breakPoint = false;
window.cust.bp_XX = 480;
window.cust.bp_XS = 768;
window.cust.bp_SM = 992;
window.cust.bp_MD = 1200;
var body = $('body');

$(window).on('load', function(){window.cust.resizer();});
$(window).on('resize', function(){window.cust.resizer();});

window.cust.resizer = function(){
	var ww = window.innerWidth;
	// var ww = body.outerWidth();
	if (ww < window.cust.bp_XX) {windowXX();};
	if (ww >= window.cust.bp_XX && ww < window.cust.bp_XS) {windowXS();};
	if (ww >= window.cust.bp_XS && ww < window.cust.bp_SM) {windowSM();};
	if (ww >= window.cust.bp_SM && ww < window.cust.bp_MD) {windowMD();};
	if (ww >= window.cust.bp_MD) {windowLG();};
};

function windowXX(){
	if (window.cust.breakPoint != 'xx') {
		window.cust.breakPoint = 'xx';
		body.trigger('resize_xx_once');
	};
	body.trigger('resize_xx');
};

function windowXS(){
	if (window.cust.breakPoint != 'xs') {
		window.cust.breakPoint = 'xs';
		body.trigger('resize_xs_once');
	};
	body.trigger('resize_xs');
};

function windowSM(){
	if (window.cust.breakPoint != 'sm') {
		window.cust.breakPoint = 'sm';
		body.trigger('resize_sm_once');
	};
	body.trigger('resize_sm');
};

function windowMD(){
	if (window.cust.breakPoint != 'md') {
		window.cust.breakPoint = 'md';
		body.trigger('resize_md_once');
	};
	body.trigger('resize_md');
};

function windowLG(){
	if (window.cust.breakPoint != 'lg') {
		window.cust.breakPoint = 'lg';
		body.trigger('resize_lg_once');
	};
	body.trigger('resize_lg');
};
window.cust.resizer();