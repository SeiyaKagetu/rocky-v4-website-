# 決済システム実装ガイド

**作成日**: 2026年01月31日
**対象**: Rocky Linux v4.0 商業版
**推奨ソリューション**: Stripe + 請求書払いのハイブリッド

---

## 🎯 実装タイムライン

### Phase 1: ベータテスト期間（今〜3ヶ月後）

**決済システム**: ❌ **不要**

**理由**:
- ベータテスト参加企業5社はすべて無料
- 決済実装は正式版リリース後で十分

---

### Phase 2: 正式版リリース後（3ヶ月後〜）

**決済システム**: ✅ **必須**

**推奨実装**: Stripe + 請求書払いのハイブリッド

---

## 💳 推奨決済システム: Stripe

### 選定理由

| 項目 | Stripe | PAY.JP | 請求書払いのみ |
|------|--------|--------|---------------|
| **手数料** | 3.6% | 3.6% | 0% |
| **定期課金** | ✅ 完璧 | ✅ 対応 | ❌ 手動 |
| **自動化** | ✅ 完全自動 | ✅ 対応 | ❌ 手動 |
| **請求書発行** | ✅ 自動 | ✅ 自動 | 📝 手動 |
| **国際対応** | ✅ 世界標準 | ❌ 日本のみ | ✅ 対応可能 |
| **APIの質** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | - |
| **実装難易度** | 低い | 低い | 非常に低い |

**結論**: **Stripe** が最適

---

## 🚀 Stripe実装手順（7ステップ）

### ステップ1: Stripeアカウント作成（10分）

1. **Stripeサイトにアクセス**: https://stripe.com/jp
2. **「今すぐ始める」をクリック**
3. **アカウント情報入力**:
   - メールアドレス: myseiyakagetu@proton.me
   - パスワード: （設定）
   - 会社名: Nove Infinity Project
   - 国: 日本
4. **ビジネス情報登録**:
   - ビジネスタイプ: 個人事業主
   - 業種: ソフトウェア開発
   - ウェブサイト: https://stately-pithivier-2facbf.netlify.app/

---

### ステップ2: 料金プラン作成（10分）

Stripeダッシュボードで以下を作成：

#### 商品1: Rocky Linux v4.0 - スタートアップ

```
商品名: Rocky Linux v4.0 Adaptive System - Startup
価格: ¥100,000/月
課金タイプ: 月次課金（recurring）
説明: 50台までのサーバー対応
```

#### 商品2: Rocky Linux v4.0 - スタンダード

```
商品名: Rocky Linux v4.0 Adaptive System - Standard
価格: ¥500,000/月
課金タイプ: 月次課金（recurring）
説明: 500台までのサーバー対応
```

#### 商品3: Rocky Linux v4.0 - エンタープライズ

```
商品名: Rocky Linux v4.0 Adaptive System - Enterprise
価格: ¥2,000,000/月
課金タイプ: カスタム（請求書払い）
説明: 無制限サーバー対応
```

---

### ステップ3: APIキー取得（5分）

Stripeダッシュボード:
1. **「開発者」→「APIキー」**をクリック
2. **公開可能キー**をコピー（例: `pk_test_...`）
3. **シークレットキー**をコピー（例: `sk_test_...`）

**保存場所**:
```bash
# APIキーを安全に保存
echo "STRIPE_SECRET_KEY=sk_test_XXXXXXXX" >> /home/seiya/Projects/nove-infinity-project/.env
echo "STRIPE_PUBLIC_KEY=pk_test_XXXXXXXX" >> /home/seiya/Projects/nove-infinity-project/.env

# 権限設定
chmod 600 /home/seiya/Projects/nove-infinity-project/.env
```

---

### ステップ4: pricing.html に「今すぐ購入」ボタン追加（30分）

#### 現在のpricing.html（ボタンなし）

```html
<div class="feature-card">
    <h3>スタートアップ</h3>
    <div class="price">¥100,000<span>/月</span></div>
    <!-- ボタンなし -->
</div>
```

#### 更新後（Stripeボタン追加）

