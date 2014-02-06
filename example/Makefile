bundle.js: ./index.js ../*.js
	browserify -d -t reactify ./index.js -o ./bundle.js

watch:
	watchify -d -t reactify ./index.js -o ./bundle.js
