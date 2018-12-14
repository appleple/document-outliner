var Outline = /** @class */ (function () {
    function Outline(node) {
        this.node = node;
        this.sectionList = [];
        this.associatedSection = null;
        this.parentSection = null;
        this.firstSection = null;
        this.lastSection = null;
    }
    Outline.prototype.appendSection = function (section) {
        this.sectionList.push(section);
        if (this.firstSection === null)
            this.firstSection = section;
        this.lastSection = section;
    };
    Outline.prototype.setAssociatedSection = function (section) {
        this.associatedSection = section;
    };
    Outline.prototype.setParentSection = function (section) {
        this.parentSection = section;
    };
    Outline.prototype.getParentSection = function () {
        return this.parentSection;
    };
    Outline.prototype.setNode = function (node) {
        this.node = node;
    };
    Outline.prototype.getNode = function () {
        return this.node;
    };
    return Outline;
}());
export default Outline;
//# sourceMappingURL=outline.js.map