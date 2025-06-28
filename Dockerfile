# Use a Python image with uv pre-installed
FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

# Install the project into `/app`
WORKDIR /app

# Enable bytecode compilation
ENV UV_COMPILE_BYTECODE=1

# Copy from the cache instead of linking since it's a mounted volume
ENV UV_LINK_MODE=copy

# Copy pyproject.toml first
COPY pyproject.toml ./

# Install dependencies and generate lock file if it doesn't exist
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --no-dev

# Then, add the rest of the project source code and install it
# Installing separately from its dependencies allows optimal layer caching
ADD . /app
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --no-dev

# Place executables in the environment at the front of the path
ENV PATH="/app/.venv/bin:$PATH"

# Reset the entrypoint, don't invoke `uv`
ENTRYPOINT []

# Set the working directory to the app directory
WORKDIR /app/app

# Expose port 80
EXPOSE 80

# Run the Chainlit application
CMD ["chainlit", "run", "samantha.py", "--host", "0.0.0.0", "--port", "80"]