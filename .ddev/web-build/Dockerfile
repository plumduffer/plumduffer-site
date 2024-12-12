ENV PNPM_VERSION="9.15.0"
ENV PNPM_HOME="/home/$username/.local/share/pnpm"
ENV PATH="/home/$username/.local/share/pnpm:$PATH"

USER $username
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
RUN pnpm add -g npm-check-updates
USER root