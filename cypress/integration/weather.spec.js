describe("Weather", () => {
    const url = "http://127.0.0.1:5500/index.html";
    
    before(() => {
        cy.visit({url})
    });

    it("Deve escrever nome da cidade no campo de input", () => {
        cy.wait(1000);
        cy.get('[data-test="city-field"]').type('Arroio do Sal');
        cy.get('[data-test="search-button"]').should('exist');
        cy.get('[data-test="search-button"]').click();
    });


    it("Deve aparecer no título, a palavra digitada", () => {
        cy.get('[data-test="city-span-field"]').should('have.text', 'Arroio do Sal')
    });
})