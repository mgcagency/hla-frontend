import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '227354370974-nqld96gtbcjggqnbl16b6bvsnevjpasm.apps.googleusercontent.com';

const SCOPE = 'https://www.googleapis.com/auth/drive.file';

const DriveUpload = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPE,
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleUpload = async (file) => {
    const accessToken = gapi.auth.getToken().access_token;

    const metadata = {
      name: file.name,
      mimeType: file.type,
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    try {
      const response = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: form,
        }
      );
      const data = await response.json();
      console.log('File uploaded:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <button onClick={handleAuthClick}>Sign In</button>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            handleUpload(file);
          }
        }}
      />
    </div>
  );
};

export default DriveUpload;
