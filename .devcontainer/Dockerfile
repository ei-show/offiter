FROM ubuntu:24.04

ENV HOME=/root
ENV NVM_DIR=/root/.nvm

# Use bash for the shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apt-get update && \
    apt-get install -y --no-install-recommends git curl ca-certificates

# Create a script file sourced by both interactive and non-interactive bash shells
ENV BASH_ENV "${HOME}/.bash_env"
RUN touch "${BASH_ENV}"
RUN echo '. "${BASH_ENV}"' >> ~/.bashrc

# Download and install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | PROFILE="${BASH_ENV}" bash

WORKDIR /workspace
