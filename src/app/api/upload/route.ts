import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const cloudinaryFormData = new FormData()
    cloudinaryFormData.append('file', file)
    cloudinaryFormData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'catman_preset')

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    console.log('[Upload] Cloud name:', cloudName, 'Preset:', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
    if (!cloudName) {
      return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 500 })
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Cloudinary error:', errorData)
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json({ url: data.secure_url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
