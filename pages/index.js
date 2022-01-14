import PropertyList from 'components/PropertyList'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Portfolio</h1>
      <PropertyList />
      <Link href="/add">Tilføj ejendom</Link>
    </div>
  )
}
