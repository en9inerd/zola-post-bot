# Zola Post Bot

Telegram bot to copy new posts from a channel to a Zola blog based on GitHub Actions.

Example of adopted Zola theme: [after-dark](https://github.com/en9inerd/after-dark)

## How it works

When a new post is published in a Telegram channel, the bot will create new post in the Zola blog and push it to the repository.

## ASCII diagram

```
 +-------------------------+       +------------------+      +-----------------------+   
 | Telegram Channel        |       | Telegram Bot     |      | GitHub Repository     |
 |  (New Post Published)   | ----> |  Listens for     |      |  (Zola Blog)          |
 |                         |       |  New Posts       |      |                       |
 +-------------------------+       +------------------+      +-----------------------+
                                         |                                |
                                         |                                |
                                         v                                |
                                 +------------------+                     |
                                 |   Creates New    |                     |
                                 | Zola Blog Post   |                     |
                                 +------------------+                     |
                                         |                                |
                                         v                                |
                                 +------------------+                     |
                                 |  Push to GitHub  | ------------------> |
                                 +------------------+                     |
                                                                          v
                                                          +-----------------------------+
                                                          | GitHub Actions Workflow     |
                                                          | (Build & Deploy)            |
                                                          +-----------------------------+
                                                                    |
                                                                    v
                                                         +----------------------------+
                                                         | Zola Blog Website          |
                                                         | (Post is Published)        |
                                                         +----------------------------+
```
