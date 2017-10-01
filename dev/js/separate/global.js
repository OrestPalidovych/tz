var $window = $(window);
window.cust = window.cust ? window.cust : {};

window.cust.gW = $window.outerWidth(true);
window.cust.gIw = $window.innerWidth();
$window.on('resize', function(){
    window.cust.gW = $window.outerWidth(true);
    window.cust.gIw = $window.innerWidth();
})

window.cust.gH = $window.outerHeight(true);
window.cust.gIh = $window.innerHeight();
$window.on('resize', function(){
    window.cust.gH = $window.outerHeight(true);
    window.cust.gIh = $window.innerHeight();
    // console.log(window.cust.gIh)
});
