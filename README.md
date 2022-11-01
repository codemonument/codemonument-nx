# Codemonument-Nx

A Nx Monorepo for codemonument stuff

Contains currently one plugin called `nx-vserv` for creating self-hosted apps based on docker-compose.

## Repo Log

### 2022-10-01 Create executor `ansible`

1. `npx nx generate @nrwl/nx-plugin:executor ansible --project=nx-vserv --description='Runs an ansible command or playbook' --no-interactive`

### 2022-11-01 Repo Creation

1. `npx create-nx-plugin codemonument-nx --pluginName nx-vserv`
