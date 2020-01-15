# Cram Overflow



CramOverflow is my open source Computer Science ISU, it is a clone of StackOverflow but for students.

# Features

  - Login and signup system with email verification
  - Question and Answer system with voting
  - Automatic profiles setup
  - Real time chats with distinctive rooms for each topic
 
# ISU Part
### Flow Chart
![alt text](https://raw.githubusercontent.com/mero789/schoolhelp/master/ISU%20Computer%20Science%20Flow%20Chart%20(1).png)

### IDE Used and Why
I used the atom editor for a couple of reasons. To begin with, I am very familiar with the framework used to make it and its source code. So I could customize it to my liking; for example, I can easily change the highlighting color or the pointer color etc... Atom, being made by GitHub, is very well integrated with git and github. So I don't have to end by running processes just to add or push content to my repository, I could simply do it from the editor. 

### My SDK
I used Webpack, gulp and nodemon for a few reasons. For starters, gulp allows me to watch for changes in my source code and run a process accordingly. Webpack, unlike other JavaScript bundlers, allows for development mode. This enables the users to view their source code to better debug errors and change their code in real time. Nodemon allows me to edit my server in real time which proved to be very helpful while developing the API for my server. 


# Major Issues Encouterd and How I Solved Them

### EventEmitter memory leak
The first major issue I ran into was the `(node) warning: possible EventEmitter memory leak detected. 11 listeners added` I encountered this error in my previous HTML project where I hadn't optimized my socket usages. So I spent a few days researching and trying to figure out how I could do this. My first solution was to increase the max event emitters, however, this can cause issues when publishing my site online. My second thought was, why not run two seperate servers simultaniously one different ports. One for sockets and one for API requests.

### Running 2 servers synchronously
How in the world was I going to run 2 node js servers synchronously on two different ports without interfering with one another. At first I thought I could do that using a new npm module which runs two commands at the same time. But, if I were to publish the site it wouldn't work. So my next solution was to export my servers from each server file. I.E. `module.exports=server` this would be a server from my main server file, then `module.exports=server` would be my server from the socket server file. Then I created a main file which imports both servers and specifices which ports they will be listening to and starts both of them at the same time. By doing this, it prevented any errors or interferance occuring between them.


# Conclusion

### Reflection
I am very proud of this project, this is the first project where I have used 3 seperate servers all which are running at the same time without any interferance. This is also the biggest React project I have done and I completed it very successfully under a time constraint. My project uses a database, XMLHttpRequests, Sockets and a virtualDOM all together. 

### Applications
I am keeping this project open sourced for future students to see and learn from. When I was learning how to code I found that taking other people's projects and learning from them taught me a diverse amount of programing techniques and styles. All of which allowed me to learn programing faster. For example, if it wasn't for Raining Chain's open source online multiplayer game tutorial I would've never learned so much about sockets and how to use them in a short period of time. Programing is something one can't be taught, you have to teach yourself. I want this project to help people learn more about programing in JavaScript.



# Installation

You need to have Node Js installed on your device, then install the dependinces using the below steps and run gulp and you're all good to go!


```sh
$ npm install
$ gulp
```




# Development

Want to contribute? Great!

Cram Overflow uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

#### Building for source
For production release:
```sh
$ gulp dist
```



### Todos

 - Add real time voice chat
 - Add Night Mode
 - Add profile editing maybe

License
----

MIT



[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [Gulp]: <http://gulpjs.com>
