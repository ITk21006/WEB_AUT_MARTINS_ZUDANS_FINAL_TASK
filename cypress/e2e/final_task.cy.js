describe('Automation Practice Form', () => {
  before(() => {
    cy.visit('https://demoqa.com/automation-practice-form');
  });

  it('fills out the form and submits it', () => {
    // Input personal information
    cy.get('#firstName').type('Martins');
    cy.get('#lastName').type('Zudans');
    cy.get('#userEmail').type('martins.zudans@gmail.com');
    cy.get('[for="gender-radio-1"]').click(); // Select Male
    cy.get('#userNumber').type('20255760');

    // Set Date of Birth
    cy.get('#dateOfBirthInput').click();

    // Wait for the date picker to be visible
    cy.get('.react-datepicker__year-select').should('be.visible').select('1930');
    cy.get('.react-datepicker__month-select').should('be.visible').select('1'); // If the month is selected first and then the year, it switches it to March
  
    
    // Select the correct day
    cy.get('.react-datepicker__day--028:not(.react-datepicker__day--outside-month)').click();

    // Set Subjects
    cy.get('.subjects-auto-complete__value-container').type('Economics{enter}');

    // Set Hobbies
    cy.get('[for="hobbies-checkbox-3"]').click(); // Select Music

    // Upload an image
    cy.get('#uploadPicture').selectFile('files/goated.png');

    // Set Address
    cy.get('#currentAddress').type('123 Unknown Street');

    // Set State and City
    cy.get('#state').click();
    cy.contains('div', 'NCR').click({ force: true });  // Use force to ensure the click works
    cy.get('#city').click();
    cy.contains('div', 'Delhi').click({ force: true }); // Use force to ensure the click works

    // Submit the form
    cy.get('#submit').click();

    // Validate the submission
    cy.get('.modal-body').within(() => {
      cy.contains('Martins Zudans');
      cy.contains('martins.zudans@gmail.com');
      cy.contains('Male');
      cy.contains('20255760');
      cy.contains('28 February,1930');
      cy.contains('Economics');
      cy.contains('Music');
      cy.contains('goated.png');
      cy.contains('123 Unknown Street');
      cy.contains('NCR Delhi');
    });
  });
});
