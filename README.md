# My Tasks

シンプルで使いやすいTODOアプリです。タスクの管理を直感的に行えます。

## 機能

- **タスクの追加** — テキストを入力してEnterキーまたは「Add」ボタンでタスクを追加
- **優先度の設定** — 低 / 中 / 高の3段階で優先度を設定（色付きドットで視覚化）
- **完了のトグル** — チェックボックスをクリックして完了/未完了を切り替え
- **インライン編集** — タイトルをダブルクリックして直接編集（Enter確定、Escキャンセル）
- **タスクの削除** — ホバー時に表示される削除ボタンで個別削除
- **フィルタリング** — All / Active / Completed でタスクを絞り込み
- **一括削除** — 完了済みタスクをまとめて削除
- **データ永続化** — localStorage に保存するため、リロード後もデータが保持される

## 技術スタック

| ライブラリ | 用途 |
|---|---|
| [Next.js 16](https://nextjs.org) | フレームワーク (App Router) |
| [TypeScript](https://www.typescriptlang.org) | 型安全な開発 |
| [Tailwind CSS v4](https://tailwindcss.com) | スタイリング |
| [Zustand](https://zustand-demo.pmnd.rs) | 状態管理・localStorage永続化 |

## ディレクトリ構成

```
.
├── app/
│   ├── layout.tsx          # ルートレイアウト
│   └── page.tsx            # エントリーポイント
├── components/
│   ├── TodoApp.tsx         # アプリのルートコンポーネント
│   ├── TodoInput.tsx       # タスク入力フォーム
│   ├── TodoItem.tsx        # タスク単体の表示・操作
│   ├── TodoList.tsx        # タスク一覧
│   ├── TodoFilters.tsx     # All / Active / Completed フィルター
│   └── TodoStats.tsx       # 残タスク数・Clear completed
├── store/
│   └── todoStore.ts        # Zustand ストア
└── types/
    └── todo.ts             # 型定義
```

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## スクリプト

```bash
npm run dev      # 開発サーバーの起動
npm run build    # 本番ビルド
npm run start    # 本番サーバーの起動
npm run lint     # ESLintの実行
```
