const toolMap = {
			'kanban': 'StudentFunZone/kanban.html',
			'vision': 'StudentFunZone/visionboard.html',
			'whiteboard': 'StudentFunZone/whiteboard.html',
			'bingo': 'StudentFunZone/bingo.html',
			'kviz': 'StudentFunZone/kviz.html',
			'overview': 'StudentFunZone/kanban.html'
		};
		function loadToolByHash() {
			const hash = location.hash.replace('#','');
			const frame = document.getElementById('sfz-frame');
			if(!frame) return;
			if(hash && toolMap[hash]) {
				frame.src = toolMap[hash];
			} else {
				// default
				frame.src = toolMap['overview'];
			}
		}
		document.querySelectorAll('.sfz-link').forEach(btn=>{
			btn.addEventListener('click', ()=>{
				const src = btn.getAttribute('data-src');
				const key = Object.keys(toolMap).find(k => toolMap[k] === src);
				if(key) location.hash = key; else location.hash = '';
			});
		});
		window.addEventListener('hashchange', loadToolByHash);
		window.addEventListener('load', loadToolByHash);