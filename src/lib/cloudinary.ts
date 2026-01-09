export async function uploadToCloudinary(file: File): Promise<string | null> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'catman_audit')
    formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '')

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      console.error('Cloudinary upload failed:', response.statusText)
      return null
    }

    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return null
  }
}
