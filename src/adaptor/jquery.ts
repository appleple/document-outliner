import DocumentOutliner from '../index';
import {OptionsType} from "../type";

declare global {
  interface JQuery {
    documentOutliner(options: OptionsType): JQuery
  }
}

(($) => {
  $.fn.documentOutliner = function(options) {
    const outliner = new DocumentOutliner(this.get(0));
    outliner.buildHtml(options);
    return this;
  };
})(jQuery);
