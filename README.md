# node-postgres-crud
CRUD-Node.js-PostgreSQL
## Environment Setup

To run this project, make sure you have the following installed on your system
1. Node.js
2. PostgreSQL
3. express


## How to install
1. cd to project folder
2. open terminal and run commands

```bash
npm install

```

```bash
node index.js
```


GET request - SQL will touch the api database inside pool.query() select all users and order by id. <br />
POST a new user - extracting the properties and inserting the values with INSERT <br />
PUT updated data in an existing user <br />
DELETE a user by its unique identifier

To get information from the database, use this URL : http://localhost:3000/users

## Testing
make sure the app is running on port 3000 <br />
To make sure the requests work use Postman, enter request URL (mentioned above)
1. GET request - just send the URL http://localhost:3000/users
2. POST request - in body, choose raw and json format to type in details of a new user as follows:
```bash
  {
    "name": "nini",
    "phone": "123445671",
    "email": "nini@gmail.com"
  }
```
3. PUT request - indicate the id number in the URL, and in json format type in details of updated user information:
```bash
  {
    "name": "nini",
    "phone": "123446771",
    "email": "nini@gmail.com"
  }
```
4. DELETE request - indicate the id number that wants to be removed in the URL <br />
 Example: http://localhost:3000/users/2
<br />
Email and phone keys have validations: <br />
1. email - in correct format <br />
2. phone - must be digits (in this case, american phone number)
