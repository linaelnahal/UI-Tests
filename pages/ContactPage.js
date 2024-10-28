const path = require('path');

module.exports = (browser) => {
  return {
    url: 'http://automationpractice.multiformis.com/index.php?controller=contact',

    elements: {
      form: 'form',
      submitButton: 'button[name="submitMessage"]',
      nameField: 'input[name="from_name"]',
      emailField: 'input[name="from"]',
      orderField: 'input[name="id_order"]',
      fileUpload: 'input[type="file"]',
      messageField: 'textarea[name="message"]',
      subjectDropdown: 'select[name="id_contact"]',
      successMessage: '.alert-success', // Adjust selector based on actual success message
      errorMessage: '.alert-danger', // Adjust selector based on actual error message
    },

    commands: [{
      verifyPage() {
        return browser
          .url(this.url)
          .waitForElementVisible('body', 1000)
          .assert.title('Contact us - My Store')
          .assert.visible(this.elements.form)
          .assert.visible(this.elements.submitButton);
      },

      fillContactForm(name, email, order, message, subject, filePath = null) {
        browser
          .setValue(this.elements.nameField, name)
          .setValue(this.elements.emailField, email)
          .setValue(this.elements.orderField, order)
          .setValue(this.elements.messageField, message)
          .selectDropdown(this.elements.subjectDropdown, subject);

        // Check for file upload only if filePath is provided
        if (filePath) {
          browser.setValue(this.elements.fileUpload, path.resolve(filePath));
        }
        
        return this; // Ensure method chaining
      },

      selectDropdown(selector, option) {
        return browser
          .click(selector)
          .pause(500)
          .click(`option[value="${option}"]`); // Adjust based on option values
      },

      submitForm() {
        return browser
          .click(this.elements.submitButton)
          .pause(1000); // Wait for the response
      },

      verifySuccessMessage() {
        return browser.assert.visible(this.elements.successMessage);
      },

      verifyErrorMessage() {
        return browser.assert.visible(this.elements.errorMessage);
      },
    }],
  };
};
