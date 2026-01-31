#!/bin/bash

# Rocky Linux v4.0 Website - Git Setup Script
# 作成日: 2026年01月31日
# 目的: Netlifyデプロイ用のGitリポジトリ準備

set -e  # エラーで即座に終了

echo "============================================"
echo "Rocky Linux v4.0 Website - Git Setup"
echo "============================================"
echo ""

# 現在のディレクトリ確認
CURRENT_DIR=$(pwd)
if [[ ! "$CURRENT_DIR" =~ "website"$ ]]; then
    echo "❌ エラー: websiteディレクトリで実行してください"
    echo "正しいコマンド:"
    echo "  cd /home/seiya/Projects/nove-infinity-project/website"
    echo "  bash setup-git.sh"
    exit 1
fi

echo "📁 現在のディレクトリ: $CURRENT_DIR"
echo ""

# Gitインストール確認
if ! command -v git &> /dev/null; then
    echo "❌ Gitがインストールされていません"
    echo "インストールコマンド:"
    echo "  sudo dnf install git -y"
    exit 1
fi

echo "✅ Git インストール済み: $(git --version)"
echo ""

# Git設定確認
GIT_NAME=$(git config --global user.name 2>/dev/null || echo "")
GIT_EMAIL=$(git config --global user.email 2>/dev/null || echo "")

if [ -z "$GIT_NAME" ] || [ -z "$GIT_EMAIL" ]; then
    echo "⚠️  Git設定が不足しています"
    echo ""
    read -p "お名前を入力してください（例: Seiya Kawaguchi）: " INPUT_NAME
    read -p "メールアドレスを入力してください（例: seiya@example.com）: " INPUT_EMAIL

    git config --global user.name "$INPUT_NAME"
    git config --global user.email "$INPUT_EMAIL"

    echo "✅ Git設定完了"
    echo "  名前: $INPUT_NAME"
    echo "  メール: $INPUT_EMAIL"
else
    echo "✅ Git設定確認済み"
    echo "  名前: $GIT_NAME"
    echo "  メール: $GIT_EMAIL"
fi
echo ""

# .gitignoreファイル作成
echo "📝 .gitignoreファイル作成中..."
cat > .gitignore <<'EOF'
# macOS
.DS_Store

# Windows
Thumbs.db

# Editor
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log

# Temporary files
*.tmp
*~
EOF

echo "✅ .gitignore作成完了"
echo ""

# Gitリポジトリ初期化
if [ -d ".git" ]; then
    echo "⚠️  既存のGitリポジトリが見つかりました"
    read -p "リポジトリを再初期化しますか？ (y/N): " REINIT
    if [[ "$REINIT" =~ ^[Yy]$ ]]; then
        rm -rf .git
        git init
        echo "✅ Gitリポジトリ再初期化完了"
    else
        echo "ℹ️  既存のリポジトリを維持します"
    fi
else
    git init
    echo "✅ Gitリポジトリ初期化完了"
fi
echo ""

# ファイル追加
echo "📦 ファイルをステージング中..."
git add .
echo "✅ すべてのファイルを追加しました"
echo ""

# 初回コミット
echo "💾 初回コミット作成中..."
git commit -m "Initial commit: Rocky Linux v4.0 Commercial Website

- ランディングページ (index.html)
- 料金プラン (pricing.html)
- ドキュメント (docs.html)
- お問い合わせフォーム (contact.html)
- レスポンシブCSS (css/style.css)
- Netlify設定 (netlify.toml)
- デプロイガイド (NETLIFY_DEPLOY_GUIDE.md)
"
echo "✅ コミット完了"
echo ""

# GitHubリポジトリURL入力
echo "============================================"
echo "次のステップ: GitHubリポジトリ作成"
echo "============================================"
echo ""
echo "1. ブラウザで GitHub にアクセス: https://github.com"
echo "2. 「New repository」をクリック"
echo "3. Repository name: rocky-v4-website"
echo "4. 「Create repository」をクリック"
echo "5. リポジトリURLをコピー（例: https://github.com/YOUR_USERNAME/rocky-v4-website.git）"
echo ""

read -p "GitHubリポジトリURLを入力してください（空欄でスキップ）: " GITHUB_URL

if [ -n "$GITHUB_URL" ]; then
    # リモートリポジトリ追加
    if git remote | grep -q "^origin$"; then
        echo "⚠️  既存のoriginリモートが見つかりました"
        git remote remove origin
    fi

    git remote add origin "$GITHUB_URL"
    echo "✅ リモートリポジトリ追加: $GITHUB_URL"
    echo ""

    # ブランチ名をmainに変更
    git branch -M main
    echo "✅ ブランチ名をmainに変更"
    echo ""

    # プッシュ確認
    read -p "GitHubへプッシュしますか？ (y/N): " DO_PUSH
    if [[ "$DO_PUSH" =~ ^[Yy]$ ]]; then
        echo "📤 GitHubへプッシュ中..."
        git push -u origin main
        echo "✅ プッシュ完了！"
        echo ""
        echo "🎉 セットアップ完了！"
        echo ""
        echo "次のステップ:"
        echo "1. Netlify にアクセス: https://www.netlify.com"
        echo "2. 「Add new site」→「Import an existing project」"
        echo "3. GitHubリポジトリ「rocky-v4-website」を選択"
        echo "4. 「Deploy site」をクリック"
        echo ""
        echo "詳細は NETLIFY_DEPLOY_GUIDE.md を参照してください"
    else
        echo "ℹ️  プッシュをスキップしました"
        echo ""
        echo "手動でプッシュする場合:"
        echo "  git push -u origin main"
    fi
else
    echo "ℹ️  GitHubリモート設定をスキップしました"
    echo ""
    echo "後でリモートを追加する場合:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/rocky-v4-website.git"
    echo "  git branch -M main"
    echo "  git push -u origin main"
fi

echo ""
echo "============================================"
echo "Git セットアップ完了"
echo "============================================"
