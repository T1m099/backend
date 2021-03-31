# Server Installation Instructions

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
* `PEPPER=some_random_chars`


The mongo connection string ist okay and doesn't need to be changed if no changes in the code are implemented.
<br/>

Put another `.env` file with the following content in the `user_events` directory.
* `ENCRYPT_KEY=blablabla`

##Generating a new key pair for JWT validation
Before the App is used in a production environment, a new public-private needs to be generated, since the ones that are already in, are publicly available on GitHub 
<br/>
1. Install the dependencies for that file   
2. run the `generateKeyPair.js` file
    1. go into the terminal and navigate to the directory `/user_logins/cryptography`
    2. run the file with `node generateKeyPair`
    3. you should now have two files `priv.pem` and `pub.pem` in this directory
   
3. move `priv.pem` into the directory `/user_logins/jwt` and replace the already existing file
4. mode `pub.pem` into the directory `/user_events/authentification` replace the already existing file

##Set up certificates for SSL
Create the folder `certificates` in the `traefik/certificates` directory and insert
the file `server-cert.crt` with the certificate for ssl.
Also insert the file `priv.pem` with the corresponding key.


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
    * if you already have a user, an only need a new token, please POST to the route `http://test.localhost/login`
    * just include the same body as in the register-route. (You don't need the name, since the user is searched by his e-mail)
    * you will get the same response as you would get from the register-route
  <br/><br/>
     * for now, tokens expires after an hour  
      
    
* **Working Routes:** (all of them are protected and need JWT for access)
  * **Events**
    *  **GET** `http://tester.localhost/event`
        * returns all events for the user
    * **POST** `http://tester.localhost/event`
        * create a new event
    * **PUT** `http://tester.localhost/event`
        * update a calendar entry --> give the `_id` in the body
    * **DELETE** `http://tester.localhost/event`
        * delete a calendar entry --> give the `_id` in the body
  * **Settings** (stores the values the user wants to track that can be configured in the settings)
    * **GET** `http://tester.localhost/settings`
        * returns the array `user_settings` with the tracked values per user
    * **POST** `http://tester.localhost/settings`
        * set the settings for the user on creation (for the first time)
    * **PUT** `http://tester.localhost/settings`
        * update the `user_settings`
    * **DELETE** `http://tester.localhost/settings`
        * delete the settings for that user --> no request-body required
  * **Medications**
    * **GET** `http://tester.localhost/medications`
        * get the medications for a user
    * **POST** `http://tester.localhost/medications`
        * create new medication 
    * **DELETE** `http://tester.localhost/medications`
      * delete the settings for that user --> put the `_id` in the request-body
    * **PUT** `http://tester.localhost/settings`
      * update the specific medication --> supply _id in the request-body
      * the title and the user_id are not modifiable --> please delete the old one and create a new one if this is to be changed 
    
Change put in event types and medication because of the id when updating (does it work like that)
@fabienne --> testen







    * you can make a calendar entry by POSTing to `http://tester.localhost/calendar/entry`
        * remember to set the Token in the Authorization header
        * in the body as JSON the following variables can be submitted for now:
          ```
            start_time: {
            type: Date,
            required: true
            },
            end_time: {
            type: Date,
            required: true
            },
            title: {
            type: String,
            required: true
            },
            description: {
            type: String
            },
            colour: {
            type: String,
            }
          ```
    * to retrieve the all the calendar entries send a GET-request to `http://tester.localhost/calendar/entries` <br/>
      the response will look like this:
      ```json
        [
          {
          "_id": "60551370ea650100a680a824",
          "start_time": "2021-03-19T00:00:00.000Z",
          "end_time": "2021-03-23T00:00:00.000Z",
          "title": "not so Important!!!"
          },
          {
          "_id": "605513ee2389db00b4a0bd81",
          "start_time": "2021-03-19T00:00:00.000Z",
          "end_time": "2021-03-23T00:00:00.000Z",
          "title": "a little bit Important!!!"
          }
        ]
      ```
      
    * refresh token: Post `http://test.localhost/refresh`
      * put the mail and the hashed password, that is in the response body of the routes /register, /login, /refresh