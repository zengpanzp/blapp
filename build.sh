cd /Users/chenpeng/Desktop/coding/vuejs/iBailianAppVue/dist/app/new && git pull
cd /Users/chenpeng/Desktop/coding/vuejs/iBailianAppVue && npm run build

echo -n "Please enter your commit :"
read TESTREAD
cd /Users/chenpeng/Desktop/coding/vuejs/iBailianAppVue/dist/app/new
git add .
git commit -m $TESTREAD
git push origin master
