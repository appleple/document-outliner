import Outline from "./outline";
import Section from "./section";
declare type OutlineType = Outline;
declare type SectionType = Section;
declare type NodeType = HTMLElement | Node | ChildNode | null;
declare type OptionsType = {
    target: string | NodeListOf<HTMLElement>;
    link?: boolean;
    listType?: 'ul' | 'ol';
    listClassName?: string;
    itemClassName?: string;
    anchorName?: string;
    levelLimit?: number;
};
export { OutlineType, SectionType, NodeType, OptionsType };
