$(() => {
	let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
		octaves = [2, 6],
		tunes = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'],
		frets = 24;

	for(let octave = octaves[0]; octave <= octaves[1]; octave++) {
		for(let note of notes) {
			let keyElement = $('<li/>').attr('data-note', note+octave);

			if(note.endsWith('#')) {
				keyElement.attr('black_', '');
			}
			if(tunes.includes(note+octave)) {
				keyElement.attr('active_', 'primary');
			}

			keyElement.appendTo($('ul[__keys]'));
		}
	}

	for(let tune of tunes) {
		let fretsElement = $('<ul/>').attr('__frets', '').appendTo($('[__strings]')),
			offset = notes.indexOf(tune[0]),
			octave = tune[1]

		for(let i = 0; i < frets; i++) {
			if(offset+i >= notes.length) {
				offset -= notes.length;
				octave++;
			}

			let note = notes[offset+i],
				fretElement = $('<li/>').attr('data-note', note+octave);

			if(tunes.includes(note+octave)) {
				fretElement.attr('active_', i === 0 ? 'primary' : '');
			}

			fretElement.appendTo(fretsElement);
		}
	}

	$('ul').on('click', 'li', function() {
		let element = $(this),
			note = element.data('note'),
			active = element.attr('active_'),
			elements = $('li[data-note="'+note+'"]');

		if(element.is('ul[__keys] li')) {
			if(active === undefined) {
				elements.attr('active_', '');
			} else {
				elements.removeAttr('active_');
			}
		} else {
			if(active !== 'primary') {
				elements.attr('active_', function() {
					let element_ = $(this),
						active_ = element_.attr('active_');

					if(element_.is('ul[__keys] li') || element_.is(element)) {
						return 'primary';
					}
					if(active_ === undefined) {
						return '';
					}
				});

				element.siblings('li[active_="primary"]').click();
			} else {
				if(elements.filter('ul[__frets] li[active_="primary"]').length > 1) {
					element.attr('active_', '');
				} else {
					elements.removeAttr('active_');
				}
			}
		}
	});
});