```html
<div class="feature-card">
    <h3>スタートアップ</h3>
    <div class="price">¥100,000<span>/月</span></div>

    <!-- Stripe Checkoutボタン -->
    <button class="cta-button" onclick="redirectToStripe('price_XXXXXXXX')">
        今すぐ購入
    </button>
</div>

<script src="https://js.stripe.com/v3/"></script>
<script>
const stripe = Stripe('pk_test_XXXXXXXX'); // 公開可能キー

function redirectToStripe(priceId) {
    stripe.redirectToCheckout({
        lineItems: [{price: priceId, quantity: 1}],
        mode: 'subscription',
        successUrl: 'https://stately-pithivier-2facbf.netlify.app/success.html',
        cancelUrl: 'https://stately-pithivier-2facbf.netlify.app/pricing.html',
    });
}
</script>
```

---

### ステップ5: 成功ページ作成（20分）

**ファイル**: `website/success.html`

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>購入完了 - Rocky Linux v4.0</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>🎉 ご購入ありがとうございます！</h1>
        <p>ライセンスキーをメールで送信しました。</p>
        <p>メールアドレス: <span id="customer-email"></span></p>

        <h2>次のステップ</h2>
        <ol>
            <li>メールを確認してライセンスキーを取得</li>
            <li>ドキュメントに従ってインストール</li>
            <li>サポートが必要な場合はお問い合わせください</li>
        </ol>

        <a href="docs.html" class="cta-button">ドキュメントを見る</a>
    </div>
</body>
</html>
```

---

### ステップ6: Webhook設定（30分）

#### 6-1. Webhookエンドポイント作成

**ファイル**: `apps/license_server/STRIPE_WEBHOOK_HANDLER.py`

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify
import stripe
import os
import json

app = Flask(__name__)

# Stripe設定
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

@app.route('/webhook', methods=['POST'])
def stripe_webhook():
    """Stripe Webhookエンドポイント"""
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except ValueError:
        return jsonify({"error": "Invalid payload"}), 400
    except stripe.error.SignatureVerificationError:
        return jsonify({"error": "Invalid signature"}), 400

    # イベント処理
    if event['type'] == 'checkout.session.completed':
        # 支払い成功 → ライセンスキー発行
        session = event['data']['object']
        customer_email = session['customer_email']

        # ライセンスキー生成
        license_key = generate_license_key()

        # データベースに保存
        save_license(customer_email, license_key)

        # メール送信
        send_license_email(customer_email, license_key)

        print(f"✅ ライセンス発行: {customer_email} → {license_key}")

    elif event['type'] == 'invoice.payment_failed':
        # 支払い失敗 → ライセンス停止
        invoice = event['data']['object']
        customer_email = invoice['customer_email']

        # ライセンス停止
        suspend_license(customer_email)

        print(f"❌ ライセンス停止: {customer_email}")

    return jsonify({"status": "success"}), 200

def generate_license_key():
    """ライセンスキー生成"""
    import secrets
    return f"ROCKY-{secrets.token_hex(8).upper()}"

def save_license(email, license_key):
    """ライセンスをデータベースに保存"""
    # LICENSE_SERVER_FLASK_API.pyのデータベースに追加
    pass

def send_license_email(email, license_key):
    """ライセンスキーをメール送信"""
    # Stripe Emailまたは別のメールサービスで送信
    pass

def suspend_license(email):
    """ライセンスを停止"""
    # データベースでlicense_status = 'suspended'に更新
    pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
```

#### 6-2. Stripeダッシュボードで設定

1. **「開発者」→「Webhook」**をクリック
2. **「エンドポイントを追加」**をクリック
3. **エンドポイントURL**: `https://あなたのドメイン/webhook`
4. **イベントを選択**:
   - `checkout.session.completed`（支払い成功）
   - `invoice.payment_failed`（支払い失敗）
5. **Webhook署名シークレット**をコピー

---

### ステップ7: テスト実行（30分）

#### テストモードで購入テスト

1. **テストカード番号**: `4242 4242 4242 4242`
2. **有効期限**: 任意の未来の日付
3. **CVC**: 任意の3桁
4. **郵便番号**: 任意

