# eslint-config-taeyoon 작업 지침

## 기본 응답 원칙

- 항상 한국어 존댓말로 응답합니다.
- 결론을 먼저 말하고, 확인하지 못한 내용은 명확히 분리합니다.
- 불필요한 칭찬, 감탄, 장식적 표현은 사용하지 않습니다.
- 사용자가 커밋을 명시적으로 요청하지 않으면 커밋하지 않습니다.
- 이미 수정된 파일은 사용자 또는 이전 작업의 변경으로 보고 임의로 되돌리지 않습니다.
- 요청과 직접 관련 없는 리팩터링, 포맷 변경, 의존성 갱신은 하지 않습니다.
- 확인하지 못한 명령어, 테스트, 배포를 성공한 것처럼 보고하지 않습니다.
- secret, token, credential, 개인 접근 정보는 저장소에 기록하지 않습니다.
- 사용자가 명시적으로 요청하지 않은 내용을 커밋 메시지, 코드 주석, PR/이슈 본문, 문서, 설정 파일에 임의로 삽입하지 않습니다. 특히 다음은 사용자의 명시적 지시가 없으면 절대 추가하지 않습니다.
  - `Co-Authored-By`, `Signed-off-by` 등 trailer
  - 에이전트, 모델, 제공사 이름이나 이메일 (예: Claude, Anthropic, GPT, Copilot)
  - "Generated with ...", "Made by AI" 등 생성 도구 표기
  - 작업과 무관한 광고, 홍보, 외부 링크
- 위 항목을 넣어야 할 합당한 이유가 있다고 판단되더라도, 먼저 사용자에게 묻고 승인을 받은 뒤에만 추가합니다.

## 저장소 역할

이 저장소는 개인 프로젝트에서 재사용하는 ESLint 9 flat shareable config 패키지입니다.

- 기본 export와 `eslint-config-taeyoon/base`는 JavaScript, TypeScript, import 정렬, unused imports, Prettier 호환 규칙을 제공합니다.
- `eslint-config-taeyoon/react`는 base preset에 React와 React Hooks 규칙을 더합니다.
- `eslint-config-taeyoon/react-native`는 React preset에 React Native 규칙을 더합니다.
- `eslint-config-taeyoon/prettier`는 루트의 `.prettierrc.json`을 package export로 제공합니다.

## 작업 시작 체크

작업을 시작할 때 먼저 아래를 확인합니다.

- `git status --short`
- 변경 대상 파일의 기존 문체와 import/export 방식
- `package.json`의 `exports`, `files`, `scripts`, dependency 범위
- 관련 preset과 rule 파일의 조합 관계
- `CLAUDE.md`가 `AGENTS.md`를 가리키는 심볼릭 링크인지

## 파일 구조와 원본

- `src/configs/`: 외부로 노출되는 preset 조합입니다.
- `src/rules/`: plugin별 ESLint flat config 조각입니다.
- `src/types/`: 공유 타입 정의입니다.
- `@types/`: 패키지 타입 보강과 누락 타입 선언입니다.
- `tests/smoke.cjs`: package export와 대표 lint 동작, `npm pack --dry-run` 결과를 확인하는 smoke test입니다.
- `resources/README.preset.md`: README 본문의 source of truth입니다.
- `resources/readme-hero.preset.svg`: README 히어로 SVG wrapper의 source of truth입니다.
- `resources/readme-hero.svg`: README 생성 명령으로 만들어지는 히어로 SVG 결과물입니다.
- `scripts/readme_update.sh`: README와 히어로 SVG를 재생성하는 명령입니다.
- `dist/`: `yarn build`로 생성되는 빌드 산출물입니다. 직접 수정으로 끝내지 않습니다.
- `.pnp.cjs`, `.pnp.loader.mjs`, `.yarn/`, `.yarnrc.yml`, `yarn.lock`: Yarn 4/PnP 관련 파일입니다. 의존성 변경과 직접 관련될 때만 갱신합니다.

source of truth는 `src`, `@types`, `package.json`, `.prettierrc.json`, `tsconfig.json`, `tests`, `resources/README.preset.md`, `resources/readme-hero.preset.svg`입니다. 생성 파일이나 캐시 파일만 수정해서 문제를 해결한 것처럼 마무리하지 않습니다.

## README 수정 기준

