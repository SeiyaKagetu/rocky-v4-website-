# 🚀 クイックスタート - Rocky Linux v4.0 Webサイト公開

**所要時間**: 15分
**費用**: ¥0（完全無料）

---

## ✅ チェックリスト（順番に実行）

### □ ステップ1: ローカルプレビュー（3分）

```bash
# websiteディレクトリに移動
cd /home/seiya/Projects/nove-infinity-project/website

# ローカルサーバー起動
python3 -m http.server 8000
```

**ブラウザでアクセス**: http://localhost:8000

- [ ] トップページ表示確認
- [ ] 料金ページ表示確認
- [ ] ドキュメントページ表示確認
- [ ] お問い合わせページ表示確認

**確認後**: Ctrl+C でサーバー停止

---

### □ ステップ2: Git セットアップ（5分）

```bash
# websiteディレクトリにいることを確認
cd /home/seiya/Projects/nove-infinity-project/website

# セットアップスクリプト実行
bash setup-git.sh
```

**スクリプトが尋ねること**:
1. お名前（例: Seiya Kawaguchi）
2. メールアドレス（例: seiya@example.com）
3. GitHubリポジトリURL（後で設定も可）

---

### □ ステップ3: GitHub リポジトリ作成（3分）

1. **GitHub にアクセス**: https://github.com
2. **右上の「+」→「New repository」をクリック**
3. **入力内容**:
   - Repository name: `rocky-v4-website`
   - Description: `Rocky Linux v4.0 Commercial Website`
   - **Public** を選択（無料）
   - **「Initialize this repository with a README」はチェックしない**
4. **「Create repository」をクリック**
5. **リポジトリURLをコピー**:
   - 例: `https://github.com/YOUR_USERNAME/rocky-v4-website.git`

---

### □ ステップ4: GitHubへプッシュ（2分）

```bash
# まだ setup-git.sh でプッシュしていない場合
cd /home/seiya/Projects/nove-infinity-project/website

# リモートリポジトリ追加（URLは自分のものに置き換え）
git remote add origin https://github.com/YOUR_USERNAME/rocky-v4-website.git

# ブランチ名をmainに変更
git branch -M main

# GitHubへプッシュ
git push -u origin main
```

**成功例**:
```
Enumerating objects: 12, done.
Counting objects: 100% (12/12), done.
Delta compression using up to 8 threads
Compressing objects: 100% (10/10), done.
Writing objects: 100% (12/12), 15.32 KiB | 1.53 MiB/s, done.
Total 12 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/YOUR_USERNAME/rocky-v4-website.git
 * [new branch]      main -> main
```

---

### □ ステップ5: Netlify デプロイ（5分）

#### 5-1. Netlify アカウント作成（1分）

1. **Netlify にアクセス**: https://www.netlify.com
2. **「Sign up」をクリック**
3. **「GitHub」でサインアップを選択**
4. GitHub認証を許可

#### 5-2. サイトをデプロイ（2分）

1. **「Add new site」→「Import an existing project」をクリック**
2. **「GitHub」を選択**
3. **リポジトリ選択**:
   - `rocky-v4-website` を検索
   - クリックして選択
4. **設定確認**（自動入力されています）:
   - Branch to deploy: `main`
   - Build command: （空欄）
   - Publish directory: `.`
5. **「Deploy site」をクリック**

#### 5-3. デプロイ完了確認（2分）

約1分待つと...

```
✅ Site is live!
URL: https://random-name-123.netlify.app
```

**ブラウザでアクセス**してサイト表示を確認！

---

### □ ステップ6: サイト名変更（2分・オプション）

デフォルトのランダムURL（`random-name-123.netlify.app`）を変更：

1. **「Site settings」をクリック**
2. **「Domain management」→「Options」→「Edit site name」**
3. **サイト名入力**:
   - 例: `rocky-linux-v4`
   - 新URL: `https://rocky-linux-v4.netlify.app`
4. **「Save」をクリック**

---

## 🎉 公開完了！

**あなたのWebサイト**: https://rocky-linux-v4.netlify.app

---

## 📝 次にやること（カスタマイズ）

### 1. Formspree 連携（お問い合わせフォーム）

#### 1-1. Formspree アカウント作成

1. **Formspree にアクセス**: https://formspree.io
2. **「Sign up」→「GitHub」でサインアップ**
3. **新規フォーム作成**:
   - Form name: `Rocky Linux v4.0 Contact`
   - 「Create Form」をクリック
4. **Form ID をコピー**:
   - 例: `abc123xyz`

#### 1-2. contact.html 編集

```bash
cd /home/seiya/Projects/nove-infinity-project/website
nano contact.html
```

**138行目を変更**:
```html
<!-- 変更前 -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">

<!-- 変更後 -->
<form action="https://formspree.io/f/abc123xyz" method="POST">
```

保存: Ctrl+O → Enter → Ctrl+X

#### 1-3. GitHubへプッシュ

```bash
git add contact.html
git commit -m "Update Formspree Form ID"
git push
```

**Netlify 自動再デプロイ**（約1分）→ フォーム動作確認

---

### 2. メールアドレス変更

```bash
cd /home/seiya/Projects/nove-infinity-project/website

# contact.html 編集（109行目）
nano contact.html
# seiya@example.com → あなたのメール

# docs.html 編集（288行目、313行目）
nano docs.html
# seiya@example.com → あなたのメール

# GitHubへプッシュ
git add contact.html docs.html
git commit -m "Update email addresses"
git push
```

---

## 📊 マーケティング開始

### SNSで告知

```
🚀 Rocky Linux v4.0 性能最適化システムを公開しました！

✅ 699/700点達成（99.9%）
✅ 実測ベースの革新的システム
✅ 3ヶ月無料ベータテスト受付中（先着5社）

詳細: https://rocky-linux-v4.netlify.app

#RockyLinux #Linux #性能最適化 #インフラ
```

### Qiita記事執筆

**タイトル例**:
- 「Rocky Linux 10.1で699/700点を達成した性能最適化手法」
- 「実測データで証明！Linuxサーバーを99.9%最適化する方法」

### ベータテスト募集

**対象**: Linuxサーバーを10台以上運用している企業様

**特典**:
- 3ヶ月間無料（¥300,000-6,000,000相当）
- 専任エンジニアによる導入サポート
- 正式版リリース後、初年度50%割引

**お問い合わせ**: Webサイトのフォームから

---

## 📚 詳細ガイド

- **完全デプロイガイド**: `NETLIFY_DEPLOY_GUIDE.md`
- **サイト管理**: `README.md`
- **トラブルシューティング**: `NETLIFY_DEPLOY_GUIDE.md` 参照

---

## 🆘 トラブル時の連絡先

**Git/GitHubエラー**: https://docs.github.com/ja
**Netlifyエラー**: https://docs.netlify.com
**Formspreeエラー**: https://help.formspree.io

---

**作成日**: 2026年01月31日
**管理者**: 清也 (Seiya)
