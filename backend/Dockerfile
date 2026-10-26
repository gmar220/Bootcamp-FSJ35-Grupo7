# syntax=docker/dockerfile:1

# ---------- Etapa 1: dependencias de Composer ----------
FROM composer:2 AS vendor
WORKDIR /app
# Solo manifiestos: "composer install" se cachea mientras no cambien
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-scripts \
    --no-autoloader \
    --prefer-dist \
    --no-interaction \
    --ignore-platform-reqs
COPY . .
RUN composer dump-autoload --optimize --classmap-authoritative --no-dev --no-scripts

# ---------- Etapa 2: producción ----------
FROM php:8.2-fpm-alpine AS production

# mbstring, openssl, tokenizer, xml, ctype y json ya vienen compilados en la
# imagen oficial; solo se añaden pdo_mysql y opcache.
RUN apk add --no-cache nginx supervisor \
    && docker-php-ext-install -j"$(nproc)" pdo_mysql opcache \
    && php -m | grep -iE '^(pdo_mysql|mbstring|openssl|tokenizer|xml|ctype|json)$' | sort | tr '\n' ' ' \
    && rm -rf /tmp/* /var/cache/apk/*

COPY docker/php.ini /usr/local/etc/php/conf.d/zz-app.ini
COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /var/www/html
COPY --from=vendor --chown=www-data:www-data /app /var/www/html

RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=5s --start-period=40s --retries=5 \
    CMD wget -qO- http://127.0.0.1/up >/dev/null || exit 1

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
