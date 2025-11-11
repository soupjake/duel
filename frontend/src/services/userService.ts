const baseUrl = "http://localhost:3000/user"

export const getCleanUsers = async () => {
  try {
    const url = `${baseUrl}/clean`
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

export const getDirtyUsers = async () => {
  try {
    const url = `${baseUrl}/dirty`
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