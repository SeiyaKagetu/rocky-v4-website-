# GitHubへプッシュ - 実行手順

**リポジトリURL**: https://github.com/SeiyaKagetu/rocky-v4-website-.git
**状態**: リモート設定完了 ✅

---

## 🔑 Personal Access Token 作成（必須）

GitHubは2021年8月にパスワード認証を廃止しました。
**Personal Access Token**が必要です。

### 作成手順（5分）

1. **ブラウザで開く**: https://github.com/settings/tokens/new

2. **Token設定**:
   ```
   Note: rocky-v4-website-deploy
   Expiration: 90 days
   Select scopes: ☑️ repo (全サブスコープにチェック)
   ```

3. **「Generate token」をクリック**

4. **トークンをコピー**:
   ```
   例: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

   ⚠️ **重要**: このページを離れると二度と表示されません！
   必ずコピーしてメモ帳に保存してください。

---

## 📤 プッシュ実行

### ターミナルで実行:

```bash
# websiteディレクトリにいることを確認
cd /home/seiya/Projects/nove-infinity-project/website

# GitHubへプッシュ
git push -u origin main
```

### 認証プロンプトが表示されたら:

```
Username for 'https://github.com': SeiyaKagetu
Password for 'https://SeiyaKagetu@github.com': [ここにPersonal Access Tokenを貼り付け]
```

**注意**:
- Username: `SeiyaKagetu`
- Password: **Personal Access Token** (パスワードではありません！)

---

## ✅ プッシュ成功の確認

以下のメッセージが表示されれば成功:

```
Enumerating objects: 14, done.
Counting objects: 100% (14/14), done.
Delta compression using up to 8 threads
Compressing objects: 100% (13/13), done.
Writing objects: 100% (14/14), XX.XX KiB | X.XX MiB/s, done.
Total 14 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/SeiyaKagetu/rocky-v4-website-.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

---

## 🌐 GitHubで確認

プッシュ成功後、ブラウザで確認:

https://github.com/SeiyaKagetu/rocky-v4-website-

以下のファイルが表示されていればOK:
- index.html
- pricing.html
- docs.html
- contact.html
- css/style.css
- netlify.toml
- README.md
- など全11ファイル

---

## 🚀 次のステップ: Netlify デプロイ

GitHubプッシュ成功後:

1. **Netlify にアクセス**: https://www.netlify.com
2. **「Sign up」→「GitHub」でサインアップ**
3. **「Add new site」→「Import an existing project」**
4. **「GitHub」を選択**
5. **リポジトリ選択**: `rocky-v4-website-`
6. **設定確認** (自動入力されます):
   - Branch: `main`
   - Build command: (空欄)
   - Publish directory: `.`
7. **「Deploy site」をクリック**

約1分で公開完了！

---

## 🆘 トラブルシューティング

### Q: Personal Access Tokenを紛失した

新しいトークンを作成してください:
https://github.com/settings/tokens/new

### Q: 認証エラーが出る

```
remote: Support for password authentication was removed on August 13, 2021.
```

→ パスワードの代わりにPersonal Access Tokenを使用してください

### Q: プッシュが拒否される

```
! [rejected]        main -> main (fetch first)
```

→ 以下を実行:
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

**作成日**: 2026年01月31日 15:10
**リポジトリ**: https://github.com/SeiyaKagetu/rocky-v4-website-.git
