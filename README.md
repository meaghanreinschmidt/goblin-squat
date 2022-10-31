# Goblin Squat

*Duration: 2 Week Sprint*

Goblin Squat is designed for users to plan, log, and track daily workouts. 

### Screenshot

![Screen Shot 2022-10-31 at 1 15 02 PM](https://user-images.githubusercontent.com/98852538/199080343-4e7fb683-ac50-4484-93d0-d36e9cc517a7.png)
![Screen Shot 2022-10-31 at 1 15 21 PM](https://user-images.githubusercontent.com/98852538/199080357-bf72f966-1415-45fa-bc4c-73e7795da638.png)

### Usage

1. As a user, I want to create a new workout
2. As a user, I want to create an exercise within that workout
3. As a user, I want to edit, complete, and delete workouts and exercises
4. As a user, I want to view all completed workouts
5. As a user, I want to view and update my information

## Getting Started

### Prerequisites 

Make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://www.npmjs.com/package/nodemon)


### Installation

1. Create a database named `goblin_squat` (Postico recommended)
   - If you would like to name your databse something else, you will need to change `goblin-squat` to the name of your new database name in `server/modules/pool.js`
2. Run the queries from the `database.sql` file into your database
3. Run `npm install` in your terminal
4. Create an `.env` file in the project and paste this line ino the file:

  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

5. Start postgres if not running already by using `brew services start postgresql`
6. Run `npm run server` in your terminal. 
7. Run `npm run client ` in another terminal. 
8. Navigate to `localhost:3000`

## Testing 

### Debugging 

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

### Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password
   2. `POST /api/user/login` will login a user, see body to change username/password
   3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## Deployment

### Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Built With

1. ![image](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
2. ![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
3. ![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
4. 7. ![image](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
5. ![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
6. ![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
7. ![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
8. ![image](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
9. ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
10. ![image](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
11. ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
12. ![image](https://img.shields.io/badge/Redux%20saga-86D46B?style=for-the-badge&logo=redux%20saga&logoColor=999999)
13. ![image](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

## Authors
* **Meaghan Reinschmidt - *Initial Work* - [meaghanreinschmidt](https://github.com/meaghanreinschmidt)

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgment 

Thanks to [Prime Digital Academy](https://www.primeacademy.io/) and the members of the Phrygian cohort who equipped and helped me to make this application a reality.

## Support
If you have suggestions or issues, please email me at [reinschmidtmeaghan@gmail.com](mailto:reinschmidtmeaghan@gmail.com)

## The Future of Goblin Squat 
1. A Progress Chart is in the works for the user to track their progress through workouts and exercises
2. I would like to implement a social aspect of this app so that users can view and share workouts across other users
