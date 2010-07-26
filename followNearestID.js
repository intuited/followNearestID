function getPreviousID(node, maxdepth) {
  /* Iterate backwards and upwards through the DOM from `node`.
   * Previous siblings will be recursed to a depth of `maxdepth`,
   *   or completely for `maxdepth < 0`.
   */

  if (maxdepth == undefined) maxdepth = -1;

  function getDescendantID(node, depth) {
    if (depth == maxdepth) return false;
    var child = node.firstChild;
    while (child) {
      if (child.id) return child.id;
      var descendant_id = getDescendantID(child, depth + 1);
      if (descendant_id) return descendant_id;
      child = child.nextSibling;
    };
    return false;
  };

  var previous = null;
  var id;
  while (node) {
    if (node.id) return node.id;
    /* Only recurse into siblings; children have already been searched. */
    if (previous && (id = getDescendantID(node, 0))) return id;
    node = (previous = node.previousSibling) || node.parentNode;
  };
  return false;
};

function getSelectionNode() { return window.getSelection().baseNode; };

function makeURI(base, id) {
  var hashIndex = base.lastIndexOf('#');
  if (hashIndex > -1) base = base.slice(0, hashIndex);
  return base + '#' + id;
};

function followPreviousID(maxdepth) {
  /* Iterate backward and upward through the DOM,
   *   looking for a node with an ID attribute.
   * `maxdepth` determines the depth to which previous nodes are searched.
   * By default this will be a depth of 2.
   * Passing 0 will prevent searching in subnodes.
   * Passing -1 will result in a full traversal of the previous DOM nodes.
   */
  if (maxdepth == undefined) maxdepth = 2;

  var id = getPreviousID(getSelectionNode(), maxdepth);
  if (id) { document.location.href = makeURI(document.location.href, id); };
};

followPreviousID();
