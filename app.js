const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/post-to-facebook', async (req, res) => {
  try {
    const pageId = process.env.PAGE_ID;
    const accessToken = process.env.PAGE_ACCESS_TOKEN;

    // Extract the video file path from the request body
    const { videoFilePath } = req.body;

    if (!videoFilePath) {
      return res.status(400).json({ error: 'Video file path is required in the request body.' });
    }

    // Step 1: Initialize an Upload Session
    const { video_id, upload_url } = await initializeUpload(pageId, accessToken);

    if (!video_id || !upload_url) {
      return res.status(500).json({ error: 'Failed to initialize the upload session.' });
    }

    // Step 2: Upload the Video
    const uploadResult = await uploadVideo(upload_url, videoFilePath, accessToken);

    if (uploadResult.success) {
      // Step 3: Publish the Reel (Additional configuration may be required)
      // You can add the code for publishing the Reel here.
          // Step 4: Get the Upload Status
      const uploadStatus = await getUploadStatus(video_id, accessToken);
 return res.status(200).json({ success: true, videoId: video_id, uploadStatus });
    } else {
      return res.status(500).json({ error: 'Failed to upload the video.' });
    }
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

// Function to Initialize an Upload Session
const initializeUpload = async (pageId, accessToken) => {
  try {
    const apiUrl = `https://graph.facebook.com/v17.0/${pageId}/video_reels`;
    const requestData = {
      upload_phase: 'start',
      access_token: accessToken,
    };

    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(requestData)), // Add Content-Length
      },
    });

    const { video_id, upload_url } = response.data;
    console.log('Video ID:', video_id);

    return { video_id, upload_url };
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return {};
  }
};

// Function to Upload the Video
const uploadVideo = async (uploadUrl, filePath, accessToken) => {
  try {
    const fileSize = fs.statSync(filePath).size;

    const config = {
      headers: {
        'Authorization': `OAuth ${accessToken}`,
        'offset': 0,
        'file_size': fileSize,
        'Content-Type': 'application/octet-stream',
        'Content-Length': fileSize, // Add Content-Length
      },
    };

    const response = await axios.post(uploadUrl, fs.createReadStream(filePath), config);
    console.log('Upload successful:', response.data);

    return { success: true };
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return { success: false };
  }
};
// Function to Get the Upload Status
const getUploadStatus = async (videoId, accessToken) => {
  try {
    const apiUrl = `https://graph.facebook.com/v18.0/${videoId}?field=status&access_token=${accessToken}`;
    const response = await axios.get(apiUrl);

    return response.data;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return { error: 'Failed to retrieve upload status.' };
  }
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