- `README.md`는 생성 파일이며 직접 수정으로 끝내지 않습니다.
- README 내용을 바꿀 때는 `resources/README.preset.md`를 수정합니다.
- 기존 `README.md`는 사실 확인용 자료로만 사용하고, 그 구조나 문장 흐름을 `resources/README.preset.md`의 템플릿으로 삼지 않습니다.
- `resources/README.preset.md`의 placeholder, 경로, 섹션 구조가 바뀌면 `scripts/readme_update.sh`의 치환/생성 로직도 함께 수정합니다.
- README 원본이나 히어로 리소스를 수정한 뒤에는 `yarn readme:update`을 실행해 `README.md`와 `resources/readme-hero.svg`를 재생성합니다.
- `resources/readme-hero.preset.svg`는 히어로 wrapper 원본입니다. 임의로 새 wrapper를 만들지 않고, 필요한 경우 기존 wrapper의 source-of-truth만 수정합니다.
- 커스텀 히어로 이미지는 `resources/hero.png`를 추가해 적용합니다. 라이트/다크 모드별 이미지가 필요하면 `resources/hero.light.png`, `resources/hero.dark.png`를 추가합니다. 같은 이름의 `.jpg`도 지원합니다.
- README의 H1 제목과 한 줄 설명, 히어로 이미지 `alt` 텍스트는 `resources/README.preset.md`에 최종 문구를 직접 작성합니다. `${projectName}`, `${displayName}`, `${description}` 같은 placeholder를 남기지 않으며, 생성 스크립트가 이 값을 생성하거나 덮어쓰지 않습니다.
- `레포지토리 구성` 섹션은 임의의 표로 만들지 않고 `plaintext` 코드블록 tree로 작성합니다.
- README 목차를 둔 경우 H2 섹션 추가, 삭제, 이름 변경에 맞춰 목차와 anchor 링크를 함께 갱신합니다.
- H2 제목은 섹션 구분이 쉽도록 의미가 맞는 이모지 1개로 시작합니다.
- badge와 링크는 실제 확인된 패키지명, 버전, 기술 스택, 공개 URL 기준으로만 추가합니다. badge를 추가하거나 제거할 때는 README 상단 badge 영역과 README 원본을 함께 갱신합니다.
- secret, token, credential, 비공개 내부 URL은 README와 README 원본에 기록하지 않습니다.
- README 관련 변경을 이유로 코드, 설정, 릴리스 절차를 임의로 리팩터링하지 않습니다.

## 개발 기준

- 기존 TypeScript 스타일과 ESLint flat config 배열 구성 방식을 따릅니다.
- preset에 규칙을 추가하거나 제거할 때는 해당 `src/rules/*` 파일과 이를 조합하는 `src/configs/*` 파일의 관계를 함께 확인합니다.
- package export를 변경할 때는 `package.json`의 `exports`, `main`, `files`와 smoke test의 package 포함 검증을 함께 확인합니다.
- CommonJS 소비자를 위해 기존 `module.exports = ...` 패턴을 유지합니다.
- 타입 보강은 가능한 한 좁게 작성하고, 실제 의존성 타입으로 해결 가능한 경우 별도 선언을 늘리지 않습니다.
- secret, token, credential, 개인 접근 정보는 저장소에 기록하지 않습니다.

## 패키지 사용 프로젝트에서의 에이전트 지침

이 패키지를 설치해 다른 프로젝트의 ESLint 설정을 구성하는 에이전트는 아래 기준을 따릅니다.

- 대상 프로젝트의 package manager, 기존 ESLint 설정 파일, React 또는 React Native 사용 여부를 먼저 확인합니다.
- 대상 프로젝트에 맞는 명령으로 `eslint`, `typescript`, `eslint-config-taeyoon`을 dev dependency로 설치합니다. 지원 범위는 ESLint `^9.7.0`, TypeScript `>=4.8.4 <6.1.0`입니다.
- 이 패키지를 설치한 뒤에는 패키지에 포함된 `node_modules/eslint-config-taeyoon/AGENTS.md`를 참고해 preset 선택과 설정 방식을 확인합니다.
- 일반 JavaScript 또는 TypeScript 프로젝트는 `eslint-config-taeyoon` 또는 `eslint-config-taeyoon/base`를 사용합니다.
- React 프로젝트는 `eslint-config-taeyoon/react`를 사용합니다.
- React Native 프로젝트는 `eslint-config-taeyoon/react-native`를 사용합니다.
- 기존 프로젝트에 ignore, parser option, globals, framework 전용 override가 있으면 삭제하지 말고 preset 배열 앞뒤로 필요한 설정을 조합합니다.
- CommonJS 설정 파일이 필요한 프로젝트가 아니라면 ESLint flat config 예시는 ESM `eslint.config.js` 기준으로 작성합니다.
- 설정 후 대상 프로젝트에 lint script가 있으면 실행하고, 없으면 ESLint가 읽을 설정 파일과 package dependency 변경을 확인합니다.
- 실행하지 않은 lint, test, install, migration을 성공한 것처럼 보고하지 않습니다.

## 검증 기준

변경 후 가능한 범위에서 아래 명령을 실행합니다.

```sh
yarn test
yarn readme:update
git diff --check
git status --short
```

상황에 따라 더 좁은 검증이 필요하면 아래 명령을 사용할 수 있습니다.

