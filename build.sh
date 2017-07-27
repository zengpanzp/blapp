cd /Users/chenpeng/Desktop/coding/vuejs/iBailianAppVue/dist/app/new && git pull
cd /Users/chenpeng/Desktop/coding/vuejs/iBailianAppVue && npm run build
cd /Users/chenpeng/Desktop/coding/vuejs/iBailianAppVue/dist/app/new
git add .
echo -n "Please enter your commit :"
read TESTREAD
git commit -m $TESTREAD
git push origin master
