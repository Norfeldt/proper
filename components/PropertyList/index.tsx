import React from 'react'
import styles from './index.module.css'

export default function PortfolioList() {
  const [expanded, setExpandedId] = React.useState<string | null>(null)
  const [properties, setProperties] = React.useState<Property[]>([])

  const handleItemClick = (id: string) => {
    setExpandedId((expanded) => (id === expanded ? null : id))
  }

  const handleDelete = (id: string) => {
    setProperties((properties) => properties.filter((property) => property.id !== id))
  }

  React.useEffect(() => {
    const properties = JSON.parse(localStorage.getItem('properties'))
    setProperties(properties ?? [])
  }, [])

  React.useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties))
  }, [properties])

  if (properties.length === 0) {
    return <div>Du har ingen ejendomme, skynd dig at tilføje dem</div>
  }

  return (
    <div className={styles.list}>
      {properties.map((property) => (
        <div
          key={property.id}
          data-id={property.id}
          className={styles.listItem}
          onClick={() => handleItemClick(property.id)}>
          <div>{property.adressebetegnelse}</div>
          {expanded === property.id && (
            <div className={styles.deleteContainer}>
              <button onClick={() => handleDelete(property.id)}>SLET</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
