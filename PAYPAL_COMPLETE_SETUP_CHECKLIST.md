# PayPal完全セットアップ - 実行チェックリスト

**作成日**: 2026年02月01日
**所要時間**: 30分〜1時間
**現在のステータス**: ✅ Step 1-2完了、⏳ Step 3-6実行待ち

---

## 📋 完了状況

| Step | タスク | 状態 | 所要時間 |
|------|--------|------|---------|
| 1 | package.json確認 | ✅ 完了 | - |
| 2 | Netlify Functions確認 | ✅ 完了 | - |
| 3 | PayPal Developerアカウント作成 | ⏳ 実行待ち | 5分 |
| 4 | Sandbox API Credentials取得 | ⏳ 実行待ち | 5分 |
| 5 | Netlify環境変数設定 | ⏳ 実行待ち | 5分 |
| 6 | 再デプロイ＆テスト | ⏳ 実行待ち | 10分 |

---

## 🚀 今すぐ実行すべきこと

### Step 3: PayPal Developerアカウント作成（5分）⭐

#### 3-1. PayPal Developer にアクセス

1. ブラウザで開く: https://developer.paypal.com/
2. 右上「Log In」をクリック
3. PayPalアカウントでログイン（個人用でOK）
   - アカウントがない場合: 「Sign Up」から新規作成

#### 3-2. Developer Dashboardを確認

- ログイン後、自動的にDashboardに移動
- URL: https://developer.paypal.com/dashboard/

✅ **完了確認**: Developer Dashboardが表示されたらStep 3完了

---

### Step 4: Sandbox API Credentials取得（5分）⭐⭐

#### 4-1. Sandboxアカウント作成

1. 左メニュー「**Testing Tools**」→「**Sandbox accounts**」をクリック
2. 「**Create Account**」ボタンをクリック
3. 以下を設定:
   - Account Type: **Business** を選択
   - Email: 自動生成（そのまま使用）
   - Password: 任意のパスワード（メモ必須）
   - Payment Method: **PayPal Balance** を選択
4. 「**Create Account**」をクリック

✅ **完了確認**: Businessアカウントが一覧に表示される

#### 4-2. REST API アプリ作成

1. 左メニュー「**My Apps & Credentials**」をクリック
2. 上部「**Sandbox**」タブを選択
3. 下にスクロールして「**Create App**」ボタンをクリック
4. 以下を入力:
   - App Name: `Rocky Linux v4.0 Sandbox`
   - Sandbox Business Account: 先ほど作成したBusinessアカウントを選択
5. 「**Create App**」をクリック

#### 4-3. Client IDとSecretをコピー

アプリ作成後、以下の画面が表示されます:

```
Client ID:
[長い英数字の文字列]

Secret:
[Show] ← このボタンをクリック
```

1. **Client ID** をコピーしてメモ帳に保存
2. **Secret** の「Show」ボタンをクリック
3. 表示された**Secret**をコピーしてメモ帳に保存

⚠️ **重要**: Client IDとSecretは安全な場所に保管（後でNetlifyに設定）

✅ **完了確認**: Client IDとSecretを両方コピーしたらStep 4完了

---

### Step 5: Netlify環境変数設定（5分）⭐⭐⭐

#### 5-1. Netlify Dashboardにアクセス

1. ブラウザで開く: https://app.netlify.com/
2. GitHubアカウントでログイン
3. サイト一覧から「**stately-pithivier-2facbf**」をクリック

#### 5-2. 環境変数ページに移動

1. 左メニュー「**Site settings**」をクリック
2. 左サイドバー「**Environment variables**」をクリック
3. 右上「**Add a variable**」→「**Add a single variable**」をクリック

#### 5-3. 環境変数を追加（3つ）

**変数1: PAYPAL_CLIENT_ID**

```
Key:
PAYPAL_CLIENT_ID

Value:
（Step 4でコピーしたClient IDをペースト）

Scopes:
☑ All scopes
```

「**Add variable**」をクリック

---

**変数2: PAYPAL_CLIENT_SECRET**

```
Key:
PAYPAL_CLIENT_SECRET

Value:
（Step 4でコピーしたSecretをペースト）

Scopes:
☑ All scopes
```

「**Add variable**」をクリック

---

**変数3: PAYPAL_MODE**

```
Key:
PAYPAL_MODE

Value:
sandbox

Scopes:
☑ All scopes
```

「**Add variable**」をクリック

---

✅ **完了確認**: 環境変数が3つ表示されたらStep 5完了

