FROM node:24-bookworm-slim

RUN apt-get update && apt-get install -y \
  git \
  curl \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g \
  @anthropic-ai/claude-code \
  @openai/codex

WORKDIR /workspace
