## Authentication
### Register
- Method: POST
- URL: /api/users/
- Body:
```json
{
  "username": "Wendell",
  "email": "Wendell@example.com",
  "password": "test123",
  "photo": <image_file>
}
```
- Response:
```json
{
  "username": "Wendell",
  "email": "Wendell@example.com"
}
```

### Login
- Method: POST
- URL: /api/token/
- Body:
```json
{
  "username": "Wendell",
  "password": "test123 "
}
```
- Response:
```json
{
  "access": "...",
  "refresh": "..."
}
```

## Posts CRUD (authenticated)
- POST /api/posts/
- GET /api/posts/
- GET /api/posts/{id}/
- PUT /api/posts/{id}/
- DELETE /api/posts/{id}/

(Repeat structure for Comments and Profiles)

## Throttle
- If exceeded:
```json
{
  "detail": "Request was throttled. Expected available in 60 seconds."
}
- Status: 429 Too Many Requests