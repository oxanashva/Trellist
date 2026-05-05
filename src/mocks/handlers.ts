import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/board', ({ request }) => {
    const url = new URL(request.url)
    const name = url.searchParams.get('name')
    return HttpResponse.json([{ name }])
  }),
]
