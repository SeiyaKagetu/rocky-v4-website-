#!/bin/bash

# Rocky Linux v4.0 Website - GitHub Push Commands
# 作成日: 2026年01月31日
# 使い方: GitHubでリポジトリを作成した後、このスクリプトを実行

echo "============================================"
echo "Rocky Linux v4.0 - GitHub Push"
echo "============================================"
echo ""

# 現在のディレクトリ確認
CURRENT_DIR=$(pwd)
if [[ ! "$CURRENT_DIR" =~ "website"$ ]]; then
    echo "❌ エラー: websiteディレクトリで実行してください"
    echo "正しいコマンド:"
    echo "  cd /home/seiya/Projects/nove-infinity-project/website"
    echo "  bash github-push-commands.sh"
    exit 1
fi

echo "📁 現在のディレクトリ: $CURRENT_DIR"
echo ""

# GitHubリポジトリURL入力
echo "============================================"
echo "GitHubリポジトリURLを入力してください"
echo "============================================"
echo ""
echo "例: https://github.com/YOUR_USERNAME/rocky-v4-website.git"
echo ""
read -p "URL: " GITHUB_URL

if [ -z "$GITHUB_URL" ]; then
    echo "❌ URLが入力されていません"
    exit 1
fi

echo ""
echo "入力されたURL: $GITHUB_URL"
echo ""

# 既存のoriginリモートを削除（存在する場合）
if git remote | grep -q "^origin$"; then
    echo "⚠️  既存のoriginリモートを削除します..."
    git remote remove origin
fi

# リモートリポジトリ追加
echo "📌 リモートリポジトリを追加中..."
git remote add origin "$GITHUB_URL"
echo "✅ リモート追加完了"
echo ""

# ブランチ確認
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 現在のブランチ: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  ブランチをmainに変更します..."
    git branch -M main
    echo "✅ ブランチ変更完了"
fi
echo ""

# プッシュ確認
echo "============================================"
read -p "GitHubへプッシュしますか？ (y/N): " DO_PUSH

if [[ "$DO_PUSH" =~ ^[Yy]$ ]]; then
    echo ""
    echo "📤 GitHubへプッシュ中..."
    echo ""

    if git push -u origin main; then
        echo ""
        echo "============================================"
        echo "✅ プッシュ成功！"
        echo "============================================"
        echo ""
        echo "🌐 GitHubリポジトリ: ${GITHUB_URL%.git}"
        echo ""
        echo "次のステップ:"
        echo "1. Netlify にアクセス: https://www.netlify.com"
        echo "2. 「Add new site」→「Import an existing project」"
        echo "3. GitHubリポジトリ「rocky-v4-website」を選択"
        echo "4. 「Deploy site」をクリック"
        echo ""
        echo "詳細は NEXT_STEPS.md を参照してください"
    else
        echo ""
        echo "============================================"
        echo "❌ プッシュ失敗"
        echo "============================================"
        echo ""
        echo "考えられる原因:"
        echo "1. 認証エラー - Personal Access Token が必要です"
        echo "2. リポジトリURLが間違っている"
        echo "3. インターネット接続の問題"
        echo ""
        echo "Personal Access Token 作成方法:"
        echo "1. GitHub → Settings → Developer settings"
        echo "2. Personal access tokens → Tokens (classic)"
        echo "3. 「Generate new token (classic)」"
        echo "4. Note: rocky-v4-website-deploy"
        echo "5. Scopes: ☑️ repo (全てチェック)"
        echo "6. 「Generate token」→ トークンをコピー"
        echo ""
        echo "再度実行する場合:"
        echo "  bash github-push-commands.sh"
    fi
else
    echo ""
    echo "ℹ️  プッシュをキャンセルしました"
    echo ""
    echo "手動でプッシュする場合:"
    echo "  git push -u origin main"
fi

echo ""
echo "============================================"
