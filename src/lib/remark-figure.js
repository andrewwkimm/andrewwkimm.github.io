import { visit } from 'unist-util-visit';

/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Html} Html
 */

/**
 * Escapes the characters that would break out of HTML text content.
 *
 * @param {string} value
 * @returns {string}
 */
function escapeText(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

/**
 * Escapes a value for use inside a double-quoted HTML attribute.
 *
 * @param {string} value
 * @returns {string}
 */
function escapeAttribute(value) {
  return escapeText(value).replaceAll('"', '&quot;');
}

/**
 * Wraps a standalone image paragraph in a figure, promoting alt text to a caption.
 *
 * A paragraph holding nothing but one image becomes a figure. Alt text becomes the
 * caption when present; an empty alt renders the image with no caption. Images inside
 * a sentence are left inline and untouched.
 *
 * @returns {(tree: Root) => void}
 */
export function remarkFigure() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || index === undefined) return;
      if (node.children.length !== 1) return;

      const image = node.children[0];
      if (image.type !== 'image') return;

      const caption = (image.alt ?? '').trim();
      const markup = caption
        ? `<figure><img src="${escapeAttribute(image.url)}" alt="${escapeAttribute(caption)}" />` +
          `<figcaption>${escapeText(caption)}</figcaption></figure>`
        : `<figure><img src="${escapeAttribute(image.url)}" alt="" /></figure>`;

      /** @type {Html} */
      const figure = { type: 'html', value: markup };

      parent.children[index] = figure;
    });
  };
}

export default remarkFigure;
