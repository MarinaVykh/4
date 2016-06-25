'use strict';
var tabs = function ($tabsParent, $contentParent, options) {
    var options = options || {};
    var tabClass = options.tabsItemClass || 'tabs__item';
    var tabActiveClass = options.contentClass || 'tabs__item_active';
    var contents = {};

    var $tabs = $tabsParent.children('.' + tabClass);
    var initContent = $tabs.eq(0).data('content');

    activateTab($tabs, initContent, tabActiveClass);
    showContent($contentParent, initContent, contents);

    $tabsParent.on('click', '.' + tabClass, onTabClick);

    function onTabClick(e) {
        var $this = $(this);
        var contentName = $this.data('content');
        activateTab($tabs, contentName, tabActiveClass);
        showContent($contentParent, contentName, contents);
    }

    function activateTab($tabs, content, activeClass) {
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





asyncF()

function toConsole (p) {
	console.log(p);
}

function asyncF (cb) {
	var stCb = function () {
		var b = 5;
		cb(b);
	}
	setTimeout(stCb, 1000)

}

















    function showContent($parent, content, contents) {
        var template = new EJS({url: 'templates/tabs-table-content.ejs'});

        if (!contents[content]) {
            $.ajax({
                method: 'GET',
                url: ['/api/lorem', content].join('/')
            }).then(function (data) {
                var res = data.data;
                res.content = content;
                var html = template.render(res);
                $parent.html(html);
                contents[content] = res;
            });
        } else {
            var data = contents[content];
            var html = template.render(data);
            $parent.html(html);
        }
    }
}

tabs($('#tabs'), $('#contents'));