| Key | Value（一部） | Scopes |
|-----|--------------|--------|
| PAYPAL_CLIENT_ID | AfhiZfLQ... | All scopes |
| PAYPAL_CLIENT_SECRET | ••••••••• | All scopes |
| PAYPAL_MODE | sandbox | All scopes |

---

### Step 6: 再デプロイ＆テスト（10分）⭐⭐⭐⭐

#### 6-1. 再デプロイをトリガー

環境変数を追加したら、Netlifyを再デプロイする必要があります。

**方法1: 手動トリガー（簡単）**

1. Netlify Dashboard（サイトのトップページ）に戻る
2. 左メニュー「**Deploys**」をクリック
3. 右上「**Trigger deploy**」→「**Clear cache and deploy site**」をクリック

**方法2: Gitプッシュ（推奨）**

```bash
cd /home/seiya/Projects/nove-infinity-project/website

# ダミーコミット
git commit --allow-empty -m "Trigger redeploy for PayPal environment variables"
git push origin main
```

#### 6-2. デプロイ完了を待つ（3-5分）

1. Netlify Dashboard > Deploys ページを開く
2. 最新のデプロイをクリック
3. ステータスが「**Building**」→「**Published**」になるまで待つ
4. 「**Function bundling**」セクションを確認:
   ```
   ✓ create-paypal-order
   ✓ capture-paypal-order
   ```

#### 6-3. PayPalボタンをテスト

1. Webサイトにアクセス:
   https://stately-pithivier-2facbf.netlify.app/pricing.html

2. 「**スタートアップ**」プランのPayPalボタンをクリック

3. PayPalログイン画面が表示される（Sandbox環境）

4. Sandboxアカウントでログイン:
   - Email: Step 4で作成したBusinessアカウントのメール
   - Password: Step 4で設定したパスワード

5. 金額を確認: ¥100,000

6. 「**Pay Now**」をクリック

7. 成功メッセージが表示されればOK ✅

✅ **完了確認**: テスト決済が成功したらStep 6完了

---

## 🎉 完了！

すべてのステップが完了しました。PayPal決済システムが正常に動作しています。

### 現在の状態

- ✅ PayPal Sandbox環境で決済可能
- ✅ 3つのプラン（スタートアップ/スタンダード/エンタープライズ）すべてでテスト可能
- ✅ Netlify Functionsが正常動作
- ✅ 環境変数が正しく設定済み

### 次のステップ

#### 短期（今週中）

- [ ] すべてのプラン（3つ）でテスト決済を実行
- [ ] エラーハンドリングを確認
- [ ] ベータ顧客5社を獲得

#### 中期（今月中）

- [ ] PayPal Businessアカウントを本番環境用に承認取得
- [ ] 銀行口座を登録（売上金受取用）
- [ ] Live API Credentials取得

#### 長期（次月以降）

- [ ] Sandbox環境から本番環境（Live）に切り替え
- [ ] 特定商取引法に基づく表記を追加
- [ ] 実際の顧客からの決済受付開始

---

## 📚 参考資料

- **完全ガイド**: `PAYPAL_SETUP_GUIDE.md`（本ディレクトリ）
- **Netlify環境変数**: `NETLIFY_ENV_SETUP.md`（本ディレクトリ）
- **PayPal Developer Portal**: https://developer.paypal.com/
- **Netlify Dashboard**: https://app.netlify.com/

---

## ❓ トラブルシューティング

### エラー: "Expected an order id to be passed"

**原因**: 環境変数が反映されていない

**解決策**:
1. Netlify環境変数が正しく設定されているか確認
2. 再デプロイを実行（Step 6-1）
3. ブラウザのキャッシュをクリア（Ctrl+Shift+R）

### エラー: "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT"

**原因**: 広告ブロッカーがPayPalをブロック

**解決策**:
1. 広告ブロッカー（uBlock Origin、AdBlockなど）を一時的に無効化
2. PayPalドメイン（paypal.com）をホワイトリストに追加

### エラー: "Authentication failed"

**原因**: Client IDまたはSecretが間違っている

**解決策**:
1. PayPal Developer Dashboardで正しいCredentialsを再確認
2. Netlify環境変数を削除して再追加
3. スペースや改行が含まれていないか確認

---

## 📞 サポート

質問・問題がある場合:

- **PayPal Developer Support**: https://www.paypal.com/us/smarthelp/contact-us
- **Netlify Support**: https://www.netlify.com/support/
- **このプロジェクト**: PAYPAL_SETUP_GUIDE.md を参照

---

**作成者**: 清也 (Seiya)
**最終更新**: 2026年02月01日
**バージョン**: 1.0.0
