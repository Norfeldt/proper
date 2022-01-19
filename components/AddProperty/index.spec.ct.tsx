import { mount } from '@cypress/react';
import Component from './index';

beforeEach(() => {
  cy.task('clearNock');
});

it.only('queries the api', () => {
  cy.fixture('properties').then((properties: Property[]) => {
    cy.task('nock', {
      path: '/api/address?q=*',
      method: 'GET',
      statusCode: 200,
      body: {
        json: function () {
          return [{ id: '42', adressebetegnelse: 'Beverly Hills' } as Partial<Property>];
        },
      },
    });
    cy.intercept('GET', '/api/address?q=*', properties).as('getProperties');

    mount(<Component />);

    cy.contains('Beverly Hills');

    cy.get('input').type('Some address{enter}');

    cy.wait('@getProperties').its('response.statusCode').should('eq', 200);

    properties.forEach(property => {
      cy.contains(property.adressebetegnelse);
    });
  });
});

it('saves the selected address to the portfolio', () => {
  const property: Partial<Property> = {
    id: '1',
    adressebetegnelse: 'Skelbækgade 4, 1717 København V',
  };
  cy.intercept('GET', '/api/address?q=*', [property]).as('getProperties');

  const onSubmitCallBack = cy.stub().as('onSubmitCallBack');
  mount(<Component onSubmitCallBack={onSubmitCallBack} />);
  cy.get('input').type(`${property.adressebetegnelse}{enter}`);

  cy.wait('@getProperties').its('response.statusCode').should('eq', 200);
  cy.contains(property.adressebetegnelse).click();

  cy.getLocalStorage('properties').then(value => {
    const localStorageproperties = JSON.parse(value);
    expect(localStorageproperties).to.have.lengthOf(1);
    expect(localStorageproperties[0]).to.deep.equal(property);
  });

  cy.get('@onSubmitCallBack').should('be.called');
});
