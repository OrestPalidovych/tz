window.cust = window.cust ? window.cust : {};
window.cust.showBlock = function(button, block) {
	block.removeClass('minimized');
	if(button) {
		button.addClass('active');
	};
	block.trigger('showBlock');
};
window.cust.hideBlock = function(button, block) {
	block.addClass('minimized');
	if(button) {
		button.removeClass('active');
	};
	block.trigger('hideBlock');
};
window.cust.toggleBlock = function(button, block) {
	block.toggleClass('minimized');

	if (block.hasClass('minimized')) {
		if(button) {
			button.removeClass('active');
		};
		block.trigger('hideBlock');
	} else {
		if(button) {
			button.addClass('active');
		};
		block.trigger('showBlock');
	};
};

// show/hide/toggle blocks
$('.button-toggle').on('click', function(e) {
	var button = $(this),
		block = $(button.attr('data-target-block'));

	window.cust.toggleBlock(button, block);
	e.preventDefault();
});
$('.button-show').on('click', function(e) {
	var button = $(this),
		block = $(button.attr('data-target-block'));

	window.cust.showBlock(button, block);
	e.preventDefault();
});
$('.button-hide').on('click', function(e) {
	var button = $(this),
		block = $(button.attr('data-target-block'));

	window.cust.hideBlock(button, block);
	e.preventDefault();
});