1. tanstack-startでschadcnプロジェクトを作成
```
pnpm create @tanstack/start@latest --tailwind --add-ons shadcn

# アプリ名は`app`とする

# ディレクトリを移動
mv app/* .    
```   

2. コンポーネントをプロジェクトに追加
```
pnpm dlx shadcn@latest add --all
```


[参照]
https://ui.shadcn.com/docs/installation/tanstack