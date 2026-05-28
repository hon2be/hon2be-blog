#!/usr/bin/env python3
"""
블로그 글쓰기 스킬 메인 스크립트

사용법:
  python main.py --title "..." --slug "..." --category "..." --date "..." --excerpt "..." --content "..."

또는 대화형:
  python main.py
"""

import json
import os
import sys
import subprocess
from pathlib import Path
from datetime import datetime


class BlogPostWriter:
    """블로그 포스트 작성 및 자동 배포"""

    VALID_CATEGORIES = ["AI", "REACT", "TYPESCRIPT", "CSS", "DESIGN", "PIXEL"]
    DATE_FORMAT = "%Y.%m.%d"

    def __init__(self, blog_root: str = None):
        """초기화

        Args:
            blog_root: 블로그 루트 디렉토리 (기본값: 현재 디렉토리에서 찾기)
        """
        if blog_root:
            self.blog_root = Path(blog_root)
        else:
            # 현재 디렉토리에서 cherry-blog 찾기
            current = Path.cwd()
            while current != current.parent:
                if (current / "src" / "data" / "posts").exists():
                    self.blog_root = current
                    break
                current = current.parent
            else:
                raise RuntimeError(
                    "블로그 루트를 찾을 수 없습니다. "
                    "cherry-blog 폴더에서 실행하거나 --blog-root를 지정하세요."
                )

        self.posts_dir = self.blog_root / "src" / "data" / "posts"

    def validate_slug(self, slug: str) -> bool:
        """슬러그 유효성 검사"""
        if not slug:
            return False
        # 영문 소문자, 숫자, 하이픈만 허용
        return all(c.islower() or c.isdigit() or c == "-" for c in slug)

    def validate_date(self, date_str: str) -> bool:
        """날짜 유효성 검사"""
        try:
            datetime.strptime(date_str, self.DATE_FORMAT)
            return True
        except ValueError:
            return False

    def validate_category(self, category: str) -> bool:
        """카테고리 유효성 검사"""
        return category in self.VALID_CATEGORIES

    def create_post(
        self,
        title: str,
        slug: str,
        date: str,
        category: str,
        excerpt: str,
        content: str,
    ) -> dict:
        """포스트 객체 생성"""

        # 유효성 검사
        assert self.validate_slug(slug), f"유효하지 않은 슬러그: {slug}"
        assert self.validate_date(date), f"유효하지 않은 날짜 형식: {date} (YYYY.MM.DD)"
        assert (
            self.validate_category(category)
        ), f"유효하지 않은 카테고리: {category}"

        return {
            "slug": slug,
            "title": title,
            "date": date,
            "category": category,
            "excerpt": excerpt,
            "content": content,
        }

    def save_post(self, post: dict) -> Path:
        """포스트를 JSON 파일로 저장"""
        file_path = self.posts_dir / f"{post['slug']}.json"

        # 이미 존재하는 파일 확인
        if file_path.exists():
            raise FileExistsError(f"이미 존재하는 포스트: {file_path}")

        # 디렉토리 확인
        self.posts_dir.mkdir(parents=True, exist_ok=True)

        # JSON 저장
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(post, f, ensure_ascii=False, indent=2)

        return file_path

    def commit_and_push(self, post: dict, auto_push: bool = False) -> bool:
        """Git commit 및 선택적 push"""
        try:
            os.chdir(self.blog_root)

            # Stage
            subprocess.run(
                ["git", "add", f"src/data/posts/{post['slug']}.json"],
                check=True,
                capture_output=True,
            )

            # Commit
            commit_msg = f"✨ Add post: {post['title']}"
            subprocess.run(
                ["git", "commit", "-m", commit_msg],
                check=True,
                capture_output=True,
            )

            # Push (선택적)
            if auto_push:
                subprocess.run(
                    ["git", "push", "origin", "main"],
                    check=True,
                    capture_output=True,
                )
                print(f"✅ Push 완료: {post['title']}")
                return True
            else:
                print(
                    f"✅ Commit 완료: {commit_msg}\n"
                    "   Push하려면: git push origin main"
                )
                return False

        except subprocess.CalledProcessError as e:
            print(f"⚠️  Git 작업 실패: {e.stderr.decode('utf-8')}")
            return False

    def run_interactive(self):
        """대화형 모드"""
        print("\n🌸 블로그 글쓰기 - 대화형 모드\n")

        # 입력 수집
        title = input("📝 제목 입력: ").strip()
        slug = input("🔗 슬러그 입력 (예: noop-intro): ").strip().lower()

        print(f"\n카테고리: {', '.join(self.VALID_CATEGORIES)}")
        category = input("📂 카테고리 선택: ").strip().upper()

        date = input("📅 발행일 입력 (YYYY.MM.DD): ").strip()
        excerpt = input("✏️  요약 입력 (한두 문장): ").strip()

        print("\n📄 본문 입력 (HTML, 끝내려면 Ctrl+D 또는 Ctrl+Z 입력):")
        try:
            content = sys.stdin.read().strip()
        except EOFError:
            content = ""

        # 유효성 검사
        try:
            post = self.create_post(title, slug, date, category, excerpt, content)
        except AssertionError as e:
            print(f"❌ 입력 오류: {e}")
            return False

        # 저장
        try:
            file_path = self.save_post(post)
            print(f"\n✅ 포스트 저장: {file_path}")
        except FileExistsError as e:
            print(f"❌ 저장 실패: {e}")
            return False

        # Git 작업
        auto_push = input("\nGit에 자동 push할까요? (y/N): ").lower() == "y"
        self.commit_and_push(post, auto_push=auto_push)

        print("\n✨ 완료!")
        return True


def main():
    """메인 함수"""
    try:
        writer = BlogPostWriter()
        writer.run_interactive()
    except RuntimeError as e:
        print(f"❌ 오류: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
