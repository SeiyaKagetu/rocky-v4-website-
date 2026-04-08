# Formspree 連携設定ガイド

**目的**: お問い合わせフォームを有効化
**所要時間**: 10分
**費用**: ¥0（無料プラン）

---

## ステップ1: Formspree アカウント作成（3分）

### 1-1. Formspree にアクセス

Firefoxで開きました: **https://formspree.io**

### 1-2. サインアップ

1. **「Sign up」または「Get started」をクリック**
2. **「Continue with GitHub」を選択**
3. **GitHub認証を許可**
   - 「Authorize Formspree」をクリック
4. アカウント作成完了

---

## ステップ2: 新規フォーム作成（2分）

### 2-1. フォーム作成

1. **Formspreeダッシュボード**で「**New form**」または「**Create form**」をクリック
2. **フォーム情報を入力**:
   ```
   Form name: Rocky Linux v4.0 Contact
   Email: myseiyakagetu@proton.me
   ```
3. **「Create form」をクリック**

### 2-2. Form ID をコピー

フォーム作成後、画面に以下のような表示があります：

```
Form endpoint:
https://formspree.io/f/YOUR_FORM_ID

または

Form ID: abc123xyz
```

**このForm IDをコピーしてください**（例: `abc123xyz`）

---

## ステップ3: contact.html 編集（3分）

### 3-1. ファイルを編集

```bash
# websiteディレクトリに移動
cd /home/seiya/Projects/nove-infinity-project/website

# contact.htmlを編集
nano contact.html
```

### 3-2. 138行目を変更

**変更前**:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**変更後**（Form IDを置き換え）:
```html
<form action="https://formspree.io/f/abc123xyz" method="POST">
```

**保存**: Ctrl+O → Enter → Ctrl+X

---

## ステップ4: GitHubへプッシュ（2分）

### 4-1. 変更をコミット

```bash
# ファイルをステージング
git add contact.html

# コミット
git commit -m "Add Formspree Form ID for contact form"

# GitHubへプッシュ
git push
```

### 4-2. プッシュ成功確認

以下のメッセージが表示されればOK:

```
To https://github.com/SeiyaKagetu/rocky-v4-website-.git
   9fc7751..xxxxxxx  main -> main
```

---

## ステップ5: Netlify 自動再デプロイ（1分）

### 5-1. デプロイ確認

GitHubへプッシュすると、Netlifyが自動的に再デプロイします。

1. **Netlifyダッシュボード**を開く: https://app.netlify.com
2. **「Deploys」タブ**をクリック
3. **デプロイ進捗を確認**:
   ```
   🔨 Building...
   ↓
   ✅ Published
   ```

約1分で完了します。

---

## ステップ6: フォーム送信テスト（2分）

### 6-1. サイトにアクセス

https://stately-pithivier-2facbf.netlify.app/contact.html

### 6-2. テスト送信

お問い合わせフォームに以下を入力：

```
会社名: テスト株式会社
お名前: 山田太郎
メールアドレス: test@example.com
電話番号: 03-1234-5678
ご興味のあるプラン: スタンダード
想定サーバー台数: 50
お問い合わせ内容: フォームのテストです
```

**「送信する」をクリック**

### 6-3. 成功確認

**成功時の表示**:
```
Thanks!

Your submission has been received.
```

---

## ステップ7: Formspreeで確認（1分）

### 7-1. Formspreeダッシュボード

1. **Formspree**に戻る: https://formspree.io
2. **「Forms」タブ**をクリック
3. **「Rocky Linux v4.0 Contact」**をクリック

### 7-2. 送信内容確認

テスト送信した内容が表示されます：

```
From: test@example.com
Date: 2026-01-31 18:XX
Status: Delivered

会社名: テスト株式会社
お名前: 山田太郎
...
```

---

## ✅ 完了チェックリスト

- [ ] Formspreeアカウント作成
- [ ] 新規フォーム作成（Rocky Linux v4.0 Contact）
- [ ] Form ID 取得
- [ ] contact.html 編集（138行目）
- [ ] GitHubへプッシュ成功
- [ ] Netlify 自動再デプロイ完了
- [ ] フォーム送信テスト成功
- [ ] Formspreeダッシュボードで確認

---

## 🎯 設定完了後

お問い合わせフォームが完全に動作します：

1. **お客様が送信**
   - Webサイトのフォームから送信
   - Formspreeが受信

2. **あなたに通知**
   - メールアドレス（myseiyakagetu@proton.me）に通知
   - Formspreeダッシュボードで確認可能

3. **返信**
   - 受信メールに直接返信
   - またはFormspreeから返信

---

## 📧 通知メール設定（オプション）

### 追加の通知先を設定

1. **Formspreeダッシュボード**
2. **フォーム「Rocky Linux v4.0 Contact」**を選択
3. **「Settings」タブ**
4. **「Email notifications」**
5. **追加メールアドレスを入力**

---

## 🆘 トラブルシューティング

### Q: フォーム送信後に404エラー

**原因**: Form IDが間違っている

**解決**:
1. Formspreeダッシュボードで正しいForm IDを確認
2. contact.html を再編集
3. GitHubへ再プッシュ

### Q: 通知メールが届かない

**原因**: スパムフォルダに振り分けられている

**解決**:
1. スパムフォルダを確認
2. Formspreeダッシュボードで送信履歴を確認

### Q: フォームが送信できない

**原因**: Netlifyデプロイが完了していない

**解決**:
1. Netlifyダッシュボードで「Deploys」確認
2. 「Published」になるまで待つ（約1分）

---

## 📊 無料プラン制限

Formspree無料プランの制限：

| 項目 | 制限 |
|------|------|
| **フォーム数** | 1フォーム |
| **月間送信数** | 50件/月 |
| **ファイルアップロード** | 不可 |

**50件/月を超える場合**: 有料プラン（$10/月）へアップグレード

---

## 🚀 完了後の次のステップ

Formspree連携完了後：

1. ✅ お問い合わせフォーム動作確認
2. ⏳ メールアドレス変更（seiya@example.com → myseiyakagetu@proton.me）
3. ⏳ サイト名変更（rocky-linux-v4.netlify.app）
4. ⏳ マーケティング開始（SNS投稿・Qiita記事）

---

**作成日**: 2026年01月31日 18:15
**管理者**: 清也 (Seiya)
**サイトURL**: https://stately-pithivier-2facbf.netlify.app/
