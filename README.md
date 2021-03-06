# API Evaluacion final

Tiny Rest API for teaching purposes. Express, Typescript and Prisma.

## Prerequisites:

Configure your environment variables on `.env` file:

```
DATABASE_URL="mysql://root:root@localhost/test"
JWT_SECRET="secret"
```
Install dependencies with:

```bash
npm install
```

Push DB changes with:

```bash
npx prisma db push
```

## Usage:

The app counts with the following endpoints:

### GET /api/v1/info
Returns information about the app.

### GET /api/v1/ping
Returns 200 code if the app is running.

---

### POST /api/v1/auth/login
Returns a JWT token if the credentials are correct.

**Example request:**

*Method*: `POST`

*Endpoint: `/api/v1/auth/login`*

*Body:*
```json	
{
  "email": "dir@host.com",
  "password": "password"
}
```

**Example succesfully response:**

*Status: `200`*

*Body:*
```json
{
  "token": "<jwt_token>"
}
```

### POST /api/v1/auth/register
Returns the new user if email doesnt exists.

**Example request:**

*Method*: `POST`

*Endpoint: `/api/v1/auth/register`*

*Body:*
```json	
{
  "email": "dir@host.com",
  "password": "password"
}
```

**Example succesfully response:**

*Status: `201`*

*Body:*
```json
{
  "id": 1,
  "email": "dir@host.com"
}
```

---

### GET /api/v1/tasks
Returns all user's tasks. **Requires Bearer Token at Authorization Header**

**Example request:**

*Method*: `GET`

*Endpoint: `/api/v1/tasks`*

**Example succesfully response:**

*Status: `200`*

*Body:*
```json
[
  {
    "id": 1,
    "title": "report 1",
    "content": "daily oil consumption report",
    "done": "true",
    "userId": 1
  }
]
```

### GET /api/v1/tasks/:id
Return a task by id. **Requires Bearer Token at Authorization Header**

**Example request:**

*Method*: `GET`

*Endpoint: `/api/v1/tasks/1`*

**Example succesfully response:**

*Status: `200`*

*Body:*
```json
{
  "id": 1,
    "title": "report 1",
    "content": "daily oil consumption report",
    "done": "true",
    "userId": 1
}
```

### POST /api/v1/tasks
Create a new task for logged user. **Requires Bearer Token at Authorization Header**

**Example request:**

*Method*: `POST`

*Endpoint: `/api/v1/tasks`*

*Body:*
```json
{
  "id": 1,
  "title": "report 1",
  "content": "daily oil consumption report",
  "done": "true",
  "userId": 1
}
```

**Example successfully response:**

*Status: `201`*

*Body:*
```json
{
  "id": 1,
  "title": "report 1",
  "content": "daily oil consumption report",
  "done": "true",
  "userId": 1
}
```

### PUT /api/v1/tasks/:id
Update a task by id. **Requires Bearer Token at Authorization Header**

**Example request:**

*Method*: `PUT`

*Endpoint: `/api/v1/tasks/1`*

*Body:*
```json
{
  "title": "report 2",
  "content": "daily production report"
}
```

**Example successfully response:**
*Status: `204`*

### DELETE /api/v1/tasks/:id
Delete a task by id. **Requires Bearer Token at Authorization Header**

**Example request:**

*Method*: `DELETE`

*Endpoint: `/api/v1/tasks/1`*

**Example successfully response:**

*Status: `204`*