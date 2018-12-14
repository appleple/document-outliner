import { SectionType, NodeType } from "./type";
export default class Outline {
    sectionList: Array<SectionType>;
    associatedSection: SectionType;
    parentSection: SectionType;
    firstSection: SectionType;
    lastSection: SectionType;
    node: NodeType;
    constructor(node: NodeType);
    appendSection(section: SectionType): void;
    setAssociatedSection(section: SectionType): void;
    setParentSection(section: SectionType): void;
    getParentSection(): SectionType;
    setNode(node: NodeType): void;
    getNode(): NodeType;
}
