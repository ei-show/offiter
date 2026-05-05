FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
  git \
  curl \
  && rm -rf /var/lib/apt/lists/*

ENV NVM_DIR=/root/.nvm

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash \
  && echo '. "$NVM_DIR/nvm.sh"' >> /root/.bashrc

WORKDIR /workspace
