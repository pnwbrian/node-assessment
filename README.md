# 6kites Node Code Assessment

# SETUP INSTRUCTIONS

1. Go to http://www.omdbapi.com/ and obtain a new API KEY (http://www.omdbapi.com/apikey.aspx)
2. Copy the file .env.example from the repository to .env
3. Edit .env and replace [YOUR-OMDB-API-KEY] with the API KEY you obtained from omdbapi.com
3. Run bundle install
5. Run ```npm run dev```
6. Navigate to http://localhost:8000 in your browser (use the port you used above)

This app was created using the following:

```
% npm init -y
% touch index.js
% npm i -D nodemon
% npm i ejs
```
Edit package.json to add the following line to the "scripts" section:

```
"dev": "nodemon ./index.js"
```

```
% npm i express
```

### To Run / Test:

```
% npm run dev
```

Browse to http://localhost:8000
