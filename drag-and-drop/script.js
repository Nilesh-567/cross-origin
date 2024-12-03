    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const preview = document.getElementById('preview');
    const uploadButton = document.getElementById('upload-button');
    const responseUrl = document.getElementById('response-url');
  
    let selectedFile = null;
  
    // Drag and drop events
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
      console.log('Dragover triggered');
    });
  
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
      console.log('Dragleave triggered');
    });
  
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      const files = e.dataTransfer.files;
      console.log('Files dropped:', files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    });
  
    // File input change event
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        console.log('File selected:', fileInput.files[0]);
        handleFile(fileInput.files[0]);
      }
    });
  
    // Click to trigger file input
    uploadArea.addEventListener('click', () => {
      if (!selectedFile) {
      fileInput.click();
      }
      console.log('Upload area clicked');
    });

    // Handle selected file
    function handleFile(file) {
      if (file && file.type.startsWith('image/')) {
        selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          preview.src = e.target.result;
          preview.hidden = false;
          console.log('Image preview generated');
        };
        reader.readAsDataURL(file);
        uploadButton.disabled = false;
      } else {
        alert('Please upload a valid image file.');
        console.log('Invalid file type');
      }
    }


    uploadButton.addEventListener('click', async () => {
      if(selectedFile)  {
      const formData = new FormData();
      formData.append('myfile', selectedFile); 
  
      uploadButton.textContent = 'Uploading...';
      uploadButton.disabled = true;
  
      try {
        console.log('Uploading file...');
        const response = await fetch('https://cross-origin-dbww.onrender.com', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) throw new Error('Upload failed.');
  
        const data = await response.json();
        console.log('Response from server:', data);
        responseUrl.textContent = `Uploaded URL: ${data.url}`;
        responseUrl.style.display = 'block';
      } catch (error) {
        console.error('Error during upload:', error);
        alert(error.message);
      } finally {
        uploadButton.textContent = 'Upload';
        uploadButton.disabled = false;
      }
      }
    });
