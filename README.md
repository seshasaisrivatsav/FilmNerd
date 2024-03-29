<h1><img src="https://film-nerd.herokuapp.com/project/img/film_nerd_logo.jpg" height=50px> Film Nerd</h1>



<p>Film Nerd is a MEAN Stack project. I built it during my Web Development class at Northeastern University. Film Nerd is a place where all the movie fans can browse for their favorite films. You can check out movies playing near you by ratings. You can rate, review movies, follow your favorite movie reviewer(s). Check Out everything about the film. (Genre, Runtime, release data, cast.)</p>
<ul>
  <li>Check movies shown around you</li>
  <li>Rate and review movies</li>
  <li>Follow popular reviewers</li>
  <li>Check out the actors of a film</li>
</ul>


<h2>Live instance of the project
</h2>
<p>https://film-nerd.herokuapp.com/project/index.html </p>


<h2>Youtube demo</h2>
<a href="https://www.youtube.com/embed/kWUMWL3Ntk8" > Video Link</a>

<h2>Required Installations on local machine</h2>
<img src="https://excellentwebworld.com/wp-content/uploads/2017/09/images-3.jpg" height=190px>

<ol>
  <li>nodeJs</li>
  <li>MongoDB</li>
  <li>ExpressJS</li>
</ol>  





<h2>To run this on your machine, you must</h2>
<ol>
  <li>Uncomment line 33 and comment line 32 in server.js</li>
  <li>Comment lines 14 to 18 in user.service.server.js﻿</li>
  <li>You can run the project by running "node server.js"</li>
</ol>  

 
<h2>Environment Variables</h2>
<p>To enable third party log in </p>
<ol>
  <li>GOOGLE_CLIENT_ID</li>
  <li>GOOGLE_CLIENT_SECRET</li>
  <li>GOOGLE_CALLBACK_URL</li>
</ol>  

<h2>Copyright</h2>
<p style="font-size:50%;">Copyright 2016, Sesha Sai Srivatsav, All rights reserved.</p>
 

<p style="font-size:50%;">Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:</p>

<p style="font-size:50%;">The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.</p>

## Running the app locally
### Prerequisites
1. Node is installed
2. Have an IDE
3. MongoDB must be installed and must be kept running in terminal. See ## mongodb installation below

```shell script
nvm use
npm install ## first time
npm ci ## otherwise
node server.js ## runs server on 3000
```
Navigate to http://localhost:3000/#/

## MongoDB installation
```shell script
# If you still have the old mongodb installed from homebrew-core
brew services stop mongodb
brew uninstall homebrew/core/mongodb

# Use the migrated distribution from custom tap
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
mongo ## starts the database







brew install mongocli ## install mongoDB cli
mongocli help ## verify installation



```
- mongod --dbpath=/Users/user/data/db
