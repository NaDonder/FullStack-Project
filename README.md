# FullStack-Project
FrontEnd coupon project using React and (https://github.com/NaDonder/Java-Spring-BackEnd-project) BackEnd system

Project-based on RESTful Service with Spring MVC and building a site with React.
The most popular way to show FrontEnd technologies are using RESTful service and building a website using SPA (Single Page Application)
Using Spring MVC with Embedded Tomcat
sending information between FrontEnd and BackEnd using only JSON.
Exceptions from the BackEnd using Advice and RestController
The System uses JWT. (will be available for 30 min after login or after every request used)

This project shows the React Side of the project (FrontEnd)
The site using SPA (Single Page Application):
the Concept of SPA is while you're on our site you're getting only 1 Page which is the index.html
which uploads the CSS and the JS(TypeScript in this version)
From this point of view, we're building everything on the FrontEnd side with no redirecting to any other site
The moment we want to show info or create data to the BackEnd it will go with AJAX and RESTful Service which will not refresh-
- the site, does not upload  new page and doesn't reset the variables on the FrontEnd.
The information comes in JSON format and the FrontEnd side builds the Page and shows the information.
All using Technologies from React.

You will see:
- FC : using Function Class instead of Component Class. (Also written in TS)
- Layout : which describes how the webpage format is built
- Routing : which uses Routing Component with Default Route and Page Not Found
- Login Component : which after the Login is completed with the ClientType will show the relevant Menu
- Token : for authorization and validation
- Admin/Company/Customer : each have different menu interface and components
- Logout : deletes the Token and goes back to main page
- Models : similar to Java beans
- Redux : for saving the Login user in the App State
- Material UI : for a little bit of design
- Notify : for client-side messages for every action.
- Hooks :  They let you use state and other React features without writing a class.
