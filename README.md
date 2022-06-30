<div align="center">
    <img style = "width:100%;"src="https://i.imgur.com/QPxqVla.png">
</div>
<!-- <hr> -->
<div align=center style="display:flex; justify-content: center;">
        <h2 align=center>EN: Uol Chat Room / PT: Bate Papo Uol</h2>
        <h3 align=center>Web development Project</h3>
        <hr>
        <div align=center>
            <h4>A mock web-app of the famous brazilian Uol chat room used by many people on the internet back in the 00s.</h4>
            <h4>Made with HTML, SCSS and Vanilla JS, it uses a mock API for making HTTP requests, controlling data like users and messages.</h4>
            <h4>This was the fourth project of the Driven full stack web development bootcamp and first to use API requests.</h4>
        </div>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp; 
    <img style = "height:350px;" src="https://media4.giphy.com/media/lEMkRKT0DdU3EHfU68/giphy.gif?cid=790b76119795c78cbd3a76a53bc1587f7dc83b92b0e3b1cd&rid=giphy.gif&ct=g">
    
<br>
</div>
<hr>

## Features

- Unique user autenthication based on API response
- Users can freely chat on the app
- Private and public messages
- Direct messages (they can be private or public) for a specific user
- Status message for when the users enter or leave the chat
- Working sidebar that shows up when clicked on a button
- Chat scrolls down automatically when receiving a new message

## Requirements

- General
    - [x]  Use vanilla JavaScript only
    - [x]  The project must be stored in a public repository on GitHub
    - [x]  Commit every new feature
  
- Layout
    - [x]  Apply a mobile layout provided on figma (it doesn't need to have a desktop layout)
    
- Chat
    - On entering the chat, it must load the messages from the sever and display them on screen
    - [x]  There are 3 types of messages:
        - Status messages (**Entered** or **Left** the chat): must have a grey background
        - Private messages (**Privately**): must have a pink background
        - Normal messages: must have a white background
    - [x]  Every 3 seconds the chat must load the messages again and keep it updated
    - [x]  When new messages arrive, the chat must scroll down automatically to show them
    - [x]  The private messages must show only when the user name matches the message sender or receiver. Although this verification is usually done in the back-end, this time it should be done in the front-end for didactic purposes
    
- Entering the room
    - [x]  On opening the web-app, the user must input it's name to enter the room
    - [x]  After confirming it, the name must be sent to the server to register it
        - If the response is successul, the user can join the room
        - If the server response is an error, it means that this name is already in use and the user must enter a new name
    - [x]  While the user is in the chat, every 5 seconds the app must send an HTTP request to tell the server that the user is still online, or it will be removed from the online list.
- Envio de mensagem
    - [x]  On sending a message, it must be sent to the server
        - [x]  If the response is successul, the chat must load the messages again and update it
        - [x]  If the response is an error, it means that this user is no longer considered online and the page must be reloaded.             
    - [x]  On sending the message, it must be sent the on the request the writer, the receiver and whether is a private message or not.
        

### Built with

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

### Contact

[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/caiodeoliveiralemos/
