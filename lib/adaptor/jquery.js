import DocumentOutliner from '../index';
(function ($) {
    $.fn.documentOutliner = function (options) {
        var outliner = new DocumentOutliner(this.get(0));
        outliner.buildHtml(options);
        return this;
    };
})(jQuery);
//# sourceMappingURL=jquery.js.map