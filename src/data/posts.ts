import { type Category } from './categories'

export type { Category }
export { categories } from './categories'

export interface Post {
  slug: string
  title: string
  date: string
  category: Exclude<Category, 'ALL'>
  excerpt: string
  content: string
}

export const posts: Post[] = [
  {
    slug: 'llm-intro',
    title: 'LLM이란 — 다음 단어를 예측하는 기계',
    date: '2026.04.13',
    category: 'AI',
    excerpt: 'LLM은 결국 "다음 단어를 예측하는 기계"입니다. 어텐션 메커니즘부터 프롬프트 작동 원리까지, 개념을 직관적으로 정리합니다.',
    content: `
<h2>LLM이란 뭔가요</h2>
<p>Large Language Model. 이름이 거창하지만 핵심은 하나입니다.</p>
<p><strong>"다음에 올 단어를 확률로 예측하는 기계"</strong></p>
<p>입력이 <code>"나는 오늘 밥을"</code> 이라면, 모델은 다음 단어의 확률 분포를 계산합니다.</p>
<pre><code>"먹었다" → 42%
"먹고"   → 28%
"굶었다" → 7%
...      → 나머지</code></pre>
<p>이걸 수천억 번 반복해서 문장을 만들어냅니다. 놀랍게도, 이것만으로 코드를 짜고 논문을 요약하고 번역을 합니다.</p>

<h2>어텐션(Attention) — 어디를 얼마나 볼 것인가</h2>
<p>Transformer의 핵심은 Attention 메커니즘입니다. 각 단어를 처리할 때 <strong>"다른 단어들을 얼마나 참고할지"</strong> 가중치를 계산합니다.</p>
<pre><code>입력: "그 은행은 강가에 있다"
"은행"을 해석할 때:
  → "강가" 에 높은 가중치  (금융 은행 ✗, 강변 나무 ✓)
  → "있다" 에 낮은 가중치</code></pre>
<p>이 가중치 계산이 Self-Attention이고, 여러 관점에서 동시에 계산하는 게 Multi-Head Attention입니다. 레이어가 깊을수록, 헤드가 많을수록 문맥 이해가 정교해집니다.</p>

<h2>프리트레이닝 vs 파인튜닝</h2>
<p>LLM은 두 단계로 만들어집니다.</p>
<ul>
  <li><strong>프리트레이닝</strong> — 인터넷 텍스트 수천억 토큰으로 "다음 단어 예측"을 반복. 비용: GPU 수백 대로 수개월</li>
  <li><strong>파인튜닝(SFT)</strong> — 질문/답변 형식 데이터로 "대화하는 법"을 추가 학습. 프리트레이닝 모델을 베이스로 씀</li>
</ul>
<p>GPT, Claude, Llama 모두 이 구조입니다. 우리가 쓰는 챗봇은 대부분 SFT + RLHF까지 거친 모델입니다.</p>

<h2>토큰이란</h2>
<p>LLM은 글자가 아니라 <strong>토큰</strong> 단위로 처리합니다. 토큰은 대략 영어 0.75단어, 한국어는 1~2글자 수준입니다.</p>
<pre><code>"안녕하세요" → ["안녕", "하", "세요"]  (3토큰)
"Hello"      → ["Hello"]             (1토큰)</code></pre>
<p>한국어가 영어보다 토큰을 더 많이 씁니다. 같은 내용도 컨텍스트 윈도우를 더 많이 차지한다는 뜻입니다.</p>

<h2>컨텍스트 윈도우</h2>
<p>모델이 한 번에 볼 수 있는 토큰 수가 컨텍스트 윈도우입니다. GPT-4o는 128k, Claude 3.5는 200k 토큰입니다. 이 범위를 넘어가면 모델은 앞 내용을 "잊습니다". 메모리가 아니라 주의 범위입니다.</p>

<h2>요약</h2>
<p>LLM = 어마어마한 텍스트로 학습한 확률 기계. 어텐션으로 문맥을 이해하고, 토큰 단위로 글을 생성합니다. 마법이 아니라 통계와 행렬 곱셈입니다.</p>
`,
  },
  {
    slug: 'stable-diffusion-intro',
    title: 'Stable Diffusion 일반론 — 노이즈에서 그림이 나오는 원리',
    date: '2026.04.13',
    category: 'AI',
    excerpt: '뿌연 화면에서 시작해 점점 그림이 나타나는 SD의 작동 원리를 직관적으로 설명합니다. CFG, 샘플러, VAE까지.',
    content: `
<h2>Stable Diffusion이란</h2>
<p>Stable Diffusion(SD)은 텍스트 프롬프트로 이미지를 생성하는 오픈소스 AI 모델입니다. Midjourney나 DALL-E와 달리 로컬에서 직접 실행할 수 있습니다. 결과물은 <code>.safetensors</code> 형식의 모델 파일 하나입니다.</p>

<h2>확산(Diffusion) 원리</h2>
<p>이름 그대로 "확산"을 역으로 돌립니다.</p>
<ol>
  <li><strong>포워드 패스 (학습 때)</strong> — 원본 이미지에 조금씩 노이즈를 추가해 완전한 뿌연 화면을 만듦</li>
  <li><strong>리버스 패스 (추론 때)</strong> — 완전한 노이즈에서 시작해 매 Step마다 "이 노이즈에서 뭘 빼면 원본에 가까워지지?" 를 U-Net이 예측</li>
</ol>
<p>기본 20~30 Step을 반복하면 노이즈가 이미지로 바뀝니다.</p>

<h2>구성 요소</h2>
<ul>
  <li><strong>CLIP Text Encoder</strong> — 프롬프트를 벡터로 변환. 모델이 텍스트를 이해하는 창구</li>
  <li><strong>U-Net</strong> — 매 Step마다 노이즈 예측. SD의 핵심 두뇌</li>
  <li><strong>VAE</strong> — 픽셀 공간 ↔ 잠재 공간(Latent Space) 변환. SD는 작은 잠재 공간에서 연산하므로 빠름</li>
  <li><strong>Scheduler (샘플러)</strong> — 노이즈 제거 방식. DPM++, Euler, DDIM 등이 있고 속도/품질 트레이드오프가 다름</li>
</ul>

<h2>CFG Scale</h2>
<p>Classifier-Free Guidance. 프롬프트를 얼마나 강하게 따를지 조절하는 값입니다.</p>
<pre><code>CFG 3  → 프롬프트 느슨하게, 창의적이지만 엉뚱함
CFG 7  → 균형 (기본값)
CFG 15 → 프롬프트 과충실, 색이 타버리거나 왜곡될 수 있음</code></pre>

<h2>Checkpoint vs LoRA</h2>
<p>SD 모델 파일 종류가 헷갈리는 경우가 많습니다.</p>
<ul>
  <li><strong>Checkpoint</strong> — 완전한 모델. 수 GB. 예: <code>Counterfeit-V3.0.safetensors</code></li>
  <li><strong>LoRA</strong> — 체크포인트 위에 얹는 경량 파인튜닝 파일. 수십~수백 MB. 특정 화풍·캐릭터 추가 학습에 사용</li>
  <li><strong>VAE</strong> — 색감·선명도 보정 파일. 체크포인트와 별도로 교체 가능</li>
</ul>

<h2>네거티브 프롬프트</h2>
<p>"이게 나오지 않았으면 하는 것"을 명시합니다. CFG가 프롬프트 방향으로 당기듯, 네거티브 프롬프트는 반대 방향으로 밉니다.</p>
<pre><code>negative: worst quality, low quality, blurry, extra fingers, deformed</code></pre>
<p>품질에 가장 영향이 큰 요소 중 하나입니다.</p>

<h2>요약</h2>
<p>SD = 노이즈 → 이미지로 역확산. U-Net이 핵심이고, CFG로 프롬프트 충실도, 샘플러로 품질/속도를 조절합니다. 체크포인트가 기본이고 LoRA로 확장합니다.</p>
`,
  },
  {
    slug: 'stable-diffusion-lora',
    title: 'LoRA로 내 캐릭터 학습시키기',
    date: '2026.04.13',
    category: 'AI',
    excerpt: '특정 캐릭터·화풍을 SD에 주입하는 LoRA 학습 전 과정을 다룹니다. 데이터셋 구성, 태깅, 학습 설정, 결과 검증까지.',
    content: `
<h2>LoRA란</h2>
<p>Low-Rank Adaptation. 전체 모델을 재학습하는 대신, 가중치 업데이트를 저랭크(Low-Rank) 행렬로 근사해 <strong>아주 작은 파일</strong>로 새 개념을 주입합니다. 수십~수백 MB 파일 하나로 캐릭터·화풍·오브젝트를 체크포인트에 얹을 수 있습니다.</p>

<h2>언제 쓰나요</h2>
<ul>
  <li>일관된 캐릭터를 여러 포즈·배경에서 생성할 때</li>
  <li>특정 작가 화풍을 재현할 때</li>
  <li>특정 오브젝트(로고, 제품)를 이미지에 넣을 때</li>
  <li>ControlNet 없이도 얼굴·체형 일관성이 필요할 때 (IP-Adapter FaceID로 보강 가능)</li>
</ul>

<h2>데이터셋 준비</h2>
<p>학습 이미지 20~50장이면 충분합니다. 클로즈업·전신·다양한 각도를 섞어 준비합니다.</p>
<ul>
  <li>해상도: 512×512 또는 768×768 (정사각형 권장)</li>
  <li>배경이 단순할수록 학습이 깔끔하게 됩니다</li>
  <li>이미지마다 텍스트 태그 파일(<code>.txt</code>)이 필요합니다</li>
</ul>

<h2>WD14 Tagger로 자동 태깅</h2>
<p>이미지에서 자동으로 Danbooru 태그를 생성해줍니다.</p>
<pre><code>1girl, solo, long hair, red eyes,
white background, standing, ...</code></pre>
<p>자동 태그 뒤에 캐릭터 고유 트리거 단어를 추가합니다. 예: <code>mychar</code></p>
<p>학습할 특징(빨간 눈 등)은 태그에서 제거하거나 유지 전략을 통일해야 합니다. "빨간 눈이 LoRA 담당인지, 프롬프트 담당인지"를 결정하세요.</p>

<h2>학습 설정 (kohya-ss 기준)</h2>
<pre><code>network_alpha:   16     # alpha/dim 비율로 학습 강도 조절
network_dim:     32     # 저랭크 행렬 크기, 클수록 표현력↑ 파일↑
learning_rate:   1e-4
max_train_steps: 1500   # 이미지 수 × Repeats
train_batch_size: 1
resolution:      512,512</code></pre>
<p>Repeats(반복 수) × 이미지 수 = 총 학습량입니다. 이미지 30장이면 Repeats 30~50이 일반적입니다.</p>

<h2>Loss 읽는 법</h2>
<p>학습 Loss가 0.08~0.12 구간에서 수렴하면 적당합니다. 너무 낮으면(<code>0.03</code> 이하) 오버핏 → 캐릭터는 나오지만 다양성이 없어집니다.</p>

<h2>검증 프롬프트</h2>
<pre><code>mychar, 1girl, sitting in front of a window,
different pose, masterpiece, best quality</code></pre>
<p>학습 이미지에 없던 포즈·배경으로 테스트합니다. 학습 이미지를 그대로 재현하면 오버핏 신호입니다.</p>

<h2>요약</h2>
<p>LoRA = 가볍게 새 개념 주입. 데이터셋 품질 &gt; 수량. 태그 전략이 결과를 결정합니다. 오버핏 방지를 위해 Loss와 검증 이미지를 꼭 체크하세요.</p>
`,
  },
  {
    slug: 'comfyui-workflow',
    title: 'ComfyUI 워크플로우 — 노드로 SD 파이프라인 설계하기',
    date: '2026.04.13',
    category: 'AI',
    excerpt: 'ComfyUI는 SD의 내부 파이프라인을 노드 그래프로 직접 조작하는 UI입니다. 기본 txt2img부터 Hires Fix, LoRA 적용까지 워크플로우를 정리합니다.',
    content: `
<h2>ComfyUI란</h2>
<p>Automatic1111(WebUI)이 페달이 달린 자전거라면, ComfyUI는 엔진 튜닝 부품까지 분해해서 조립할 수 있는 구조입니다. SD의 내부 파이프라인을 <strong>노드 그래프</strong>로 직접 연결해 자유도가 매우 높습니다.</p>

<h2>기본 txt2img 노드 구성</h2>
<pre><code>CheckpointLoaderSimple
  └─ MODEL ──────────────┐
  └─ CLIP ───► CLIPTextEncode (positive)
  └─ CLIP ───► CLIPTextEncode (negative)
  └─ VAE ─────────────────┐
                           ▼
KSampler ◄── MODEL, positive, negative, latent
  └─ LATENT ──► VAEDecode ◄── VAE
                  └─ IMAGE ──► SaveImage</code></pre>
<p>이 흐름이 SD의 전체 파이프라인입니다. 노드 하나씩 교체하거나 추가해서 기능을 확장합니다.</p>

<h2>노드 역할 표</h2>
<p><code>CheckpointLoader → LoraLoader → IPAdapterFaceID → CLIPTextEncode(+/-) → KSampler → VAEDecode → FaceDetailer → ImageUpscaleWithModel → KSampler(denoise 0.45) → SaveImage</code></p>
<table>
  <thead>
    <tr>
      <th>노드</th>
      <th>역할</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CheckpointLoader</td>
      <td>베이스 모델 로드. MODEL / CLIP / VAE 세 가지 출력을 제공합니다.</td>
    </tr>
    <tr>
      <td>LoraLoader</td>
      <td>캐릭터 LoRA를 주입해 모델에 <code>mychar_girl</code> 같은 특징을 추가합니다.</td>
    </tr>
    <tr>
      <td>IPAdapterFaceID</td>
      <td>참조 이미지의 얼굴 구조를 벡터로 추출해 생성 과정에 주입합니다.</td>
    </tr>
    <tr>
      <td>CLIPTextEncode</td>
      <td>프롬프트 텍스트를 벡터로 변환합니다. Positive / Negative를 각각 인코딩합니다.</td>
    </tr>
    <tr>
      <td>KSampler</td>
      <td>실제 이미지 생성 단계. 노이즈를 여러 Step으로 제거하며 이미지를 완성합니다.</td>
    </tr>
    <tr>
      <td>VAEDecode</td>
      <td>KSampler 출력(잠재 벡터)을 사람이 보는 이미지로 디코딩합니다.</td>
    </tr>
    <tr>
      <td>FaceDetailer</td>
      <td>얼굴 영역을 자동 감지해 고해상도로 재생성하고 이목구비를 선명하게 보정합니다.</td>
    </tr>
    <tr>
      <td>ImageUpscaleWithModel</td>
      <td>전체 이미지를 4배 업스케일합니다 (예: 512 → 2048).</td>
    </tr>
    <tr>
      <td>KSampler (2차)</td>
      <td>업스케일된 이미지에 디테일을 추가합니다. <code>denoise 0.45</code>로 원형을 유지하며 보정합니다.</td>
    </tr>
    <tr>
      <td>SaveImage</td>
      <td>최종 이미지를 <code>output</code> 폴더에 저장합니다.</td>
    </tr>
  </tbody>
</table>

<h2>LoRA 적용</h2>
<pre><code>CheckpointLoaderSimple
  └─ MODEL, CLIP
       ▼
LoraLoader (lora_name, strength_model, strength_clip)
  └─ MODEL ──► KSampler
  └─ CLIP  ──► CLIPTextEncode</code></pre>
<p>LoraLoader를 체크포인트와 KSampler 사이에 끼워 넣습니다. 복수 LoRA는 LoraLoader를 직렬로 연결합니다.</p>

<h2>Hires Fix (고해상도 보정)</h2>
<p>SD는 학습 해상도(512~768px)를 넘어가면 구도가 무너집니다. Hires Fix는 저해상도로 먼저 생성한 뒤 업스케일 후 재샘플링합니다.</p>
<pre><code>KSampler (1024x1024)
  └─ LATENT ──► LatentUpscale (1.5x)
                  └─ LATENT ──► KSampler (denoise 0.45)
                                  └─ VAEDecode ──► SaveImage</code></pre>
<p><code>denoise 0.45</code> 정도면 구도를 유지하면서 디테일을 보강합니다. 너무 높이면 구도가 바뀝니다.</p>

<h2>ImageUpscaleWithModel</h2>
<p>Real-ESRGAN 같은 업스케일 모델을 노드로 연결해 4K까지 출력할 수 있습니다.</p>
<pre><code>UpscaleModelLoader (RealESRGAN_x4.pth)
  └─ UPSCALE_MODEL ──► ImageUpscaleWithModel ◄── IMAGE
                          └─ IMAGE ──► SaveImage</code></pre>

<h2>워크플로우 저장·불러오기</h2>
<p>ComfyUI는 생성된 PNG에 워크플로우 JSON을 메타데이터로 내장합니다. 이미지를 ComfyUI에 드래그&amp;드롭하면 워크플로우가 그대로 복원됩니다.</p>

<h2>장단점 비교</h2>
<ul>
  <li><strong>장점</strong> — 파이프라인 완전 제어, API 자동화, 커스텀 노드 생태계 풍부</li>
  <li><strong>단점</strong> — 초기 진입 장벽, 노드 연결 실수 시 에러 추적이 번거로움</li>
</ul>
<p>WebUI에서 기초를 익힌 뒤 ComfyUI로 넘어오는 흐름이 일반적입니다.</p>
`,
  },
  {
    slug: 'llm-finetuning',
    title: 'LLM 파인튜닝 — Mac에서 Llama·Phi 모델 직접 학습하기',
    date: '2026.04.13',
    category: 'AI',
    excerpt: 'MLX-LM과 LoRA를 써서 M 시리즈 Mac에서 직접 LLM을 파인튜닝합니다. 데이터 포맷부터 학습, 테스트까지 전 과정을 다룹니다.',
    content: `
<h2>왜 파인튜닝인가</h2>
<p>프롬프트 엔지니어링만으로는 한계가 있습니다. 특정 도메인 용어, 특정 말투, 특정 출력 형식을 <strong>항상</strong> 원한다면 파인튜닝이 답입니다. 전체 모델을 재학습하는 Full Fine-tuning은 GPU 수십 대가 필요하지만, <strong>LoRA 파인튜닝</strong>은 Mac에서도 가능합니다.</p>

<h2>Full Fine-tuning vs LoRA</h2>
<ul>
  <li><strong>Full Fine-tuning</strong> — 모든 가중치 업데이트. 최대 성능이지만 비용·시간이 막대함</li>
  <li><strong>LoRA Fine-tuning</strong> — 저랭크 행렬만 학습. 파라미터의 1~5%만 건드림. 성능 손실이 거의 없으면서 훨씬 가볍고 빠름</li>
</ul>

<h2>환경 — MLX-LM (Apple Silicon)</h2>
<p>Apple의 MLX 프레임워크는 M 시리즈 칩의 통합 메모리(CPU+GPU 공유)를 활용합니다. M4 Pro 기준 14B 모델까지 로컬에서 파인튜닝이 가능합니다.</p>
<pre><code>pip install mlx-lm</code></pre>

<h2>지원 모델</h2>
<p>Phi-3 mini (3.8B), Llama 3 (8B), Mistral 등 Hugging Face 모델 대부분을 지원합니다.</p>
<pre><code>mlx_lm.lora \\
  --model microsoft/Phi-3-mini-4k-instruct \\
  --train \\
  --data ./data \\
  --learning-rate 1e-4 \\
  --lora-layers 16 \\
  --iters 1000</code></pre>

<h2>데이터 포맷</h2>
<p>instruct 형식 JSONL 파일이 필요합니다. <code>train.jsonl</code>, <code>valid.jsonl</code> 두 파일을 <code>./data</code> 폴더에 넣습니다.</p>
<pre><code>{"text": "&lt;|user|&gt;\\n질문 내용&lt;|end|&gt;\\n&lt;|assistant|&gt;\\n원하는 답변&lt;|end|&gt;"}
{"text": "&lt;|user|&gt;\\n다른 질문&lt;|end|&gt;\\n&lt;|assistant|&gt;\\n다른 답변&lt;|end|&gt;"}</code></pre>
<p>모델마다 chat template이 다릅니다. Phi-3는 위 형식, Llama 3는 <code>&lt;|begin_of_text|&gt;</code> 형식을 씁니다. Hugging Face 모델 카드에서 확인하세요.</p>

<h2>학습 중 모니터링</h2>
<pre><code>Iter 100: Train loss 2.341, Val loss 2.187
Iter 200: Train loss 1.823, Val loss 1.791
Iter 500: Train loss 0.923, Val loss 0.961
...</code></pre>
<p>Val loss가 Train loss보다 많이 높아지기 시작하면 오버핏 신호입니다. 그 직전 체크포인트를 쓰세요.</p>

<h2>Checkpoint 저장 및 변환</h2>
<pre><code># 어댑터(LoRA 가중치)만 저장됨
./adapters/

# 체크포인트와 병합
mlx_lm.fuse \\
  --model microsoft/Phi-3-mini-4k-instruct \\
  --adapter-path ./adapters \\
  --save-path ./my-finetuned-model</code></pre>

<h2>Claude Code와 함께 쓰기</h2>
<p>데이터 생성이 막막하다면 Claude Code에 도메인 문서를 주고 QA 쌍을 뽑아달라고 하세요. "이 문서를 읽고 instruct JSONL 100개 만들어줘"만으로 데이터셋 준비 시간을 크게 줄일 수 있습니다.</p>

<h2>요약</h2>
<p>LoRA + MLX-LM으로 Mac에서도 LLM 파인튜닝이 됩니다. 데이터 포맷이 모델마다 다르니 chat template 확인이 필수. Val loss 추이를 보며 오버핏을 방지하세요.</p>
`,
  },
  {
    slug: 'css-design-tokens',
    title: 'CSS 커스텀 프로퍼티로 디자인 시스템 구축하기',
    date: '2025.04.08',
    category: 'CSS',
    excerpt: 'CSS 변수를 활용해 일관된 디자인 토큰을 정의하고, 컴포넌트 간 색상·스페이싱을 중앙에서 관리하는 방법을 살펴봅니다.',
    content: `
<h2>왜 디자인 토큰인가</h2>
<p>프로젝트 규모가 커질수록 <code>#f07098</code> 같은 하드코딩 값이 수십 곳에 흩어지기 시작합니다. 브랜드 색상 하나를 바꾸려면 파일을 수십 개 열어야 하는 상황이 됩니다. CSS 커스텀 프로퍼티(변수)는 이 문제를 근본적으로 해결합니다.</p>

<h2>토큰 정의</h2>
<pre><code>:root {
  --accent:    #f07098;
  --accent-d:  #c04870;
  --accent-dd: #7a1038;
  --bg:        #fdf5fb;
  --surface:   #ffffff;
  --text:      #2a1020;
}</code></pre>

<p><code>:root</code>에 정의된 변수는 전체 문서에서 상속됩니다. <code>var(--accent)</code>로 어디서든 참조할 수 있고, 값을 바꾸면 모든 참조처가 자동으로 갱신됩니다.</p>

<h2>스케일 설계 원칙</h2>
<p>이 블로그의 액센트 팔레트처럼, 하나의 색상에서 파생 토큰을 만드는 방식이 효과적입니다.</p>
<ul>
  <li><strong>base</strong> — 주 사용처</li>
  <li><strong>-d (dark)</strong> — 호버, 텍스트 강조</li>
  <li><strong>-dd (darker)</strong> — 테두리, 그림자</li>
  <li><strong>-l (light)</strong> — 밝은 배경, 호버 배경</li>
  <li><strong>-xl / -bg</strong> — 아주 연한 배경, 선택 상태</li>
</ul>

<h2>컴포넌트에서 활용</h2>
<pre><code>.button-primary {
  background: var(--accent);
  border: 1.5px solid var(--accent-dd);
  box-shadow: 3px 3px 0 var(--accent-dd);
  color: white;
}</code></pre>

<p>이제 <code>--accent</code> 하나만 바꾸면 버튼의 배경, 테두리, 그림자가 모두 연동됩니다. 다크 모드 전환도 <code>@media (prefers-color-scheme: dark)</code> 안에서 변수값만 재정의하면 됩니다.</p>

<h2>마치며</h2>
<p>디자인 토큰은 단순한 변수 모음이 아닙니다. 디자이너와 개발자 사이의 공통 언어이고, 코드베이스 전체의 일관성을 보장하는 계약입니다. 오늘부터 하드코딩 값 대신 <code>var(--)</code>를 습관화해보세요.</p>
`,
  },
  {
    slug: 'react-rendering-optimization',
    title: 'React 렌더링 최적화 — useMemo와 useCallback',
    date: '2025.03.25',
    category: 'REACT',
    excerpt: 'React 컴포넌트가 불필요하게 다시 렌더링되는 원인을 파악하고, useMemo와 useCallback으로 성능을 개선하는 실전 전략을 정리합니다.',
    content: `
<h2>렌더링이 일어나는 조건</h2>
<p>React 컴포넌트는 세 가지 경우에 리렌더링됩니다.</p>
<ol>
  <li>state가 변경될 때</li>
  <li>props가 변경될 때</li>
  <li>부모 컴포넌트가 리렌더링될 때</li>
</ol>
<p>세 번째가 가장 많이 간과됩니다. 부모가 렌더링되면 자식도 모두 렌더링됩니다 — props가 바뀌지 않아도요.</p>

<h2>문제: 함수와 객체의 참조 동일성</h2>
<pre><code>function Parent() {
  const [count, setCount] = useState(0)
  const options = { theme: 'cherry' }  // 매 렌더마다 새 객체
  const handleClick = () => console.log('clicked')  // 매 렌더마다 새 함수

  return <Child options={options} onClick={handleClick} />
}</code></pre>
<p>React.memo로 감싼 Child도, options와 handleClick이 매번 새 참조이므로 리렌더링됩니다.</p>

<h2>useMemo — 값을 메모이제이션</h2>
<pre><code>const options = useMemo(
  () => ({ theme: 'cherry' }),
  [] // 의존성 없음 — 마운트 시 1회만 생성
)</code></pre>
<p>deps 배열의 값이 바뀔 때만 새 객체를 만듭니다. 같은 참조가 유지되므로 자식은 리렌더링되지 않습니다.</p>

<h2>useCallback — 함수를 메모이제이션</h2>
<pre><code>const handleClick = useCallback(
  () => console.log('clicked'),
  [] // 의존성 없음
)</code></pre>
<p>useCallback은 useMemo(() => fn, deps)의 단축형입니다.</p>

<h2>언제 쓰면 안 되는가</h2>
<p>모든 값과 함수에 memoization을 적용하면 오히려 성능이 나빠집니다. deps 비교와 메모리 비용이 발생하기 때문입니다.</p>
<ul>
  <li>계산 비용이 크지 않은 단순 값 → 그냥 계산하세요</li>
  <li>자식이 React.memo로 감싸지지 않은 경우 → 효과 없음</li>
  <li>deps 배열이 너무 자주 바뀌는 경우 → 의미 없음</li>
</ul>

<h2>프로파일러로 측정하기</h2>
<p>React DevTools의 Profiler 탭에서 실제로 렌더링이 얼마나 자주, 오래 걸리는지 측정한 뒤 최적화하세요. 측정 없는 최적화는 추측일 뿐입니다.</p>
`,
  },
  {
    slug: 'typescript-generics',
    title: 'TypeScript Generics 실전 활용법',
    date: '2025.03.10',
    category: 'TYPESCRIPT',
    excerpt: 'any 없이 타입 안전성을 유지하면서 재사용 가능한 유틸리티를 만드는 Generic 패턴을 실제 예제로 정리합니다.',
    content: `
<h2>Generics가 필요한 순간</h2>
<p>로직은 동일한데 타입만 다른 함수를 여러 개 만들고 있다면, Generic으로 합칠 수 있습니다.</p>
<pre><code>// Before — 중복
function firstString(arr: string[]): string { return arr[0] }
function firstNumber(arr: number[]): number { return arr[0] }

// After — Generic
function first&lt;T&gt;(arr: T[]): T { return arr[0] }</code></pre>

<h2>제약 조건 extends</h2>
<pre><code>// T는 반드시 { id: number }를 포함해야 함
function findById&lt;T extends { id: number }&gt;(
  items: T[],
  id: number
): T | undefined {
  return items.find(item => item.id === id)
}</code></pre>
<p>extends로 Generic에 제약을 걸면 T의 특정 프로퍼티에 안전하게 접근할 수 있습니다.</p>

<h2>keyof와 조합</h2>
<pre><code>function pluck&lt;T, K extends keyof T&gt;(
  objects: T[],
  key: K
): T[K][] {
  return objects.map(obj => obj[key])
}

const titles = pluck(posts, 'title')  // string[]
const dates  = pluck(posts, 'date')   // string[]</code></pre>

<h2>유틸리티 타입 만들기</h2>
<pre><code>// 특정 키를 필수로 만드는 타입
type RequireFields&lt;T, K extends keyof T&gt; =
  Omit&lt;T, K&gt; & Required&lt;Pick&lt;T, K&gt;&gt;

// slug와 title은 필수, 나머지는 선택
type PostPreview = RequireFields&lt;Post, 'slug' | 'title'&gt;</code></pre>

<h2>조건부 타입</h2>
<pre><code>type IsArray&lt;T&gt; = T extends any[] ? 'array' : 'not-array'

type A = IsArray&lt;string[]&gt;  // 'array'
type B = IsArray&lt;string&gt;    // 'not-array'</code></pre>
<p>조건부 타입은 타입 레벨의 if-else입니다. 복잡한 타입 변환 로직을 표현할 때 활용됩니다.</p>

<h2>정리</h2>
<p>Generic은 any의 올바른 대안입니다. 타입 안전성을 잃지 않으면서 코드 재사용성을 높이는 핵심 도구입니다. 처음엔 낯설지만, 패턴이 눈에 익으면 타입스크립트의 진짜 힘을 느낄 수 있습니다.</p>
`,
  },
  {
    slug: 'pixel-art-css',
    title: 'CSS로 픽셀 아트 UI 만들기',
    date: '2025.02.20',
    category: 'PIXEL',
    excerpt: 'border-radius 제거와 box-shadow 오프셋만으로 레트로 픽셀 아트 느낌을 내는 CSS 기법을 소개합니다.',
    content: `
<h2>픽셀 아트 UI의 핵심 원칙</h2>
<p>현대 UI에서 픽셀 아트 스타일을 구현하는 건 생각보다 간단합니다. 핵심은 딱 두 가지입니다.</p>
<ol>
  <li><strong>border-radius: 0</strong> — 모든 둥근 모서리를 제거합니다</li>
  <li><strong>blur 없는 box-shadow</strong> — 흐림 없는 단색 오프셋 그림자로 입체감을 줍니다</li>
</ol>

<h2>3D 프레스 버튼</h2>
<pre><code>.pixel-button {
  border-radius: 0;
  border: 1.5px solid #7a1038;
  box-shadow: 3px 3px 0 #7a1038;
  transition: all 0.05s;
}

.pixel-button:hover {
  box-shadow: 2px 2px 0 #7a1038;
  transform: translate(1px, 1px);
}

.pixel-button:active {
  box-shadow: 4px 4px 0 #7a1038;
  transform: translate(-1px, -1px);
}</code></pre>
<p>hover 시 버튼이 아래로 내려가고 그림자가 줄어들어 눌리는 느낌을 줍니다. active 시에는 반대로 튀어오릅니다.</p>

<h2>픽셀 아이콘</h2>
<p>SVG 없이 div 격자로 아이콘을 그릴 수 있습니다.</p>
<pre><code>// 16x16 픽셀 그리드, 각 픽셀은 2.5px 사각형
const pixels = [
  { x: 4, y: 2 }, { x: 5, y: 2 },
  // ...
]

pixels.map(px => (
  &lt;div style={{
    position: 'absolute',
    left: px.x * 2.5,
    top:  px.y * 2.5,
    width: 2.5,
    height: 2.5,
    background: 'white',
    imageRendering: 'pixelated',
  }} /&gt;
))</code></pre>

<h2>image-rendering: pixelated</h2>
<p>픽셀 스프라이트 이미지를 확대할 때 브라우저가 흐릿하게 보간하지 않도록 이 CSS 속성이 필수입니다.</p>
<pre><code>img.sprite {
  image-rendering: pixelated;   /* Chrome, Edge */
  image-rendering: crisp-edges; /* Firefox */
}</code></pre>

<h2>모노스페이스 폰트</h2>
<p>픽셀 아트 UI의 분위기를 완성하는 건 폰트입니다. 고정 폭 모노스페이스 폰트가 레트로 감성을 더합니다.</p>
<pre><code>* {
  font-family: 'Mona', 'Courier New', monospace;
  letter-spacing: 1px;
}</code></pre>

<h2>마치며</h2>
<p>이 블로그 자체가 이 기법으로 만들어졌습니다. 픽셀 아트는 단순하지만, 일관성 있게 적용하면 독특하고 기억에 남는 UI가 됩니다.</p>
`,
  },
  {
    slug: 'design-system-principles',
    title: '좋은 디자인 시스템의 조건',
    date: '2025.02.05',
    category: 'DESIGN',
    excerpt: '디자인 시스템이 오래 살아남으려면 무엇이 필요한가. 토큰, 컴포넌트, 문서화까지 실전에서 배운 원칙들을 정리합니다.',
    content: `
<h2>디자인 시스템이란</h2>
<p>디자인 시스템은 UI를 만드는 데 필요한 모든 것의 집합입니다. 색상, 타이포그래피, 스페이싱 같은 토큰부터 버튼, 카드, 모달 같은 컴포넌트, 그리고 이것들을 사용하는 방법을 설명하는 문서까지 포함됩니다.</p>

<h2>토큰이 먼저다</h2>
<p>컴포넌트를 만들기 전에 토큰을 설계하세요. 컴포넌트는 토큰 위에 서야 합니다. 토큰 없이 만들어진 컴포넌트는 값이 제각각이고, 일관성을 잃습니다.</p>
<ul>
  <li>색상 토큰: <code>--accent</code>, <code>--text</code>, <code>--surface</code></li>
  <li>스페이싱: 4의 배수 체계 (4, 8, 12, 16, 20, 24, 32...)</li>
  <li>타이포그래피: 크기 스케일과 weight 규칙</li>
</ul>

<h2>컴포넌트의 단일 책임</h2>
<p>좋은 컴포넌트는 하나의 일을 잘 합니다. 버튼은 클릭을 처리하고, 카드는 콘텐츠를 담습니다. 컴포넌트가 너무 많은 역할을 하면 재사용이 어려워집니다.</p>

<h2>Variant 설계</h2>
<p>같은 컴포넌트의 다른 모습은 variant로 표현합니다. props를 잔뜩 늘리는 것보다 명확한 variant 이름이 낫습니다.</p>
<pre><code>// 나쁜 예
&lt;Button
  isPrimary
  isLarge
  hasOutline={false}
  darkBackground
/&gt;

// 좋은 예
&lt;Button variant="primary" size="lg" /&gt;</code></pre>

<h2>문서화는 코드만큼 중요하다</h2>
<p>아무도 읽지 않는 디자인 시스템은 존재하지 않는 것과 같습니다. 컴포넌트의 props, 사용 예제, "하지 말아야 할 것"까지 문서화하세요.</p>
<p>이 블로그의 <code>design/</code> 디렉토리가 그 예입니다. 토큰, 레이아웃, 컴포넌트, 모션, 픽셀 아트 규칙을 모두 문서로 남겼습니다.</p>

<h2>진화를 허용하라</h2>
<p>완벽한 디자인 시스템은 처음부터 나오지 않습니다. 사용하면서 불편한 점을 고치고, 필요가 생기면 추가하세요. 단, 변경 시에는 기존 사용처를 모두 확인하고, 하위 호환성을 고려해야 합니다.</p>
`,
  },
]

