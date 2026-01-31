# PayPal Business アカウント完全セットアップガイド

**作成日**: 2026年02月01日
**目的**: Rocky Linux v4.0 WebサイトでのPayPal決済導入

---

## 📋 目次

1. PayPal Businessアカウント作成
2. Sandbox（テスト環境）設定
3. 本番環境への移行
4. Netlify環境変数設定
5. トラブルシューティング

---

## 1️⃣ PayPal Businessアカウント作成

### 1-1. PayPal Developerアカウント登録

1. **PayPal Developer サイトにアクセス**
   - URL: https://developer.paypal.com/
   - 右上の「Log In」をクリック

2. **新規アカウント作成**
   - 個人用PayPalアカウントがある場合: そのままログイン
   - ない場合: 「Sign Up」から新規作成

3. **Developer Dashboardにアクセス**
   - ログイン後、自動的にDashboardに移動
   - URL: https://developer.paypal.com/dashboard/

### 1-2. Sandboxアカウント作成（テスト用）

1. **Sandbox > Accounts に移動**
   - 左メニュー「Testing Tools」→「Sandbox accounts」

2. **テストアカウント作成**
   - 「Create Account」をクリック
   - Account Type: **Business** を選択
   - Email: 自動生成されるメールアドレスを使用
   - Password: 任意のパスワード（覚えておく）
   - Payment Method: **PayPal Balance** を選択
   - 「Create Account」をクリック

3. **テストアカウント確認**
   - 作成されたBusinessアカウントのメールアドレスとパスワードをメモ

---

## 2️⃣ API Credentials（認証情報）取得

### 2-1. Sandbox API Credentials

1. **Apps & Credentials に移動**
   - 左メニュー「My Apps & Credentials」をクリック

2. **Sandboxタブを選択**
   - 上部の「Sandbox」タブをクリック

3. **REST API アプリ作成**
   - 「Create App」ボタンをクリック
   - App Name: `Rocky Linux v4.0 Sandbox`
   - Sandbox Business Account: 先ほど作成したBusinessアカウントを選択
   - 「Create App」をクリック

4. **Client IDとSecretを取得**
   ```
   Client ID: AfhiZfLQ_sGwPqWukUFySk6n95qB6Ynvee-KAnk6doSR--2xJin97tMqjDzVJDPVH7q7Iypg599dnoXP
   Secret: (Show をクリックして表示される文字列)
   ```
   - **重要**: Client IDとSecretを安全な場所にメモ（後でNetlifyに設定）

### 2-2. 本番環境（Live） API Credentials

1. **Liveタブを選択**
   - 上部の「Live」タブをクリック

2. **本番用アプリ作成**
   - 「Create App」ボタンをクリック
   - App Name: `Rocky Linux v4.0 Production`
   - 「Create App」をクリック

3. **Client IDとSecretを取得**
   - 本番環境用のClient IDとSecretをメモ
   - **Sandbox用とは別のもの**

---

## 3️⃣ Netlify 環境変数設定

### 3-1. Netlify Dashboardにログイン

1. **Netlify にログイン**
   - URL: https://app.netlify.com/
   - GitHubアカウントでログイン

2. **サイトを選択**
   - 「Sites」一覧から「stately-pithivier-2facbf」を選択

### 3-2. 環境変数を設定

1. **Site settings に移動**
   - 左メニュー「Site settings」をクリック

2. **Environment variables に移動**
   - 「Environment variables」をクリック

3. **変数を追加（Sandbox用）**

   **変数1: PAYPAL_CLIENT_ID**
   - Key: `PAYPAL_CLIENT_ID`
   - Value: `AfhiZfLQ_sGwPqWukUFySk6n95qB6Ynvee-KAnk6doSR--2xJin97tMqjDzVJDPVH7q7Iypg599dnoXP`
   - Scopes: `All scopes` を選択
   - 「Add variable」をクリック

   **変数2: PAYPAL_CLIENT_SECRET**
   - Key: `PAYPAL_CLIENT_SECRET`
   - Value: `（PayPal Developerで取得したSecret）`
   - Scopes: `All scopes` を選択
   - 「Add variable」をクリック

   **変数3: PAYPAL_MODE**（オプション）
   - Key: `PAYPAL_MODE`
   - Value: `sandbox`（テスト環境）または `live`（本番環境）
   - Scopes: `All scopes` を選択
   - 「Add variable」をクリック

