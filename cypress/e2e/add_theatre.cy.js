describe('Navigation to Add theatre page', () => {

  const baseUrl = 'http://localhost:5173'

  // Set default before each test
  beforeEach(() => {
    cy.visit(baseUrl + '/')
  })

  // Test 1: Opens landing page
  it('should open landing page', () => {
    cy.contains('Welcome').should('be.visible')
  })

  // Test 2: Navigation to Add Theatre page works
  it('should navigate to Add theatre page', () => {
    cy.get('button').contains('Add theatre').click()
    cy.url().should('include', '/add-theatre')
    cy.contains('Add new theatre').should('be.visible')
  })

  // Test 3: All form fields are visible
  it('renders all form fields', () => {
    cy.visit(baseUrl + '/add-theatre')
    cy.get('input[name="theatre_name"]').should('exist')
    cy.get('input[name="address"]').should('exist')
    cy.get('input[name="contact_information"]').should('exist')
    cy.get('input[placeholder="Auditorium name"]').should('exist')
    cy.get('input[placeholder="Seat capacity"]').should('exist')
  })

  // Test 4: Save button is disabled when form is not filled
  it('disables save button when form is incomplete', () => {
    cy.visit(baseUrl + '/add-theatre')
    cy.get('button[type="submit"]').should('be.disabled')
  })

  // Test 5: Fill form and add/remove auditoriums
  it('allows to fill the form and adding and removing auditoriums', () => {
    cy.visit(baseUrl + '/add-theatre')
    // Fill form
    cy.get('input[name="theatre_name"]').type('Oulu theater')
    cy.get('input[name="address"]').type('Rotuaari 1')
    cy.get('input[name="contact_information"]').type('123456')

    // Fill first auditorium
    cy.get('.auditoriums-section').first().within(() => {
      cy.get('input[placeholder="Auditorium name"]').type('Auditorium 1')
      cy.get('input[placeholder="Seat capacity"]').type('100')
    })

    // Add another auditorium input field
    cy.get('.btn-add-auditorium').click()
    cy.get('.auditoriums-section').should('have.length', 2)
    // Fill second auditorium
    cy.get('.auditoriums-section').eq(1).within(() => {
      cy.get('input[placeholder="Auditorium name"]').type('Main auditorium')
      cy.get('input[placeholder="Seat capacity"]').type('180')
    })

    // Remove one auditorium
    cy.get('.btn-remove').last().click()
    cy.get('.auditoriums-section').should('have.length', 1)

    // Form ready to be sent
    cy.get('button[type="submit"]').should('not.be.disabled')
  })

  // Test 6: Mock backend and verify successful submission
  it('submits form and shows confirmation on success', () => {
    cy.visit(baseUrl + '/add-theatre')

    // Mock for POST-requests
    cy.intercept('POST', '**/api/theatres', {
      statusCode: 201,
      body: { id: 1, theatre_name: 'Oulu theater', address: 'Rotuaari 1', contact_information: '123456' },
    }).as('addTheatre')

    cy.intercept('POST', '**/api/theatres/auditoriums', {
      statusCode: 201,
      body: { id: 10, theater_id: 1, name: 'Auditorium 1', seat_count: 100 },
    }).as('addAuditorium')

    // Fill form and submit
    cy.get('input[name="theatre_name"]').type('Oulu theater')
    cy.get('input[name="address"]').type('Rotuaari 1')
    cy.get('input[name="contact_information"]').type('123456')
    cy.get('input[placeholder="Auditorium name"]').type('Auditorium 1')
    cy.get('input[placeholder="Seat capacity"]').type('100')
    cy.get('button[type="submit"]').click()

    // Ensure API-calls and UI
    cy.wait('@addTheatre')
    cy.wait('@addAuditorium')
    cy.contains('Theatre added successfully!').should('be.visible')
    cy.contains('Oulu theater').should('exist')
    cy.contains('Auditorium 1').should('exist')
    cy.wait(1500) 
    // Click "Add new theatre"
    cy.contains('Add new theatre').click()
    cy.contains('Add new theatre').should('be.visible')
    cy.get('input[name="theatre_name"]').should('have.value', '')
    })
  })



  