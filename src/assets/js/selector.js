const $ = require('jquery');

const loadMediaSelector = function() {
	$('[data-plugin="media"]').each(function (index, item) {
		const options = $(item).data('options');
		const id = $(item).attr('id');
        $(item).replaceWith(`
            <div class="media-item">
                <div id="${id}" data-options='${JSON.stringify(options)}' class="file-viewer open-media-dialog">${((options.file === undefined || options.file === '') ? options.placeholder : '<img src="' + options.file + '">')}</div>
                <input type="hidden" name="${options.name}" value="${((options.file !== undefined) ? options.file : '')}">
                <div class="delete-file ${((options.file === undefined || options.file === '') ? 'atm-none' : '')}" data-options='${JSON.stringify(options)}'><i class="material-icons mdc-button__icon">delete</i></div>
                <div class="file-name ${((options.file === undefined || options.file === '') ? 'atm-none' : '')}">${(options.file === undefined || options.file === '') ? '' : options.file.split('/').pop()}</div>
            </div>
        `);

		$('.media-container').find('.delete-file').each(function (index2, item2) {
			$(item2).click(function () {
				var options2 = $(item2).data('options');
				$(this).prev().val('');
				$(this).prev().prev().html(options2.placeholder);
				$(this).addClass('atm-none');
				$(this).next().addClass('atm-none').text('');
			});
		});
	});
};

const mediaManager = function(refId, file) {
    if (config.mime_types['image/*'].split(',').find((x) => x === '.' + file.split('.').pop())) {
        $('#' + refId).html('<img src="' + file + '">');
    } else if (config.mime_types['video/*'].split(',').find((x) => x === '.' + file.split('.').pop())) {
        $('#' + refId).html('<img src="' + asset + 'atriatech/media/extra/icons/svg/035-file-7.svg' + '">');
    } else if (config.mime_types['audio/*'].split(',').find((x) => x === '.' + file.split('.').pop())) {
        $('#' + refId).html('<img src="' + asset + 'atriatech/media/extra/icons/svg/043-music-file.svg' + '">');
    } else {
        $('#' + refId).html('<img src="' + asset + 'atriatech/media/extra/icons/svg/050-file.svg' + '">');
    }

    $('#' + refId).next().val(file);
    $('#' + refId).next().next().removeClass('atm-none');
    $('#' + refId).next().next().next().removeClass('atm-none').text(file.split('/').pop());
};

let inputOptions = {};
$('body').delegate('.open-media-dialog', 'click', function () {
	inputOptions = $(this).data('options');
	let id = null;
	if (inputOptions.type !== undefined && inputOptions.type === 'input') {
		id = $(this).parents('.input-group').find('.form-control').attr('id');
	} else {
		id = $(this).attr('id');
	}
	let accept = Object.values(config.mime_types).join(',');
	if (inputOptions.accept !== undefined) {
	    if (config.mime_types[inputOptions.accept] !== undefined) {
		    accept = config.mime_types[inputOptions.accept];
        } else {
            accept = inputOptions.accept;
        }
	}
	window.mediaManager = mediaManager;
	window.open(route('atriatech.media.index') + '?ref=media&refId=' + id + '&accept=' + accept, '', 'height=500,width=1200');
});

$(document).ready(function() {
	loadMediaSelector();
});