4. **保存**
   - 自動的に保存されます

---

## 4️⃣ コード修正（Sandbox → Live切り替え）

### pricing.htmlの修正

**現在（Sandbox）**:
```html
<!-- PayPal JavaScript SDK -->
<script src="https://www.paypal.com/sdk/js?client-id=AfhiZfLQ_sGwPqWukUFySk6n95qB6Ynvee-KAnk6doSR--2xJin97tMqjDzVJDPVH7q7Iypg599dnoXP&currency=JPY"></script>
```

**本番環境用（Live）**:
```html
<!-- PayPal JavaScript SDK -->
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_LIVE_CLIENT_ID&currency=JPY"></script>
```

- `YOUR_LIVE_CLIENT_ID` を本番環境のClient IDに置き換え

### Netlify Functionsの修正

**create-paypal-order.js** と **capture-paypal-order.js**:

**現在（Sandbox）**:
```javascript
// Sandbox環境（テスト）
return new paypal.core.SandboxEnvironment(clientId, clientSecret);
```

**本番環境用（Live）**:
```javascript
// 本番環境
return new paypal.core.LiveEnvironment(clientId, clientSecret);
```

または、環境変数で切り替え:
```javascript
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const mode = process.env.PAYPAL_MODE || 'sandbox';

  if (mode === 'live') {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  } else {
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
  }
}
```

---

## 5️⃣ デプロイ（Netlify）

### 5-1. Gitにコミット・プッシュ

```bash
cd /home/seiya/Projects/nove-infinity-project/website

# 変更を確認
git status

# package.jsonを追加（既に存在）
git add package.json

# コミット
git commit -m "Add PayPal integration with package.json"

# プッシュ
git push origin main
```

### 5-2. Netlify自動デプロイ

1. **Netlifyが自動的にビルド開始**
   - GitHubにプッシュすると自動的にデプロイ開始

2. **ビルドログ確認**
   - Netlify Dashboard > Deploys
   - 最新のデプロイをクリック
   - 「Function bundling」セクションで確認:
     ```
     ✓ create-paypal-order
     ✓ capture-paypal-order
     ```

3. **デプロイ完了確認**
   - Status: `Published` になれば成功

### 5-3. 動作確認

1. **Webサイトにアクセス**
   - https://stately-pithivier-2facbf.netlify.app/pricing.html

2. **PayPalボタンをクリック**
   - スタートアップ/スタンダード/エンタープライズのいずれか

3. **Sandboxログイン**
   - テスト用のメールアドレス・パスワードでログイン
   - PayPal Developer で作成したSandboxアカウント

4. **テスト決済**
   - 金額を確認
   - 「Pay Now」をクリック
   - 成功メッセージが表示されればOK

---

## 6️⃣ 本番環境への移行チェックリスト

### テスト環境（Sandbox）で確認すべきこと

- [ ] PayPalボタンが正しく表示される
- [ ] クリックすると決済画面が開く
- [ ] テスト決済が完了する
- [ ] 成功メッセージが表示される
- [ ] お問い合わせページにリダイレクトされる

### 本番環境（Live）移行前の準備

- [ ] PayPal Business アカウントが承認済み
- [ ] Live API Credentials（Client ID/Secret）を取得済み
- [ ] 銀行口座を登録済み（売上金受取用）
- [ ] 利用規約・プライバシーポリシーを確認
- [ ] 特定商取引法に基づく表記を追加（日本の法律）

### 本番環境への切り替え手順

1. **pricing.htmlのClient ID更新**
   - Sandbox Client ID → Live Client ID

2. **Netlify環境変数更新**
   - `PAYPAL_CLIENT_ID` → Live版
   - `PAYPAL_CLIENT_SECRET` → Live版
   - `PAYPAL_MODE` → `live`

