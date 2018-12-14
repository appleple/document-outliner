import {SectionType, NodeType} from "./type";

export default class Outline {

  sectionList: Array<SectionType>;
  associatedSection: SectionType;
  parentSection: SectionType;
  firstSection: SectionType;
  lastSection: SectionType;
  node: NodeType;

  constructor(node: NodeType) {
    this.node = node;
    this.sectionList = [];
    this.associatedSection = null;
    this.parentSection = null;
    this.firstSection = null;
    this.lastSection = null;
  }

  public appendSection(section: SectionType): void {
    this.sectionList.push(section);
    if (this.firstSection === null) this.firstSection = section;
    this.lastSection = section;
  }

  public setAssociatedSection(section: SectionType): void {
    this.associatedSection = section;
  }

  public setParentSection(section: SectionType): void {
    this.parentSection = section;
  }

  public getParentSection(): SectionType {
    return this.parentSection;
  }

  public setNode(node: NodeType): void {
    this.node = node;
  }

  public getNode(): NodeType {
    return this.node;
  }
}
