'use strict';
var tabs = function ($tabsParent, $contentParent, options) {
	var options = options || {};
	var tabClass = options.tabsItemClass || 'tabs__item';
	var tabActiveClass = options.contentClass || 'tabs__item_active';
	var contentClass = options.contentClass || 'tabs-table-content';
	var contentActiveClass = options.contentActiveClass || 'tabs-table-content_active';
	var contents = {};

	var $tabs = $tabsParent.children('.' + tabClass);
	var initContent = $tabs.eq(0).data('content');
	
	activateTab($tabs, initContent, tabActiveClass);
	showContent($contentParent, initContent, contents);

	$tabsParent.on('click', '.' + tabClass, onTabClick);

	function onTabClick (e) {
		var $this = $(this);
		var contentName = $this.data('content');
		activateTab($tabs, contentName, tabActiveClass);
		showContent($contentParent, contentName, contents);
	}
	var onTabClick = function (e) {
		var target = e.target;
		var current = e.currentTarget;
		var contentName; 
		
		while (target !== current) {
			if (target.className === 'tabs__item') {
				contentName = target.dataset.content;
				activateTab(contentName);
				showContent(contentName);
				return;
			}
			target = target.parentElement;
		}
	};

	function activateTab ($tabs, content, activeClass) {
		$tabs.each(function () {
			var $this = $(this);
			var currentContent = $this.data('content');
			if (currentContent !== content) {
				$this.removeClass(activeClass);
				return;
			}
			$this.addClass(activeClass);
		})
	}
	function showContent ($parent, content, contents) {
			var $content;
			if (!contents[content]) {
				$.ajax({
					method: 'GET',
					url: ['/api/lorem', content].join('/')
				})
				.then(function (data, status) {
					var res = data.data;
					if (status === 'success') {
						$content = $parent
							.append('div')
							.addClass(contentClass)
							.html('<header class="tabs-table-content__header"><h2 class="text_large text_black">'+ res.head +'</h2></header><p class="tabs-table-content__row"><span class="text_small text_gray">' + res.body + '</span></p>')
							.data('content', content)
					}
					contents[content] = res;
					$parent
						.find('.' + contentClass)
						.removeClass(contentActiveClass)
					$content.addClass(contentActiveClass)
				});
				return;
			}
			$parent
				.find('.' + contentClass)
				.each(function () {
					var $this = $(this);
					var currentContent = $this.data('content');
					if (currentContent !== content) {
						$this.removeClass(contentActiveClass);
						return;
					}
					$this.addClass(contentActiveClass);
				})
		}
	}

tabs($('#tabs'), $('#contents'));

/*var tabsParent = document.getElementById('tabs');
var contentParent = document.getElementById('contents');

var tabs = tabsParent.getElementsByClassName('tabs__item');
var contents = contentParent.getElementsByClassName('tabs-table-content');
var onTabClick = function (e) {
	var target = e.target;
	var current = e.currentTarget;
	var contentName; 
	
	while (target !== current) {
		if (target.className === 'tabs__item') {
			contentName = target.dataset.content;
			activateTab(contentName);
			showContent(contentName);
			return;
		}
		target = target.parentElement;
	}
};

tabsParent.addEventListener('click', onTabClick)

function activateTab (content) {
	for (var i = 0; i < tabs.length; i++) {
		if (tabs[i].dataset.content === content) {
			tabs[i].classList.add('tabs__item_active');
		} else {
			tabs[i].classList.remove('tabs__item_active');
		}
	}
}

function showContent (content) {
	for (var i = 0; i < contents.length; i++) {
		if (contents[i].dataset.content === content) {
			contents[i].classList.add('tabs-table-content_active');
		} else {
			contents[i].classList.remove('tabs-table-content_active');
		}
	}
}

function init () {
	var contentName = tabs[0].dataset.content;
	activateTab(contentName);
	showContent(contentName);
}

init();*/