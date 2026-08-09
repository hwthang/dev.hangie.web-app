'use client'

import React, { useCallback, useEffect, useState } from 'react'

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const DEFAULT_BASE_URL = 'http://localhost:5000'

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

interface Metadata {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

interface ListResponse<T> {
  data: T[]
  metadata: Metadata
}

interface ApiError extends Error {
  status?: number
  payload?: unknown
}

type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'checkbox'
  | 'datetime'
  | 'select'

interface FieldConfig<TOption = any> {
  name: string
  label: string
  type: FieldType
  optionsPath?: string
  optionLabel?: (option: TOption) => string
}

interface ColumnConfig<TRow> {
  header: string
  accessor: (row: TRow) => React.ReactNode
}

interface ResourceConfig<TRow extends Record<string, any> = Record<string, any>> {
  title: string
  path: string
  idKey: keyof TRow & string
  fields: FieldConfig[]
  columns: ColumnConfig<TRow>[]
}

type FormState = Record<string, string | boolean>

// ---------------------------------------------------------------------------
// Low level API helper
// ---------------------------------------------------------------------------

async function apiRequest<T = any>(
  baseUrl: string,
  path: string,
  options: { method?: string; token?: string; body?: unknown } = {}
): Promise<T> {
  const { method = 'GET', token, body } = options
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  let json: any = null
  try {
    json = await res.json()
  } catch {
    // no body / not json
  }

  if (!res.ok) {
    const message = Array.isArray(json?.message)
      ? json.message.join(', ')
      : json?.message || `Request failed (${res.status})`
    const err: ApiError = new Error(message)
    err.status = res.status
    err.payload = json
    throw err
  }

  return json as T
}

// ---------------------------------------------------------------------------
// Small UI primitives (inline styles only, zero deps)
// ---------------------------------------------------------------------------

const colors = {
  bg: '#0f1115',
  panel: '#161a21',
  panelAlt: '#1d2229',
  border: '#2a3038',
  text: '#e7eaee',
  textDim: '#8b93a1',
  accent: '#5b8def',
  accentDim: '#2b3f66',
  danger: '#e15c5c',
  success: '#4cb782',
} as const

const styles: Record<string, any> = {
  app: {
    minHeight: '100vh',
    background: colors.bg,
    color: colors.text,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    display: 'flex',
  },
  sidebar: {
    width: 220,
    borderRight: `1px solid ${colors.border}`,
    padding: '20px 12px',
    flexShrink: 0,
  },
  sidebarTitle: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.textDim,
    padding: '0 8px 12px',
  },
  navBtn: (active: boolean) => ({
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '10px 12px',
    marginBottom: 4,
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    background: active ? colors.accentDim : 'transparent',
    color: active ? colors.text : colors.textDim,
  }),
  main: { flex: 1, padding: '24px 32px', maxWidth: 1000 },
  h1: { fontSize: 20, marginBottom: 4 },
  sub: { fontSize: 13, color: colors.textDim, marginBottom: 20 },
  card: {
    background: colors.panel,
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: { fontSize: 14, fontWeight: 600, marginBottom: 14 },
  label: { display: 'block', fontSize: 12, color: colors.textDim, marginBottom: 4 },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    background: colors.panelAlt,
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    padding: '8px 10px',
    color: colors.text,
    fontSize: 13,
    marginBottom: 12,
  },
  row: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  field: { flex: '1 1 200px', minWidth: 160 },
  btn: (variant: 'primary' | 'ghost' | 'danger' = 'primary') => ({
    border: 'none',
    borderRadius: 6,
    padding: '8px 14px',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    color: variant === 'ghost' ? colors.text : '#fff',
    background:
      variant === 'primary'
        ? colors.accent
        : variant === 'danger'
        ? colors.danger
        : 'transparent',
    borderStyle: variant === 'ghost' ? 'solid' : 'none',
    borderWidth: variant === 'ghost' ? 1 : 0,
    borderColor: colors.border,
  }),
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: {
    textAlign: 'left',
    padding: '8px 10px',
    color: colors.textDim,
    borderBottom: `1px solid ${colors.border}`,
    fontWeight: 500,
  },
  td: { padding: '8px 10px', borderBottom: `1px solid ${colors.border}` },
  pill: (kind: 'success' | 'danger') => ({
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 600,
    background: kind === 'success' ? 'rgba(76,183,130,.15)' : 'rgba(225,92,92,.15)',
    color: kind === 'success' ? colors.success : colors.danger,
  }),
  errorBox: {
    background: 'rgba(225,92,92,.1)',
    border: `1px solid ${colors.danger}`,
    color: colors.danger,
    padding: '8px 12px',
    borderRadius: 6,
    fontSize: 12,
    marginBottom: 12,
    whiteSpace: 'pre-wrap',
  },
  pre: {
    background: '#0b0d11',
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    padding: 12,
    fontSize: 12,
    overflowX: 'auto',
    maxHeight: 220,
  },
  pagerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    fontSize: 12,
    color: colors.textDim,
  },
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  )
}

