Perfect 👍
Here’s the full README.md text you can copy-paste directly into your GitHub repo:

---

# 🌍 Wanderlust 1.2

Wanderlust is a full-stack web application inspired by Airbnb.
It allows users to browse, add, and manage travel listings, with features like authentication, authorization, and reviews.

---

## 🚀 Features

* 🏡 Listings Management: Create, edit, view, and delete travel listings.
* 💾 MongoDB Integration: Store listings, reviews, and user details.
* 🔐 Authentication & Authorization:

  * User signup & login using Passport.js (Local strategy).
  * Secure sessions with express-session.
* 💬 Flash Messages: Interactive feedback for user actions.
* ✏️ Review System: Add and manage reviews on listings.
* 🎨 Frontend with EJS:

  * Clean UI with Bootstrap.
  * Modular views using partials (`navbar`, `footer`, `flash`).
* 🌐 RESTful Routes for listings, reviews, and users.

---

## 📂 Project Structure

```
wanderlust1.2/
│── init/              # Initialization scripts
│── models/            # Mongoose models (Listing, Review, User)
│── public/            # Static files (CSS, JS)
│── routes/            # Express routes for listings, reviews, users
│── utils/             # Custom error handling and async utilities
│── views/             # EJS templates
│   ├── includes/      # Navbar, footer, flash messages
│   ├── layouts/       # Base layout (boilerplate)
│   ├── listings/      # Listing-related views
│   ├── users/         # Signup/login views
│── app.js             # Main server file
│── schema.js          # JOI validation schemas
│── package.json       # Project dependencies
```

---

## 🛠️ Tech Stack

**Frontend**

* HTML, CSS, JavaScript
* Bootstrap 5
* EJS Templating

Backend

* Node.js, Express.js
* MongoDB & Mongoose
* Passport.js for authentication

Other Tools

* Joi (input validation)
* Express-Session & Connect-Flash
* Method-Override (PUT/DELETE requests)


## 📦 Dependencies

* express `^5.1.0`
* mongoose `^8.16.4`
* passport `^0.7.0`
* passport-local `^1.0.0`
* passport-local-mongoose `^8.0.0`
* ejs `^3.1.10`
* ejs-mate `^4.0.0`
* joi `^18.0.0`
* connect-flash `^0.1.1`
* express-session `^1.18.2`
* method-override `^3.0.0`
* cookie-parser `^1.4.7`

---

## 🙌 Acknowledgements

* [Airbnb](https://www.airbnb.com/) for inspiration
* Open-source community ❤️


Do you also want me to make a **short version** (just intro + setup + features) for your GitHub front page, or keep this **detailed version**?
