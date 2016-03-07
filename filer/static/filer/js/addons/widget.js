'use strict';
/* global django */

django.jQuery(function ($) {
    var filer_clear = function () {
        var clearer = $(this);
        var container = clearer.closest('.filerFile');
        var input = container.find(':input');
        var thumbnail = container.find('.thumbnail_img');
        var description = container.find('.description_text');
        var addImageButton = container.find('.lookup');
        var dropzoneMessage = container.siblings('.dz-message');
        var hiddenClass = 'hidden';

        clearer.addClass(hiddenClass);
        input.val('');
        thumbnail.addClass(hiddenClass);
        thumbnail.parent('a').removeAttr('href');
        addImageButton.removeClass(hiddenClass);
        dropzoneMessage.removeClass(hiddenClass);
        description.empty();
    };

    $('.filerFile .vForeignKeyRawIdAdminField').attr('type', 'hidden');
    //if this file is included multiple time, we ensure that filer_clear is attached only once.
    $(document).off('click.filer', '.filerFile .filerClearer', filer_clear)
               .on('click.filer', '.filerFile .filerClearer', filer_clear);

    // set iframe height of folder iframe in widget
    var filerFrame = $('.js-filer-frame');
    var lastHeight = 0;
    var currentHeight = 0;
    setInterval(function(){
        currentHeight = filerFrame.contents().find('#container').height();
        if ( currentHeight != lastHeight ) {
          filerFrame.css('height', (lastHeight = currentHeight) + 'px' );
        }
        filerFrame.contents().find('body').addClass('popup');
    },500);
});
