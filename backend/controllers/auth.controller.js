const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/users.model")
const sendEmail = require("../utils/email");

const signup = catchAsync(async (req, res, next) => {
    const { fullname, email, password } = req.body
    
    const newUser = await User.create({ fullname, email, password })
    const code = newUser.createEmailVerificationCode();
    await newUser.save({ validateBeforeSave: false });
    const url = `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email/${code}`;
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Email</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    padding: 20px;
                }
                
                .email-container {
                    max-width: 550px;
                    width: 100%;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    overflow: hidden;
                }
                
                .header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-align: center;
                    padding: 40px 20px;
                }
                
                .header-icon {
                    font-size: 60px;
                    margin-bottom: 15px;
                }
                
                .header h1 {
                    font-size: 28px;
                    font-weight: 600;
                    margin-bottom: 10px;
                }
                
                .header p {
                    font-size: 14px;
                    opacity: 0.9;
                }
                
                .content {
                    padding: 40px 30px;
                    background: white;
                }
                
                .greeting {
                    font-size: 18px;
                    color: #333;
                    margin-bottom: 20px;
                    line-height: 1.5;
                }
                
                .message {
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 30px;
                }
                
                .info-box {
                    background: #f7f9fc;
                    border-left: 4px solid #667eea;
                    padding: 15px 20px;
                    margin-bottom: 30px;
                    border-radius: 8px;
                }
                
                .info-box p {
                    color: #555;
                    font-size: 14px;
                    line-height: 1.5;
                    margin: 5px 0;
                }
                
                .button-container {
                    text-align: center;
                    margin: 30px 0;
                }
                
                .verify-button {
                    display: inline-block;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-decoration: none;
                    padding: 14px 35px;
                    border-radius: 50px;
                    font-weight: 600;
                    font-size: 16px;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                    border: none;
                    cursor: pointer;
                }
                
                .verify-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
                }
                
                .alt-link {
                    text-align: center;
                    margin: 20px 0;
                    font-size: 14px;
                }
                
                .alt-link a {
                    color: #667eea;
                    text-decoration: none;
                    border-bottom: 1px dashed #667eea;
                }
                
                .alt-link a:hover {
                    color: #764ba2;
                }
                
                .expiry-notice {
                    background: #fff3cd;
                    border: 1px solid #ffeaa7;
                    padding: 12px 15px;
                    border-radius: 8px;
                    margin: 20px 0;
                    font-size: 13px;
                    color: #856404;
                }
                
                .expiry-icon {
                    display: inline-block;
                    margin-right: 8px;
                }
                
                .footer {
                    background: #f8f9fa;
                    padding: 20px 30px;
                    text-align: center;
                    border-top: 1px solid #e9ecef;
                }
                
                .footer p {
                    color: #888;
                    font-size: 12px;
                    line-height: 1.5;
                    margin: 5px 0;
                }
                
                .footer a {
                    color: #667eea;
                    text-decoration: none;
                }
                
                @media (max-width: 480px) {
                    .content {
                        padding: 30px 20px;
                    }
                    
                    .header h1 {
                        font-size: 24px;
                    }
                    
                    .verify-button {
                        padding: 12px 30px;
                        font-size: 14px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <div class="header-icon">📧</div>
                    <h1>Verify Your Email</h1>
                    <p>Secure your account in just one click</p>
                </div>
                
                <div class="content">
                    <div class="greeting">
                        👋 Hello there!
                    </div>
                    
                    <div class="message">
                        Thanks for signing up! Please verify your email address to get started with your account. 
                        This helps us ensure the security of your account and keep you updated with important information.
                    </div>
                    
                    <div class="info-box">
                        <p><strong>✓ Why verify?</strong></p>
                        <p>• Secure access to all features</p>
                        <p>• Password recovery options</p>
                        <p>• Receive important notifications</p>
                    </div>
                    
                    <div class="button-container">
                        <a href="${url}" class="verify-button">
                            ✓ Verify Email Address
                        </a>
                    </div>
                    
                    <div class="alt-link">
                        <a href="${url}">Or click here if button doesn't work →</a>
                    </div>
                    
                    <div class="expiry-notice">
                        <span class="expiry-icon">⏰</span>
                        <strong>Link expires in 24 hours</strong> — This helps keep your account secure
                    </div>
                </div>
                
                <div class="footer">
                    <p>Didn't request this email? You can safely ignore it.</p>
                    <p>Need help? Contact our <a href="mailto:support@example.com">support team</a></p>
                    <p>© 2026 Your Company Name. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `;
    try {
        await sendEmail({
            to: newUser.email,
            subject: "Please verify your email",
            html
        })
        res.status(201).json({message: "User created successfully! Please check your email to verify your account."})
    }

    catch (e) {
        console.log("Error sending email:", e);
        return next(new AppError("User created but failed to send verification email. Please contact support.", 500));
    }
})

const verifyEmail = catchAsync(async (req, res, next) => {
    const code = req.params.code || req.query.code;
    
    const user = await User.findOne({ verificationCode: code})

    if (!user) {
        return next(new AppError("Invalid or expired verification code", 400))
    }

    user.verificationCode = undefined;
    user.isVerified = true;

    await user.save({ validateBeforeSave: false })

    res.status(200).json({ message: "Email verified successfully! You can now log in." })
})

module.exports = {
    signup,
    verifyEmail
}