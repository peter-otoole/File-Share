This file contains a list of all the web pages and features to do with this project, it will descript the feature/option and it's benifits/use cases.

##Index Page (Welcome Page)

The Welcome page is shown when a user hits the web application and the server has been confiured for the first time. Viewers have the option to register, sign in and to watch a short video about the application. 

An anoymouse user can request access to the server, the administrator will get a notice about this.

##Configuration Page

The configuration page is loaded when the server is started for the first time, it lets the administrator set som basic options and create an account. It also gives the administrator some basic information about the application.

###Configurable Options:

- Server Name -> This is the server name for this instance, it will appear on the top of every page
- Sort logs in database -> This is a tickbox, asking weather or not you want the server to store it's logs in the mongo database or not
- Select Top level folders (White List) -> This feature allows you to browse through the files and folders on the server and select the top level folders, creating a white list. None can access files outside of the whitelist folders
- Select a top level folder for general users to upload to. Note: a new folder is created there with the User's name for them to upload too
- Set the server's network address -> When a regular user is creating an account, they must confirm their registration throw email, thus the host address is needed


##General Rules

- Only one administrator can be registered with the server
- When the administrator registers, they get a secret key to give to others to create accounts
- The adminstrator is the only one who can change configuration settings
- Any number of regular users can be registed to the server
- In order to create a regular account you must get a sercet key from the administrator 
