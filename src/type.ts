import Outline from "./outline";
import Section from "./section";

type OutlineType = Outline;
type SectionType = Section;
type NodeType = HTMLElement | Node | ChildNode | null;
type OptionsType = {
  link?: boolean,
  listType?: 'ul' | 'ol',
  listClassName?: string,
  itemClassName?: string,
  anchorName?: string,
  levelLimit?: number
};

export {OutlineType, SectionType, NodeType, OptionsType};
