import Outline from "./outline";
import Section from "./section";
declare type OutlineType = Outline;
declare type SectionType = Section;
declare type NodeType = HTMLElement | Node | ChildNode | null;
declare type ConfigType = {
    link: boolean;
    listType: 'ul' | 'ol';
    listClassName: string;
    itemClassName: string;
    linkClassName: string;
    anchorName: string;
    levelLimit: number;
};
declare type Partial<T> = {
    [P in keyof T]?: T[P];
};
declare type OptionsType = Partial<ConfigType>;
export { OutlineType, SectionType, NodeType, OptionsType, ConfigType };