3. **Netlify Functions更新**
   - `SandboxEnvironment` → `LiveEnvironment`

4. **再デプロイ**
   ```bash
   git add .
   git commit -m "Switch to PayPal Live environment"
   git push origin main
   ```

5. **本番環境でテスト決済**
   - 少額（¥100など）で実際に決済テスト
   - **重要**: 本番環境では実際のお金が動きます

---

## 7️⃣ セキュリティ対策

### 必須対策

1. **環境変数の保護**
   - Client SecretはGitにコミットしない
   - Netlify環境変数のみで管理

2. **HTTPS必須**
   - Netlifyは自動的にHTTPSを有効化
   - http:// からのアクセスは自動的にhttps:// にリダイレクト

3. **CORS設定**
   - Netlify Functionsで適切なCORSヘッダーを設定済み

4. **金額検証**
   - サーバーサイド（Netlify Functions）で金額を再検証
   - フロントエンドから送信された金額をそのまま使わない（改ざん防止）

### 推奨対策

1. **Webhook設定**
   - PayPal Webhookで支払い完了を通知
   - データベースに支払い記録を保存

2. **ログ記録**
   - すべての決済をログに記録
   - Netlify Functionsのログで確認可能

3. **エラー通知**
   - 決済エラー時にメール通知
   - Netlify Functionsでエラーハンドリング実装済み

---

## 8️⃣ トラブルシューティング

### エラー1: "Expected an order id to be passed"

**原因**: Netlify Functionsが動作していない

**解決策**:
1. Netlify環境変数が正しく設定されているか確認
2. Netlify Functionsがデプロイされているか確認（Deploys > Functions）
3. ブラウザのコンソールでエラー詳細を確認

### エラー2: "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT"

**原因**: 広告ブロッカーがPayPalをブロック

**解決策**:
1. 広告ブロッカー（uBlock Origin、AdBlockなど）を一時的に無効化
2. PayPalドメインをホワイトリストに追加

### エラー3: "CORS policy error"

**原因**: CORSヘッダーが正しく設定されていない

**解決策**:
1. Netlify Functionsの`headers`設定を確認
2. `Access-Control-Allow-Origin: *` が設定されているか確認

### エラー4: "Authentication failed"

**原因**: Client IDまたはSecretが間違っている

**解決策**:
1. PayPal Developerで正しいCredentialsを再確認
2. Netlify環境変数を再設定
3. スペースや改行が含まれていないか確認

---

## 9️⃣ サポート・参考資料

### PayPal公式ドキュメント

- **Developer Portal**: https://developer.paypal.com/
- **REST API リファレンス**: https://developer.paypal.com/docs/api/overview/
- **Checkout SDK**: https://developer.paypal.com/docs/checkout/

### Netlify公式ドキュメント

- **Functions**: https://docs.netlify.com/functions/overview/
- **Environment Variables**: https://docs.netlify.com/environment-variables/overview/

### サポート問い合わせ

- **PayPal Developer Support**: https://www.paypal.com/us/smarthelp/contact-us
- **Netlify Support**: https://www.netlify.com/support/

---

## ✅ 完了チェックリスト

### 初期セットアップ

- [ ] PayPal Developerアカウント作成
- [ ] Sandbox Businessアカウント作成
- [ ] Sandbox API Credentials取得（Client ID/Secret）
- [ ] Netlify環境変数設定
- [ ] package.json確認
- [ ] Gitにプッシュ
- [ ] Netlify自動デプロイ確認

### テスト

- [ ] Sandbox環境で決済テスト成功
- [ ] すべてのプラン（3つ）でテスト
- [ ] エラーハンドリング確認
- [ ] 成功メッセージ確認
- [ ] リダイレクト動作確認

### 本番環境準備（後日）

- [ ] PayPal Businessアカウント承認
- [ ] Live API Credentials取得
- [ ] 銀行口座登録
- [ ] 特定商取引法表記追加
- [ ] 本番環境でテスト決済
- [ ] 運用開始

---

**作成者**: 清也 (Seiya)
**最終更新**: 2026年02月01日
**バージョン**: 1.0.0
