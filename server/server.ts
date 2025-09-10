import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Twilio } from 'twilio';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS to allow requests from your frontend (running on localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173', // Make sure this matches your frontend's URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware to parse incoming JSON request bodies
app.use(bodyParser.json());

// Initialize Twilio client with credentials from .env
const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

// Get the Twilio Verify service SID from the .env file
const VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SID!;

console.log('Twilio initialized with Account SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('Verify Service SID:', VERIFY_SERVICE_SID);

// Route to send OTP
app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;

  // Validate phone number length
  if (!phone || phone.length !== 10) {
    return res.status(400).json({ success: false, error: 'Invalid phone number' });
  }

  console.log(`Sending OTP to: +91${phone}`);

  try {
    // Request to send OTP through Twilio
    const verification = await client.verify.v2
      .services(VERIFY_SERVICE_SID)
      .verifications.create({ to: `+91${phone}`, channel: 'sms' });

    console.log('OTP sent successfully:', verification.sid);
    // Respond with success and the verification SID
    res.json({ success: true, sid: verification.sid });
  } catch (err) {
    console.error('Error sending OTP:', err);
    // Handle errors (e.g., invalid SID, Twilio service issues)
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// Route to verify OTP
app.post('/verify-otp', async (req, res) => {
  const { phone, code } = req.body;

  // Validate phone number length and code length
  if (!phone || phone.length !== 10 || !code || code.length !== 6) {
    return res.status(400).json({ success: false, error: 'Invalid phone number or OTP' });
  }

  console.log(`Verifying OTP for: +91${phone}, Code: ${code}`);

  try {
    // Request to verify the OTP code
    const check = await client.verify.v2
      .services(VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: `+91${phone}`, code });

    console.log('OTP verification result:', check.status);
    // Respond with the success status based on OTP verification
    res.json({ success: check.status === 'approved' });
  } catch (err) {
    console.error('Error verifying OTP:', err);
    // Handle errors (e.g., invalid code, Twilio service issues)
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

// Start the backend server on port 3000
app.listen(3000, () => {
  console.log('✅ Backend running on http://localhost:3000');
  console.log('🔐 Twilio OTP service ready');
});
