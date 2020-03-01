# CMS_Admin_Demo

## A CMS System, manage the data of [cms_website_demo](https://github.com/ismarcochow/cms_website_demo/tree/master)

> ### Introduction
>
> Having permission control & token-based authentication
>
> ### Skills
>
> VueJS + Express + Mongoose

## Build Setup

```bash
# Clone project
git clone git@github.com:chowchunlok/financial_management.git

# Install dependencies
npm install

# Serve with hot reload at localhost:9000
npm run dev

```

## Main Function

1. Log In/Log Out
+ Every page needs valid token
+ Save token in cookie
+ vuex

![log in](./gif/login.gif)



2. Permission Control

- Different Roles can read different pages (admin role has register page but editor role)

![premission control](https://user-images.githubusercontent.com/26892819/75628615-b93be400-5c15-11ea-99be-c7603d697746.gif)

3. Edit Article
+ only admin can delete article from database(editor just delete online)
+ comments(add in furture...)

![edit article](./gif/edit.gif)

4. Check User

![user](./gif/user.png)
