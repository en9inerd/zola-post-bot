# Zola Post Bot

> **Note**: This repository has been archived. It depends on [TeleBuilder](https://github.com/en9inerd/telebuilder), which relies on the [GramJS](https://github.com/gram-js/gramjs) library that is no longer actively maintained. If you're looking for a replacement, check out [PostPal](https://github.com/en9inerd/postpal) — a similar project written in Go.

Telegram bot to copy new posts from a channel to a Zola blog based on GitHub Actions.

Example of adopted Zola theme: [after-dark](https://github.com/en9inerd/after-dark)

## How it works

When a new post is published in a Telegram channel, the bot will create new post in the Zola blog and push it to the repository.

## ASCII diagram of the workflow

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

## Configuration

All available configuration options are listed in the [config/default.js](config/default.js) file.
