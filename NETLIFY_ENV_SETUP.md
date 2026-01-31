# Netlify 環境変数設定 - クイックガイド

**所要時間**: 5分
**前提**: PayPal Developer でClient IDとSecretを取得済み

---

## 🚀 手順（3ステップ）

### ステップ1: Netlify Dashboardにアクセス

1. ブラウザで開く: https://app.netlify.com/
2. GitHubアカウントでログイン
3. サイト一覧から **「stately-pithivier-2facbf」** をクリック

---

### ステップ2: 環境変数ページに移動

1. 左メニュー **「Site settings」** をクリック
2. **「Environment variables」** をクリック
3. 右上の **「Add a variable」** ボタンをクリック

---

### ステップ3: 環境変数を追加

#### 変数1: PAYPAL_CLIENT_ID

```
Key (キー):
PAYPAL_CLIENT_ID

Value (値):
AfhiZfLQ_sGwPqWukUFySk6n95qB6Ynvee-KAnk6doSR--2xJin97tMqjDzVJDPVH7q7Iypg599dnoXP

Scopes (スコープ):
☑ All scopes
```

「Add variable」をクリック

---

#### 変数2: PAYPAL_CLIENT_SECRET

```
Key (キー):
PAYPAL_CLIENT_SECRET

Value (値):
（PayPal Developerの「Secret」欄で「Show」をクリックして表示される文字列をコピペ）

Scopes (スコープ):
☑ All scopes
```

「Add variable」をクリック

---

#### 変数3: PAYPAL_MODE（オプション）

```
Key (キー):
PAYPAL_MODE

Value (値):
sandbox

Scopes (スコープ):
☑ All scopes
```

「Add variable」をクリック

---

## ✅ 確認

環境変数が3つ追加されたことを確認:

| Key | Value（一部表示） | Scopes |
|-----|------------------|--------|
| PAYPAL_CLIENT_ID | AfhiZfLQ_sGw... | All scopes |
| PAYPAL_CLIENT_SECRET | ••••••••••••••••• | All scopes |
| PAYPAL_MODE | sandbox | All scopes |

---

## 🔄 次のステップ

環境変数設定が完了したら、**再デプロイ**が必要です:

### 方法1: 手動トリガー（Netlify Dashboard）

1. 左メニュー「Deploys」をクリック
2. 右上「Trigger deploy」→「Clear cache and deploy site」

### 方法2: Gitプッシュ（推奨）

```bash
cd /home/seiya/Projects/nove-infinity-project/website

# ダミーコミット（環境変数変更を反映）
git commit --allow-empty -m "Trigger redeploy for environment variables"
git push origin main
```

---

## 🧪 テスト

デプロイ完了後、PayPalボタンをテスト:

1. https://stately-pithivier-2facbf.netlify.app/pricing.html にアクセス
2. 「スタートアップ」プランのPayPalボタンをクリック
3. PayPal Sandboxログイン画面が表示されればOK ✅

---

## ❌ トラブルシューティング

### エラー: "Expected an order id to be passed"

**原因**: 環境変数が反映されていない

**解決策**:
1. Netlify Dashboard > Deploys で最新デプロイが完了しているか確認
2. Functions タブで `create-paypal-order` が正しくデプロイされているか確認
3. 環境変数のスペルミスがないか確認（大文字小文字も正確に）

### エラー: "Authentication failed"

**原因**: Client IDまたはSecretが間違っている

**解決策**:
1. PayPal Developer (https://developer.paypal.com/dashboard/) で正しいCredentialsを再確認
2. Netlify環境変数を削除して再追加

---

## 📞 サポート

質問・問題がある場合:
- **完全ガイド**: `PAYPAL_SETUP_GUIDE.md` を参照
- **PayPal Developer Support**: https://www.paypal.com/us/smarthelp/contact-us
- **Netlify Support**: https://www.netlify.com/support/

---

**作成日**: 2026年02月01日
**作成者**: 清也 (Seiya)
