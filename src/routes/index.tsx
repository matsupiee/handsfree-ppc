import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Zap, CheckCircle, X, Sparkles, Send } from 'lucide-react'
import { motion } from "motion/react"
import { toast } from 'sonner'
import { Textarea } from '../components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"

import { Toaster } from '../components/ui/sonner'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  const [email, setEmail] = useState('')
  const [spend, setSpend] = useState('')
  const [trouble, setTrouble] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      toast.success('お問い合わせを受け付けました')
    }, 1500)
  }

  const scrollToForm = () => {
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      <Toaster position="top-center" theme="light" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">Handsfree PPC</span>
          </div>
          <Button variant="ghost" className="text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900" onClick={scrollToForm}>
            お問い合わせ
          </Button>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6 text-center max-w-5xl mb-32 relative">
          {/* Abstract Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-1.5 text-sm tracking-wider hover:bg-blue-100">
                Amazon出品者向け
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 tracking-tight text-slate-900">
              Amazon広告、
              <br />
              <span className="text-blue-600">
                もう見なくていい。
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-medium text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              広告運用の手間を減らします。<br className="hidden md:inline" />
              無駄な支出を抑えつつ、自然に成果が残る仕組みです。
            </p>

            <Button
              size="lg"
              className="h-14 px-8 text-lg rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
              onClick={scrollToForm}
            >
              無料で相談する（15分）
            </Button>
          </motion.div>
        </section>

        {/* What We Do */}
        <section className="container mx-auto px-6 max-w-4xl mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">何ができるのか？</h2>
            <p className="text-slate-600">Amazon広告を見ずに済むようにします</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-red-50 flex items-center justify-center mb-2">
                  <X className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle className="text-lg text-slate-900">キーワード調整</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm leading-relaxed">
                  赤字キーワードを自動でカットし、勝ちキーワードを自動強化します。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-5">
                <Zap className="h-24 w-24 text-blue-600" />
              </div>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-2">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg text-slate-900">入札・予算を自動で調整</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm leading-relaxed">
                  入札調整、予算管理など、面倒な作業を自動で行います。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center mb-2">
                  <Send className="h-6 w-6 text-slate-600" />
                </div>
                <CardTitle className="text-lg text-slate-900">コスト削減</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm leading-relaxed">
                  高額な運用手数料は不要です。
                  人に頼らない仕組みを構築しているため、コストを安く抑えられます。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Promise / About Us */}
        <section className="relative overflow-hidden border-y border-slate-200 bg-slate-50/50 py-24 mb-32">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-40 -z-10"></div>

          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-slate-900 leading-tight">
                    About us
                  </h2>
                  {/* <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    Amazon広告の「考える手間」を<br />
                    できるだけ減らすチームです
                  </p> */}
                </div>

                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    私たちは、Amazon出品や広告運用の支援に関わってきた経験をもとに、
                    広告を「見なくていい」状態に近づける仕組みを作っています。
                  </p>
                  <p>
                    本来、人が判断しなくてもよい作業はできるだけ自動化し、
                    出品者の方が商品や戦略に集中できる環境を目指しています。
                  </p>
                </div>

                {/* Trust Points */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        仕組み前提の運用
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        人に依存しない設計を前提にしているため、運用はシンプルで無駄がありません。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        β版運用・無理な営業なし
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        現在は少人数でβ版を運用中です。ご相談ベースで、合わない場合はそのまま終了できます。
                      </p>
                    </div>
                  </div>
                </div>
              </div>


              {/* Right Side Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl transform rotate-1 opacity-10"></div>
                <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-100 shadow-xl relative z-10 transition-transform hover:-translate-y-1 duration-300">

                  <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      まずは軽い相談から
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      「今の広告、見直した方がいい？」<br />
                      そんな軽い相談からお受けします。
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span>ご相談・初期対応はすべて無料</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span>無理な営業・契約はありません</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span>β運用のため、個別に対応しています</span>
                    </li>
                  </ul>

                  <Button
                    onClick={scrollToForm}
                    className="w-full h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100 rounded-full"
                  >
                    相談してみる
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section id="inquiry-form" className="container mx-auto px-6 max-w-xl pb-32">
          {!submitted ? (
            <Card className="bg-white border-slate-200 shadow-2xl shadow-slate-200">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl mb-2 text-slate-900">お問い合わせ</CardTitle>
                <p className="text-slate-500 text-sm">
                  現状をヒアリングし、効果が見込めるか判断します。
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">メールアドレス</label>
                    <Input
                      type="email"
                      placeholder="account@example.com"
                      className="bg-white border-slate-300 h-11 text-slate-900 placeholder:text-slate-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">月の広告費</label>
                    <Select value={spend} onValueChange={setSpend} required>
                      <SelectTrigger className="bg-white border-slate-300 h-11 text-slate-900">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200 text-slate-900">
                        <SelectItem value="low">5万円以下</SelectItem>
                        <SelectItem value="mid">5万円 〜 30万円</SelectItem>
                        <SelectItem value="high">30万円 〜 100万円</SelectItem>
                        <SelectItem value="enterprise">100万円以上</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">今一番困ってること</label>
                    <Textarea
                      placeholder="例：ACoSが高止まりしている、運用する時間がない、など"
                      className="bg-white border-slate-300 min-h-[100px] text-slate-900 placeholder:text-slate-400"
                      value={trouble}
                      onChange={(e) => setTrouble(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white mt-4"
                    disabled={loading}
                  >
                    {loading ? '送信中...' : '無料で相談する'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white p-12 rounded-2xl border border-slate-200 shadow-xl"
            >
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">ありがとうございます。</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                現状を軽く見た上で<br />
                「できる／できない」を正直に伝えます。
              </p>
              <Button variant="outline" onClick={() => setSubmitted(false)} className="border-slate-300 text-slate-700 hover:bg-slate-50">
                トップに戻る
              </Button>
            </motion.div>
          )}
        </section>

      </main>

      <footer className="border-t border-slate-200 py-12 bg-slate-50 text-center">
        <p className="text-slate-500 text-sm">&copy; 2025 Handsfree PPC.</p>
      </footer>
    </div>
  )
}
