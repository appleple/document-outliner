import { OutlineType, NodeType } from "./type";
export default class Section {
    associatedOutlines: Array<OutlineType>;
    node: NodeType;
    heading: Object | null;
    constructor(node: NodeType);
    addAssociateOutline(outline: OutlineType): void;
}
