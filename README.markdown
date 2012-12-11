followPreviousID
----------------

Moves backward and upward in the DOM
to find the closest node with an ID attribute
(i.e. one which can be targeted in the URL fragment).
If it finds one, updates the document URL to include that fragment.

The main function is parameterized
to allow the maximum search depth to be limited.

Useful for bookmarklets.

Tested on Chrome and Chrome only.

Doesn't rely on any external frameworks.

TODO
----

-   Create a Makefile of some variety that spits out a minified bookmarklet
-   Write some tests
