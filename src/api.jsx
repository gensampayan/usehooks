export async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products")
  const data = await res.json()
  return data
}

export async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  const data = await res.json()
  return data
}

export async function getCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories")
  const data = await res.json()
  return data
}

export async function loginUser(creds) {
  const res = await fetch(`https://fakestoreapi.com/users`,
    { 
      method: "post", 
      body: JSON.stringify(creds) 
    }
  )

  const data = await res.json()

  if (!res.ok) {
    throw {
        message: data.message,
        statusText: res.statusText,
        status: res.status
    }
  }

  return data
}
