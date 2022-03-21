const BobPassword = '$QD$Yi%s@VY3';
const AlicePassword = 'IQAYh^$Sr5YY';

describe('Create Account', () => {
    it('Loads Welcome Page', () => {
        cy.visit('http://localhost:3000');
        cy.contains('sign up', { matchCase: false });
    });
    it('Can Access Signup Page', () => {
        cy.get('button').click();
        cy.contains('password', { matchCase: false });
        cy.url().should('include', '/signup');
    });
    it('Can Signup', () => {
        cy.get('input[name=password]').type(BobPassword);
        cy.get('input[name=confirmPassword]').type(BobPassword);
        cy.get('button').click();
        cy.wait(250);
        cy.url().should('not.have', '/signup');
    })
})
describe('Account Actions', () => {
    it('Can Access & Copy Address', () => {
        cy.get('h1').click();
        cy.wait(250);
        cy.url().should('include', '/profile');
    });
    it('Can Overwrite Account', () => {
        // Visit signup page again
        cy.visit('http://localhost:3000/welcome')
        cy.contains('sign up', { matchCase: false })
        cy.get('button').click();
        cy.get('input[name=password]').type(AlicePassword);
        cy.get('input[name=confirmPassword]').type(AlicePassword);
        cy.get('button').click();
        cy.wait(250);
        cy.url().should('not.have', '/signup')
    });
    it('Can Logout', () => {
        cy.get('h1').click();
        cy.get('#logout').click();
        cy.wait(250);
        cy.url().should('include', '/login');
    })
    it('Can Delete Account', () => {
        cy.visit('http://localhost:3000/signup')
        cy.get('input[name=password]').type(AlicePassword);
        cy.get('input[name=confirmPassword]').type(AlicePassword); 
        cy.get('button').click();
        cy.wait(250); 
        cy.get('h1').click();
        cy.get('#deleteAccount').click();
        cy.wait(250);
        cy.url().should('include', '/welcome');
    })
})
