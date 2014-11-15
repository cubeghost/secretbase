        function resize() {
            $.when( $('section.items').height( ( $(window).height() - 176) ) ).then(function(){
                var left_height = $(window).height() - 176;
                if ( $('section.controls').offset().top > 112 ) {
                    var right_height = $('section.base').height() + $('section.controls').height() + 48;
                } else {
                    var right_height = $('section.base').height();
                }
                if (right_height > left_height) {
                    $('section.items').height(right_height);
                } else {
                    //
                }
            });
            //console.log('resized');
        }



    $(function() {
    
        resize();
        
        $(window).resize(function(){
            resize();   
        });    
        
        $('.basetype').change(function(){
            var base = $(this).val();
            $('#base').attr('src',base);
            setTimeout(resize,600);
        });
        
        $('.base').droppable({
            tolerance: 'pointer', 
            accept: '.item',
            drop: function(event, ui) {
                $(this).append($(ui.helper).clone());
                $('.base .item').addClass('new');
                $('.new').removeClass('ui-draggable item');
                $('.new').draggable({
                    //containment: 'parent',
                    grid: [8,8],
                    zIndex: 9000
                });
            }
        });
        $('.trash').droppable({
            drop: function(event, ui) {
                $(ui.helper).remove();
                $('.trash').animate({opacity:1},300);
            },
            over: function(event, ui) {
                $('.trash').animate({opacity:'0.7'},300);
            },
            out: function(event, ui) {
                $('.trash').animate({opacity:1},300);
            }
        });
        $('.item').draggable({
            helper: 'clone',
            grid: [8,8]
        });

        document.getElementById('theme').volume = 0.1;
        $('.audio').click(function(){
            var music = document.getElementById('theme');
            if (music.paused) {
                music.play();
                $(this).children('span').text('PAUSE MUSIC');
            } else {
                music.pause();
                $(this).children('span').text('PLAY MUSIC');
            }
        });
        
        $('form#save').submit(function(){
                    
            $(this).css({'background-image':'url(ui/laptop_blink.gif)'}).delay(3000).queue(function(){
                $('form#save').css({'background-image':'url(ui/laptop.png)'});
                $(this).dequeue();
            });

            $('#width').val( $('#base').width() );
            $('#height').val( $('#base').height() );
            var rawhtml = $('.base').html();
            var off_top = 96;
            if ($(document).width() <= 1376) {
                var off_left = 544;
            } else {
                var off_left = 800;
            }
            var pattern = /left:\s(\d+)px;\stop:\s(\d+)px;/g;
            var level = 1;
            var _match;
            var basehtml = rawhtml.replace(pattern,function(string,match){
                while ( _match = pattern.exec(rawhtml)){
                     var _left = _match[1] - off_left;
                     var _top = _match[2] - off_top;
                     var str = 'left: ' + _left + 'px; top: ' + _top + 'px;';
                     return str;
                     level ++;
                }
            });
            var basehtml2 = basehtml.replace('id="base">','id="base" style="position:absolute;top:0;left:0;">');
            var basehtml3 = basehtml2.replace(/src="/g,'src="../');
            $('#html').val(basehtml3);
                                
        });
        
       
            
    });
    
    $(window).load(function(){
        resize();
    });
