'use client'

import { useState, useCallback } from 'react'

// Session ID for analytics
const getSessionId = () => {
  if (typeof window === 'undefined') return null

  let sessionId = sessionStorage.getItem('arteral-session-id')
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('arteral-session-id', sessionId)
  }
  return sessionId
}

// Generic API fetch helper
async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<{ data?: T; error?: string }> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || 'An error occurred' }
    }

    return { data }
  } catch (error) {
    console.error('API Error:', error)
    return { error: 'Network error' }
  }
}

// ============================================
// DESIGNS HOOKS
// ============================================

export function useDesigns() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDesigns = useCallback(async (params?: {
    page?: number
    limit?: number
    status?: string
    sort?: string
  }) => {
    setLoading(true)
    setError(null)

    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.status) searchParams.set('status', params.status)
    if (params?.sort) searchParams.set('sort', params.sort)

    const result = await apiFetch<{
      designs: any[]
      pagination: { page: number; limit: number; total: number; totalPages: number }
    }>(`/api/designs?${searchParams}`)

    setLoading(false)
    if (result.error) setError(result.error)
    return result.data
  }, [])

  const createDesign = useCallback(async (design: {
    email: string
    name: string
    artistName?: string
    title: string
    philosophy: string
    imageData?: string
    garmentType: string
    garmentFit: string
    garmentColor: string
  }) => {
    setLoading(true)
    setError(null)

    const result = await apiFetch('/api/designs', {
      method: 'POST',
      body: JSON.stringify(design),
    })

    setLoading(false)
    if (result.error) setError(result.error)
    return result.data
  }, [])

  const likeDesign = useCallback(async (designId: string, email: string) => {
    const result = await apiFetch<{ liked: boolean; likeCount: number }>(
      `/api/designs/${designId}/like`,
      {
        method: 'POST',
        body: JSON.stringify({ email }),
      }
    )
    return result.data
  }, [])

  const voteDesign = useCallback(async (
    designId: string,
    email: string,
    type: 'people' | 'heart' = 'people'
  ) => {
    const result = await apiFetch<{ voted: boolean; voteCount: number }>(
      `/api/designs/${designId}/vote`,
      {
        method: 'POST',
        body: JSON.stringify({ email, type }),
      }
    )
    return result.data
  }, [])

  return {
    loading,
    error,
    fetchDesigns,
    createDesign,
    likeDesign,
    voteDesign,
  }
}

// ============================================
// GUESTBOOK HOOKS
// ============================================

export function useGuestbook() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEntries = useCallback(async (params?: {
    page?: number
    limit?: number
  }) => {
    setLoading(true)
    setError(null)

    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())

    const result = await apiFetch<{
      entries: any[]
      pagination: { page: number; limit: number; total: number; totalPages: number }
    }>(`/api/guestbook?${searchParams}`)

    setLoading(false)
    if (result.error) setError(result.error)
    return result.data
  }, [])

  const createEntry = useCallback(async (entry: {
    email: string
    name: string
    message: string
    mood: 'love' | 'inspired' | 'thoughtful'
  }) => {
    setLoading(true)
    setError(null)

    const result = await apiFetch('/api/guestbook', {
      method: 'POST',
      body: JSON.stringify(entry),
    })

    setLoading(false)
    if (result.error) setError(result.error)
    return result.data
  }, [])

  const likeEntry = useCallback(async (entryId: string, email: string) => {
    const result = await apiFetch<{ liked: boolean; likeCount: number }>(
      `/api/guestbook/${entryId}/like`,
      {
        method: 'POST',
        body: JSON.stringify({ email }),
      }
    )
    return result.data
  }, [])

  return {
    loading,
    error,
    fetchEntries,
    createEntry,
    likeEntry,
  }
}

// ============================================
// NEWSLETTER HOOKS
// ============================================

export function useNewsletter() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const subscribe = useCallback(async (email: string, name?: string, source?: string) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    const result = await apiFetch<{ success: boolean; message: string }>('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email, name, source }),
    })

    setLoading(false)
    if (result.error) {
      setError(result.error)
      return false
    }
    if (result.data?.success) {
      setSuccess(true)
      return true
    }
    return false
  }, [])

  return {
    loading,
    error,
    success,
    subscribe,
  }
}

// ============================================
// STATS HOOKS
// ============================================

export function useStats() {
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<{
    totalVisitors: number
    totalDesigns: number
    totalVotes: number
    totalMessages: number
  } | null>(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    const result = await apiFetch<{
      totalVisitors: number
      totalDesigns: number
      totalVotes: number
      totalMessages: number
    }>('/api/stats')

    setLoading(false)
    if (result.data) {
      setStats(result.data)
    }
    return result.data
  }, [])

  return {
    loading,
    stats,
    fetchStats,
  }
}

// ============================================
// ANALYTICS HOOKS
// ============================================

export function useAnalytics() {
  const trackPageView = useCallback(async (path: string, referrer?: string) => {
    const sessionId = getSessionId()
    await apiFetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({ path, referrer, sessionId }),
    })
  }, [])

  const trackEvent = useCallback(async (
    name: string,
    category?: string,
    label?: string,
    value?: number
  ) => {
    const sessionId = getSessionId()
    await apiFetch('/api/analytics/event', {
      method: 'POST',
      body: JSON.stringify({ name, category, label, value, sessionId }),
    })
  }, [])

  return {
    trackPageView,
    trackEvent,
  }
}

// ============================================
// CONTEST HOOKS
// ============================================

export function useContest() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitEntry = useCallback(async (entry: {
    artistName: string
    email: string
    instagram?: string
    artworkData?: string
    description?: string
  }) => {
    setLoading(true)
    setError(null)

    const result = await apiFetch('/api/contest', {
      method: 'POST',
      body: JSON.stringify(entry),
    })

    setLoading(false)
    if (result.error) setError(result.error)
    return result.data
  }, [])

  return {
    loading,
    error,
    submitEntry,
  }
}
