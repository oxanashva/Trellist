#!/usr/bin/env bash
# validate.sh — Run the full frontend test suite and report results.
# Usage: bash scripts/validate.sh [--e2e]
#
# Flags:
#   --e2e   Also run Playwright e2e tests (slower; skip on every commit)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PASS=0
FAIL=0
ERRORS=()

run_step() {
  local label="$1"
  shift
  echo ""
  echo "▶ $label"
  if "$@"; then
    echo "  ✅ $label passed"
    ((PASS++))
  else
    echo "  ❌ $label FAILED"
    ((FAIL++))
    ERRORS+=("$label")
  fi
}

# ── 1. TypeScript type-check ────────────────────────────────────────────────
run_step "TypeScript type check" npx tsc --noEmit

# ── 2. Unit + Integration tests (Vitest) ────────────────────────────────────
run_step "Vitest unit & integration tests" npx vitest run --reporter=verbose

# ── 3. Check for banned patterns ────────────────────────────────────────────
echo ""
echo "▶ Static analysis: banned test patterns"

BANNED_PATTERNS=(
  "jest\.fn()"
  "vi\.mock\('axios'\)"
  "vi\.mock\('fetch'\)"
  "waitForTimeout"
  "new Promise.*setTimeout"
)

FOUND_BANNED=0
for pattern in "${BANNED_PATTERNS[@]}"; do
  matches=$(grep -rn --include="*.test.ts" --include="*.test.tsx" --include="*.spec.ts" \
    -E "$pattern" src/ e2e/ 2>/dev/null || true)
  if [[ -n "$matches" ]]; then
    echo "  ⚠️  Banned pattern found: $pattern"
    echo "$matches"
    FOUND_BANNED=1
  fi
done

if [[ $FOUND_BANNED -eq 0 ]]; then
  echo "  ✅ No banned patterns detected"
  ((PASS++))
else
  echo "  ❌ Banned patterns detected — fix before merging"
  ((FAIL++))
  ERRORS+=("Banned test patterns")
fi

# ── 4. Check test file naming (must be .ts/.tsx, not .js) ───────────────────
echo ""
echo "▶ Check test file extensions (must be .ts/.tsx)"
JS_TEST_FILES=$(find src e2e -name "*.test.js" -o -name "*.test.jsx" -o -name "*.spec.js" 2>/dev/null || true)
if [[ -n "$JS_TEST_FILES" ]]; then
  echo "  ❌ JavaScript test files found — rename to .ts/.tsx:"
  echo "$JS_TEST_FILES"
  ((FAIL++))
  ERRORS+=("JS test files detected")
else
  echo "  ✅ All test files use TypeScript extensions"
  ((PASS++))
fi

# ── 5. Optional: Playwright e2e ─────────────────────────────────────────────
if [[ "${1:-}" == "--e2e" ]]; then
  run_step "Playwright e2e tests" npx playwright test
else
  echo ""
  echo "ℹ️  Skipping Playwright e2e tests (pass --e2e to include)"
fi

# ── Summary ──────────────────────────────────────────────────────────────────
echo ""
echo "════════════════════════════════════"
echo "  Results: $PASS passed, $FAIL failed"
if [[ $FAIL -gt 0 ]]; then
  echo "  Failed steps:"
  for err in "${ERRORS[@]}"; do
    echo "    • $err"
  done
  echo "════════════════════════════════════"
  exit 1
else
  echo "  All checks passed ✅"
  echo "════════════════════════════════════"
  exit 0
fi
