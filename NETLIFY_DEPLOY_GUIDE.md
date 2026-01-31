# Netlify デプロイガイド - Rocky Linux v4.0 商業版Webサイト

**作成日**: 2026年01月31日
**目的**: Netlifyでの無料公開手順

---

## 🚀 Netlifyデプロイ 完全手順

### 前提条件

- ✅ GitHubアカウント（無料）
- ✅ Netlifyアカウント（無料）
- ✅ Git インストール済み

---

## ステップ1: GitHubリポジトリ作成

### 1-1. GitHubでリポジトリ作成

1. **GitHub にアクセス**: https://github.com
2. **「New repository」をクリック**
3. **リポジトリ情報入力**:
   - Repository name: `rocky-v4-website`
   - Description: `Rocky Linux v4.0 Commercial Website`
   - Public または Private（Netlifyはどちらでも可）
   - **「Initialize this repository with a README」はチェックしない**
4. **「Create repository」をクリック**

### 1-2. ローカルからGitHubへプッシュ

```bash
# websiteディレクトリに移動
cd /home/seiya/Projects/nove-infinity-project/website

# Gitリポジトリ初期化
git init

# すべてのファイルを追加
git add .

# 初回コミット
git commit -m "Initial commit: Rocky Linux v4.0 Commercial Website"

# GitHubリポジトリと接続（URLは自分のものに置き換え）
git remote add origin https://github.com/YOUR_USERNAME/rocky-v4-website.git

# ブランチ名を main に変更
git branch -M main

# GitHubへプッシュ
git push -u origin main
```

**注意**: `YOUR_USERNAME` を実際のGitHubユーザー名に置き換えてください。

---

## ステップ2: Netlifyアカウント作成

### 2-1. Netlify サインアップ

1. **Netlify にアクセス**: https://www.netlify.com
2. **「Sign up」をクリック**
3. **「GitHub でサインアップ」を選択（推奨）**
4. GitHub認証を許可
5. アカウント作成完了

---

## ステップ3: NetlifyでWebサイトをデプロイ

### 3-1. 新規サイト作成

1. **Netlifyダッシュボードにログイン**
2. **「Add new site」→「Import an existing project」をクリック**
3. **「GitHub」を選択**
4. **GitHubリポジトリを許可**:
   - 「Authorize Netlify」をクリック
   - パスワード入力（必要な場合）
5. **リポジトリ選択**:
   - `rocky-v4-website` を検索して選択

### 3-2. ビルド設定

以下の設定を確認（netlify.tomlがあるので自動設定されます）:

| 項目 | 値 |
|------|-----|
| **Branch to deploy** | `main` |
| **Build command** | （空欄） |
| **Publish directory** | `.` |

**「Deploy site」をクリック**

### 3-3. デプロイ完了

約1分で自動デプロイが完了します：

- ✅ ビルド成功
- ✅ サイト公開
- ✅ 一時URL発行: `https://random-name-123.netlify.app`

---

## ステップ4: カスタムドメイン設定（オプション）

### 4-1. 無料サブドメイン変更

1. **「Site settings」→「Domain management」**
2. **「Options」→「Edit site name」**
3. **サイト名変更**:
   - 例: `rocky-v4-website` → `rocky-linux-v4`
   - 新URL: `https://rocky-linux-v4.netlify.app`
4. **「Save」をクリック**

### 4-2. 独自ドメイン設定（有料）

独自ドメインを持っている場合：

1. **「Add custom domain」をクリック**
2. **ドメイン入力**: `rocky-linux-v4.com`
3. **DNS設定**:
   - お名前.com、ムームードメイン等でDNS設定
   - Netlify提供のネームサーバーを設定
4. **SSL証明書**: 自動で Let's Encrypt 発行（無料）

---

## ステップ5: 環境変数・設定のカスタマイズ

### 5-1. Formspree連携

1. **Formspree アカウント作成**: https://formspree.io
2. **新規フォーム作成**
3. **Form ID 取得**: 例 `abc123xyz`
4. **contact.html 編集**:
   ```bash
   cd /home/seiya/Projects/nove-infinity-project/website
   nano contact.html
   ```

   変更箇所（138行目）:
   ```html
   <!-- 変更前 -->
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">

   <!-- 変更後 -->
   <form action="https://formspree.io/f/abc123xyz" method="POST">
   ```

