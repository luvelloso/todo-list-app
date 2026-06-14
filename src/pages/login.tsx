import { useState, type FormEvent } from 'react'
import { Button } from '../components/shared/button'
import { Checkbox } from '../components/shared/checkbox'
import { Input } from '../components/shared/input'
import { PageLayout } from '../components/shared/layout'
import { useAuth } from '../hooks/use-auth'
import toast from 'react-hot-toast'

const BRAND = {
  background: 'bg-[#F2F5E8]',
  accent: 'text-[#315921]',
  highlight: 'bg-[#8DB541]',
  dark: 'text-[#1F2B18]',
}

interface LoginPageProps {
  onAuthenticate: () => void
}

export function LoginPage({ onAuthenticate }: LoginPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const isSignup = mode === 'signup'
  const { login, register, loading } = useAuth()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSignup && !acceptedTerms) {
      toast.error('Você deve aceitar os termos de uso.')
      return
    }

    if (isSignup && password !== confirmPassword) {
      toast.error('As senhas não conferem.')
      return
    }

    try {
      if (isSignup) {
        console.log('Auth: register attempt', { email, full_name: name })
        await register(email, name, password)
        setMode('login')
        console.log('Auth: register success', { email })
        toast.success('Conta criada com sucesso. Faça login para continuar.')
        setName('')
        setAcceptedTerms(false)
        setPassword('')
        setConfirmPassword('')
        setTimeout(() => document.getElementById('email')?.focus(), 50)
        return
      }

      console.log('Auth: login attempt', { email })
      await login(email, password)
      console.log('Auth: login success', { email })
      onAuthenticate()
    } catch (error) {
      console.error('Auth error', error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Erro ao autenticar')
      }
    }
  }

  return (
    <PageLayout
      variant="split"
      left={
        <aside className={`relative flex-1 ${BRAND.background} p-4 sm:p-5`}>
          <div className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-[#E5F0CB] to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4C5D35] shadow-sm">
                AFL CONSULTORES
              </div>
              <h1 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-[#23320F] sm:text-3xl">
                Soluções Inteligentes para Gestão Tributária
              </h1>
              <p className="mt-3 max-w-xs text-sm leading-5 text-[#4A5F39] sm:text-sm">
                Tecnologia, segurança e resultado para sua empresa enfrentar a reforma tributária com mais controle.
              </p>
            </div>

            <div className="grid gap-2">
              <div className="rounded-3xl border border-[#D9E3BD] bg-white/90 p-3 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7D993B]">
                  Marca
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#6C8F1C] text-[13px] font-bold text-white">
                    A
                  </div>
                  <div>
                    <p className="font-semibold text-[#23320F] text-sm">AFL Consultores</p>
                    <p className="text-xs text-[#6D7A53]">Soluções Tributárias e Tecnologia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      }
    >
      <main className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
            <div className="mb-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#4F6337]">
                <span className="h-2 w-2 rounded-full bg-[#8DB541]" />
                Acesso seguro do usuário
              </div>
              <h2 className="text-xl font-bold text-[#19220F]">{isSignup ? 'Criar conta' : 'Entrar'}</h2>
              <p className="max-w-lg text-sm leading-5 text-[#5A6B49]">
                Use suas credenciais para acessar o sistema ou crie um novo usuário com um fluxo simples e claro.
              </p>
            </div>

            <div className="mb-4 grid gap-2 rounded-3xl border border-[#E2E6CC] bg-[#FCFDF9] p-2">
            {['login', 'signup'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setMode(tab as 'login' | 'signup')}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                  mode === tab
                    ? 'bg-[#6C8F1C] text-white shadow-sm'
                    : 'bg-transparent text-[#4A5F39] hover:bg-[#E5F0D3]'
                }`}
              >
                {tab === 'login' ? 'Login' : 'Criar usuário'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignup && (
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#3A4D27]">
                  Nome completo
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Digite seu nome"
                  type="text"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-semibold text-[#3A4D27] sm:text-sm">
                Email
              </label>
              <Input
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seu@email.com"
                type="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-semibold text-[#3A4D27] sm:text-sm">
                Senha
              </label>
              <Input
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Crie uma senha segura"
                type="password"
              />
            </div>

            {isSignup && (
              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-[#3A4D27]">
                  Confirmar senha
                </label>
                <Input
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Digite a senha novamente"
                  type="password"
                />
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Checkbox
                checked={isSignup ? acceptedTerms : rememberMe}
                onChange={(value) => {
                  if (isSignup) {
                    setAcceptedTerms(value)
                  } else {
                    setRememberMe(value)
                  }
                }}
                label={isSignup ? 'Aceito os termos de uso' : 'Lembrar-me nesta máquina'}
              />

              

              {!isSignup && (
                <p className="text-sm text-[#5A6B49]">
                  Ainda não tem cadastro?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="font-semibold text-[#6C8F1C] hover:text-[#54770f]"
                  >
                    Criar usuário
                  </button>
                </p>
              )}
            </div>

            <Button type="submit" variant="brand" fullWidth disabled={loading}>
              {loading ? 'Aguarde...' : isSignup ? 'Criar conta' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-4 rounded-3xl border border-[#E6EAD4] bg-white/90 p-3 text-xs text-[#5B6C4C]">
            <p className="font-semibold text-[#374826]">Direitos</p>
            <p className="mt-2 leading-5">
              Lúcia Velloso - 2026. Todos os direitos reservados.
            </p>
          </div>
        </main>
    </PageLayout>
  )
}
