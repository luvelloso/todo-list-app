
import { useState, useEffect, useCallback } from 'react'
import type { User } from '../services/api'
import * as api from '../services/api'

export function useAuth() {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		let mounted = true
		async function init() {
			const token = localStorage.getItem('token')
			if (!token) {
				if (mounted) setLoading(false)
				return
			}

			try {
				const me = await api.getCurrentUser()
				if (mounted) setUser(me)
			} catch {
				localStorage.removeItem('token')
			} finally {
				if (mounted) setLoading(false)
			}
		}
		init()
		return () => {
			mounted = false
		}
	}, [])

	const login = useCallback(async (username: string, password: string) => {
		setLoading(true)
		try {
			await api.login(username, password)
			const me = await api.getCurrentUser()
			setUser(me)
			return me
		} finally {
			setLoading(false)
		}
	}, [])

	const logout = useCallback(() => {
		localStorage.removeItem('token')
		setUser(null)
	}, [])

	const register = useCallback(async (email: string, full_name: string, password: string) => {
		return api.register(email, full_name, password)
	}, [])

	return { user, loading, login, logout, register, isAuthenticated: !!user }
}
