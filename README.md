# reel-publish-graphApi
## Posting Reels to Facebook Page API

An overview and usage instructions for an API that allows users to post reels to a Facebook Page using the Facebook Graph API.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
4. [Endpoints](#endpoints)
   - [POST `/post-to-facebook`](#post-to-facebook)
5. [Example Requests](#example-requests)
6. [Error Handling](#error-handling)
7. [Troubleshooting](#troubleshooting)
8. [Code: `app.js`](#appjs)
9. [Environment Variables: `.env`](#env)
10. [Postman Example](#postman-example)

---

## 1. Introduction <a name="introduction"></a>

Welcome to the documentation for our API that enables users to post reels to a Facebook Page using the Facebook Graph API. This guide provides necessary setup steps, usage instructions, and relevant details for successful interaction with the API.

## 2. Prerequisites <a name="prerequisites"></a>

Before using the API, ensure you have the following prerequisites:

- A Facebook Developer account
- Node.js and npm installed
- Basic knowledge of API concepts

## 3. Getting Started <a name="getting-started"></a>

Follow these steps to set up the project and configure the necessary environment variables:

1. Clone the Repository:
   Clone the repository to your local machine using the command:
   ```bash
   git clone https://github.com/jainnick/reel-publish-graphApi
   ```

2. Install Dependencies:
   Navigate to the project directory and install the required dependencies:
   ```bash
   cd <project_directory>
   npm install
   ```

3. Create `.env` File:
   Create a `.env` file in the project directory and add your credentials:
   ```plaintext
   PAGE_ACCESS_TOKEN=your-access-token
   PAGE_ID=your-page-id
   ```

## 4. Endpoints <a name="endpoints"></a>

### POST `/post-reel-to-facebook` <a name="post-reel-to-facebook"></a>

Uploads a reel to a Facebook Page.

- **Request:**
  - Method: POST
  - URL: `http://localhost:3000/post-to-facebook`
  - Headers:
    - `Content-Type: application/json`
    - `Content-Type: multipart/form-data`
  - Body:
    ```json
    {
      "reelFilePath": "path/to/your/reel.mp4"
    }
    ```

- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    {
    "success": true,
    "videoId": "Your-video-id",
    "uploadStatus": {
        "updated_time":"",
        "id": "Post-id"
    }
}
    ```

## 5. Example Requests <a name="example-requests"></a>

- **Uploading a Reel:**
  ```json
  {
    "videoFilePath": "path/to/local/reel.mp4"
  }
  ```

## 6. Error Handling <a name="error-handling"></a>

- If the reel file path is not provided, you'll receive a `400 Bad Request` response.
- If there's an issue with the API request, you'll receive an appropriate error response.

## 7. Troubleshooting <a name="troubleshooting"></a>

- If you encounter errors, check the error response for more information.
- Verify your access tokens and credentials.

## 8. Code: `app.js` <a name="appjs"></a>

```javascript
// The code for app.js is provided in the attached document.
```

## 9. Environment Variables: `.env` <a name="env"></a>

```plaintext
// The content of the .env file is provided in the attached document.
```

## 10. Postman Example <a name="postman-example"></a>

![image](https://github.com/jainnick/reel-publish-graphApi/assets/114552954/89c985cb-9b78-4707-9892-3379e61d1718)

