echo -n "Please enter your commit :"
read TESTREAD
git add . ; git commit -m $TESTREAD ; git push
