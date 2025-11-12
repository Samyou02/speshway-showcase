const Contact = require('../models/Contact');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sendEmail = require('../utils/email');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only PDF, DOC, DOCX files
  const allowedTypes = /pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed for resume uploads'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// @desc    Submit contact form
// @route   POST /api/contact/submit
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, type } = req.body;

    // Validate required fields based on type
    if (type === 'resume') {
      // For resume submissions, resume file is required
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Resume file is required for job applications'
        });
      }
      // Name, email, and subject are required, message is optional
      if (!name || !name.trim() || !email || !email.trim() || !subject || !subject.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and position are required fields'
        });
      }
    } else {
      // For regular contact, all fields except phone are required
      if (!name || !name.trim() || !email || !email.trim() || !subject || !subject.trim() || !message || !message.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields'
        });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create contact submission
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      subject: subject.trim(),
      message: message && message.trim() ? message.trim() : (type === 'resume' ? 'No additional message provided.' : ''),
      type: type || 'contact'
    };

    // Handle file upload if present
    if (req.file) {
      contactData.resume = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      };
    }

    const contact = await Contact.create(contactData);

    // If a resume was uploaded, send a professional email to admin
    if (req.file && type === 'resume') {
      const resumeUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      const companyName = 'Speshway Solutions Private Limited';
      const submissionDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      try {
        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: `New Job Application: ${subject}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Times New Roman', Times, serif; background-color: #f5f5f5;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      <!-- Header -->
                      <tr>
                        <td style="padding: 40px 40px 30px 40px; border-bottom: 2px solid #00d4ff;">
                          <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: bold; font-family: 'Times New Roman', Times, serif;">
                            ${companyName}
                          </h1>
                          <p style="margin: 10px 0 0 0; color: #666666; font-size: 16px; font-family: 'Times New Roman', Times, serif;">
                            New Job Application Received
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Date -->
                      <tr>
                        <td style="padding: 20px 40px 10px 40px;">
                          <p style="margin: 0; color: #666666; font-size: 14px; font-family: 'Times New Roman', Times, serif;">
                            ${submissionDate}
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Application Details -->
                      <tr>
                        <td style="padding: 10px 40px 20px 40px;">
                          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                            <h2 style="margin: 0 0 15px 0; color: #1a1a1a; font-size: 18px; font-weight: bold; font-family: 'Times New Roman', Times, serif;">
                              Candidate Information
                            </h2>
                            <table width="100%" cellpadding="5" cellspacing="0">
                              <tr>
                                <td style="padding: 8px 0; color: #666666; font-size: 14px; font-family: 'Times New Roman', Times, serif; width: 120px;"><strong>Name:</strong></td>
                                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-family: 'Times New Roman', Times, serif;">${name}</td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0; color: #666666; font-size: 14px; font-family: 'Times New Roman', Times, serif;"><strong>Email:</strong></td>
                                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-family: 'Times New Roman', Times, serif;"><a href="mailto:${email}" style="color: #00d4ff; text-decoration: none;">${email}</a></td>
                              </tr>
                              ${phone ? `
                              <tr>
                                <td style="padding: 8px 0; color: #666666; font-size: 14px; font-family: 'Times New Roman', Times, serif;"><strong>Phone:</strong></td>
                                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-family: 'Times New Roman', Times, serif;"><a href="tel:${phone}" style="color: #00d4ff; text-decoration: none;">${phone}</a></td>
                              </tr>
                              ` : ''}
                              <tr>
                                <td style="padding: 8px 0; color: #666666; font-size: 14px; font-family: 'Times New Roman', Times, serif;"><strong>Position:</strong></td>
                                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-family: 'Times New Roman', Times, serif;">${subject}</td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0; color: #666666; font-size: 14px; font-family: 'Times New Roman', Times, serif;"><strong>Resume:</strong></td>
                                <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-family: 'Times New Roman', Times, serif;">${req.file.originalname} (${(req.file.size / 1024 / 1024).toFixed(2)} MB)</td>
                              </tr>
                            </table>
                          </div>
                          
                          ${message ? `
                          <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #00d4ff; margin-bottom: 20px;">
                            <h3 style="margin: 0 0 10px 0; color: #1a1a1a; font-size: 16px; font-weight: bold; font-family: 'Times New Roman', Times, serif;">
                              Cover Letter / Additional Message
                            </h3>
                            <p style="margin: 0; color: #1a1a1a; font-size: 14px; line-height: 1.8; white-space: pre-wrap; font-family: 'Times New Roman', Times, serif;">
                              ${message}
                            </p>
                          </div>
                          ` : ''}
                          
                          <p style="margin: 0; color: #1a1a1a; font-size: 14px; line-height: 1.8; font-family: 'Times New Roman', Times, serif;">
                            <strong>Note:</strong> The candidate's resume is attached to this email. Please review the application and respond accordingly through the admin panel.
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="padding: 20px 40px 40px 40px; border-top: 1px solid #e0e0e0; background-color: #f8f9fa;">
                          <p style="margin: 0; color: #666666; font-size: 12px; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">
                            This is an automated notification from ${companyName}. Please log in to the admin panel to manage this application.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
          attachments: [
            {
              filename: req.file.originalname,
              path: req.file.path,
            },
          ],
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // We don't want to block the user response if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been submitted successfully',
      data: contact
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: error.message
    });
  }
};

// @desc    Get all contact submissions (admin only)
// @route   GET /api/contact/submissions
// @access  Private/Admin
const getSubmissions = async (req, res) => {
  try {
    const submissions = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve submissions',
      error: error.message
    });
  }
};

// @desc    Get single submission
// @route   GET /api/contact/submission/:id
// @access  Private/Admin
const getSubmission = async (req, res) => {
  try {
    const submission = await Contact.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve submission',
      error: error.message
    });
  }
};

// @desc    Update submission status
// @route   PUT /api/contact/submission/:id/status
// @access  Private/Admin
const updateSubmissionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const submission = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Submission status updated successfully',
      data: submission
    });
  } catch (error) {
    console.error('Update submission status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update submission status',
      error: error.message
    });
  }
};

// @desc    Reply to submission
// @route   POST /api/contact/submission/:id/reply
// @access  Private/Admin
const replyToSubmission = async (req, res) => {
  try {
    const { message } = req.body;
    const submission = await Contact.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Reply message is required'
      });
    }

    // Get admin user info
    const adminName = req.user?.name || 'Admin';
    const adminEmail = req.user?.email || process.env.FROM_EMAIL;

    // Add reply to submission
    submission.replies.push({
      message: message.trim(),
      repliedBy: adminName
    });

    // Update status to replied
    submission.status = 'replied';

    await submission.save();

    // Send email to the submitter
    try {
      const replySubject = submission.subject 
        ? `Re: ${submission.subject}` 
        : 'Response to Your Inquiry - Speshway Solutions Private Limited';

      const companyName = 'Speshway Solutions Private Limited';
      const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

      await sendEmail({
        to: submission.email,
        subject: replySubject,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Times New Roman', Times, serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 30px 40px; border-bottom: 2px solid #00d4ff;">
                        <h1 style="margin: 0; color: #1a1a1a; font-size: 24px; font-weight: bold; font-family: 'Times New Roman', Times, serif;">
                          ${companyName}
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Date -->
                    <tr>
                      <td style="padding: 20px 40px 10px 40px;">
                        <p style="margin: 0; color: #666666; font-size: 14px; font-family: 'Times New Roman', Times, serif;">
                          ${currentDate}
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Greeting -->
                    <tr>
                      <td style="padding: 10px 40px 20px 40px;">
                        <p style="margin: 0; color: #1a1a1a; font-size: 16px; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">
                          Dear ${submission.name},
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                      <td style="padding: 0 40px 20px 40px;">
                        <p style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 16px; line-height: 1.8; font-family: 'Times New Roman', Times, serif;">
                          Thank you for contacting ${companyName}. We have received your inquiry and appreciate the time you took to reach out to us.
                        </p>
                        <p style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 16px; line-height: 1.8; font-family: 'Times New Roman', Times, serif;">
                          Please find our response below:
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Reply Message Box -->
                    <tr>
                      <td style="padding: 0 40px 20px 40px;">
                        <div style="background-color: #f8f9fa; border-left: 4px solid #00d4ff; padding: 20px; margin: 20px 0;">
                          <p style="margin: 0; color: #1a1a1a; font-size: 16px; line-height: 1.8; white-space: pre-wrap; font-family: 'Times New Roman', Times, serif;">
                            ${message.trim()}
                          </p>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Reference Section -->
                    <tr>
                      <td style="padding: 20px 40px; background-color: #f8f9fa; border-top: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0;">
                        <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px; font-weight: bold; font-family: 'Times New Roman', Times, serif;">
                          Reference Information:
                        </p>
                        <p style="margin: 0 0 5px 0; color: #666666; font-size: 14px; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">
                          <strong>Subject:</strong> ${submission.subject || 'General Inquiry'}
                        </p>
                        <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">
                          <strong>Date of Inquiry:</strong> ${new Date(submission.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Closing -->
                    <tr>
                      <td style="padding: 30px 40px 20px 40px;">
                        <p style="margin: 0 0 15px 0; color: #1a1a1a; font-size: 16px; line-height: 1.8; font-family: 'Times New Roman', Times, serif;">
                          Should you have any further questions or require additional assistance, please do not hesitate to contact us. We are here to help.
                        </p>
                        <p style="margin: 0 0 10px 0; color: #1a1a1a; font-size: 16px; line-height: 1.8; font-family: 'Times New Roman', Times, serif;">
                          We look forward to the opportunity to assist you.
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                      <td style="padding: 20px 40px 40px 40px; border-top: 1px solid #e0e0e0;">
                        <p style="margin: 0 0 5px 0; color: #1a1a1a; font-size: 16px; font-family: 'Times New Roman', Times, serif;">
                          Sincerely,
                        </p>
                        <p style="margin: 10px 0 5px 0; color: #1a1a1a; font-size: 16px; font-weight: bold; font-family: 'Times New Roman', Times, serif;">
                          ${adminName}
                        </p>
                        <p style="margin: 5px 0 0 0; color: #666666; font-size: 14px; font-family: 'Times New Roman', Times, serif;">
                          ${companyName}
                        </p>
                        <p style="margin: 15px 0 0 0; color: #666666; font-size: 12px; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">
                          This is an automated response. Please do not reply directly to this email.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the request if email fails, but log it
    }

    res.status(200).json({
      success: true,
      message: 'Reply sent successfully',
      data: submission
    });
  } catch (error) {
    console.error('Reply to submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send reply',
      error: error.message
    });
  }
};

// @desc    Delete submission
// @route   DELETE /api/contact/submission/:id
// @access  Private/Admin
const deleteSubmission = async (req, res) => {
  try {
    const submission = await Contact.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    // Delete associated resume file if exists
    if (submission.resume && submission.resume.path) {
      fs.unlink(submission.resume.path, (err) => {
        if (err) console.error('Error deleting resume file:', err);
      });
    }
    
    await submission.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Submission deleted successfully'
    });
  } catch (error) {
    console.error('Delete submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete submission',
      error: error.message
    });
  }
};

module.exports = {
  submitContact,
  getSubmissions,
  getSubmission,
  updateSubmissionStatus,
  replyToSubmission,
  deleteSubmission,
  upload
};