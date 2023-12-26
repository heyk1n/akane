FROM mcr.microsoft.com/devcontainers/base:ubuntu

ENV DENO_INSTALL=/home/vscode/.deno
RUN curl -fsSL https://deno.land/x/install/install.sh | sh \
    && chown -R vscode $DENO_INSTALL

ENV PATH=${DENO_INSTALL}/bin:${PATH}