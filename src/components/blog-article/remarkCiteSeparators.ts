/**
 * remark plugin for /blog/[slug]: marks a `<Cite />` that directly follows
 * another one (`…normal.<Cite id="a" /><Cite id="b" />`) with an `after`
 * prop, so the second superscript prints its comma: "¹,²". A citation with
 * words before it, even when an earlier citation sits in the same sentence,
 * gets no comma (`normal.",³` came from a CSS sibling rule that could not
 * see the text in between).
 *
 * Whitespace between two citations is dropped, so "¹ ²" reads "¹,²" too.
 * The source text is untouched; only the MDX tree is annotated.
 */

interface MdNode {
  type: string;
  name?: string | null;
  value?: string;
  attributes?: unknown[];
  children?: MdNode[];
}

function isCite(node: MdNode | undefined): boolean {
  return (
    node !== undefined &&
    (node.type === "mdxJsxTextElement" || node.type === "mdxJsxFlowElement") &&
    node.name === "Cite"
  );
}

function isBlank(node: MdNode | undefined): boolean {
  return node !== undefined && node.type === "text" && (node.value ?? "").trim() === "";
}

function mark(parent: MdNode): void {
  const kids = parent.children;
  if (!kids) return;
  for (let i = 0; i < kids.length; i++) {
    const node = kids[i];
    if (isCite(node)) {
      // Drop blank text between this citation and the next one.
      while (isBlank(kids[i + 1]) && isCite(kids[i + 2])) kids.splice(i + 1, 1);
      if (isCite(kids[i - 1])) {
        node.attributes = [
          ...(node.attributes ?? []),
          { type: "mdxJsxAttribute", name: "after", value: null },
        ];
      }
    } else {
      mark(node);
    }
  }
}

export default function remarkCiteSeparators() {
  return (tree: MdNode) => {
    mark(tree);
  };
}
