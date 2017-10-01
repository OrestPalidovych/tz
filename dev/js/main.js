var bower_path = '../../bower_components/';

requirejs.config({
    baseUrl: 's/js',  // base path with all js
    paths: {
        //alias to plugins
        domReady:            'lib/domReady',
        modernizr:           'lib/modernizr-custom',
        detectmobilebrowser: 'lib/detectmobilebrowser',
        // libs
        jquery:               bower_path +'jquery/dist/jquery', // lib for js
        // plugins
        svg4everybody:        bower_path + 'svg4everybody/dist/svg4everybody.min',  // load svg
        scrollbar:            bower_path + 'perfect-scrollbar/js/perfect-scrollbar.jquery.min',
        // bs_select:            bower_path + 'bootstrap-select/dist/js/bootstrap-select',
        // bs_dropdown:          bower_path + 'bootstrap/js/dropdown',
        // separate
        separate_global:     'separate/global', // detect width && height of window
        // helpers
        toggle_blocks:       'helpers/toggle-blocks',
        detect_browser:      'helpers/detect_browser',
        get_scrollbar_width: 'helpers/get_scrollbar_width',
        resizer:             'helpers/resizer',
        parallax:              bower_path + 'parallax.js/parallax.min',
        object_fit:          'helpers/object-fit',
        wow:              'plugins/wow.min',
        // update_columns:      'helpers/update-columns',
        // bs_modal_center:       'helpers/bsModalCenter',
        // bs_modal_fix:          'helpers/bs_modal_fix',
        // valid:                 'helpers/valid',
        // components
        header:                'components/header'
    }
});
var main_js_components = [
    'separate_global',
    'modernizr',
    'toggle_blocks',
    'detect_browser',
    'get_scrollbar_width',
    'resizer'
];
requirejs(['domReady','jquery','wow'], function(domReady, $){
    // domReady(function () {
    //     // console.log("DOM Ready");
    // });
    requirejs(main_js_components, function() {
        requirejs(['header','object_fit']);
        requirejs(['parallax'],function(){
            var update_par = function(){
                if(window.outerWidth > 767){
                    console.log('work')
                    $('.js-parallax').parallax({
                        imageSrc: './s/images/tmp_file/paralax.jpg',
                        speed: 0.5
                    })
                }else{
                    console.log('dont work')
                    $('.js-parallax').parallax({
                        imageSrc: './s/images/tmp_file/paralax.jpg',
                        speed: 1
                    })
                }
            }
            update_par();
            $(window).on('resize', function(){
                update_par();
            })
        });
        // requirejs(['bs_dropdown','bs_select'], function(){
        //     $('.selectpicker').selectpicker();
        // });
    });
    var wow = new WOW({
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       0,          // distance to the element when triggering the animation (default is 0)
        mobile:       true,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
        callback:     function(box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    });
    wow.init();
});