import { SectionType, OutlineType, OptionsType } from "./type";
export default class MakeList {
    private readonly outline;
    private readonly options;
    private anchor;
    constructor(outline: OutlineType, options: OptionsType);
    getHtml(): string;
    protected build(outline: OutlineType | SectionType, level: number, html: string): string;
}