5. **変更をGitHubへプッシュ**:
   ```bash
   git add contact.html
   git commit -m "Update Formspree Form ID"
   git push
   ```

6. **Netlify 自動再デプロイ**（約1分）

### 5-2. メールアドレス変更

1. **contact.html 編集**:
   ```bash
   nano contact.html
   ```

   変更箇所（109行目）:
   ```html
   <!-- 変更前 -->
   <a href="mailto:seiya@example.com">seiya@example.com</a>

   <!-- 変更後 -->
   <a href="mailto:あなたのメール@example.com">あなたのメール@example.com</a>
   ```

2. **docs.html 編集** (288行目):
   ```html
   <!-- 変更前 -->
   # Email: seiya@example.com

   <!-- 変更後 -->
   # Email: あなたのメール@example.com
   ```

3. **変更をコミット・プッシュ**:
   ```bash
   git add contact.html docs.html
   git commit -m "Update email addresses"
   git push
   ```

---

## ステップ6: Google Analytics 追加（オプション）

### 6-1. Google Analytics 設定

1. **Google Analytics アカウント作成**: https://analytics.google.com
2. **トラッキングID 取得**: 例 `G-XXXXXXXXXX`
3. **すべてのHTMLファイルの `<head>` タグ内に追加**:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

4. **コミット・プッシュ**:
```bash
git add index.html pricing.html docs.html contact.html
git commit -m "Add Google Analytics"
git push
```

---

## ステップ7: SEO 最適化

### 7-1. meta description 追加

各HTMLファイルの `<head>` タグ内に追加済み：

```html
<meta name="description" content="Rocky Linux v4.0 - 699/700点達成！世界最高峰のLinux性能最適化システム">
```

### 7-2. OGP（Open Graph Protocol）追加

SNSシェア用のメタタグを追加（オプション）：

```html
<!-- OGP -->
<meta property="og:title" content="Rocky Linux v4.0 Adaptive Performance System">
<meta property="og:description" content="699/700点達成！世界最高峰のLinux性能最適化システム">
<meta property="og:image" content="https://rocky-linux-v4.netlify.app/images/og-image.png">
<meta property="og:url" content="https://rocky-linux-v4.netlify.app">
<meta property="og:type" content="website">
```

**注意**: `og:image` 用の画像を `images/og-image.png` に配置する必要があります。

---

## トラブルシューティング

### Q1: デプロイが失敗する

**原因**: ビルド設定が間違っている

**対処**:
1. Netlifyダッシュボード → 「Deploys」
2. エラーログを確認
3. `netlify.toml` の設定を確認

### Q2: ページが404エラー

**原因**: リダイレクト設定が不足

**対処**:
- `netlify.toml` に以下が含まれているか確認:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 404
```

### Q3: フォーム送信が動作しない

**原因**: Formspree Form IDが間違っている

**対処**:
1. Formspreeダッシュボードで Form ID を確認
2. `contact.html` の Form ID を正しく設定
3. GitHubへプッシュして再デプロイ

---

## デプロイ完了チェックリスト

- [ ] GitHubリポジトリ作成・プッシュ完了
- [ ] Netlifyアカウント作成完了
- [ ] Netlifyデプロイ成功
- [ ] サイトURL確認（例: https://rocky-linux-v4.netlify.app）
- [ ] Formspree Form ID 設定完了
- [ ] メールアドレス変更完了
- [ ] Google Analytics 追加完了（オプション）
- [ ] カスタムドメイン設定完了（オプション）
- [ ] SSL証明書有効化確認（HTTPS）
- [ ] すべてのページ動作確認
- [ ] お問い合わせフォーム送信テスト

---

## 次のステップ

Webサイト公開後：

1. **SNSで告知** - Twitter、LinkedIn
2. **Qiita記事執筆** - 技術的な内容で信頼性構築
3. **無料診断キャンペーン** - 先着30社
4. **ベータテスト募集** - 最初の5社（3ヶ月無料）

---

**作成日**: 2026年01月31日
**管理者**: 清也 (Seiya)
**サポート**: https://github.com/YOUR_USERNAME/rocky-v4-website/issues
