import { mount } from '@cypress/react'
import Component from './index'

it('renders overview of properties', () => {
  const properties: Partial<Property>[] = [
    { id: '1', adressebetegnelse: 'Skelbækgade 4, 1717 København V' },
    { id: '2', adressebetegnelse: 'Dortheavej 61, 2400 København, Denmark' },
  ]
  cy.setLocalStorage('properties', JSON.stringify(properties))
  mount(<Component />)

  properties.forEach((property) => {
    cy.contains(property.adressebetegnelse)
    cy.get(`[data-id=${property.id}]`)
  })
})

it('shows a message if no properties', () => {
  cy.clearLocalStorage('properties')

  mount(<Component />)

  cy.contains('Du har ingen ejendomme, skynd dig at tilføje dem')
})

it('deletes a property from the portfolio', () => {
  const properties: Partial<Property>[] = [
    { id: '1', adressebetegnelse: 'Skelbækgade 4, 1717 København V' },
    { id: '2', adressebetegnelse: 'Dortheavej 61, 2400 København, Denmark' },
  ]
  cy.setLocalStorage('properties', JSON.stringify(properties))
  const com = mount(<Component />)

  cy.contains('SLET').should('not.exist')
  cy.contains(properties[0].adressebetegnelse).click()
  cy.contains('SLET').should('exist')

  cy.contains('SLET').click()
  cy.contains(properties[0].adressebetegnelse).should('not.exist')
  cy.contains(properties[1].adressebetegnelse).should('exist')

  cy.getLocalStorage('properties').then((value) => {
    const localStorageproperties = JSON.parse(value)
    expect(localStorageproperties).to.have.lengthOf(1)
    expect(localStorageproperties[0]).to.deep.equal(properties[1])
  })
})

afterEach(() => {
  cy.clearLocalStorage()
})
