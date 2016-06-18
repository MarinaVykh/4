'use strict';

(function (global) {
	global.$ = function (selector) {
		if (typeof selector !== 'string') {
			throw new Error('wrong type of selector, should be string');
			return;
		}
		var selectorType = selector[0];
		var selectorName = selector.slice(1);
		var query;
		switch (selectorType) {
			case '.':
				query = document.getElementsByClassName(selectorName);
				break;
			case '#':
				query = document.getElementById(selectorName);
				break;
			default:
				query = document.getElementByTagName(selector);
		}
		return {
			query: query,
			each: function (cb) {
				var query = this.query;
				if (query === null) {
					return this;
				};
				if (query.length === 0 || query.length) {
					if (!query.length) {
						return this;
					}
					for (var i = 0; i < query.length; i++) {
						cb.call(query[i], i);
					}
					return this;
				}
			}
		}
	}
})(window)
var my = $('.tabs__item');
my.each(function (i) {
	console.log('i === ', i);
})