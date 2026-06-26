# ─────────────────────────────────────────────────────────────────────────────
# Dockerfile — WORKSHEET (holes are yours to fill).
#
# Goal: a MULTI-STAGE build. Stage 1 builds the static site with the Node
# toolchain; stage 2 serves the built files from a tiny web server. The Node
# toolchain never ships — only the built files + the server do.
#
# Reference you wrote: Second Brain → devops-learning → containerizing-apps.
# Docs:
#   Dockerfile instructions: https://docs.docker.com/reference/dockerfile/
#   Multi-stage builds:      https://docs.docker.com/build/building/multi-stage/
#   Build cache & layers:    https://docs.docker.com/build/cache/
# ─────────────────────────────────────────────────────────────────────────────


# ===== STAGE 1 — BUILD (heavy, disposable) ==================================
#
# HOLE 1 — the build base image.
#   You need the Node toolchain here (this stage RUNS the build). Pick a Node 24
#   image, prefer the small `-alpine` variant, and NAME this stage so stage 2 can
#   copy from it (the `AS <name>` syntax). One `FROM` line.
#   docs: https://docs.docker.com/reference/dockerfile/#from
# << write the FROM line >>
FROM node:24-alpine AS build

# HOLE 2 — the working directory.
#   Set a working dir so subsequent COPY/RUN happen in one place (e.g. /app).
#   docs: https://docs.docker.com/reference/dockerfile/#workdir
# << write the WORKDIR line >>
WORKDIR /app

# HOLE 3 — the layer-caching ordering. THIS IS THE IMPORTANT ONE.
#   You have two things to bring in: (a) the dependency manifest(s), (b) the rest
#   of the source. And two commands to run: install deps, then build.
#   Order them so that changing ONLY app code does NOT bust the dependency-install
#   layer's cache. Ask: which file(s) must change before a reinstall is truly
#   needed? Copy those first, install, THEN copy everything else, THEN build.
#   - install: use the lockfile-exact CI install (you met it in your CI note).
#   - build:   the repo's build script that emits the static export folder.
#   docs (why order matters): https://docs.docker.com/build/cache/
# << write: COPY (manifests) → RUN (install) → COPY (rest) → RUN (build) >>
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# ===== STAGE 2 — RUNTIME (tiny; this is all that ships) =====================
#
# HOLE 4 — the runtime base image.
#   Apply the runtime contract: this app's artifact is static files, so the
#   contract is "serve files". Pick the small static web server we chose. One
#   `FROM` line (no `AS` needed — it's the final stage).
# << write the FROM line >>
FROM nginx:alpine

# HOLE 5 — copy ONLY the artifact across from stage 1.
#   Use `COPY --from=<stage-1-name>` to pull the built static-export folder out of
#   the build stage and into the web root the server serves from. Nothing else
#   crosses the boundary — no node_modules, no source.
#   (Where does this server serve from by default? Check the image's docs.)
#   docs: https://docs.docker.com/reference/dockerfile/#copy
# << write the COPY --from line >>
COPY --from=build /app/out /usr/share/nginx/html

# HOLE 6 — document the port (and CMD only if needed).
#   EXPOSE the port the server listens on (documentation + tooling hint; it does
#   not actually publish the port — `docker run -p` does that). The web server
#   image likely already has a default CMD that starts it, so you may not need a
#   CMD at all. Decide and note why.
#   docs: https://docs.docker.com/reference/dockerfile/#expose
# << write the EXPOSE line (CMD only if the base image lacks one) >>
EXPOSE 80

