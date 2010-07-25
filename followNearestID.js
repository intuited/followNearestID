getContextID = function (node) {
  while (node) {
    if (node.id) { return node.id; };
    previous = node.previousSibling;
    node = previous ? previous : node.parentNode;
  };
  return false;
};
getSelectionNode = function() { return window.getSelection().baseNode; };
makeURI = function(base, ID) {
  hashIndex = base.lastIndexOf('#');
  if (hashIndex > -1) { base = base.slice(0, hashIndex); };
  return base + '#' + ID;
};
followNearestID = function() {
  id = getContextID(getSelectionNode());
  if (id) { document.location.href = makeURI(document.location.href, id); };
};
followNearestID();
