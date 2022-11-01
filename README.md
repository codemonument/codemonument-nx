# Codemonument-Nx

A Nx Monorepo for codemonument stuff

Contains currently one plugin called `nx-vserv` for creating self-hosted apps based on docker-compose.

## Repo Log

### 2022-11-01 Create generator `ansible-runner` in `nx-vserv`

`npx nx generate @nrwl/nx-plugin:generator ansible-runner --project=nx-vserv --description='Generates an ansible runner app for running your vserv apps' --no-interactive`

### 2022-10-01 Create plugin `nx-npm-app`

1. `npx nx g @nrwl/nx-plugin:plugin --name nx-npm-app --importPath @codemonument/nx-npm-app`

### 2022-10-01 Create executor `ansible` in `nx-vserv`

1. `npx nx generate @nrwl/nx-plugin:executor ansible --project=nx-vserv --description='Runs an ansible command or playbook' --no-interactive`

### 2022-11-01 Repo Creation

1. `npx create-nx-plugin codemonument-nx --pluginName nx-vserv`
