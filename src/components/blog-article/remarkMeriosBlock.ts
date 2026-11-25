/**
 * remark plugin for /blog/[slug]: wraps the article's own Merios section (the
 * first H2 that names Merios — "How Merios helps", "How Merios Tracks This"…
 * — down to the next H2 or thematic break) in a <MeriosBlock> element, so the
 * page can set it as its one ink block ("How Merios tracks this" in the Open
 * Sky mockup).
 *
 * Presentation only: every node is kept, in its order, and nothing is added
 * to the text. The H2 still renders through the MDX `h2` override (same id,
 * same TOC anchor). Articles without such a section are left untouched.
 */

interface MdNode {
  type: string;
  depth?: number;
  value?: string;
  name?: string;
  attributes?: unknown[];
  data?: Record<string, unknown>;
  children?: MdNode[];
}

function plainText(node: MdNode): string {
  if (typeof node.value === "string") return node.value;
  return (node.children ?? []).map(plainText).join("");
}

function isMeriosHeading(node: MdNode): boolean {
  return (
    node.type === "heading" &&
    node.depth === 2 &&
    /\bmerios\b/i.test(plainText(node))
  );
}

function endsSection(node: MdNode): boolean {
  return (
    (node.type === "heading" && (node.depth ?? 6) <= 2) ||
    node.type === "thematicBreak"
  );
}

export default function remarkMeriosBlock() {
  return (tree: MdNode) => {
    const nodes = tree.children;
    if (!nodes) return;
    const start = nodes.findIndex(isMeriosHeading);
    if (start === -1) return;

    let end = start + 1;
    while (end < nodes.length && !endsSection(nodes[end])) end++;

    const block: MdNode = {
      type: "mdxJsxFlowElement",
      name: "MeriosBlock",
      attributes: [],
      data: { _mdxExplicitJsx: true },
      children: nodes.slice(start, end),
    };
    nodes.splice(start, end - start, block);
  };
}
