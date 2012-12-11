followPreviousID
----------------

Moves backward and upward in the DOM
to find the closest node with an ID attribute
(i.e. one which can be targeted in the URL fragment).
If it finds one, updates the document URL to include that fragment.

The main function is parameterized
to allow the maximum search depth to be limited.
The depth defaults to 2; passing -1 will give an unlimited search depth.

Useful for bookmarklets.

Tested on Chrome and Chrome only.

Doesn't rely on any external frameworks.

Started life as [gist #489116](http://gist.github.com/489116).


TODO
----

-   Create a Makefile of some variety that spits out minified text suitable for a bookmarklet
-   Write some tests
