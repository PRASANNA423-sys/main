# How to Enable Automatic Emails

Currently, the website uses a **fallback method** (opening your email client) because it doesn't have permission to send emails automatically. 

To enable fully automatic emails (sending to both the user and "developer"), you need to set up a free account with **EmailJS**.

## Step 1: Get EmailJS Credentials
1.  Go to [https://www.emailjs.com/](https://www.emailjs.com/) and Sign Up for free.
2.  **Add a Service**:
    *   Click "Add New Service" -> Select "Gmail" (or your preferred provider).
    *   Click "Connect Account" and follow the login prompts.
    *   Copy the **Service ID** (e.g., `service_z3x9...`).
3.  **Create an Email Template**:
    *   Go to "Email Templates" -> "Create New Template".
    *   Subject: `New Order from {{from_name}}`
    *   Content: `{{message}}`
    *   Copy the **Template ID** (e.g., `template_8a2...`).
4.  **Get Public Key**:
    *   Go to "Account" (click your avatar) -> "API Keys" -> "Public Key".

## Step 2: Add Credentials to Code
1.  Open the file: `js/checkout.js`.
2.  Look for these lines (around line 75):
    ```javascript
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; 
    ```
3.  Replace the placeholders with your actual keys from Step 1.

## Step 3: Test
1.  Go to the website, add an item to cart, and checkout.
2.  Click "Place Order". 
3.  It should now silently and automatically send the email!

---
*Note: Until you do this, the website will continue to use the `mailto:` fallback, which opens your email draft window manually.*
