import { useRouter } from 'next/router'
import AddProperty from 'components/AddProperty'

export default function Home() {
  const router = useRouter()

  return (
    <div>
      <h1>Tilføj egendom</h1>
      <AddProperty onSubmitCallBack={() => router.back()} />
    </div>
  )
}
