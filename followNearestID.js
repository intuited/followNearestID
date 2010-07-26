function getDescendantID(node) {
  var child = node.firstChild;
  while (child) {
    if (child.id) return child.id;
    var descendant_id = getDescendantID(child);
    if (descendant_id) return descendant_id;
    child = child.nextSibling;
  };
  return false;
};

function getContextID(node) {
  var previous = null;
  var id;
  while (node) {
    if (node.id) return node.id;
    /* Only recurse into siblings; children have already been searched. */
    if (previous && (id = getDescendantID(node))) return id;
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
function followNearestID() {
  var id = getContextID(getSelectionNode());
  if (id) { document.location.href = makeURI(document.location.href, id); };
};
followNearestID();
