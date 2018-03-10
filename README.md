Apple Style OTP Input
---------------------


I like the way the OTP input set of fields on Apple's iCloud or
developer website work. This is a common pattern on some banks' websites
as well, but many of them get it wrong. Even though the main
functionality is very simple, there are some obvious edge-cases that
will end up causing a lot of UX issues. For instance, if it's not
correctly implemented, a <kbd>Backspace</kbd> doesn't work as expected;
instead of deleting the value in the previous input box, it deletes the
value in the present input box, and the cursor will advanced to the next
input box.


React kind of makes this easy with all the state machine style hooks
already included as part of the main component life-cycle. Here is a
small attempt I made.


TODO
----

Simplify the keyDown functionality in InputPrompt component.


Running
-------

    yarn
    yarn run start


Visit http://localhost:3000 if all goes well.
