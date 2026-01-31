# Rocky Linux v4.0 商業版Webサイト

**作成日**: 2026年01月31日
**バージョン**: 1.0.0
**目的**: 商業化・マーケティング・顧客獲得

---

## 📁 ファイル構成

```
website/
├── index.html          # ランディングページ（トップ）
├── pricing.html        # 料金プラン・機能比較表
├── docs.html          # ドキュメント・セットアップガイド
├── contact.html       # お問い合わせフォーム
├── css/
│   └── style.css      # メインスタイルシート
├── js/                # JavaScript（今後追加予定）
├── images/            # 画像ファイル（今後追加予定）
└── README.md          # このファイル
```

---

## 🎨 デザイン

### カラースキーム

| 用途 | カラー | HEX |
|------|--------|-----|
| プライマリ | ブルー | #3b82f6 |
| セカンダリ | グリーン | #10b981 |
| アクセント | オレンジ | #f59e0b |
| ダーク背景 | グレー | #1f2937 |
| ライト背景 | ホワイト | #f9fafb |

### 特徴

- ✅ **レスポンシブデザイン**: PC/タブレット/スマホ対応
- ✅ **モダンUI**: グラデーション、ガラスモーフィズム
- ✅ **高速表示**: 静的HTML/CSS、外部依存なし
- ✅ **アクセシビリティ**: セマンティックHTML

---

## 🚀 使い方

### ローカルでプレビュー

```bash
# Pythonの簡易サーバーを起動
cd /home/seiya/Projects/nove-infinity-project/website
python3 -m http.server 8000

# ブラウザでアクセス
# http://localhost:8000
```

### GitHub Pages公開（無料）

```bash
# 1. GitHubリポジトリ作成
# 2. websiteディレクトリをプッシュ
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/yourusername/rocky-v4-website.git
git push -u origin main

# 3. GitHub Settings > Pages > Source: main branch
# 4. 公開URL: https://yourusername.github.io/rocky-v4-website/
```

### Netlify公開（無料・推奨）

```bash
# 1. Netlifyアカウント作成（無料）
# 2. New site from Git
# 3. websiteディレクトリを選択
# 4. Deploy!

# カスタムドメイン設定可能:
# rocky-v4.netlify.app → rocky-linux-v4.com
```

---

## 📝 カスタマイズ

### メールアドレスの変更

**contact.html** の以下を変更:

```html
<!-- 変更前 -->
<a href="mailto:seiya@example.com">seiya@example.com</a>

<!-- 変更後 -->
<a href="mailto:あなたのメールアドレス">あなたのメールアドレス</a>
```

### お問い合わせフォームの設定

**contact.html** のフォームアクション:

```html
<!-- Formspreeを使用（無料・簡単） -->
<!-- 1. https://formspree.io/ でアカウント作成 -->
<!-- 2. フォーム作成 -->
<!-- 3. Form IDを取得 -->
<!-- 4. 以下を置き換え -->

<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### ライセンスサーバーURLの変更

**docs.html** の以下を変更:

```html
<!-- 変更前 -->
https://license.yourdomain.com

<!-- 変更後 -->
https://あなたのドメイン.com
```

---

## 📊 ページ内容

### 1. index.html（ランディングページ）

**目的**: 第一印象・製品の魅力を伝える

**内容**:
- ヒーローセクション（699/700点の強調）
- 主要機能（6つの特徴）
- ベンチマーク結果
- ベータテスト案内
- CTA（お問い合わせ・料金プラン）

### 2. pricing.html（料金プラン）

**目的**: プラン比較・購入検討

**内容**:
- 3つの料金プラン（¥100,000 / ¥500,000 / ¥2,000,000）
- 機能比較表（10項目）
- FAQ（5つの質問）
- 年間契約割引の案内

### 3. docs.html（ドキュメント）

**目的**: 技術情報・セットアップ方法

**内容**:
- クイックスタートガイド
- インストール手順
- 基本的な使い方
- ライセンス認証
- 最適化の適用
- API仕様
- トラブルシューティング

### 4. contact.html（お問い合わせ）

**目的**: 顧客獲得・問い合わせ対応

**内容**:
- 連絡先情報（メール・営業時間）
- お問い合わせフォーム（7項目）
- ベータテストプログラム詳細

---

## 🎯 次のステップ

### 今すぐできること

1. ✅ **ローカルプレビュー** - `python3 -m http.server 8000`
2. ✅ **メールアドレス変更** - contact.html編集
3. ✅ **Formspree設定** - お問い合わせフォーム連携

### 近日中にやること

1. ⏳ **GitHub Pages公開** - 無料Webホスティング
2. ⏳ **Netlify公開** - カスタムドメイン設定
3. ⏳ **Google Analytics追加** - アクセス解析
4. ⏳ **SEO最適化** - meta description、OGP設定

### 将来的に追加予定

1. ⏳ **導入事例ページ** - ベータテスト後に作成
2. ⏳ **ブログセクション** - 技術情報発信
3. ⏳ **デモ環境** - 実際に試せるサンドボックス
4. ⏳ **動画説明** - YouTube埋め込み

---

## 📈 想定アクセス数・コンバージョン

| 項目 | 月間目標 |
|------|---------|
| **訪問者数** | 1,000人 |
| **お問い合わせ** | 10件 |
| **無料相談** | 5件 |
| **契約成約** | 1-2社 |

**マーケティング施策**:
- SEO対策（Rocky Linux、性能最適化、Linuxチューニング）
- SNS発信（Twitter、LinkedIn）
- 技術ブログ執筆
- オンラインセミナー開催

---

## 🛡️ セキュリティ

### 実装済み

- ✅ HTTPS必須（GitHub Pages/Netlify自動対応）
- ✅ フォーム保護（Formspree CSRF保護）
- ✅ XSS対策（HTMLエスケープ）

### 今後追加予定

- ⏳ reCAPTCHA v3（スパム防止）
- ⏳ CSP（Content Security Policy）
- ⏳ HSTS（Strict-Transport-Security）

---

## 📞 サポート

質問・問題がある場合:

1. **ドキュメント確認**: docs.html
2. **メール連絡**: seiya@example.com
3. **GitHub Issue**: プロジェクトリポジトリ

---

**作成者**: 清也 (Seiya)
**最終更新**: 2026年01月31日