function ErrorMessage({ error }: { error: string }) {
  if (!error) return null
  return <div style={styles.errorBox}>{error}</div>
}

// ---------------------------------------------------------------------------
// Auth panel  ->  POST /auth/login
// ---------------------------------------------------------------------------

interface AuthPanelProps {
  baseUrl: string
  token: string
  onLogin: (token: string) => void
}

function AuthPanel({ baseUrl, token, onLogin }: AuthPanelProps) {
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await apiRequest<{ accessToken: string }>(baseUrl, '/auth/login', {
        method: 'POST',
        body: { email, password },
      })
      onLogin(data.accessToken)
    } catch (err) {
      setError((err as ApiError).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>POST /auth/login</div>
      <ErrorMessage error={error} />
      <form onSubmit={submit}>
        <div style={styles.row}>
          <Field label="Email">
            <input
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </Field>
          <Field label="Password">
            <input
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </Field>
        </div>
        <button style={styles.btn('primary')} type="submit" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>

      {token && (
        <div style={{ marginTop: 16 }}>
          <div style={styles.label}>Access Token</div>
          <pre style={styles.pre}>{token}</pre>
          <span style={styles.pill('success')}>Đã đăng nhập</span>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Generic CRUD panel, reused for /users, /families, /sessions
// ---------------------------------------------------------------------------

function useOptionSources(baseUrl: string, token: string, fields: FieldConfig[]) {
  const [options, setOptions] = useState<Record<string, any[]>>({})

  useEffect(() => {
    let cancelled = false
    const selectFields = fields.filter((f) => f.type === 'select' && f.optionsPath)
    if (selectFields.length === 0 || !token) return

    selectFields.forEach(async (f) => {
      try {
        const data = await apiRequest<ListResponse<any>>(
          baseUrl,
          `${f.optionsPath}?page=1&pageSize=100`,
          { token }
        )
        if (!cancelled) {
          setOptions((prev) => ({ ...prev, [f.name]: data.data || [] }))
        }
      } catch {
        // silently ignore, dropdown just stays empty
      }
    })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl, token, fields])

  return options
}

function emptyForm(fields: FieldConfig[]): FormState {
  const obj: FormState = {}
  fields.forEach((f) => {
    obj[f.name] = f.type === 'checkbox' ? false : ''
  })
  return obj
}

interface CrudPanelProps<TRow extends Record<string, any>> {
  baseUrl: string
  token: string
  config: ResourceConfig<TRow>
}

function CrudPanel<TRow extends Record<string, any>>({
  baseUrl,
  token,
  config,
}: CrudPanelProps<TRow>) {
  const { path, fields, columns, idKey, title } = config

  const [form, setForm] = useState<FormState>(emptyForm(fields))
  const [editingId, setEditingId] = useState<string | null>(null)

  const [list, setList] = useState<TRow[]>([])
  const [metadata, setMetadata] = useState<Metadata | null>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [lookupId, setLookupId] = useState('')
  const [lookupResult, setLookupResult] = useState<TRow | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const options = useOptionSources(baseUrl, token, fields)

  const fetchList = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setError('')
    try {
      const data = await apiRequest<ListResponse<TRow>>(
        baseUrl,
        `${path}?page=${page}&pageSize=${pageSize}`,
        { token }
      )
      setList(data.data || [])
      setMetadata(data.metadata || null)
    } catch (err) {
      setError((err as ApiError).message)
    } finally {
      setLoading(false)
    }
  }, [baseUrl, token, path, page, pageSize])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  const handleChange = (name: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm(emptyForm(fields))
    setEditingId(null)
  }

  const buildPayload = (): Record<string, unknown> => {
    const payload: Record<string, unknown> = {}
    fields.forEach((f) => {
      let v: any = form[f.name]
      if (v === '' || v === null || v === undefined) return
      if (f.type === 'number') v = Number(v)
      if (f.type === 'datetime') v = new Date(v as string).toISOString()
      payload[f.name] = v
    })
    return payload
  }

  const submitCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await apiRequest(baseUrl, path, {
        method: 'POST',
        token,
        body: buildPayload(),
      })
      resetForm()
      setPage(1)
      fetchList()
    } catch (err) {
      setError((err as ApiError).message)
    }
  }

  const submitUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await apiRequest(baseUrl, `${path}/${editingId}`, {
        method: 'PATCH',
        token,
        body: buildPayload(),
      })
      resetForm()
      fetchList()
    } catch (err) {
      setError((err as ApiError).message)
    }
  }

  const startEdit = (row: TRow) => {
    const next = emptyForm(fields)
    fields.forEach((f) => {
      const v = row[f.name]
      next[f.name] = v === undefined || v === null ? '' : v
    })
    setForm(next)
    setEditingId(String(row[idKey]))
  }

  const remove = async (id: string) => {
    if (!confirm(`Xóa bản ghi ${id}?`)) return
    setError('')
    try {
      await apiRequest(baseUrl, `${path}/${id}`, { method: 'DELETE', token })
      fetchList()
    } catch (err) {
      setError((err as ApiError).message)
    }
  }

  const runLookup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLookupResult(null)
    setError('')
    try {
      const data = await apiRequest<TRow>(baseUrl, `${path}/${lookupId}`, { token })
      setLookupResult(data)
    } catch (err) {
      setError((err as ApiError).message)
    }
  }

  const renderInput = (f: FieldConfig) => {
    if (f.type === 'checkbox') {
      return (
        <input
          type="checkbox"
          checked={!!form[f.name]}
          onChange={(e) => handleChange(f.name, e.target.checked)}
        />
      )
    }
    if (f.type === 'select') {
      const opts = options[f.name] || []
      return (
        <select
          style={styles.input}
          value={form[f.name] as string}
          onChange={(e) => handleChange(f.name, e.target.value)}
        >
          <option value="">-- chọn --</option>
          {opts.map((o) => (
            <option key={o.id} value={o.id}>
              {f.optionLabel ? f.optionLabel(o) : o.id}
            </option>
          ))}
        </select>
      )
    }
    if (f.type === 'datetime') {
      return (
        <input
          style={styles.input}
          type="datetime-local"
          value={form[f.name] as string}
          onChange={(e) => handleChange(f.name, e.target.value)}
        />
      )
    }
    return (
      <input
        style={styles.input}
        type={f.type === 'number' ? 'number' : f.type || 'text'}
        value={form[f.name] as string}
        onChange={(e) => handleChange(f.name, e.target.value)}
      />
    )
  }

  if (!token) {
    return (
      <div style={styles.card}>
        <div style={styles.cardTitle}>{title}</div>
        <div style={{ color: colors.textDim, fontSize: 13 }}>
          Cần đăng nhập (tab Auth) để lấy access token trước khi gọi các API này.
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Create / Update form */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>
          {editingId ? `PATCH ${path}/${editingId}` : `POST ${path}`}
        </div>
        <ErrorMessage error={error} />
        <form onSubmit={editingId ? submitUpdate : submitCreate}>
          <div style={styles.row}>
            {fields.map((f) => (
              <Field key={f.name} label={f.label}>
                {renderInput(f)}
              </Field>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={styles.btn('primary')} type="submit">
              {editingId ? 'Cập nhật' : 'Tạo mới'}
            </button>
            {editingId && (
              <button style={styles.btn('ghost')} type="button" onClick={resetForm}>
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Get by id */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>GET {path}/:id</div>
        <form onSubmit={runLookup} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            style={{ ...styles.input, marginBottom: 0, flex: 1 }}
            placeholder="ID"
            value={lookupId}
            onChange={(e) => setLookupId(e.target.value)}
          />
          <button style={styles.btn('ghost')} type="submit">
            Tra cứu
          </button>
        </form>
        {lookupResult && <pre style={styles.pre}>{JSON.stringify(lookupResult, null, 2)}</pre>}
      </div>

      {/* List */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>GET {path}</div>
        {loading ? (
          <div style={{ color: colors.textDim, fontSize: 13 }}>Đang tải...</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                {columns.map((c) => (
                  <th style={styles.th} key={c.header}>
                    {c.header}
                  </th>
                ))}
                <th style={styles.th}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && (
                <tr>
                  <td style={styles.td} colSpan={columns.length + 1}>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
              {list.map((row) => (
                <tr key={String(row[idKey])}>
                  {columns.map((c) => (
                    <td style={styles.td} key={c.header}>
                      {c.accessor(row)}
                    </td>
                  ))}
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.btn('ghost'), marginRight: 6, padding: '4px 8px' }}
                      onClick={() => startEdit(row)}
                    >
                      Sửa
                    </button>
                    <button
                      style={{ ...styles.btn('danger'), padding: '4px 8px' }}
                      onClick={() => remove(String(row[idKey]))}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div style={styles.pagerRow}>
          <button
            style={styles.btn('ghost')}
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ← Trước
          </button>
          <span>
            Trang {metadata?.page ?? page} / {metadata?.totalPages ?? '-'} (tổng{' '}
            {metadata?.total ?? '-'})
          </span>
          <button
            style={styles.btn('ghost')}
            disabled={metadata ? page >= metadata.totalPages : false}
            onClick={() => setPage((p) => p + 1)}
          >
            Sau →
          </button>
          <select
            style={{ ...styles.input, width: 90, marginBottom: 0, marginLeft: 12 }}
            value={pageSize}
            onChange={(e) => {
              setPage(1)
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n} / trang
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// Resource configs
// ---------------------------------------------------------------------------

interface UserRow {
  id: string
  username: string
  phone: string
  email: string
}

interface FamilyRow {
  id: string
  name: string
  note?: string
  sessionRate: number
  user?: { id: string; username: string; email: string; phone: string }
}

interface SessionRow {
  id: string
  amount: number
  date: string
  isAttended: boolean
  family?: { id: string; name: string }
}

const usersConfig: ResourceConfig<UserRow> = {
  title: 'Users',
  path: '/users',
  idKey: 'id',
  fields: [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ],
  columns: [
    { header: 'ID', accessor: (r) => r.id },
    { header: 'Username', accessor: (r) => r.username },
    { header: 'Email', accessor: (r) => r.email },
    { header: 'Phone', accessor: (r) => r.phone },
  ],
}

const familiesConfig: ResourceConfig<FamilyRow> = {
  title: 'Families',
  path: '/families',
  idKey: 'id',
  fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'note', label: 'Note', type: 'text' },
    { name: 'sessionRate', label: 'Session Rate', type: 'number' },
    {
      name: 'userId',
      label: 'User',
      type: 'select',
      optionsPath: '/users',
      optionLabel: (u: UserRow) => `${u.username} (${u.email})`,
    },
  ],
  columns: [
    { header: 'ID', accessor: (r) => r.id },
    { header: 'Name', accessor: (r) => r.name },
    { header: 'Session Rate', accessor: (r) => r.sessionRate },
    { header: 'User', accessor: (r) => r.user?.username },
  ],
}

const sessionsConfig: ResourceConfig<SessionRow> = {
  title: 'Sessions',
  path: '/sessions',
  idKey: 'id',
  fields: [
    { name: 'amount', label: 'Amount', type: 'number' },
    { name: 'date', label: 'Date', type: 'datetime' },
    { name: 'isAttended', label: 'Attended', type: 'checkbox' },
    {
      name: 'familyId',
      label: 'Family',
      type: 'select',
      optionsPath: '/families',
      optionLabel: (f: FamilyRow) => f.name,
    },
  ],
  columns: [
    { header: 'ID', accessor: (r) => r.id },
    { header: 'Amount', accessor: (r) => r.amount },
    { header: 'Date', accessor: (r) => r.date },
    { header: 'Family', accessor: (r) => r.family?.name },
  ],
}

// ---------------------------------------------------------------------------
// Root Demo page
// ---------------------------------------------------------------------------

type TabKey = 'auth' | 'users' | 'families' | 'sessions'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'auth', label: 'Auth' },
  { key: 'users', label: 'Users' },
  { key: 'families', label: 'Families' },
  { key: 'sessions', label: 'Sessions' },
]

const Demo: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState(DEFAULT_BASE_URL)
  const [token, setToken] = useState('')
  const [tab, setTab] = useState<TabKey>('auth')

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarTitle}>Hangie API Demo</div>
        {TABS.map((t) => (
          <button
            key={t.key}
            style={styles.navBtn(tab === t.key)}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </aside>

      <main style={styles.main}>
        <h1 style={styles.h1}>{TABS.find((t) => t.key === tab)?.label}</h1>
        <div style={styles.sub}>
          Base URL: <code>{baseUrl}</code>
          {token ? (
            <span style={{ marginLeft: 8, ...styles.pill('success') }}>Token OK</span>
          ) : (
            <span style={{ marginLeft: 8, ...styles.pill('danger') }}>Chưa có token</span>
          )}
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>Cấu hình</div>
          <div style={styles.row}>
            <Field label="Base URL">
              <input
                style={styles.input}
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
              />
            </Field>
          </div>
        </div>

        {tab === 'auth' && <AuthPanel baseUrl={baseUrl} token={token} onLogin={setToken} />}
        {tab === 'users' && (
          <CrudPanel<UserRow> baseUrl={baseUrl} token={token} config={usersConfig} />
        )}
        {tab === 'families' && (
          <CrudPanel<FamilyRow> baseUrl={baseUrl} token={token} config={familiesConfig} />
        )}
        {tab === 'sessions' && (
          <CrudPanel<SessionRow> baseUrl={baseUrl} token={token} config={sessionsConfig} />
        )}
      </main>
    </div>
  )
}

export default Demo