```sh
yarn build
yarn test:smoke
```

검증 명령을 실행하지 못했거나 실패했다면, 성공한 것처럼 말하지 말고 실행 여부와 실패 이유를 보고합니다.

## 의존성 보안 호환성 메모

- 2026-08-25 기준 실제 GitHub 보안 advisory는 전이 의존성까지 최신화해 제거했습니다.
- ESLint는 `eslint-plugin-import`, `eslint-plugin-react`, `eslint-plugin-react-native`의 ESLint 10 정식 지원 버전이 배포될 때까지 `9.39.5`와 `@eslint/js` `9.39.5`를 유지합니다. peer 범위를 강제로 덮거나 미배포 소스를 설치하지 않습니다.
- TypeScript 7.0은 기존 JavaScript compiler API를 제공하지 않고 네이티브 컴파일러의 Yarn PnP 모듈 해석도 지원하지 않습니다. `@typescript-eslint`가 새 API를 정식 지원하고 TypeScript 네이티브 컴파일러의 PnP 지원이 확인될 때까지 API 호환선의 최신 버전인 `6.0.3`을 유지합니다.
- `yarn npm audit --all --recursive`는 ESLint 9 지원 종료 공지 1건 때문에 종료 코드 1을 반환할 수 있습니다. 이 공지는 보안 advisory URL이 없는 deprecation 항목이며, 새 보안 advisory와 혼동하지 않습니다. 감사 결과에 보안 advisory URL이 추가되면 별도 취약점으로 처리합니다.
- 위 ESLint 플러그인의 정식 지원 버전, TypeScript의 안정적인 새 compiler API, `@typescript-eslint` 및 Yarn PnP 지원이 모두 준비되면 제한을 제거하고 최신 ESLint와 TypeScript로 갱신한 뒤 `yarn test`와 재귀 audit를 다시 실행합니다.

## 커밋 원칙

커밋은 사용자가 요청한 경우에만 합니다.

- 기능 추가: `Feat: ...`
- 문서 갱신: `Docs: ...`
- 이름/구조 정리: `Refactor: ...`
- 버그 수정: `Fix: ...`
- 설정 변경: `Chore: ...`
- 테스트 추가/수정: `Test: ...`

한 커밋에는 하나의 목적만 담습니다. 사용자가 커밋을 요청했더라도 unrelated change는 함께 stage하지 않습니다. 같은 파일에 사용자 변경과 작업 변경이 섞여 있으면 diff를 확인하고 필요한 hunk만 선별합니다.

## 릴리스와 배포

- npm publish, version bump, tag 생성, push는 사용자가 명시적으로 요청한 경우에만 수행합니다.
- 릴리스 관련 작업을 할 때는 `yarn test`와 package 포함 파일 확인을 먼저 통과시킵니다.
- 배포나 릴리스 절차를 확인하지 못했다면 추정으로 수행하지 않고 확인 필요 항목으로 보고합니다.

## CLAUDE.md

`CLAUDE.md`는 별도 문서로 복제하지 않고 `AGENTS.md`를 가리키는 심볼릭 링크로 유지합니다.

```sh
ln -s AGENTS.md CLAUDE.md
```

링크 상태를 확인할 때는 아래를 사용합니다.

```sh
test -L CLAUDE.md
test "$(readlink CLAUDE.md)" = "AGENTS.md"
```

이미 `CLAUDE.md`가 존재한다면 먼저 종류를 확인합니다. 이미 `AGENTS.md`를 가리키는 심볼릭 링크라면 유지하고, 일반 파일이거나 다른 대상을 가리키는 링크라면 임의로 덮어쓰지 말고 사용자에게 확인합니다.

### Windows fallback

Windows에서는 일반 사용자 권한으로 `ln -s`가 동작하지 않거나, Git for Windows가 symlink을 일반 파일로 체크아웃할 수 있습니다. 아래 순서로 fallback합니다.

1. 개발자 모드가 켜져 있거나 관리자 권한이 있다면 PowerShell에서 symlink을 만듭니다.

   ```powershell
   New-Item -ItemType SymbolicLink -Path CLAUDE.md -Target AGENTS.md
   ```

2. Git for Windows를 사용한다면 저장소에 `core.symlinks=true`가 설정되어 있는지 `git config core.symlinks`로 확인합니다. `false`라면 `git config core.symlinks true` 후 다시 체크아웃합니다.
3. symlink을 끝내 사용할 수 없는 환경이라면 `CLAUDE.md`를 `AGENTS.md`의 일반 파일 사본으로 둡니다. 이 경우 `AGENTS.md`를 수정하면 같은 변경을 `CLAUDE.md`에도 반영하고, 커밋 전에 `diff AGENTS.md CLAUDE.md` 결과가 비어 있는지 확인합니다.
