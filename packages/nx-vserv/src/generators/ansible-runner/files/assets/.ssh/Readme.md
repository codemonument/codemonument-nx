# SSH known_hosts file for ansible controller docker container

This file will be bound to /root/.ssh/known_hosts inside the ansible controller docker container,
so that connecting to hosts mentioned in this file does not trigger a ssh warning about untrusted connections.

Insert your known-hosts manually there and commit them to the repo :)
