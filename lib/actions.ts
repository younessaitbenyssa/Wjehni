export async function getUserPaths() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          // This would normally contain the actual data
          // We're using hardcoded data in the component for now
        },
      })
    }, 500)
  })
}

