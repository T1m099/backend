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
1. In the folder run `npm install dotenv`
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

#Technologies used
* Passport.js for the authorization of the jwt tokens (the jwt-strategy has been used)
* Mongoose for database-modelling
* Docker and Docker-Compose for containerization 
* Dotenv for global variables 

