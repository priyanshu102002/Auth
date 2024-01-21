# Step for Auth

## 1. Create a new project
- Create a new project using react and creating backend using express
- Creating frontend and making all pages (routes) , components 
- Creating backend and making all routes and controllers
- Creating error handling middleware
- Creating custom error handling middleware

- Creating user model and schema (username, email, password)
- Creating user controller (signup, login)

## 2. SignUp
- Taking data from req.body (username, email, password)
- store it into data base using new User({})
- Hashing password using bcryptjs
- Saving user and hashed password into database using user.save()
- isLoading and error to show loading and error at frontend

- Sending the response into frontend and redirecting into home page


## 3. Login
- Taking data from req.body (email, password)
- Finding user using email (User.findone(email))
- Comparing hashed password and password
- Creating token using jwt
- Saving token(access_token) into cookie using res.cookie()
- isLoading and error to show loading and error at frontend

- Sending the response into frontend and redirecting into home page
- Sending the token into frontend through cookie

- Saving data using redux (cookie)


