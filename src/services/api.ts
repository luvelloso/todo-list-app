export const API_URL = 'http://127.0.0.1:8000'

export type User = {
	id: number
	email: string
	full_name: string
}

export type TokenResponse = {
	access_token: string
	token_type: string
}

export type Todo = {
	title: string
	description: string
	status: 'pending' | 'completed'
	scheduled_date: string
	id: number
	owner_id: number
	created_at: string
	updated_at: string
}

function handleResponse(res: Response) {
	if (res.status === 204) return null
	if (!res.ok) return res.text().then((t) => Promise.reject(new Error(t || res.statusText)))
	return res.json()
}

function authHeaders(json = true) {
	const token = localStorage.getItem('token')
	const headers: Record<string, string> = {}
	if (token) headers['Authorization'] = `Bearer ${token}`
	if (json) headers['Content-Type'] = 'application/json'
	return headers
}

export async function register(email: string, full_name: string, password: string) {
	const res = await fetch(`${API_URL}/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, full_name, password }),
	})

	return handleResponse(res)
}

export async function login(username: string, password: string): Promise<TokenResponse> {
	const body = new URLSearchParams()
	body.set('username', username)
	body.set('password', password)

	const res = await fetch(`${API_URL}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: body.toString(),
	})

	const data = await handleResponse(res)
	if (data && data.access_token) {
		localStorage.setItem('token', data.access_token)
	}
	return data
}

export async function getCurrentUser(): Promise<User> {
	const res = await fetch(`${API_URL}/users/me`, {
		method: 'GET',
		headers: authHeaders(),
	})
	return handleResponse(res)
}

export async function createTodo(
	title: string,
	category: string,
	status: Todo['status'],
	scheduled_date: string,
): Promise<Todo> {
	console.log('API: createTodo -> request', { title, category, status, scheduled_date })
	const res = await fetch(`${API_URL}/todos`, {
		method: 'POST',
		headers: authHeaders(true),
		body: JSON.stringify({ title, category, status, scheduled_date }),
	})

	try {
		const data = await handleResponse(res)
		console.log('API: createTodo -> response', data)
		return data
	} catch (err) {
		console.error('API: createTodo -> error', err)
		throw err
	}
}

export async function getTodos(status?: string, scheduled_date?: string): Promise<Todo[]> {
	const params = new URLSearchParams()
	if (status) params.set('status', status)
	if (scheduled_date) params.set('scheduled_date', scheduled_date)
	const qs = params.toString() ? `?${params.toString()}` : ''
	const res = await fetch(`${API_URL}/todos${qs}`, {
		method: 'GET',
		headers: authHeaders(false),
	})
	return handleResponse(res)
}

export async function getTodo(id: number): Promise<Todo> {
	const res = await fetch(`${API_URL}/todos/${id}`, {
		method: 'GET',
		headers: authHeaders(false),
	})
	return handleResponse(res)
}

export async function updateTodoStatus(id: number, status: Todo['status']): Promise<Todo> {
	const res = await fetch(`${API_URL}/todos/${id}/status`, {
		method: 'PUT',
		headers: authHeaders(true),
		body: JSON.stringify({ status }),
	})
	return handleResponse(res)
}

export async function deleteTodo(id: number) {
	const res = await fetch(`${API_URL}/todos/${id}`, {
		method: 'DELETE',
		headers: authHeaders(false),
	})
	return handleResponse(res)
}
