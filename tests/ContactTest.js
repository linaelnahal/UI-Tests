const ContactPage = require('../pages/ContactPage.js');

module.exports = {
  'Contact Page Test': function (browser) {
    const contactPage = ContactPage(browser);

    // Scenario 1: Verify the contact page
    ContactPage.navigate();
    ContactPage.verifyPage();

    // Scenario 2: Successful submission of the contact form of type Customer Service with File Uploaded
    const filePath = "C:\\Users\\maria\\Downloads\\test.jpg"; // Use escaped backslashes
    ContactPage.fillContactForm('Lina ElNahal', 'lina.amr.elnahal@gmail.com', '', 'Hello, this is a test message.', 'Customer service', filePath);
    ContactPage.submitContactForm(); // Ensure this matches your page object method
    ContactPage.verifySuccessMessage();

    // Scenario 3: Successful submission of the contact form of type Customer Service without File Upload
    ContactPage.fillContactForm('Lina ElNahal', 'lina.amr.elnahal@gmail.com', '', 'Hello, this is a test message.', 'Customer service');
    ContactPage.submitContactForm();
    ContactPage.verifySuccessMessage();

    // Scenario 4: Successful submission of the contact form of type Webmaster
    ContactPage.fillContactForm('Lina ElNahal', 'lina.amr.elnahal@gmail.com', '', 'Hello, this is a test message.', 'Webmaster');
    ContactPage.submitContactForm();
    ContactPage.verifySuccessMessage();

    // Scenario 5: Validation for required fields
    ContactPage.fillContactForm('', '', '', '', '');
    ContactPage.submitContactForm();
    ContactPage.verifyErrorMessage(); // Check for error related to required fields

    // Scenario 6: Invalid email format
    ContactPage.fillContactForm('Lina ElNahal', 'invalid-email', '', 'Email is Invalid', 'Customer service');
    ContactPage.submitContactForm();
    ContactPage.verifyErrorMessage(); // Check for error related to invalid email

    // Scenario 7: Invalid Order Reference
    ContactPage.fillContactForm('Lina ElNahal', 'lina.amr.elnahal@gmail.com', 'abc', 'Order Reference is Invalid', 'Customer service');
    ContactPage.submitContactForm();
    ContactPage.verifyErrorMessage(); // Check for error related to invalid Order Reference

    // Scenario 8: Exceeding character limit in the message
    const longMessage = 'A'.repeat(1001); // Adjust the number based on the limit
    ContactPage.fillContactForm('Lina ElNahal', 'lina.elnahal@arcsen.com', '', longMessage, 'Customer service');
    ContactPage.submitContactForm();
    ContactPage.verifyErrorMessage(); // Check for error related to message length

    // End the session
    browser.end();
  }
};
