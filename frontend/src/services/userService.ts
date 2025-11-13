const baseUrl = "http://localhost:3000/user"

const getUserFetch = async (endpoint: string) => {
  try {
    const url = `${baseUrl}/${endpoint}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(error)
  }

  return []
}

export const getCleanUsers = () => getUserFetch("clean")
export const getDirtyUsers = () => getUserFetch("dirty")
export const getUserMetrics = () => getUserFetch("metrics")
