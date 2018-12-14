import {SectionType, OutlineType, NodeType} from "./type";
import Section from "./section";
import Outline from "./outline";
import {
  isSectioningRoot,
  isSectioningContent,
  isHeadingContent,
  isHidden
} from "./util";

/**
 * @see https://html.spec.whatwg.org/multipage/sections.html#outline [4.3.11.1 Creating an outline]
 */
export default class DocumentOutliner {

  stack: Array<NodeType>;
  currentOutlineTarget: OutlineType;
  currentSection: SectionType;

  constructor(root: NodeType) {
    this.currentOutlineTarget = null;
    this.currentSection = null;
    this.stack = [];

    root = document.querySelector('body');
    DocumentOutliner.walk(root, this.enter.bind(this), this.exit.bind(this));

    console.log(this.stack);
  }

  protected static walk(root: NodeType, enter: (node: NodeType) => void, exit: (node: NodeType) => void) {
    let node = root;
    start: while (node) {
      enter(node);
      if (node.firstChild) {
        node = node.firstChild;
        continue;
      }
      while (node) {
        exit(node);
        if (node === root) {
          node = null;
        } else if (node.nextSibling) {
          node = node.nextSibling;
          continue start;
        } else {
          node = node.parentNode;
        }
      }
    }
  }

  protected enter(node: NodeType): void {
    const stackTop = this.getStackTopNode();

    // If the top of the stack is a heading content element or an element with a hidden attribute
    // Do nothing.
    if (isHeadingContent(stackTop) || isHidden(stackTop)) {
      return;
    }
    // When entering an element with a hidden attribute
    // Push the element being entered onto the stack.
    // (This causes the algorithm to skip that element and any descendants of the element.)
    if (isHidden(node)) {
      this.stack.push(node);
      return;
    }
    // When entering a sectioning content element
    if (isSectioningContent(node)) {
      console.log('section', node);
      // If current outline target is not null, then:
      if (this.currentOutlineTarget !== null) {
        // 1. If the current section has no heading,
        if (this.currentSection && !this.currentSection.heading) {
          // create an implied heading and let that be the heading for the current section.
          this.currentSection.heading = 'Implied heading.';
          // Push current outline target onto the stack.
          this.stack.push(this.currentOutlineTarget.getNode());
        }
        // 2. Let current outline target be the element that is being entered.
        this.currentOutlineTarget.setNode(node);
        // 3. Let current section be a newly created section for the current outline target element.
        this.currentSection = new Section(node);
        // 4. Associate current outline target with current section.
        this.currentSection.addAssociateOutline(this.currentOutlineTarget);
        this.currentOutlineTarget.setAssociatedSection(this.currentSection);
        // 5. Let there be a new outline for the new current outline target,
        //    initialized with just the new current section as the only section in the outline.
        this.currentOutlineTarget.appendSection(this.currentSection);
        return;
      }
    }
    // When entering a sectioning root element
    if (isSectioningRoot(node)) {
      console.log('sectioning root', node);
      // 1. If current outline target is not null, push current outline target onto the stack.
      if (this.currentOutlineTarget !== null) {
        this.stack.push(this.currentOutlineTarget.getNode());
      }
      // 2. Let current outline target be the element that is being entered.
      this.currentOutlineTarget = new Outline(node);
      // 3. Let current outline target's parent section be current section.
      this.currentOutlineTarget.setParentSection(this.currentSection);
      // 4. Let current section be a newly created section for the current outline target element.
      this.currentSection = new Section(node);
      // 5. Let there be a new outline for the new current outline target, initialized with just the new current section as the only section in the outline.
      // this.currentOutlineTarget.setO
    }
    // When entering a heading content element
    if (isHeadingContent(node)) {
      console.log('heading', node);
      // If the current section has no heading, let the element being entered be the heading for the current section.
      // Note: If the element being entered is an hgroup element,
      // that hgroup as a whole is a multi-level heading for the current section,
      // with the highest-ranked h1–h6 descendant of the hgroup providing the primary heading for the current section,
      // and with other h1–h6 descendants of the hgroup providing secondary headings for the current section.

      // Otherwise, if the element being entered has a rank equal to or higher than the heading of the last section of the outline of the current outline target,
      // or if the heading of the last section of the outline of the current outline target is an implied heading,
      // then create a new section and append it to the outline of the current outline target element,
      // so that this new section is the new last section of that outline. Let current section be that new section.
      // Let the element being entered be the new heading for the current section.

      // Otherwise, run these substeps:

      // 1. Let candidate section be current section.

      // 2. Heading loop: If the element being entered has a rank lower than the rank of the heading of the candidate section,
      //    then create a new section, and append it to candidate section. (This does not change which section is the last section in the outline.)
      //    Let current section be this new section. Let the element being entered be the new heading for the current section. Abort these substeps.

      // 3. Let new candidate section be the section that contains candidate section in the outline of current outline target.

      // 4. Let candidate section be new candidate section.

      // 5. Return to the step labeled heading loop.

      // Push the element being entered onto the stack. (This causes the algorithm to skip any descendants of the element.)
    }
  }

  protected exit(node: NodeType) {
    // When exiting an element, if that element is the element at the top of the stack
    // Note: The element being exited is a heading content element or an element with a hidden attribute.
    //   Pop that element from the stack.
    const stackTop = this.getStackTopNode();
    if (stackTop === node) {
      this.stack.pop();
    }
    // If the top of the stack is a heading content element or an element with a hidden attribute
    // Do nothing.
    if (isHeadingContent(stackTop) || isHidden(stackTop)) {
      return;
    }
    // When exiting a sectioning content element, if the stack is not empty
    if (isSectioningContent(node) && this.stack.length > 0) {
      // 1. If the current section has no heading, create an implied heading and let that be the heading for the current section.

      // 2. Pop the top element from the stack, and let the current outline target be that element.

      // 3. Let current section be the last section in the outline of the current outline target element.

      // 4. Append the outline of the sectioning content element being exited to the current section. (This does not change which section is the last section in the outline.)

      return;
    }
    // When exiting a sectioning root element, if the stack is not empty
    if (isSectioningRoot(node) && this.stack.length > 0) {
      // 1. If the current section has no heading, create an implied heading and let that be the heading for the current section.

      // 2. Let current section be current outline target's parent section.

      // 3. Pop the top element from the stack, and let the current outline target be that element.

      return;
    }
    // When exiting a sectioning content element or a sectioning root element (when the stack is empty)
    // The current outline target is the element being exited,
    // and it is the sectioning content element or a sectioning root element
    // at the root of the subtree for which an outline is being generated.
    if (isSectioningRoot(node) || isSectioningContent(node)) {
      // If the current section has no heading, create an implied heading and let that be the heading for the current section.
      // if (!this.currentSection) {
      //   currentSection.heading = {implied: true};
      // }

      // Skip to the next step in the overall set of steps. (The walk is over.)
      return;
    }
  }

  protected getStackTopNode(): NodeType {
    return this.stack[this.stack.length - 1];
  }
}
