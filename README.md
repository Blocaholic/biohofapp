# "Reinwiese Biohof-App" - Website

[BiohofApp.de](https://biohofapp.de/)

## Design Rules

### Whitespace

2, 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128

### Font-Sizes

10, 12, 14, 16, 18, 20, 24, 30, 36, 44, 52, 62, 74, 86, 98

## Database

collation utf8mb4_unicode_520_ci

## Resources

### Icons

[Heroicons](https://heroicons.com/)

## Permissions

- owner: everything
- admin: everything, except to delete farm
- employee: like admin, except planning (just documentation)
- visitor: read only

## Testing

- for API-Tests run ./testing/api-tests.mjs
