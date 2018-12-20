import { isHeadingContent } from "./util";
var MakeList = /** @class */ (function () {
    function MakeList(outline, options) {
        this.anchor = 1;
        this.html = '';
        this.outline = outline;
        this.options = Object.assign({}, {
            link: true,
            listType: 'ol',
            levelLimit: 99,
            listClassName: '',
            itemClassName: '',
            anchorName: 'header-$1'
        }, options);
    }
    MakeList.prototype.getHtml = function () {
        if (!/ol|ul/.test(this.options.listType)) {
            throw new TypeError("Invalid options: linkType be ul or ol.");
        }
        if (!this.outline) {
            throw new Error("No sectioning contents.");
        }
        this.build(this.outline.getOutline(), 1);
        return this.html;
    };
    MakeList.prototype.build = function (outline, level) {
        if (level > this.options.levelLimit) {
            return;
        }
        var hasHeading = this.hasHeading(outline.getSections());
        if (hasHeading) {
            var listClassName = this.options.listClassName ? " " + this.options.linkClassName : '';
            this.html += "<" + this.options.listType + " class=\"level-" + level + listClassName + "\">";
        }
        this.buildSections(outline.getSections(), hasHeading, level);
        if (hasHeading) {
            this.html += "</" + this.options.listType + ">";
        }
    };
    MakeList.prototype.buildSections = function (sections, hasHeading, level) {
        var _this = this;
        sections.forEach(function (section) {
            var heading = section.getHeading();
            if (isHeadingContent(heading)) {
                var itemClassName = _this.options.itemClassName ? " class=\"" + _this.options.itemClassName + "\"" : '';
                if (_this.options.link) {
                    _this.html += "<li" + itemClassName + ">" + _this.buildLink(heading);
                }
                else {
                    _this.html += "<li" + itemClassName + ">" + heading.innerText;
                }
            }
            else {
                _this.html += '<li>';
            }
            if (section.getSections()) {
                var nextLevel = hasHeading ? level + 1 : level;
                _this.build(section, nextLevel);
            }
            _this.html += '</li>';
        });
    };
    MakeList.prototype.buildLink = function (heading) {
        var anchorClassName = this.options.linkClassName ? " class=\"" + this.options.linkClassName + "\"" : '';
        var anchorName = this.options.anchorName.replace(/\$1/, this.anchor.toString());
        if (heading.id) {
            anchorName = heading.id;
        }
        else {
            heading.id = anchorName;
        }
        this.anchor++;
        return "<a href=\"#" + anchorName + "\"" + anchorClassName + ">" + heading.innerText + "</a>";
    };
    MakeList.prototype.hasHeading = function (sections) {
        var hasHeading = false;
        sections.forEach(function (section) {
            if (section.getHeading()) {
                hasHeading = true;
            }
        });
        return hasHeading;
    };
    return MakeList;
}());
export default MakeList;
//# sourceMappingURL=make-list.js.map