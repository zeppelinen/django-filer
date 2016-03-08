'use strict';
/* global django */

django.jQuery(function ($) {
    window.dismissPopupAndReload = function (win) {
        document.location.reload();
        win.close();
    };
    window.dismissRelatedImageLookupPopup = function (win, chosenId, chosenThumbnailUrl, chosenDescriptionTxt) {
        var frame = $($('.js-filer-frame').filter(function (i, elem) {
            return elem.contentWindow == win;
        })[0]);
        var id = frame.data('id');
        var lookup = $('#' + id + '_lookup');
        var container = lookup.closest('.filerFile');
        var image = container.find('.thumbnail_img');
        var descriptionText = container.find('.description_text');
        var clearer = container.find('.filerClearer');
        var dropzoneMessage = container.siblings('.dz-message');
        var element = container.find(':input');
        var oldId = element.value;
        var uploadTab = frame.closest('.filer-tabs').find('a[href="#upload"]');

        $(uploadTab)[0].click();
        element.val(chosenId);
        element.closest('.js-filer-dropzone').addClass('js-object-attached');
        image.attr('src', chosenThumbnailUrl).removeClass('hidden');
        descriptionText.text(chosenDescriptionTxt);
        clearer.removeClass('hidden');
        lookup.addClass('hidden');
        dropzoneMessage.addClass('hidden');

        if (oldId !== chosenId) {
            element.trigger('change');
        }
        win.close();
    };
    window.dismissRelatedFolderLookupPopup = function (win, chosenId, chosenName) {
        var id = window.windowname_to_id(win.name);
        var clearButton = $('#id_' + id + '_clear');
        var input = $('#id_' + id);
        var folderName = $('#id_' + id + '_description_txt');
        var addFolderButton = $('#' + id);

        input.val(chosenId);
        folderName.text(chosenName);
        clearButton.removeClass('hidden');
        addFolderButton.addClass('hidden');
        win.close();
    };
});
