#!/bin/sh
set -e
cd /var/www/html

php artisan package:discover --ansi
php artisan config:cache

# La BD ya está "healthy" gracias al compose
php artisan migrate --force

# Datos de ejemplo (productos) solo si la tabla está vacía
if [ "${DB_SEED:-true}" = "true" ]; then
  COUNT=$(php artisan tinker --execute='echo "COUNT=".\App\Models\Product::count();' 2>/dev/null | grep -o 'COUNT=[0-9]*' | cut -d= -f2 || true)
  if [ "${COUNT:-}" = "0" ]; then
    echo "Cargando productos de ejemplo..."
    php artisan db:seed --force
  fi
fi

chown -R www-data:www-data storage bootstrap/cache
exec "$@"
