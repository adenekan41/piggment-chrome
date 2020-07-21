/* globals chrome */
(function() {
	chrome.tabs.create({}, function(cb) {
		console.log(cb);
	});
})();
