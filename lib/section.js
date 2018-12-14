var Section = /** @class */ (function () {
    function Section(node) {
        this.node = node;
        this.associatedOutlines = [];
        this.heading = null;
    }
    Section.prototype.addAssociateOutline = function (outline) {
        this.associatedOutlines.push(outline);
    };
    return Section;
}());
export default Section;
//# sourceMappingURL=section.js.map