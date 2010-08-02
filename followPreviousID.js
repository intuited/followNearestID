/* Enables all of "The Good Parts"
 *   except for "use strict" and Strict white space.
 * I turned off Strict white space
 *   mostly because it doesn't allow one-line if statements.
 */

/*jslint browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true */
/*global window */

(function(maxdepth) {
    var getPreviousID, getSelectionNode, makeURI, followPreviousID;

    getPreviousID = function(node, maxdepth) {
        /* Iterate backwards and upwards through the DOM from `node`.
          * Previous siblings will be recursed to a depth of `maxdepth`,
          *   or completely for `maxdepth < 0`.
          */

        if (maxdepth === undefined) { maxdepth = -1; }

        var getDescendantID, previous, id;

        getDescendantID = function(node, depth) {
            var child, descendant_id;

            if (depth === maxdepth) { return false; }
            child = node.firstChild;
            while (child) {
                if (child.id) { return child.id; }
                if (child.name) { return child.name; }
                descendant_id = getDescendantID(child, depth + 1);
                if (descendant_id) { return descendant_id; }
                child = child.nextSibling;
            }
            return false;
        };

        previous = null;
        while (node) {
            if (node.id) { return node.id; }
            if (node.name) { return node.name; }
            /* Only recurse into siblings; children have already been searched. */
            if (previous && (id = getDescendantID(node, 0))) { return id; }
            node = (previous = node.previousSibling) || node.parentNode;
        }
        return false;
    };

    getSelectionNode = function() { return window.getSelection().baseNode; };

    makeURI = function(base, id) {
        var hashIndex;
        hashIndex = base.lastIndexOf('#');
        if (hashIndex > -1) { base = base.slice(0, hashIndex); }
        return base + '#' + id;
    };

    followPreviousID = function(maxdepth) {
        /* Iterate backward and upward through the DOM,
          *   looking for a node with an ID attribute.
          * `maxdepth` determines the depth to which previous nodes are searched.
          * By default this will be a depth of 2.
          * Passing 0 will prevent searching in subnodes.
          * Passing -1 will result in a full traversal of the previous DOM nodes.
          */
        if (maxdepth === undefined) { maxdepth = 2; }

        var id;
        id = getPreviousID(getSelectionNode(), maxdepth);
        if (id) {
            document.location.href = makeURI(document.location.href, id);
        }
    };

    followPreviousID(maxdepth);
}());
