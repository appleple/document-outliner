var isElement = function (el) {
    return !!(el && el.nodeName);
};
var checkTagWithRegex = function (el, regex) {
    if (el === null) {
        return false;
    }
    if (!(el instanceof HTMLElement)) {
        return false;
    }
    return isElement(el) && regex.test(el.tagName.toLowerCase());
};
var isSectioningRoot = function (el) {
    return checkTagWithRegex(el, /^(blockquote|body|details|fieldset|figure|td)$/);
};
var isSectioningContent = function (el) {
    return checkTagWithRegex(el, /^(article|aside|nav|section)$/);
};
var isHeadingContent = function (el) {
    return checkTagWithRegex(el, /^(h1|h2|h3|h4|h5|h6|hgroup)$/);
};
var isHidden = function (el) {
    if (el === null) {
        return false;
    }
    if (!(el instanceof HTMLElement)) {
        return false;
    }
    return isElement(el) && el.hasAttribute('hidden');
};
export { isSectioningRoot, isSectioningContent, isHeadingContent, isHidden };
//# sourceMappingURL=util.js.map