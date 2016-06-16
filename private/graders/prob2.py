import sys
ln = sys.stdin.read()
if ln.upper() == "HELLO WORLD":
	print "{\"correct\": true, \"message\": \"correct!\"}"
else:
	print "{\"correct\": false, \"message\": \"incorrect :(\"}"