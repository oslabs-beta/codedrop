# Codedrop

<a href="https://github.com/oslabs-beta/codedrop//blob/main/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/oslabs-beta/codedrop"></a>
<a href="https://github.com/oslabs-beta/codedrop/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/oslabs-beta/codedrop"></a>
<a href="https://github.com/oslabs-beta/codedropLess/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/oslabs-beta/codedrop"></a>


- [About](https://github.com/oslabs-beta/codedrop/#About)
- [Features](https://github.com/oslabs-beta/codedrop/#Features)
- [Getting Started](https://github.com/oslabs-beta/codedrop/#Getting-Started])
- [Contributors](https://github.com/oslabs-beta/codedrop/#Contributors)

# About

Codedrop is a web based, rapid prototyping tool, which enables developers to create React and Angular components via drag and drop. Codedrop seeks to bridge the communication gap between visual creation/design and code generation by allowing users to visually create components and view javascipt code with the framework of their choice.

# Features

 - User friendly drag and drop of html elements via React DnD
 - Easily update CSS styles in GUI
 - Toggle to view code in multiple javascript frameworks
 - Save, reuse and share components

# Getting Started

Fork and clone the repo.

This project requires:

- [Dgraph](https://dgraph.io/) database to store components and projects
- [Firebase](https://firebase.google.com/) database for authorization 
- [SendGrid](https://sendgrid.com/) as a secure third party authenticator for email deliver

Follow the instructions below to create a file for your environment variables and set up each service. 

# Set-up:

<details><summary>Show instructions for setting up .env folder</summary><br>

- Create a .env file in the root directory and copy the .env example listed below, into the file.
- Follow the instuctions for setting up services. Replace .env EXAMPLE with your environment variables.

---

```
NEXT_PUBLIC_GQL_URI=EXAMPLE
NEXT_PUBLIC_DGRAPGH_API_KEY=EXAMPLE

FIREBASE_API_KEY=EXAMPLE
FIREBASE_AUTH_DOMAIN=EXAMPLE
FIREBASE_PROJECT_ID=EXAMPLE
FIREBASE_STORAGE_BUCKET=EXAMPLE
FIREBASE_MESSAGING_SENDER_ID=EXAMPLE
FIREBASE_APP_ID=EXAMPLE

SENDGRID_SERVER=EXAMPLE
SENDGRID_PORT_UNENCRYPTED=EXAMPLE
SENDGRID_PORT_TLS=EXAMPLE
SENDGRID_PORT_SSL=EXAMPLE
SENDGRID_USERNAME=EXAMPLE
SENDGRID_PASSWORD=EXAMPLE
SENDGRID_FROM=EXAMPLE

NEXTAUTH_URL=http://localhost:3000

SKIP_PREFLIGHT_CHECK = true
```

</details><br>

<details><summary>Show instructions for setting up Dgraph</summary><br>

[Dgraph](https://dgraph.io/) is a GraphQL cloud platform. It is a simple way to implement a GraphQL backend for applications, build apps, unite data and scale operations.

To get started, head over to [Dgraph](https://dgraph.io/) and either log in or create an account.

- Click on 'Interactive Tutorial' or 'Launch new backend' to create a new backend.
- After your backend is created, copy the 'GraphQl Endpoint' and paste it in your .env.

```
NEXT_PUBLIC_GQL_URI=YOUR_GRAPHQL_ENDPOINT
```

- Next, click on 'Schema' to access the schema. Copy and paste the schema below, into the 'GraphQL Schema':

```
type User  {
    username: String! @search(by:[exact]) @id
    projects: [Project] @hasInverse(field:user) 
}

type Project  {
    id: String! @id
    projectName: String 
    user: [User] 
    layout: String!
    created: String
    modified: String
    components: [Component] @hasInverse(field: "projects")
}

type Component @withSubscription {
    id: String! @id
    containerStyle: String
    type: String!
    src: String
    style: String
    value: String
    labelStyle: String
    projects: [Project] @hasInverse(field: "components")
}
```

- Click 'deploy'. Your database and schema are now deployed!
- Access to the graph can be restricted by adding an API key. This is optional. To add an API key go to 'Settings>API Keys'. Click 'Create New'. An API key should be generated and immediately copied and added to the .env. If using an API key, return to 'Schema' click on 'Access' and toggle to disallow anonymous access.

```
NEXT_PUBLIC_DGRAPGH_API_KEY=YOUR_API_KEY
```

- This concludes set up of Dgraph.

</details><br>

<details><summary>Show instructions for setting up Firebase</summary><br>

[Firebase](https://firebase.google.com/) is a suite of solutions provided by google. In this case, it is used as a database provider for [NextAuth](https://next-auth.js.org/), and it stores users and sessions. Documentation for configuring NextAuth.js and Firebase can be found [here](https://next-auth.js.org/adapters/firebase) and [here](https://support.google.com/firebase/answer/7015592#zippy=%2Cin-this-article). 

To get started go to [Firebase](https://firebase.google.com/). 

- Create a new account if needed, then click on 'Get Started', then on 'Add project'.
- Name your app, leave everything as default, click 'Continue', then click 'Create Project'.
- Next, create an app in your project by clicking on the web icon '</>'.
- Add a nickname and click 'Register app'.
- Copy the information from the firebaseConfig object, to your .env file

```
FIREBASE_API_KEY=YOUR_apiKey
FIREBASE_AUTH_DOMAIN=YOUR_authDomain
FIREBASE_PROJECT_ID=YOUR_projectId
FIREBASE_STORAGE_BUCKET=YOUR_storageBucket
FIREBASE_MESSAGING_SENDER_ID=YOUR_messagingSenderId
FIREBASE_APP_ID=YOUR_appId
```    

- Click 'Continue to console'. 
- From the console, select 'Firestore Database' from the left-hand menu,and click on 'Create database'.
- Select a mode and a location, then click 'enable'.

This concludes set-up of firebase.

</details><br>

<details><summary>Show instructions for setting up SendGrid</summary><br>

[SendGrid](https://sendgrid.com/) is an email service provider offering scalabiliy and flexibly delivery. It will be used as the email provider with NextAuth.

To get started, head over to [SendGrid](https://sendgrid.com/) and create and account by clicking on 'Start for free'. Here is a helpful [video](https://youtu.be/61sMBUOUVww) on setting up NextAuth with SendGrid - only the portion of the video on SendGrid is directly applicable to this repo.

- Create an account
- Create a sender identity
- Integrate using SMTP Relay by clicking on Email API>Integration Guide>SMTP Relay and then click on create an API KEY. 
- Copy the environment variables into the .env file.

```
SENDGRID_SERVER=YOUR_SERVER
SENDGRID_PORT_UNENCRYPTED=YOUR_PORT
SENDGRID_PORT_TLS=YOUR_PORT_FOR_TLS_CONNECTIONS
SENDGRID_PORT_SSL=YOUR_PORT_FOR_SSL_CONNECTIONS
SENDGRID_USERNAME=YOUR_USERNAME
SENDGRID_PASSWORD=YOUR_PASSWORD
```

- In the .env, add your email, which can be found in Settings>Sender Authentication

```
SENDGRID_FROM=YOUR_EMAIL
```

- Verify the SMTP integration 
- This concludes set up of SendGrid   

</details><br>

<details><summary>Show instructions for package installation</summary><br>

This project was created using node.js version 16.4.2 and npm version 7.19.1. To install the packages included in this repo:

```
npm install
```

</details><br>

# Contributors

Creators:<br>
[Emily Tschida](https://github.com/theTschida)<br>
[Abid Ramay](https://github.com/aramay)<br>
[Dan Yeoman](https://github.com/dyeoman2)<br>
[Blake Myrick](https://github.com/bamche)<br>

A big thank you to [Anne Zhou](https://github.com/annezhou920) for laying the groundwork on complex nested drag and drop user interfaces!
