#!/usr/bin/env bash

docker rm keycloak-testing-container || true

cd "dist_keycloak"

docker run \
   -p 8080:8080 \
   --name keycloak-testing-container \
   -e KEYCLOAK_ADMIN=admin \
   -e KEYCLOAK_ADMIN_PASSWORD=admin \
   -v "$(pwd)/target/keycloakify-starter-keycloak-theme-6.0.3.jar":"/opt/keycloak/providers/keycloakify-starter-keycloak-theme-6.0.3.jar" \
   -v "$(pwd)/src/main/resources/theme/account-v1":"/opt/keycloak/themes/account-v1":rw \
   -v "$(pwd)/src/main/resources/theme/keycloakify-starter":"/opt/keycloak/themes/keycloakify-starter":rw \
   -v "$(pwd)/src/main/resources/theme/keycloakify-starter_retrocompat":"/opt/keycloak/themes/keycloakify-starter_retrocompat":rw \
   -it quay.io/keycloak/keycloak:23.0.6 \
   start-dev --features=declarative-user-profile
