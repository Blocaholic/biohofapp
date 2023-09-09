# HTTPie console commands

## Expect result

https post biohofapp.de/api/auth/123 password=12345678901234567890123456789012

## Expect error

https post biohofapp.de/api/auth/123 password=1234567890123456789012345678901
https post biohofapp.de/api/auth password=12345678901234567890123456789012
https post biohofapp.de/api/auth/123
