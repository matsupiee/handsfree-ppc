import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Badge } from '../components/ui/badge'
import { Wand2, RefreshCw, Send, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Toaster } from '../components/ui/sonner'

export const Route = createFileRoute('/admin')({ component: AdminPage })

type User = {
    id: string
    email: string
    status: string
    joinedAt: string
    amazonId: string
    // Admin fields
    sales?: string
    acos?: string
    memo?: string
}

function AdminPage() {
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<string | null>(null)
    const [stats, setStats] = useState({ sales: '', acos: '', memo: '' })
    const [generatedReport, setGeneratedReport] = useState('')

    useEffect(() => {
        // Load users from localStorage (simulating DB)
        const loadUsers = () => {
            const stored = localStorage.getItem('handsfree_users')
            if (stored) {
                setUsers(JSON.parse(stored))
            } else {
                // Add dummy users if none exist
                const dummies = [
                    { id: '1', email: 'demo@example.com', status: 'active', joinedAt: new Date().toISOString(), amazonId: 'A1234567', sales: '1200000', acos: '24', memo: '競合増加傾向' },
                    { id: '2', email: 'shop_owner@test.jp', status: 'active', joinedAt: new Date(Date.now() - 86400000).toISOString(), amazonId: 'A9876543' }
                ]
                setUsers(dummies)
                localStorage.setItem('handsfree_users', JSON.stringify(dummies))
            }
        }
        loadUsers()

        // Poll for new users (simple way to sync tabs in MVP)
        const interval = setInterval(loadUsers, 2000)
        return () => clearInterval(interval)
    }, [])

    const handleSelectUser = (user: User) => {
        setSelectedUser(user.id)
        setStats({
            sales: user.sales || '',
            acos: user.acos || '',
            memo: user.memo || ''
        })
        setGeneratedReport('')
    }

    const handleSaveStats = () => {
        if (!selectedUser) return

        const updatedUsers = users.map(u =>
            u.id === selectedUser ? { ...u, ...stats } : u
        )
        setUsers(updatedUsers)
        localStorage.setItem('handsfree_users', JSON.stringify(updatedUsers))
        toast.success('データを保存しました')
    }

    const generateReport = () => {
        if (!selectedUser) return

        const user = users.find(u => u.id === selectedUser)
        if (!user) return

        // Template logic
        const templates = [
            `昨日、無駄な検索語を${Math.floor(Math.random() * 20) + 5}個停止しました。\nACoSが${Math.floor(Math.random() * 5) + 1}%改善しています。\n${stats.memo ? `\n追記: ${stats.memo}` : ''}`,
            `【日次レポート】\n売上: ¥${parseInt(stats.sales || '0').toLocaleString()}\nACoS: ${stats.acos}%\n\n入札調整により、収益性の低いプレースメントへの露出を抑制しました。`,
            `昨日の最適化完了報告です。\n\n・予算配分の最適化: 完了\n・無駄KWの除外: 完了\n\n引き続き、ROAS重視で運用を継続します。`
        ]

        setGeneratedReport(templates[Math.floor(Math.random() * templates.length)])
    }

    const copyReport = () => {
        navigator.clipboard.writeText(generatedReport)
        toast.success('レポートをコピーしました')
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
            <Toaster />
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Wand2 className="h-6 w-6 text-indigo-600" />
                            Handsfree Admin
                        </h1>
                        <p className="text-slate-500">Wizard of Oz Control Panel</p>
                    </div>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        <RefreshCw className="mr-2 h-4 w-4" /> Reload
                    </Button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User List */}
                    <Card className="lg:col-span-1 shadow-sm">
                        <CardHeader>
                            <CardTitle>Users</CardTitle>
                            <CardDescription>登録ユーザー一覧</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 max-h-[600px] overflow-y-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Email</TableHead>
                                        <TableHead className="w-[100px]">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map(user => (
                                        <TableRow
                                            key={user.id}
                                            className={`cursor-pointer transition-colors ${selectedUser === user.id ? 'bg-indigo-50 hover:bg-indigo-100' : 'hover:bg-slate-50'}`}
                                            onClick={() => handleSelectUser(user)}
                                        >
                                            <TableCell className="font-medium">
                                                <div className="truncate w-[180px]" title={user.email}>{user.email}</div>
                                                <div className="text-xs text-slate-400 font-mono">{user.amazonId}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className={user.status === 'active' ? 'bg-green-500 hover:bg-green-600' : ''}>
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Action Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        {selectedUser ? (
                            <>
                                <Card className="shadow-sm border-indigo-100">
                                    <CardHeader className="pb-3 bg-indigo-50/50 border-b border-indigo-100 rounded-t-xl">
                                        <CardTitle className="text-indigo-900">Operation for: {users.find(u => u.id === selectedUser)?.email}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">昨日の売上 (円)</label>
                                            <Input
                                                value={stats.sales}
                                                onChange={e => setStats({ ...stats, sales: e.target.value })}
                                                placeholder="例: 50000"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">昨日のACoS (%)</label>
                                            <Input
                                                value={stats.acos}
                                                onChange={e => setStats({ ...stats, acos: e.target.value })}
                                                placeholder="例: 25.4"
                                            />
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <label className="text-sm font-medium">運用メモ (内部用 & AI生成用)</label>
                                            <Textarea
                                                value={stats.memo}
                                                onChange={e => setStats({ ...stats, memo: e.target.value })}
                                                placeholder="例: 競合が強いため入札を高めに設定中..."
                                                className="h-24"
                                            />
                                        </div>
                                        <div className="col-span-2 flex justify-end">
                                            <Button onClick={handleSaveStats} variant="secondary">データを保存</Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="shadow-lg border-indigo-200 bg-gradient-to-br from-white to-indigo-50/30">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Wand2 className="h-5 w-5 text-indigo-600" />
                                            Generate Notification Content
                                        </CardTitle>
                                        <CardDescription>
                                            ユーザーに送信する「回ってる感」通知を生成します
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Button onClick={generateReport} className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-lg">
                                            <Wand2 className="mr-2 h-5 w-5" /> Gen AI Report (Template)
                                        </Button>

                                        {generatedReport && (
                                            <div className="mt-4 p-4 bg-white rounded-lg border border-indigo-100 shadow-sm">
                                                <pre className="whitespace-pre-wrap text-sm font-sans text-slate-700 leading-relaxed mb-4">
                                                    {generatedReport}
                                                </pre>
                                                <div className="flex gap-3 justify-end">
                                                    <Button variant="outline" size="sm" onClick={copyReport}>
                                                        <Copy className="mr-2 h-4 w-4" /> Copy
                                                    </Button>
                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                        <Send className="mr-2 h-4 w-4" /> Send (Dummy)
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-12 border-2 border-dashed border-slate-200 rounded-xl">
                                <Wand2 className="h-12 w-12 mb-4 opacity-50" />
                                <p className="text-lg">左側のリストからユーザーを選択してください</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
