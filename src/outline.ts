import {SectionType, OutlineType, NodeType} from "./type";

export default class Outline {

  sections: Array<SectionType>;
  parentSection: SectionType | null;
  node: NodeType;
  outline: OutlineType;

  constructor(node: NodeType, section: SectionType | null = null) {
    this.node = node;
    this.sections = [];
    this.parentSection = null;
    this.outline = this;
    if (section) {
      this.addSection(section);
    }
  }

  public addSection(section: SectionType): void {
    this.sections.push(section);
  }

  public setParentSection(section: SectionType): void {
    this.parentSection = section;
  }

  public getParentSection(): SectionType | null {
    return this.parentSection;
  }

  public getLastSection(): SectionType {
    return this.sections[this.sections.length - 1];
  }

  public setNode(node: NodeType): void {
    this.node = node;
  }

  public getNode(): NodeType {
    return this.node;
  }
}
