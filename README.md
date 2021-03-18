# Installation Instructions

##Install Docker
If you haven't already installed Docker on your machine, install iot first.
<br/>
Instructions can be found on `https://www.docker.com/get-started`

## Insert .env file
In order to get the APP to run, a `.env` has to be put in the `user_logins` directory.
<br/>
The following Variables have to be inserted:
<br/>
* `PRIV_KEY_PASSPHRASE=insert_your_passphrase`
* `MONGO_DB=mongodb://user_db`

The mongo connection string ist okay and doesn't need to be changed if no changes in the code are implemented.
<br/>

##Generating a new key pair for JWT validation
Before the App is used in a production environment, a new public-private needs to be generated, since the ones that are already in, are publicly available on GitHub 
<br/>
If you just want to test the application, you can skip this step and just start the application

1. run the `generateKeyPai.js` file
    1. go into the terminal and navigate to the directory `/user_logins/cryptography`
    2. run the file with `node generateKeyPair`
    3. you should now have two files `priv.pem` and `pub.pem` in this directory
   
2. move `priv.pem` into the directory `/user_logins/jwt` and replace the already existing file
3. mode `priv.pem` into the directory `/user_logins/jwt` replace the already existing file

##Start the application
you can now start the application by running `docker-compose up -d --build --remove-orphans`

##How it works
* **Register a User:**
    * send a post-request to `http://test.localhost/register`
    * set a header with `content-type: application/json`
    * include the following as JSON in the request body: <br/>
    ```json
      {
        "name": "your_name",
        "mail": "your.mail@mail.com",
        "password": "very_secure"
      }   
    ```
  * the body of the response you will get a success-message, as well as a token and an expires in value.<br/>
    Please set the value of the token as the `Authorization`-Header when accessing a secured route
    
* **Renew a token that has expired:**
    * if you already have a user, an only need a new token, please use the route `http://test.localhost/login`
    * just include the same body as in the register-route. (You don't need the name, since the user is searched by his e-mail)
    * you will get the same response as you would get from the register-route
    
* **Use a dummy-route to test the token:**
    * if you want to test the received token, you can send a request to `http://tester.localhost`
    * use the token in the authorization-header of the request
    * since this is a dummy-route, you don't need any content in the body
    *the answer will just be a "Hello World" message 