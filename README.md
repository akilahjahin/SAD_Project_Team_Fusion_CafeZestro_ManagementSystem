# Project Overview
Team Fusion's &nbsp;**CaféZestro Management System**&nbsp; is a web-based application designed to streamline operations and enhance staff experience at &nbsp;**CaféZestro**&nbsp;.&nbsp;&nbsp;&nbsp;It provides tools for managing orders, inventory, staff, and staff interactions, ultimately improving efficiency and satisfaction.

# Features
- **Order management:** &nbsp;&nbsp;&nbsp;Create, fulfill customer orders with printouts of Billing.
- **Inventory management:** &nbsp;&nbsp;&nbsp;Inventory update, delete, add, edit features of products and categories.
- **User management:** &nbsp;&nbsp;&nbsp;Manage user login credentials, authentication and information.

# For Frontend
1. Open new terminal.
2. ```cd frontend```
3. ```npm i``` (One time if not installed before)
4. ```npm run dev```

# For Backend
1. Open new terminal.
2. ```cd backend```
3. Add your `.env` inside backend.
4. ```npm i``` (One time if not installed before)
5. ```npm start```

# NOTE:
1. Install ```node.js, next.js, react@bootstrap``` VSCode
2. Install necessary extensions for **react.js, next.js, node.js, tailwind.css**
3. **Cloning repository**
    1. Open Folder (new)
    2. Open the folder in cmd/ git bash
    3. Clone command:  **git clone <repo -url>**    <br>
    4. It will be better if pulled from 1 branch(master) only: for this, you should write: <br><br>
        1. Navigate to the project directory where you want to clone the repository. <br>
        2. Then, open that directory in git-bash/ cmd/ terminals. <br>
        3. Write the git-clone commands: <br>
            **git clone --branch master https://github.com/akilahjahin/SAD_Project_Team_Fusion_CafeZestro_ManagementSystem**
<br> <br>
**If a problem arises, just pull contents from the master branch since the feature/add-login functionality branch has the backend codes only, but incomplete, whereas the master branch contains all files.
Then, the repository cloned to the specific folder.** <br>
** Add the .env file** (if not added) in the backend folder or modify (if present in backend already) : <br> Within it, adjust the database password; also correct the email, pass into an organizational one (e.g. iut-mail and password) <br>
Open the files in a workspace in VS Code <br>
5. **In the frontend terminal, write ‘npm i’ only once and never again, this creates the node-modules for the frontend. Then write: ‘npm run dev’, always whenever you want to turn on the system anew. 
Follow the terminal instructions of ‘Ctrl+link’ afterwords**
6. **In the backend terminal, write ‘npm i’ only once and never again, this creates the node-modules for the backend. Then write: ‘npm start’ , always whenever you want to turn on the system anew.**

# **There are 3 contributors:**
- **akilahjahin** --- Akilah Jahin Bushra **(ID : 2100 41 &nbsp;252)**
- **shuQrah** --- Nambejja Shukrah Hadijah **(ID : 2100 41 &nbsp;250)**
- **NaimamohAli** --- Nima Mohamed Ali **(ID : 2100 41 &nbsp;256)**

<br> <br>
**If 'npm i' not run once (and only once after each new user clones the repository) as per above instructions, node-modules won't be created.**
**If the .env file isn't there, built one as per the given example**
# .env structure
```
PORT = 8081

DB_PORT = 3306
DB_HOST = localhost
DB_USERNAME = root
DB_PASSWORD = 'xxx' // Insert your DB Pass here
DB_NAME = cafenodejs
// We needed to create database with this DB_NAME

ACCESS_TOKEN = [128charpassword_APIgenerated]

EMAIL = xxx@iut-dhaka.edu // Insert and organizational-email in place of 'xxx'
PASSWORD = 'xxx' // Insert your PASSWORD in place of 'xxx'

USER = user
```
