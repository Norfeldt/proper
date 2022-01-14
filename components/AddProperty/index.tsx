import * as nextRouter from 'next/router'
import React from 'react'
import styles from './index.module.css'

// https://github.com/cypress-io/cypress/tree/develop/npm/react/examples/nextjs#router-mocking
type Props = {
  onSubmitCallBack?: () => void
}

export default function AddProperty({ onSubmitCallBack = () => {} }: Props) {
  const [query, setQuery] = React.useState('')
  const [suggestionProperties, setSuggestionProperties] = React.useState<Property[]>([])
  const router = nextRouter.useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetch(`/api/address?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setSuggestionProperties(data)
      })
  }

  const handleSelect = (id: string) => {
    const selectedProperty = suggestionProperties.find((property) => property.id === id)
    const properties = JSON.parse(localStorage.getItem('properties') ?? '[]')
    properties.push(selectedProperty)
    localStorage.setItem('properties', JSON.stringify(properties))
    setQuery('')
    setSuggestionProperties([])
    onSubmitCallBack()
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={query}
          placeholder="Indtast adresse"
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className={styles.submitBtn} type="submit">
          Søg
        </button>
      </form>
      {suggestionProperties?.map((property) => (
        <div
          className={styles.suggestion}
          key={property.id}
          onClick={() => handleSelect(property.id)}>
          {property.adressebetegnelse}
        </div>
      ))}
    </>
  )
}
