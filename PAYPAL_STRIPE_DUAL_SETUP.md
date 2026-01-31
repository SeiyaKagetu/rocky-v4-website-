# PayPal + Stripe 両方対応 - 完全セットアップガイド

**作成日**: 2026年02月01日
**実装完了**: ✅ コード実装済み
**次のステップ**: 環境変数設定 → デプロイ → テスト

---

## 🎉 実装完了状況

| 項目 | 状態 | 詳細 |
|------|------|------|
| package.json | ✅ | Stripe SDK追加済み |
| Netlify Functions | ✅ | create-stripe-checkout.js 作成済み |
| pricing.html | ✅ | Stripeボタン追加済み（全プラン） |
| ドキュメント | ✅ | STRIPE_SETUP_GUIDE.md 作成済み |

---

## 🚀 今すぐやるべきこと（2つの選択肢）

### オプション A: まずPayPalをテスト（推奨）⭐

PayPalの環境変数は既に設定済みなので、先にPayPalをテストできます。

**手順**:
1. GitHubにプッシュ（下記コマンド実行）
2. Netlify自動デプロイ（3-5分待機）
3. PayPalボタンをテスト

**コマンド**:
```bash
cd /home/seiya/Projects/nove-infinity-project/website

# 変更をステージング
git add package.json netlify/functions/create-stripe-checkout.js pricing.html STRIPE_SETUP_GUIDE.md PAYPAL_STRIPE_DUAL_SETUP.md

# コミット
git commit -m "✅ Add Stripe integration - PayPal + Stripe dual payment system

- Add stripe package to package.json
- Create create-stripe-checkout.js Netlify Function
- Update pricing.html with Stripe buttons
- Add STRIPE_SETUP_GUIDE.md documentation"

# プッシュ
git push origin main
```

---

### オプション B: PayPalとStripe両方セットアップ

**手順**:
1. Stripeアカウント作成（10分）
2. Netlify環境変数追加（5分）
3. GitHubにプッシュ
4. 両方テスト

---

## 📋 環境変数設定状況

### PayPal（既に設定済み ✅）

| Key | Status |
|-----|--------|
| PAYPAL_CLIENT_ID | ✅ 設定済み |
| PAYPAL_CLIENT_SECRET | ✅ 設定済み |
| PAYPAL_MODE | ✅ 設定済み (sandbox) |

### Stripe（これから設定 ⏳）

| Key | Status | 取得方法 |
|-----|--------|---------|
| STRIPE_SECRET_KEY | ⏳ 未設定 | Stripe Dashboard → API キー |
| STRIPE_PUBLISHABLE_KEY | ⏳ 未設定 | Stripe Dashboard → API キー |

---

## 🎯 Stripeアカウント作成（10分）

### クイックスタート

1. **Stripeにアクセス**: https://stripe.com/jp
2. **「今すぐ始める」** をクリック
3. **メールアドレス・氏名・パスワード** を入力
4. **メール認証** をクリック
5. **事業者情報登録**:
   - ビジネスタイプ: 個人事業主
   - 屋号: NOVE Systems（例）
   - 事業内容: ソフトウェア販売
6. **本人確認書類アップロード**:
   - 運転免許証またはマイナンバーカード
   - 表面・裏面を撮影してアップロード
7. **銀行口座登録**:
   - 銀行名・支店名・口座番号・口座名義

### APIキー取得

1. Stripe Dashboard → 左メニュー「開発者」→「API キー」
2. **テスト環境**のシークレットキーをコピー:
   ```
   sk_test_XXXXXXXXXXXXXXXXXXXX
   ```

**詳細ガイド**: `STRIPE_SETUP_GUIDE.md` を参照

---

## 🔧 Netlify環境変数設定

### アクセス方法

1. https://app.netlify.com/
2. サイト「stately-pithivier-2facbf」を選択
3. Site settings → Environment variables

### Stripe環境変数追加

```
Key: STRIPE_SECRET_KEY
Value: sk_test_XXXXXXXXXXXXXXXXXXXX
Scopes: All scopes
```

---

## 🧪 テスト手順

### PayPalテスト

1. **アクセス**: https://stately-pithivier-2facbf.netlify.app/pricing.html
2. **PayPalボタン**をクリック
3. Sandboxアカウントでログイン
4. 決済完了確認

### Stripeテスト

1. **アクセス**: https://stately-pithivier-2facbf.netlify.app/pricing.html
2. **「💳 クレジットカード決済（Stripe）」ボタン**をクリック
3. テストカード情報入力:
   ```
   カード番号: 4242 4242 4242 4242
   有効期限: 12/34
   CVC: 123
   名前: Test User
   ```
4. 決済完了確認

---

## 📊 両方の決済方法の比較

| 項目 | PayPal | Stripe |
|------|--------|--------|
| **手数料** | 3.6% + 40円 | 3.6% |
| **入金サイクル** | 3-6営業日 | 7営業日（初回）|
| **顧客層** | PayPalユーザー | クレカユーザー |
| **信頼性** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **日本語サポート** | △ | ⭐⭐⭐⭐⭐ |

---

## 🎯 推奨フロー（今すぐ実行）

### フェーズ1: PayPalテスト（今すぐ）

```bash
# 1. GitHubにプッシュ
cd /home/seiya/Projects/nove-infinity-project/website
git add .
git commit -m "✅ Add Stripe integration - PayPal + Stripe dual payment"
git push origin main

# 2. Netlify Deploys ページを開く
firefox https://app.netlify.com/sites/stately-pithivier-2facbf/deploys &

# 3. デプロイ完了を待つ（3-5分）

# 4. Webサイトにアクセス
firefox https://stately-pithivier-2facbf.netlify.app/pricing.html &

# 5. PayPalボタンをテスト
```

---

### フェーズ2: Stripeセットアップ（後日OK）

```bash
# 1. Stripeアカウント作成（10分）
# https://stripe.com/jp

# 2. Netlify環境変数追加（5分）
# STRIPE_SECRET_KEY を追加

# 3. 再デプロイ
git commit --allow-empty -m "Trigger redeploy for Stripe environment variables"
git push origin main

# 4. Stripeボタンをテスト
```

---

## ✅ 完了チェックリスト

### 今すぐ（フェーズ1）

- [ ] GitHubにプッシュ
- [ ] Netlifyデプロイ確認
- [ ] PayPalボタンが表示される
- [ ] PayPalテスト決済成功

### 後日（フェーズ2）

- [ ] Stripeアカウント作成
- [ ] 本人確認書類アップロード
- [ ] 銀行口座登録
- [ ] APIキー取得
- [ ] Netlify環境変数設定
- [ ] Stripeテスト決済成功

---

## 📞 サポート資料

- **Stripe完全ガイド**: `STRIPE_SETUP_GUIDE.md`
- **PayPal完全ガイド**: `PAYPAL_SETUP_GUIDE.md`
- **Netlify環境変数**: `NETLIFY_ENV_SETUP.md`

---

## 🎉 次のアクション

**今すぐ実行**:

```bash
cd /home/seiya/Projects/nove-infinity-project/website
git add .
git commit -m "✅ Add Stripe integration - PayPal + Stripe dual payment"
git push origin main
```

**その後**:
1. Netlify Deploys ページで完了確認
2. pricing.html にアクセス
3. PayPalボタンをテスト
4. 成功したらStripeセットアップへ進む

---

**作成者**: 清也 (Seiya)
**最終更新**: 2026年02月01日
