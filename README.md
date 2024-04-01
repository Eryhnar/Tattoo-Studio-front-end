# Inkedin


<details>
  <summary>Content 📝</summary>
  <ol>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#goal">Goal</a></li>
    <li><a href="#deployment-🚀">Deployment</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#local-installation">Installation</a></li>
    <li><a href="#views">Views</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#decisions">Decisions</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#author">Authort</a></li>
  </ol>
</details>

## About the project
This was the sixth project for an FSD bootcamp at GeeksHubs Academy. The project consisted in making a front-end with react without redux for project 4 (a tattoo studio rest API in typescript and a DB with SQL).    

## Goal
The project required us to make a front-end application in reactjs. It also required the following views and features:

- Home view
- Register view

- Login view
- Editable profile
- Apppointments view
- Create appointment
- Edit appointment
- Delete appointment
- Services view
- Admin view
- See users as admin
- Delete users as admin


## Deployment 🚀
<div align="center">
    coming soon
</div>

## Stack
Technologies employed:
<div align="center">
<a href="https://es.react.dev/">
    <img src= "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
</a>
<a href="">
    <img src= "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
 </div>


## Installation
1. Clone the repo: ` $ git clone https://github.com/Eryhnar/Tattoo-Studio-front-end.git`
2. ` $ npm install `
3. Clone the back-end `$ git clone https://github.com/Eryhnar/tattoo-studio.git`
4. Create an SQL database (docker recommended for this)
5. Connect the back to the database. If the .env is set properly, executing the following command within the ide console will connect to the database ``` $ npm run dev ```
6. In the front project (this one) adjust the route (root) in apiCalls to the address of your api (the repo from step 3)
7. Execute `$ npm run dev` in the front end app and open the address in the browser

## Views
comming soon

## Features

- Sticky header for easy navigation in at all times. In mobile the header disapears when scrolling down but reapears as soon as you scroll up slightly.

- Responsive design

- Redirects: There is a system to redirect users from routes that don't exist or the do not have access to.


## Credentials
    These are some of the credentials provided in the seeder.
    - user@user.com password: Aa123456 (user)
    - admin@admin.com password: Aa123456 (admin)
    - super_admin@super_admin.com password: Aa123456 (super_admin)

## Decisions

- I decided to simplify the design and features vs the capabilities of the back-end given that the extra features would have taken time that right now is better spent researching for other project like the final project.

## Roadmap
- Add Input validations
- Add service crud to admin view
- Add catalogue crud to admin view
- Add appointment crud to admin view
- Improve the style of several views namely, services and catalogue.
- Clean up code.
- Implement the edit functionality for users in the admin view
- Add surname field to user in admin view

## Author 

- **Pedro Fernández** - Project Developer
  - [GitHub](https://github.com/Eryhnar) - [LinkedIn](https://www.linkedin.com/in/pedro-fernandez-bel-68a2b9155/)