**確認事項**:
- ✅ Stripe Checkoutページが表示される
- ✅ 支払い完了後、success.htmlにリダイレクト
- ✅ Webhookでライセンスキーが生成される
- ✅ メールが送信される

---

## 📊 決済フロー全体像

```
┌─────────────────────────────────────────────────────────┐
│ 1. 顧客がpricing.htmlで「今すぐ購入」クリック              │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Stripe Checkoutページへリダイレクト                    │
│    - クレジットカード情報入力                             │
│    - 支払い処理                                          │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 3. 支払い成功 → Webhookがトリガー                         │
│    - checkout.session.completed イベント                 │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 4. ライセンスキー自動発行                                 │
│    - データベースに保存                                   │
│    - メールで顧客に送信                                   │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 5. success.htmlページにリダイレクト                        │
│    - 購入完了メッセージ表示                               │
│    - ライセンスキー受信確認                               │
└─────────────────────────────────────────────────────────┘
```

---

## 💰 請求書払い（エンタープライズプラン向け）

### Stripe Invoicesを使用

#### 手順

1. **Stripeダッシュボード**で「顧客」を作成
2. **請求書を作成**:
   - 金額: ¥2,000,000
   - 支払期限: 30日後
   - 送信先: 企業メールアドレス
3. **請求書を送信**（自動メール）
4. **支払い確認後、ライセンスキー発行**

---

## 📈 実装後の運用

### 月次業務

| タスク | 頻度 | 所要時間 |
|--------|------|---------|
| Stripeダッシュボード確認 | 週1回 | 5分 |
| 未払い請求書フォローアップ | 月1回 | 30分 |
| ライセンス更新確認 | 自動 | 0分 |
| カスタマーサポート | 必要時 | - |

---

## 🔐 セキュリティ

### APIキー管理

```bash
# .envファイルに保存（Git除外）
echo ".env" >> .gitignore

# 環境変数として読み込み
export STRIPE_SECRET_KEY=$(cat .env | grep STRIPE_SECRET_KEY | cut -d'=' -f2)
```

### Webhook検証

Stripe署名を必ず検証（上記のコード参照）

---

## 💡 代替案: 請求書払いのみ（手動運用）

Stripeを使わない場合の簡易版：

### 手順

1. **お問い合わせフォームで申込受付**
2. **手動で請求書PDF作成**
3. **メール送信**
4. **銀行振込確認**
5. **ライセンスキー手動発行**

**メリット**: 手数料0%
**デメリット**: 手動作業が多い、定期課金不可

---

## 📅 実装スケジュール

| Phase | タスク | 期間 | 実施時期 |
|-------|--------|------|---------|
| Phase 1 | ベータテスト | 3ヶ月 | 今〜2026年4月 |
| Phase 2 | Stripe実装 | 2日 | 2026年4月 |
| Phase 3 | テスト実行 | 1日 | 2026年4月 |
| Phase 4 | 本番運用開始 | - | 2026年5月〜 |

---

## ✅ 実装チェックリスト

### 今すぐ実施（オプション）

- [ ] Stripeアカウント作成
- [ ] 料金プラン作成
- [ ] APIキー取得
- [ ] pricing.htmlに「今すぐ購入」ボタン追加（テスト環境）

### ベータテスト完了後（3ヶ月後）

- [ ] Webhookエンドポイント実装
- [ ] success.htmlページ作成
- [ ] ライセンス自動発行システム統合
- [ ] 本番環境でテスト
- [ ] 正式運用開始

---

## 🎯 結論

**推奨アプローチ**:

1. **今すぐ**: 決済システムの実装は不要（ベータテスト期間中）
2. **3ヶ月後**: Stripe + 請求書払いのハイブリッドを実装
3. **実装期間**: 2-3日で完成可能

**メリット**:
- ✅ 自動化で手間なし
- ✅ 定期課金で安定収益
- ✅ 請求書自動発行
- ✅ ライセンスキー自動発行

---

**作成日**: 2026年01月31日
**管理者**: 川口 雄一郎（Yuiziro Kawaguchi）
**連絡先**: myseiyakagetu@proton.me
