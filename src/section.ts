import {NodeType, SectionType} from "./type";

export default class Section {

  node: NodeType;
  implied: boolean;
  heading: NodeType;
  parent: SectionType | null;
  sections: Array<SectionType>;

  constructor(node: NodeType) {
    this.node = node;
    this.implied = false;
    this.heading = null;
    this.sections = [];
    this.parent = null;
  }

  public addSection(section: SectionType) {
    section.parent = this;
    this.sections.push(section);
  }
}
