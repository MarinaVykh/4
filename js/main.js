//'use strict';
var tabsParent = document.getElementById('tabs');
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

init();