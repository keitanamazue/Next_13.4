type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Object; // この型は具体的な構造に基づいて定義するべきです
  phone: string;
  website: string;
  company: Object; // この型は具体的な構造に基づいて定義するべきです
};

const staticFetch = async() => {
  const url = "http://localhost:3001/users"
  const res = await fetch(url, { cache: 'force-cache' })
  const user:User[] = await res.json()
  return user
}

const dynamicFetch = async() => {
    const url = "http://localhost:3001/users"
    const res = await fetch(url, { cache: 'no-store' })
    const user:User[] = await res.json()
    return user
}


const revalidatingFetch = async() => {
  const url = "http://localhost:3001/users"
  const res = await fetch(url, { next: { revalidate: 3 } })
  const user:User[] = await res.json()
  return user
}

export default async  function Home() {
  // const user = await staticFetch()
  // const user = await dynamicFetch()
  const user = await revalidatingFetch()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    {user.map((d) => {
      return(
        <div className="flex flex-col items-center justify-center" key={d.id}>
          <h1 className="text-2xl font-bold">{d.id}</h1>
          <h1 className="text-2xl font-bold">{d.email}</h1>
          <h1 className="text-2xl font-bold">{d.username}</h1>
        </div>
      )
    })}
    </main>
  )
}
