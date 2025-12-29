import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Zap, CheckCircle, Sparkles, ChevronRight, ArrowRight, Filter, Cpu, TrendingUp } from 'lucide-react'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzXuJr4nd33B8Vr9Pwrcqf4UB4Or5Nx4L2tO80CcXceN2jpLlhxu7cj96RksMMcb6AX/exec'

    await fetch(GAS_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        email,
        spend,
        trouble,
        ua: navigator.userAgent,
      }),
    });

    setLoading(false);
    setSubmitted(true);

    toast.success('お問い合わせを受け付けました');
  };

  const scrollToForm = () => {
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-gray-100 selection:text-black overflow-x-hidden antialiased">
      <Toaster position="top-center" theme="light" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center">
              <Zap className="h-4 w-4 text-white fill-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">Handsfree PPC</span>
          </div>
          <Button variant="ghost" className="text-sm font-medium text-slate-500 hover:bg-gray-50 hover:text-slate-900 transition-colors" onClick={scrollToForm}>
            お問い合わせ
          </Button>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        {/* Background Gradients (Subtle) */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gray-50 via-white to-white opacity-50"></div>
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-blue-50/50 rounded-full blur-[100px]"></div>
          <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-gray-50 rounded-full blur-[100px]"></div>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-6 text-center max-w-5xl mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex justify-center mb-8">
              <Badge className="bg-gray-100 text-slate-600 border border-gray-200 px-4 py-1.5 text-sm font-medium tracking-wide hover:bg-gray-200 transition-colors rounded-full shadow-sm">
                Amazon出品者向け
              </Badge>
            </div>

            <h1 className="text-5xl md:text-8xl font-black leading-[1.1] mb-8 tracking-tighter text-slate-900">
              Amazon広告、
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-500">
                もう見なくていい
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-normal text-slate-500 mb-10 max-w-3xl mx-auto leading-relaxed tracking-tight">
              広告運用の手間を減らします。<br className="hidden md:inline" />
              無駄な支出を抑えつつ、自然に成果が残る仕組みです。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:shadow-2xl hover:scale-[1.02]"
                onClick={scrollToForm}
              >
                無料で相談（15分） <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </section>

        {/* What We Do */}
        <section className="container mx-auto px-6 max-w-6xl mb-32">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 tracking-tight">何ができるのか？</h2>
            <p className="text-lg text-slate-500">Amazon出品者の広告運用にかかる手間を減らしつつ、成果を上げます</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 group">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-md shadow-slate-200">
                  <Filter className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">キーワード調整</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 leading-relaxed">
                  赤字キーワードを自動でカットし、勝ちキーワードを自動強化します。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 group relative overflow-hidden">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-md shadow-slate-200">
                  <Cpu className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">入札・予算を自動で調整</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 leading-relaxed relative z-10">
                  入札調整、予算管理など、面倒な作業を自動で行います。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 group">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-md shadow-slate-200">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">コスト削減</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 leading-relaxed">
                  高額な運用手数料は不要です。
                  人に頼らない仕組みを構築しているため、コストを安く抑えられます。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Promise / About Us */}
        <section className="relative py-32 bg-gray-50 border-y border-gray-100">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="flex flex-col gap-20">
              <div className="space-y-10">
                <div>
                  <h2 className="text-4xl font-bold mb-6 text-slate-900 leading-tight tracking-tight">
                    About us
                  </h2>
                </div>

                <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-light">
                  <p>
                    私たちは、Amazon出品や広告運用の支援に関わってきた経験をもとに、
                    広告を「見なくていい」状態に近づける仕組みを作っています。
                  </p>
                  <p>
                    本来、人が判断しなくてもよい作業はできるだけ自動化し、
                    出品者の方が商品や戦略に集中できる環境を目指しています。
                  </p>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                    <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">
                        仕組み前提の運用
                      </h4>
                      <p className="text-slate-500 text-sm">
                        人に依存しない設計を前提にしているため、運用はシンプルで無駄がありません。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                    <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">
                        β版運用・無理な営業なし
                      </h4>
                      <p className="text-slate-500 text-sm">
                        現在は少人数でβ版を運用中です。ご相談ベースで、合わない場合はそのまま終了できます。
                      </p>
                    </div>
                  </div>
                </div>
              </div>


              {/* Right Side Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-gray-200 rounded-3xl transform rotate-3 blur-2xl opacity-50"></div>
                <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-2xl relative z-10">

                  <div className="mb-10 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                      まずは軽い相談から
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      「今の広告、見直した方がいい？」
                      そんな軽い相談からお受けします。
                    </p>
                  </div>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3 text-sm text-slate-700 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-slate-900 flex-shrink-0" />
                      <span>ご相談・初期対応はすべて無料</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-slate-900 flex-shrink-0" />
                      <span>無理な営業・契約はありません</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-slate-900 flex-shrink-0" />
                      <span>β運用のため、個別に対応しています</span>
                    </div>
                  </div>

                  <Button
                    onClick={scrollToForm}
                    className="w-full h-14 text-base font-bold bg-slate-900 hover:bg-black text-white rounded-full transition-all shadow-lg hover:shadow-xl"
                  >
                    相談してみる <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section id="inquiry-form" className="container mx-auto px-6 max-w-xl py-20">
          {!submitted ? (
            <Card className="bg-white border-gray-200 shadow-2xl shadow-gray-200/50 rounded-2xl overflow-hidden">
              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-3xl mb-3 text-slate-900 tracking-tight">お問い合わせ</CardTitle>
                <p className="text-slate-500 text-sm">
                  現状をヒアリングし、効果が見込めるか判断します。
                </p>
              </CardHeader>
              <CardContent className="px-8 pb-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">メールアドレス</label>
                    <Input
                      type="email"
                      placeholder="account@example.com"
                      className="bg-gray-50 border-gray-200 h-12 text-slate-900 placeholder:text-slate-400 focus:bg-white transition-all shadow-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">月の広告費</label>
                    <Select value={spend} onValueChange={setSpend} required>
                      <SelectTrigger className="bg-gray-50 border-gray-200 h-12 text-slate-900 focus:bg-white transition-all shadow-sm">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 text-slate-900">
                        <SelectItem value="5万円以下">5万円以下</SelectItem>
                        <SelectItem value="5万円〜30万円">5万円〜30万円</SelectItem>
                        <SelectItem value="30万円〜100万円">30万円〜100万円</SelectItem>
                        <SelectItem value="100万円以上">100万円以上</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">今一番困ってること</label>
                    <Textarea
                      placeholder="例：ACoSが高止まりしている、運用する時間がない、など"
                      className="bg-gray-50 border-gray-200 min-h-[120px] text-slate-900 placeholder:text-slate-400 focus:bg-white transition-all shadow-sm resize-none"
                      value={trouble}
                      onChange={(e) => setTrouble(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-bold bg-slate-900 hover:bg-black text-white mt-4 rounded-lg shadow-lg"
                    disabled={loading}
                  >
                    {loading ? '送信中...' : '送信する'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white p-12 rounded-2xl border border-gray-200 shadow-xl"
            >
              <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">ありがとうございます。</h3>
              <Button variant="outline" onClick={() => setSubmitted(false)} className="border-gray-200 text-slate-700 hover:bg-gray-50 hover:text-slate-900 bg-white">
                トップに戻る
              </Button>
            </motion.div>
          )}
        </section>

      </main>

      <footer className="border-t border-gray-100 py-12 bg-white text-center">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-70">
          <Zap className="h-4 w-4 text-black" />
          <span className="font-bold text-slate-900">Handsfree PPC</span>
        </div>
        <p className="text-slate-400 text-sm">&copy; 2025 Handsfree PPC.</p>
      </footer>
    </div>
  )
}
