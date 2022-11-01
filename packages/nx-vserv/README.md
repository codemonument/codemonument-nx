# nx-vserv

A nx plugin to help manage monorepos with so-called "vserv-apps".

A vserv-app is a git repo (or an app in this nx monorepo) which mostly consists of a docker-compose file and is intended do be deployed into a custom environment on a plain ubuntu or debian root virtual server.
This custom environment can be set up via ansible.

## Executors

- currently none

## Generators

- `@codemonument/nx-vserv:app` generats a new vserv app project
- `@codemonument/nx-vserv:ansible-runner` generates a project which can be used to setup the environemnt for all vserv projects on a fresh server
  and to setup a vserv-app on a server

## Interesting Links

Github Repo: https://github.com/codemonument/codemonument-nx
npmjs.org:
