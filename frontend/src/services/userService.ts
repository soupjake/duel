const baseUrl = "http://localhost:3000"

export const getUsers = async () => {
  try {
    const url = `${baseUrl}/user`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    console.log(await response.text())
  } catch (error) {
    console.error(error)
  }

  return []
}