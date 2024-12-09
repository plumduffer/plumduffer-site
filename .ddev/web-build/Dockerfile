USER $username
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
RUN PNPM_VERSION=9.15.0 PNPM_HOME=$HOME/.local/share/pnpm PATH=$HOME/.local/share/pnpm:$PATH pnpm add -g npm-check-updates
USER root