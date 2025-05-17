"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Loader2, ExternalLink, AlertCircle } from "lucide-react"
import axios from "axios"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"

export default function Home() {
  const [url, setUrl] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setVideoUrl("")

    try {
      const response = await axios.post("/api/download", { url })
      setVideoUrl(response.data.play)
    } catch {
      setError("Failed to fetch video. Please check the URL and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  TikTok Downloader
                </CardTitle>
              </div>
            </div>
            <CardDescription className="text-gray-500 mt-2">
              Download TikTok videos without watermark in high quality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Paste TikTok video URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                  className="pr-12 border-2 focus-visible:ring-purple-500 h-12 text-base"
                />
                {url && !loading && (
                  <button
                    type="button"
                    onClick={() => setUrl("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Download Video
                  </span>
                )}
              </Button>
            </form>

            {error && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {videoUrl && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-green-600">
                        <Download className="h-5 w-5" />
                        <p className="font-medium">Video ready for download!</p>
                      </div>
                      <Link
                        href={videoUrl}
                        target="_blank"
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Download Now
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center pt-0 pb-4">
            <p className="text-xs text-gray-400">By using this service, you agree to our Terms of Service</p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
