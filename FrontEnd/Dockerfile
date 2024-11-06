FROM node:16-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
ARG REACT_APP_BASE_API_URL
ARG REACT_APP_PUBLIC_URL
ARG REACT_APP_RECAPTCHA_V2_SITE_KEY

ENV REACT_APP_BASE_API_URL=$REACT_APP_BASE_API_URL
ENV REACT_APP_PUBLIC_URL=$REACT_APP_PUBLIC_URL
ENV REACT_APP_RECAPTCHA_V2_SITE_KEY=$REACT_APP_RECAPTCHA_V2_SITE_KEY

RUN npm ci 
# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
