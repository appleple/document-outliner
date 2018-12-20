import {SectionType, OutlineType, OptionsType, ConfigType} from "./type";
import {isHeadingContent} from "./util";

export default class MakeList {
  private readonly outline: OutlineType;
  private readonly options: ConfigType;
  private anchor: number = 1;
  private html: string = '';

  constructor(outline: OutlineType, options: OptionsType) {
    this.outline = outline;
    this.options = Object.assign({}, {
      link: true,
      listType: 'ol',
      levelLimit: 99,
      listClassName: '',
      itemClassName: '',
      anchorName: 'header-$1'
    }, options) as ConfigType;
  }

  public getHtml(): string {
    if (!/ol|ul/.test(this.options.listType)) {
      throw new TypeError("Invalid options: linkType be ul or ol.");
    }
    if (!this.outline) {
      throw new Error("No sectioning contents.");
    }
    this.build(this.outline.getOutline(), 1);
    return this.html;
  }

  protected build(outline: OutlineType | SectionType, level: number): void {
    if (level > this.options.levelLimit) {
      return;
    }
    const hasHeading = this.hasHeading(outline.getSections());
    if (hasHeading) {
      const listClassName = this.options.listClassName ? ` ${this.options.linkClassName}` : '';
      this.html += `<${this.options.listType} class="level-${level}${listClassName}">`;
    }
    this.buildSections(outline.getSections(), hasHeading, level);
    if (hasHeading) {
      this.html += `</${this.options.listType}>`;
    }
  }

  protected buildSections(sections: Array<SectionType>, hasHeading: boolean, level: number): void {
    sections.forEach((section) => {
      const heading = section.getHeading() as HTMLElement;
      if (isHeadingContent(heading)) {
        const itemClassName = this.options.itemClassName ? ` class="${this.options.itemClassName}"` : '';
        if (this.options.link) {
          this.html += `<li${itemClassName}>${this.buildLink(heading)}`;
        } else {
          this.html += `<li${itemClassName}>${heading.innerText}`;
        }
      } else {
        this.html += '<li>';
      }
      if (section.getSections()) {
        const nextLevel = hasHeading ? level + 1 : level;
        this.build(section, nextLevel);
      }
      this.html += '</li>';
    });
  }

  protected buildLink(heading: HTMLElement): string {
    const anchorClassName = this.options.linkClassName ? ` class="${this.options.linkClassName}"` : '';
    let anchorName = this.options.anchorName.replace(/\$1/, this.anchor.toString());
    if (heading.id) {
      anchorName = heading.id;
    } else {
      heading.id = anchorName;
      this.anchor++;
    }
    return `<a href="#${anchorName}"${anchorClassName}>${heading.innerText}</a>`;
  }

  protected hasHeading(sections: Array<SectionType>): boolean {
    let hasHeading = false;
    sections.forEach((section) => {
      if (section.getHeading()) {
        hasHeading = true;
      }
    });
    return hasHeading;
  }
}
