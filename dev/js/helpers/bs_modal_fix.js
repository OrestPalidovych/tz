window.cust = window.cust ? window.cust : {};
var $body = $('body'),
	$header = $('.header'),
	$footer = $('.page__footer'),
	$html = $('html');
$('.modal').on('show.bs.modal', function () {
	$body.addClass('modal-open');
	if( window.cust.is_scroll() ) {
		if (!$html.hasClass('msie10') && !$html.hasClass('msie11') && !$html.hasClass('ie10') && !$html.hasClass('ie11') ) {
			$body.css('padding-right', window.cust.scrollBarWidth);
			$body.find('.mn-header__bottom_stick').css('padding-right', window.cust.scrollBarWidth);
			if (window.cust.breakPoint != 'sm' && window.cust.breakPoint != 'xs' && window.cust.breakPoint != 'xx') {
				$footer.css('padding-right', window.cust.scrollBarWidth);
			};
		};
	};
	window.cust.modal_show_process = true;
	$('.modal').not($(this)).modal('hide');
});
$('.modal').on('shown.bs.modal', function () {
	window.cust.modal_show_process = false;
});
$('.modal').on('hidden.bs.modal', function () {
	if ( !window.cust.modal_show_process ) {
		$body.removeClass('modal-open');
		if (!$body.hasClass('menu-open')) {
			$body.css('padding-right', 'inherit');
			$body.find('.mn-header__bottom_stick').css('padding-right', 'inherit');
			$footer.css('padding-right', 'inherit');
		};
	};
});