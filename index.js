const express = require('express');
const bodyParser = require('body-parser');
const mime = require('mime-types');
const cors = require('cors');
 
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
console.log(process.env.PORT);

// POST Route for /bfhl
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    let numbers = [];
    let alphabets = [];
    let highestLowercase = '';

    // Validate input and parse data array
    if (data && Array.isArray(data)) {
        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (/[a-zA-Z]/.test(item)) {
                alphabets.push(item);
                if (/[a-z]/.test(item)) {
                    if (item > highestLowercase) highestLowercase = item;
                }
            }
        });
    }

    // File validation (Base64 decoding)
    let fileValid = false;
    let fileMimeType = '';
    let fileSizeKB = 0;

    if (!file_b64) {
        // If file_b64 is missing, send response immediately
        return res.json({
            is_success: true,
            user_id: "suraj diwedi",  // Hardcoded as per example
            email: "sd4043@srnist.edu.in",
            roll_number: "RA2111004010440",
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: [highestLowercase],
            file_valid: false // Indicating no file provided
        });
    }

    // If file_b64 is present, process it
    try {
        const fileBuffer = Buffer.from(file_b64, 'base64');
        fileValid = true;
        fileMimeType = mime.lookup(fileBuffer);
        fileSizeKB = (fileBuffer.length / 1024).toFixed(2); // Convert size to KB
    } catch (err) {
        fileValid = false; // In case of error during Base64 decoding
    }

    // Final response with file details
    res.json({
        is_success: true,
        user_id: "suraj diwedi",  // Hardcoded as per example
        email: "sd4043@srnist.edu.in",
        roll_number: "RA2111004010440",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: [highestLowercase],
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB
    });
});

// GET Route for /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
