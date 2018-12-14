import {OutlineType, NodeType} from "./type";

export default class Section {

  associatedOutlines: Array<OutlineType>;
  node: NodeType;
  heading: Object | null;

  constructor(node: NodeType) {
    this.node = node;
    this.associatedOutlines = [];
    this.heading = null;
  }

  addAssociateOutline(outline: OutlineType): void {
    this.associatedOutlines.push(outline);
  }
}
