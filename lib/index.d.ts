import { OutlineType, NodeType } from "./type";
/**
 * @see https://html.spec.whatwg.org/multipage/sections.html#outline [4.3.11.1 Creating an outline]
 */
export default class DocumentOutliner {
    private currentOutlineTarget;
    private currentSection;
    private readonly stack;
    private readonly rootNode;
    constructor(root: NodeType);
    getOutlineObject(): OutlineType | boolean;
    protected static walk(root: NodeType, enter: (node: NodeType) => void, exit: (node: NodeType) => void): void;
    protected enter(node: NodeType): void;
    protected exit(node: NodeType): void;
    protected getStackTopNode(): OutlineType;
}
