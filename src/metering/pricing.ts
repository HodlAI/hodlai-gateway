/**
 * Dynamic Model Pricing Registry (USD per 1M Tokens)
 * Fetched continuously or seeded from OpenRouter API
 * Updated: 2026-02-21T03:39:25.317Z
 */

export const MODEL_PRICES: Record<string, { prompt: number, completion: number }> = {
  "google/gemini-3.1-pro-preview": {
    "prompt": 2,
    "completion": 12
  },
  "anthropic/claude-sonnet-4.6": {
    "prompt": 3,
    "completion": 15
  },
  "qwen/qwen3.5-plus-02-15": {
    "prompt": 0.39999999999999997,
    "completion": 2.4
  },
  "qwen/qwen3.5-397b-a17b": {
    "prompt": 0.15,
    "completion": 1
  },
  "minimax/minimax-m2.5": {
    "prompt": 0.3,
    "completion": 1.1
  },
  "z-ai/glm-5": {
    "prompt": 0.3,
    "completion": 2.5500000000000003
  },
  "qwen/qwen3-max-thinking": {
    "prompt": 1.2,
    "completion": 6
  },
  "anthropic/claude-opus-4.6": {
    "prompt": 5,
    "completion": 25
  },
  "qwen/qwen3-coder-next": {
    "prompt": 0.12,
    "completion": 0.75
  },
  "openrouter/free": {
    "prompt": 0,
    "completion": 0
  },
  "stepfun/step-3.5-flash:free": {
    "prompt": 0,
    "completion": 0
  },
  "stepfun/step-3.5-flash": {
    "prompt": 0.09999999999999999,
    "completion": 0.3
  },
  "arcee-ai/trinity-large-preview:free": {
    "prompt": 0,
    "completion": 0
  },
  "moonshotai/kimi-k2.5": {
    "prompt": 0.22999999999999998,
    "completion": 3
  },
  "upstage/solar-pro-3:free": {
    "prompt": 0,
    "completion": 0
  },
  "minimax/minimax-m2-her": {
    "prompt": 0.3,
    "completion": 1.2
  },
  "writer/palmyra-x5": {
    "prompt": 0.6,
    "completion": 6
  },
  "liquid/lfm-2.5-1.2b-thinking:free": {
    "prompt": 0,
    "completion": 0
  },
  "liquid/lfm-2.5-1.2b-instruct:free": {
    "prompt": 0,
    "completion": 0
  },
  "openai/gpt-audio": {
    "prompt": 2.5,
    "completion": 10
  },
  "openai/gpt-audio-mini": {
    "prompt": 0.6,
    "completion": 2.4
  },
  "z-ai/glm-4.7-flash": {
    "prompt": 0.06,
    "completion": 0.39999999999999997
  },
  "openai/gpt-5.2-codex": {
    "prompt": 1.75,
    "completion": 14
  },
  "allenai/molmo-2-8b": {
    "prompt": 0.19999999999999998,
    "completion": 0.19999999999999998
  },
  "allenai/olmo-3.1-32b-instruct": {
    "prompt": 0.19999999999999998,
    "completion": 0.6
  },
  "bytedance-seed/seed-1.6-flash": {
    "prompt": 0.075,
    "completion": 0.3
  },
  "bytedance-seed/seed-1.6": {
    "prompt": 0.25,
    "completion": 2
  },
  "minimax/minimax-m2.1": {
    "prompt": 0.27,
    "completion": 0.95
  },
  "z-ai/glm-4.7": {
    "prompt": 0.38,
    "completion": 1.7
  },
  "google/gemini-3-flash-preview": {
    "prompt": 0.5,
    "completion": 3
  },
  "mistralai/mistral-small-creative": {
    "prompt": 0.09999999999999999,
    "completion": 0.3
  },
  "allenai/olmo-3.1-32b-think": {
    "prompt": 0.15,
    "completion": 0.5
  },
  "xiaomi/mimo-v2-flash": {
    "prompt": 0.09,
    "completion": 0.29
  },
  "nvidia/nemotron-3-nano-30b-a3b:free": {
    "prompt": 0,
    "completion": 0
  },
  "nvidia/nemotron-3-nano-30b-a3b": {
    "prompt": 0.049999999999999996,
    "completion": 0.19999999999999998
  },
  "openai/gpt-5.2-chat": {
    "prompt": 1.75,
    "completion": 14
  },
  "openai/gpt-5.2-pro": {
    "prompt": 21,
    "completion": 168
  },
  "openai/gpt-5.2": {
    "prompt": 1.75,
    "completion": 14
  },
  "mistralai/devstral-2512": {
    "prompt": 0.39999999999999997,
    "completion": 2
  },
  "relace/relace-search": {
    "prompt": 1,
    "completion": 3
  },
  "z-ai/glm-4.6v": {
    "prompt": 0.3,
    "completion": 0.8999999999999999
  },
  "nex-agi/deepseek-v3.1-nex-n1": {
    "prompt": 0.27,
    "completion": 1
  },
  "essentialai/rnj-1-instruct": {
    "prompt": 0.15,
    "completion": 0.15
  },
  "openrouter/bodybuilder": {
    "prompt": -1000000,
    "completion": -1000000
  },
  "openai/gpt-5.1-codex-max": {
    "prompt": 1.25,
    "completion": 10
  },
  "amazon/nova-2-lite-v1": {
    "prompt": 0.3,
    "completion": 2.5
  },
  "mistralai/ministral-14b-2512": {
    "prompt": 0.19999999999999998,
    "completion": 0.19999999999999998
  },
  "mistralai/ministral-8b-2512": {
    "prompt": 0.15,
    "completion": 0.15
  },
  "mistralai/ministral-3b-2512": {
    "prompt": 0.09999999999999999,
    "completion": 0.09999999999999999
  },
  "mistralai/mistral-large-2512": {
    "prompt": 0.5,
    "completion": 1.5
  },
  "arcee-ai/trinity-mini:free": {
    "prompt": 0,
    "completion": 0
  },
  "arcee-ai/trinity-mini": {
    "prompt": 0.045,
    "completion": 0.15
  },
  "deepseek/deepseek-v3.2-speciale": {
    "prompt": 0.39999999999999997,
    "completion": 1.2
  },
  "deepseek/deepseek-v3.2": {
    "prompt": 0.26,
    "completion": 0.38
  },
  "prime-intellect/intellect-3": {
    "prompt": 0.19999999999999998,
    "completion": 1.1
  },
  "anthropic/claude-opus-4.5": {
    "prompt": 5,
    "completion": 25
  },
  "allenai/olmo-3-32b-think": {
    "prompt": 0.15,
    "completion": 0.5
  },
  "allenai/olmo-3-7b-instruct": {
    "prompt": 0.09999999999999999,
    "completion": 0.19999999999999998
  },
  "allenai/olmo-3-7b-think": {
    "prompt": 0.12,
    "completion": 0.19999999999999998
  },
  "google/gemini-3-pro-image-preview": {
    "prompt": 2,
    "completion": 12
  },
  "x-ai/grok-4.1-fast": {
    "prompt": 0.19999999999999998,
    "completion": 0.5
  },
  "google/gemini-3-pro-preview": {
    "prompt": 2,
    "completion": 12
  },
  "deepcogito/cogito-v2.1-671b": {
    "prompt": 1.25,
    "completion": 1.25
  },
  "openai/gpt-5.1": {
    "prompt": 1.25,
    "completion": 10
  },
  "openai/gpt-5.1-chat": {
    "prompt": 1.25,
    "completion": 10
  },
  "openai/gpt-5.1-codex": {
    "prompt": 1.25,
    "completion": 10
  },
  "openai/gpt-5.1-codex-mini": {
    "prompt": 0.25,
    "completion": 2
  },
  "kwaipilot/kat-coder-pro": {
    "prompt": 0.207,
    "completion": 0.828
  },
  "moonshotai/kimi-k2-thinking": {
    "prompt": 0.47,
    "completion": 2
  },
  "amazon/nova-premier-v1": {
    "prompt": 2.5,
    "completion": 12.5
  },
  "perplexity/sonar-pro-search": {
    "prompt": 3,
    "completion": 15
  },
  "mistralai/voxtral-small-24b-2507": {
    "prompt": 0.09999999999999999,
    "completion": 0.3
  },
  "openai/gpt-oss-safeguard-20b": {
    "prompt": 0.075,
    "completion": 0.3
  },
  "nvidia/nemotron-nano-12b-v2-vl:free": {
    "prompt": 0,
    "completion": 0
  },
  "nvidia/nemotron-nano-12b-v2-vl": {
    "prompt": 0.07,
    "completion": 0.19999999999999998
  },
  "minimax/minimax-m2": {
    "prompt": 0.255,
    "completion": 1
  },
  "qwen/qwen3-vl-32b-instruct": {
    "prompt": 0.10400000000000001,
    "completion": 0.41600000000000004
  },
  "liquid/lfm2-8b-a1b": {
    "prompt": 0.01,
    "completion": 0.02
  },
  "liquid/lfm-2.2-6b": {
    "prompt": 0.01,
    "completion": 0.02
  },
  "ibm-granite/granite-4.0-h-micro": {
    "prompt": 0.017,
    "completion": 0.11
  },
  "openai/gpt-5-image-mini": {
    "prompt": 2.5,
    "completion": 2
  },
  "anthropic/claude-haiku-4.5": {
    "prompt": 1,
    "completion": 5
  },
  "qwen/qwen3-vl-8b-thinking": {
    "prompt": 0.117,
    "completion": 1.365
  },
  "qwen/qwen3-vl-8b-instruct": {
    "prompt": 0.08,
    "completion": 0.5
  },
  "openai/gpt-5-image": {
    "prompt": 10,
    "completion": 10
  },
  "openai/o3-deep-research": {
    "prompt": 10,
    "completion": 40
  },
  "openai/o4-mini-deep-research": {
    "prompt": 2,
    "completion": 8
  },
  "nvidia/llama-3.3-nemotron-super-49b-v1.5": {
    "prompt": 0.09999999999999999,
    "completion": 0.39999999999999997
  },
  "baidu/ernie-4.5-21b-a3b-thinking": {
    "prompt": 0.07,
    "completion": 0.28
  },
  "google/gemini-2.5-flash-image": {
    "prompt": 0.3,
    "completion": 2.5
  },
  "qwen/qwen3-vl-30b-a3b-thinking": {
    "prompt": 0,
    "completion": 0
  },
  "qwen/qwen3-vl-30b-a3b-instruct": {
    "prompt": 0.13,
    "completion": 0.52
  },
  "openai/gpt-5-pro": {
    "prompt": 15,
    "completion": 120
  },
  "z-ai/glm-4.6": {
    "prompt": 0.35,
    "completion": 1.71
  },
  "z-ai/glm-4.6:exacto": {
    "prompt": 0.44,
    "completion": 1.76
  },
  "anthropic/claude-sonnet-4.5": {
    "prompt": 3,
    "completion": 15
  },
  "deepseek/deepseek-v3.2-exp": {
    "prompt": 0.27,
    "completion": 0.41
  },
  "thedrummer/cydonia-24b-v4.1": {
    "prompt": 0.3,
    "completion": 0.5
  },
  "relace/relace-apply-3": {
    "prompt": 0.85,
    "completion": 1.25
  },
  "google/gemini-2.5-flash-lite-preview-09-2025": {
    "prompt": 0.09999999999999999,
    "completion": 0.39999999999999997
  },
  "qwen/qwen3-vl-235b-a22b-thinking": {
    "prompt": 0,
    "completion": 0
  },
  "qwen/qwen3-vl-235b-a22b-instruct": {
    "prompt": 0.19999999999999998,
    "completion": 0.88
  },
  "qwen/qwen3-max": {
    "prompt": 1.2,
    "completion": 6
  },
  "qwen/qwen3-coder-plus": {
    "prompt": 1,
    "completion": 5
  },
  "openai/gpt-5-codex": {
    "prompt": 1.25,
    "completion": 10
  },
  "deepseek/deepseek-v3.1-terminus:exacto": {
    "prompt": 0.21,
    "completion": 0.7899999999999999
  },
  "deepseek/deepseek-v3.1-terminus": {
    "prompt": 0.21,
    "completion": 0.7899999999999999
  },
  "x-ai/grok-4-fast": {
    "prompt": 0.19999999999999998,
    "completion": 0.5
  },
  "alibaba/tongyi-deepresearch-30b-a3b": {
    "prompt": 0.09,
    "completion": 0.44999999999999996
  },
  "qwen/qwen3-coder-flash": {
    "prompt": 0.3,
    "completion": 1.5
  },
  "opengvlab/internvl3-78b": {
    "prompt": 0.15,
    "completion": 0.6
  },
  "qwen/qwen3-next-80b-a3b-thinking": {
    "prompt": 0.15,
    "completion": 1.2
  },
  "qwen/qwen3-next-80b-a3b-instruct:free": {
    "prompt": 0,
    "completion": 0
  },
  "qwen/qwen3-next-80b-a3b-instruct": {
    "prompt": 0.09,
    "completion": 1.1
  },
  "meituan/longcat-flash-chat": {
    "prompt": 0.19999999999999998,
    "completion": 0.7999999999999999
  },
  "qwen/qwen-plus-2025-07-28": {
    "prompt": 0.39999999999999997,
    "completion": 1.2
  },
  "qwen/qwen-plus-2025-07-28:thinking": {
    "prompt": 0.39999999999999997,
    "completion": 1.2
  },
  "nvidia/nemotron-nano-9b-v2:free": {
    "prompt": 0,
    "completion": 0
  },
  "nvidia/nemotron-nano-9b-v2": {
    "prompt": 0.04,
    "completion": 0.16
  },
  "moonshotai/kimi-k2-0905": {
    "prompt": 0.39999999999999997,
    "completion": 2
  },
  "moonshotai/kimi-k2-0905:exacto": {
    "prompt": 0.6,
    "completion": 2.5
  },
  "qwen/qwen3-30b-a3b-thinking-2507": {
    "prompt": 0.051,
    "completion": 0.33999999999999997
  },
  "x-ai/grok-code-fast-1": {
    "prompt": 0.19999999999999998,
    "completion": 1.5
  },
  "nousresearch/hermes-4-70b": {
    "prompt": 0.13,
    "completion": 0.39999999999999997
  },
  "nousresearch/hermes-4-405b": {
    "prompt": 1,
    "completion": 3
  },
  "deepseek/deepseek-chat-v3.1": {
    "prompt": 0.15,
    "completion": 0.75
  },
  "openai/gpt-4o-audio-preview": {
    "prompt": 2.5,
    "completion": 10
  },
  "mistralai/mistral-medium-3.1": {
    "prompt": 0.39999999999999997,
    "completion": 2
  },
  "baidu/ernie-4.5-21b-a3b": {
    "prompt": 0.07,
    "completion": 0.28
  },
  "baidu/ernie-4.5-vl-28b-a3b": {
    "prompt": 0.14,
    "completion": 0.56
  },
  "z-ai/glm-4.5v": {
    "prompt": 0.6,
    "completion": 1.7999999999999998
  },
  "ai21/jamba-large-1.7": {
    "prompt": 2,
    "completion": 8
  },
  "openai/gpt-5-chat": {
    "prompt": 1.25,
    "completion": 10
  },
  "openai/gpt-5": {
    "prompt": 1.25,
    "completion": 10
  },
  "openai/gpt-5-mini": {
    "prompt": 0.25,
    "completion": 2
  },
  "openai/gpt-5-nano": {
    "prompt": 0.049999999999999996,
    "completion": 0.39999999999999997
  },
  "openai/gpt-oss-120b:free": {
    "prompt": 0,
    "completion": 0
  },
  "openai/gpt-oss-120b": {
    "prompt": 0.039,
    "completion": 0.19
  },
  "openai/gpt-oss-120b:exacto": {
    "prompt": 0.039,
    "completion": 0.19
  },
  "openai/gpt-oss-20b:free": {
    "prompt": 0,
    "completion": 0
  },
  "openai/gpt-oss-20b": {
    "prompt": 0.03,
    "completion": 0.14
  },
  "anthropic/claude-opus-4.1": {
    "prompt": 15,
    "completion": 75
  },
  "mistralai/codestral-2508": {
    "prompt": 0.3,
    "completion": 0.8999999999999999
  },
  "qwen/qwen3-coder-30b-a3b-instruct": {
    "prompt": 0.07,
    "completion": 0.27
  },
  "qwen/qwen3-30b-a3b-instruct-2507": {
    "prompt": 0.09,
    "completion": 0.3
  },
  "z-ai/glm-4.5": {
    "prompt": 0.55,
    "completion": 2
  },
  "z-ai/glm-4.5-air:free": {
    "prompt": 0,
    "completion": 0
  },
  "z-ai/glm-4.5-air": {
    "prompt": 0.13,
    "completion": 0.85
  },
  "qwen/qwen3-235b-a22b-thinking-2507": {
    "prompt": 0,
    "completion": 0
  },
  "z-ai/glm-4-32b": {
    "prompt": 0.09999999999999999,
    "completion": 0.09999999999999999
  },
  "qwen/qwen3-coder:free": {
    "prompt": 0,
    "completion": 0
  },
  "qwen/qwen3-coder": {
    "prompt": 0.22,
    "completion": 1
  },
  "qwen/qwen3-coder:exacto": {
    "prompt": 0.22,
    "completion": 1.7999999999999998
  },
  "bytedance/ui-tars-1.5-7b": {
    "prompt": 0.09999999999999999,
    "completion": 0.19999999999999998
  },
  "google/gemini-2.5-flash-lite": {
    "prompt": 0.09999999999999999,
    "completion": 0.39999999999999997
  },
  "qwen/qwen3-235b-a22b-2507": {
    "prompt": 0.071,
    "completion": 0.09999999999999999
  },
  "switchpoint/router": {
    "prompt": 0.85,
    "completion": 3.4
  },
  "moonshotai/kimi-k2": {
    "prompt": 0.5,
    "completion": 2.4
  },
  "mistralai/devstral-medium": {
    "prompt": 0.39999999999999997,
    "completion": 2
  },
  "mistralai/devstral-small": {
    "prompt": 0.09999999999999999,
    "completion": 0.3
  },
  "cognitivecomputations/dolphin-mistral-24b-venice-edition:free": {
    "prompt": 0,
    "completion": 0
  },
  "x-ai/grok-4": {
    "prompt": 3,
    "completion": 15
  },
  "google/gemma-3n-e2b-it:free": {
    "prompt": 0,
    "completion": 0
  },
  "tencent/hunyuan-a13b-instruct": {
    "prompt": 0.14,
    "completion": 0.5700000000000001
  },
  "tngtech/deepseek-r1t2-chimera": {
    "prompt": 0.25,
    "completion": 0.85
  },
  "morph/morph-v3-large": {
    "prompt": 0.8999999999999999,
    "completion": 1.9
  },
  "morph/morph-v3-fast": {
    "prompt": 0.7999999999999999,
    "completion": 1.2
  },
  "baidu/ernie-4.5-vl-424b-a47b": {
    "prompt": 0.42,
    "completion": 1.25
  },
  "baidu/ernie-4.5-300b-a47b": {
    "prompt": 0.28,
    "completion": 1.1
  },
  "inception/mercury": {
    "prompt": 0.25,
    "completion": 1
  },
  "mistralai/mistral-small-3.2-24b-instruct": {
    "prompt": 0.06,
    "completion": 0.18
  },
  "minimax/minimax-m1": {
    "prompt": 0.39999999999999997,
    "completion": 2.2
  },
  "google/gemini-2.5-flash": {
    "prompt": 0.3,
    "completion": 2.5
  },
  "google/gemini-2.5-pro": {
    "prompt": 1.25,
    "completion": 10
  },
  "openai/o3-pro": {
    "prompt": 20,
    "completion": 80
  },
  "x-ai/grok-3-mini": {
    "prompt": 0.3,
    "completion": 0.5
  },
  "x-ai/grok-3": {
    "prompt": 3,
    "completion": 15
  },
  "google/gemini-2.5-pro-preview": {
    "prompt": 1.25,
    "completion": 10
  },
  "deepseek/deepseek-r1-0528:free": {
    "prompt": 0,
    "completion": 0
  },
  "deepseek/deepseek-r1-0528": {
    "prompt": 0.39999999999999997,
    "completion": 1.75
  },
  "anthropic/claude-opus-4": {
    "prompt": 15,
    "completion": 75
  },
  "anthropic/claude-sonnet-4": {
    "prompt": 3,
    "completion": 15
  },
  "google/gemma-3n-e4b-it:free": {
    "prompt": 0,
    "completion": 0
  },
  "google/gemma-3n-e4b-it": {
    "prompt": 0.02,
    "completion": 0.04
  },
  "mistralai/mistral-medium-3": {
    "prompt": 0.39999999999999997,
    "completion": 2
  },
  "google/gemini-2.5-pro-preview-05-06": {
    "prompt": 1.25,
    "completion": 10
  },
  "arcee-ai/spotlight": {
    "prompt": 0.18,
    "completion": 0.18
  },
  "arcee-ai/maestro-reasoning": {
    "prompt": 0.8999999999999999,
    "completion": 3.3000000000000003
  },
  "arcee-ai/virtuoso-large": {
    "prompt": 0.75,
    "completion": 1.2
  },
  "arcee-ai/coder-large": {
    "prompt": 0.5,
    "completion": 0.7999999999999999
  },
  "inception/mercury-coder": {
    "prompt": 0.25,
    "completion": 1
  },
  "qwen/qwen3-4b:free": {
    "prompt": 0,
    "completion": 0
  },
  "meta-llama/llama-guard-4-12b": {
    "prompt": 0.18,
    "completion": 0.18
  },
  "qwen/qwen3-30b-a3b": {
    "prompt": 0.08,
    "completion": 0.28
  },
  "qwen/qwen3-8b": {
    "prompt": 0.049999999999999996,
    "completion": 0.39999999999999997
  },
  "qwen/qwen3-14b": {
    "prompt": 0.06,
    "completion": 0.24
  },
  "qwen/qwen3-32b": {
    "prompt": 0.08,
    "completion": 0.24
  },
  "qwen/qwen3-235b-a22b": {
    "prompt": 0.45499999999999996,
    "completion": 1.8199999999999998
  },
  "openai/o4-mini-high": {
    "prompt": 1.1,
    "completion": 4.4
  },
  "openai/o3": {
    "prompt": 2,
    "completion": 8
  },
  "openai/o4-mini": {
    "prompt": 1.1,
    "completion": 4.4
  },
  "qwen/qwen2.5-coder-7b-instruct": {
    "prompt": 0.03,
    "completion": 0.09
  },
  "openai/gpt-4.1": {
    "prompt": 2,
    "completion": 8
  },
  "openai/gpt-4.1-mini": {
    "prompt": 0.39999999999999997,
    "completion": 1.5999999999999999
  },
  "openai/gpt-4.1-nano": {
    "prompt": 0.09999999999999999,
    "completion": 0.39999999999999997
  },
  "eleutherai/llemma_7b": {
    "prompt": 0.7999999999999999,
    "completion": 1.2
  },
  "alfredpros/codellama-7b-instruct-solidity": {
    "prompt": 0.7999999999999999,
    "completion": 1.2
  },
  "x-ai/grok-3-mini-beta": {
    "prompt": 0.3,
    "completion": 0.5
  },
  "x-ai/grok-3-beta": {
    "prompt": 3,
    "completion": 15
  },
  "nvidia/llama-3.1-nemotron-ultra-253b-v1": {
    "prompt": 0.6,
    "completion": 1.7999999999999998
  },
  "meta-llama/llama-4-maverick": {
    "prompt": 0.15,
    "completion": 0.6
  },
  "meta-llama/llama-4-scout": {
    "prompt": 0.08,
    "completion": 0.3
  },
  "qwen/qwen2.5-vl-32b-instruct": {
    "prompt": 0.19999999999999998,
    "completion": 0.6
  },
  "deepseek/deepseek-chat-v3-0324": {
    "prompt": 0.19,
    "completion": 0.87
  },
  "openai/o1-pro": {
    "prompt": 150,
    "completion": 600
  },
  "mistralai/mistral-small-3.1-24b-instruct:free": {
    "prompt": 0,
    "completion": 0
  },
  "mistralai/mistral-small-3.1-24b-instruct": {
    "prompt": 0.35,
    "completion": 0.56
  },
  "allenai/olmo-2-0325-32b-instruct": {
    "prompt": 0.049999999999999996,
    "completion": 0.19999999999999998
  },
  "google/gemma-3-4b-it:free": {
    "prompt": 0,
    "completion": 0
  },
  "google/gemma-3-4b-it": {
    "prompt": 0.04,
    "completion": 0.08
  },
  "google/gemma-3-12b-it:free": {
    "prompt": 0,
    "completion": 0
  },
  "google/gemma-3-12b-it": {
    "prompt": 0.04,
    "completion": 0.13
  },
  "cohere/command-a": {
    "prompt": 2.5,
    "completion": 10
  },
  "openai/gpt-4o-mini-search-preview": {
    "prompt": 0.15,
    "completion": 0.6
  },
  "openai/gpt-4o-search-preview": {
    "prompt": 2.5,
    "completion": 10
  },
  "google/gemma-3-27b-it:free": {
    "prompt": 0,
    "completion": 0
  },
  "google/gemma-3-27b-it": {
    "prompt": 0.04,
    "completion": 0.15
  },
  "thedrummer/skyfall-36b-v2": {
    "prompt": 0.55,
    "completion": 0.7999999999999999
  },
  "perplexity/sonar-reasoning-pro": {
    "prompt": 2,
    "completion": 8
  },
  "perplexity/sonar-pro": {
    "prompt": 3,
    "completion": 15
  },
  "perplexity/sonar-deep-research": {
    "prompt": 2,
    "completion": 8
  },
  "qwen/qwq-32b": {
    "prompt": 0.15,
    "completion": 0.39999999999999997
  },
  "google/gemini-2.0-flash-lite-001": {
    "prompt": 0.075,
    "completion": 0.3
  },
  "anthropic/claude-3.7-sonnet": {
    "prompt": 3,
    "completion": 15
  },
  "anthropic/claude-3.7-sonnet:thinking": {
    "prompt": 3,
    "completion": 15
  },
  "mistralai/mistral-saba": {
    "prompt": 0.19999999999999998,
    "completion": 0.6
  },
  "meta-llama/llama-guard-3-8b": {
    "prompt": 0.02,
    "completion": 0.06
  },
  "openai/o3-mini-high": {
    "prompt": 1.1,
    "completion": 4.4
  },
  "google/gemini-2.0-flash-001": {
    "prompt": 0.09999999999999999,
    "completion": 0.39999999999999997
  },
  "qwen/qwen-vl-plus": {
    "prompt": 0.21,
    "completion": 0.63
  },
  "aion-labs/aion-1.0": {
    "prompt": 4,
    "completion": 8
  },
  "aion-labs/aion-1.0-mini": {
    "prompt": 0.7,
    "completion": 1.4
  },
  "aion-labs/aion-rp-llama-3.1-8b": {
    "prompt": 0.7999999999999999,
    "completion": 1.5999999999999999
  },
  "qwen/qwen-vl-max": {
    "prompt": 0.7999999999999999,
    "completion": 3.1999999999999997
  },
  "qwen/qwen-turbo": {
    "prompt": 0.049999999999999996,
    "completion": 0.19999999999999998
  },
  "qwen/qwen2.5-vl-72b-instruct": {
    "prompt": 0.25,
    "completion": 0.75
  },
  "qwen/qwen-plus": {
    "prompt": 0.39999999999999997,
    "completion": 1.2
  },
  "qwen/qwen-max": {
    "prompt": 1.5999999999999999,
    "completion": 6.3999999999999995
  },
  "openai/o3-mini": {
    "prompt": 1.1,
    "completion": 4.4
  },
  "mistralai/mistral-small-24b-instruct-2501": {
    "prompt": 0.049999999999999996,
    "completion": 0.08
  },
  "deepseek/deepseek-r1-distill-qwen-32b": {
    "prompt": 0.29,
    "completion": 0.29
  },
  "perplexity/sonar": {
    "prompt": 1,
    "completion": 1
  },
  "deepseek/deepseek-r1-distill-llama-70b": {
    "prompt": 0.7,
    "completion": 0.7999999999999999
  },
  "deepseek/deepseek-r1": {
    "prompt": 0.7,
    "completion": 2.5
  },
  "minimax/minimax-01": {
    "prompt": 0.19999999999999998,
    "completion": 1.1
  },
  "microsoft/phi-4": {
    "prompt": 0.06,
    "completion": 0.14
  },
  "sao10k/l3.1-70b-hanami-x1": {
    "prompt": 3,
    "completion": 3
  },
  "deepseek/deepseek-chat": {
    "prompt": 0.32,
    "completion": 0.8899999999999999
  },
  "sao10k/l3.3-euryale-70b": {
    "prompt": 0.65,
    "completion": 0.75
  },
  "openai/o1": {
    "prompt": 15,
    "completion": 60
  },
  "cohere/command-r7b-12-2024": {
    "prompt": 0.0375,
    "completion": 0.15
  },
  "meta-llama/llama-3.3-70b-instruct:free": {
    "prompt": 0,
    "completion": 0
  },
  "meta-llama/llama-3.3-70b-instruct": {
    "prompt": 0.09999999999999999,
    "completion": 0.32
  },
  "amazon/nova-lite-v1": {
    "prompt": 0.06,
    "completion": 0.24
  },
  "amazon/nova-micro-v1": {
    "prompt": 0.035,
    "completion": 0.14
  },
  "amazon/nova-pro-v1": {
    "prompt": 0.7999999999999999,
    "completion": 3.1999999999999997
  },
  "openai/gpt-4o-2024-11-20": {
    "prompt": 2.5,
    "completion": 10
  },
  "mistralai/mistral-large-2411": {
    "prompt": 2,
    "completion": 6
  },
  "mistralai/mistral-large-2407": {
    "prompt": 2,
    "completion": 6
  },
  "mistralai/pixtral-large-2411": {
    "prompt": 2,
    "completion": 6
  },
  "qwen/qwen-2.5-coder-32b-instruct": {
    "prompt": 0.19999999999999998,
    "completion": 0.19999999999999998
  },
  "raifle/sorcererlm-8x22b": {
    "prompt": 4.5,
    "completion": 4.5
  },
  "thedrummer/unslopnemo-12b": {
    "prompt": 0.39999999999999997,
    "completion": 0.39999999999999997
  },
  "anthropic/claude-3.5-haiku": {
    "prompt": 0.7999999999999999,
    "completion": 4
  },
  "anthracite-org/magnum-v4-72b": {
    "prompt": 3,
    "completion": 5
  },
  "anthropic/claude-3.5-sonnet": {
    "prompt": 6,
    "completion": 30
  },
  "qwen/qwen-2.5-7b-instruct": {
    "prompt": 0.04,
    "completion": 0.09999999999999999
  },
  "nvidia/llama-3.1-nemotron-70b-instruct": {
    "prompt": 1.2,
    "completion": 1.2
  },
  "inflection/inflection-3-pi": {
    "prompt": 2.5,
    "completion": 10
  },
  "inflection/inflection-3-productivity": {
    "prompt": 2.5,
    "completion": 10
  },
  "thedrummer/rocinante-12b": {
    "prompt": 0.16999999999999998,
    "completion": 0.43
  },
  "meta-llama/llama-3.2-3b-instruct:free": {
    "prompt": 0,
    "completion": 0
  },
  "meta-llama/llama-3.2-3b-instruct": {
    "prompt": 0.02,
    "completion": 0.02
  },
  "meta-llama/llama-3.2-1b-instruct": {
    "prompt": 0.027,
    "completion": 0.19999999999999998
  },
  "meta-llama/llama-3.2-11b-vision-instruct": {
    "prompt": 0.049,
    "completion": 0.049
  },
  "qwen/qwen-2.5-72b-instruct": {
    "prompt": 0.12,
    "completion": 0.39
  },
  "neversleep/llama-3.1-lumimaid-8b": {
    "prompt": 0.09,
    "completion": 0.6
  },
  "cohere/command-r-08-2024": {
    "prompt": 0.15,
    "completion": 0.6
  },
  "cohere/command-r-plus-08-2024": {
    "prompt": 2.5,
    "completion": 10
  },
  "sao10k/l3.1-euryale-70b": {
    "prompt": 0.65,
    "completion": 0.75
  },
  "qwen/qwen-2.5-vl-7b-instruct": {
    "prompt": 0.19999999999999998,
    "completion": 0.19999999999999998
  },
  "nousresearch/hermes-3-llama-3.1-70b": {
    "prompt": 0.3,
    "completion": 0.3
  },
  "nousresearch/hermes-3-llama-3.1-405b:free": {
    "prompt": 0,
    "completion": 0
  },
  "nousresearch/hermes-3-llama-3.1-405b": {
    "prompt": 1,
    "completion": 1
  },
  "sao10k/l3-lunaris-8b": {
    "prompt": 0.04,
    "completion": 0.049999999999999996
  },
  "openai/gpt-4o-2024-08-06": {
    "prompt": 2.5,
    "completion": 10
  },
  "meta-llama/llama-3.1-405b": {
    "prompt": 4,
    "completion": 4
  },
  "meta-llama/llama-3.1-8b-instruct": {
    "prompt": 0.02,
    "completion": 0.049999999999999996
  },
  "meta-llama/llama-3.1-405b-instruct": {
    "prompt": 4,
    "completion": 4
  },
  "meta-llama/llama-3.1-70b-instruct": {
    "prompt": 0.39999999999999997,
    "completion": 0.39999999999999997
  },
  "mistralai/mistral-nemo": {
    "prompt": 0.02,
    "completion": 0.04
  },
  "openai/gpt-4o-mini-2024-07-18": {
    "prompt": 0.15,
    "completion": 0.6
  },
  "openai/gpt-4o-mini": {
    "prompt": 0.15,
    "completion": 0.6
  },
  "google/gemma-2-27b-it": {
    "prompt": 0.65,
    "completion": 0.65
  },
  "google/gemma-2-9b-it": {
    "prompt": 0.03,
    "completion": 0.09
  },
  "sao10k/l3-euryale-70b": {
    "prompt": 1.48,
    "completion": 1.48
  },
  "nousresearch/hermes-2-pro-llama-3-8b": {
    "prompt": 0.14,
    "completion": 0.14
  },
  "mistralai/mistral-7b-instruct": {
    "prompt": 0.19999999999999998,
    "completion": 0.19999999999999998
  },
  "mistralai/mistral-7b-instruct-v0.3": {
    "prompt": 0.19999999999999998,
    "completion": 0.19999999999999998
  },
  "meta-llama/llama-guard-2-8b": {
    "prompt": 0.19999999999999998,
    "completion": 0.19999999999999998
  },
  "openai/gpt-4o-2024-05-13": {
    "prompt": 5,
    "completion": 15
  },
  "openai/gpt-4o": {
    "prompt": 2.5,
    "completion": 10
  },
  "openai/gpt-4o:extended": {
    "prompt": 6,
    "completion": 18
  },
  "meta-llama/llama-3-70b-instruct": {
    "prompt": 0.51,
    "completion": 0.74
  },
  "meta-llama/llama-3-8b-instruct": {
    "prompt": 0.03,
    "completion": 0.04
  },
  "mistralai/mixtral-8x22b-instruct": {
    "prompt": 2,
    "completion": 6
  },
  "microsoft/wizardlm-2-8x22b": {
    "prompt": 0.62,
    "completion": 0.62
  },
  "openai/gpt-4-turbo": {
    "prompt": 10,
    "completion": 30
  },
  "anthropic/claude-3-haiku": {
    "prompt": 0.25,
    "completion": 1.25
  },
  "mistralai/mistral-large": {
    "prompt": 2,
    "completion": 6
  },
  "openai/gpt-3.5-turbo-0613": {
    "prompt": 1,
    "completion": 2
  },
  "openai/gpt-4-turbo-preview": {
    "prompt": 10,
    "completion": 30
  },
  "mistralai/mistral-7b-instruct-v0.2": {
    "prompt": 0.19999999999999998,
    "completion": 0.19999999999999998
  },
  "mistralai/mixtral-8x7b-instruct": {
    "prompt": 0.54,
    "completion": 0.54
  },
  "neversleep/noromaid-20b": {
    "prompt": 1,
    "completion": 1.75
  },
  "alpindale/goliath-120b": {
    "prompt": 3.75,
    "completion": 7.5
  },
  "openrouter/auto": {
    "prompt": -1000000,
    "completion": -1000000
  },
  "openai/gpt-4-1106-preview": {
    "prompt": 10,
    "completion": 30
  },
  "openai/gpt-3.5-turbo-instruct": {
    "prompt": 1.5,
    "completion": 2
  },
  "mistralai/mistral-7b-instruct-v0.1": {
    "prompt": 0.11,
    "completion": 0.19
  },
  "openai/gpt-3.5-turbo-16k": {
    "prompt": 3,
    "completion": 4
  },
  "mancer/weaver": {
    "prompt": 0.75,
    "completion": 1
  },
  "undi95/remm-slerp-l2-13b": {
    "prompt": 0.44999999999999996,
    "completion": 0.65
  },
  "gryphe/mythomax-l2-13b": {
    "prompt": 0.06,
    "completion": 0.06
  },
  "openai/gpt-4-0314": {
    "prompt": 30,
    "completion": 60
  },
  "openai/gpt-4": {
    "prompt": 30,
    "completion": 60
  },
  "openai/gpt-3.5-turbo": {
    "prompt": 0.5,
    "completion": 1.5
  },
  "gpt-5.2": {
    "prompt": 2.5,
    "completion": 10
  },
  "gpt-4.1-mini": {
    "prompt": 0.15,
    "completion": 0.6
  },
  "gpt-4.1": {
    "prompt": 2.5,
    "completion": 10
  }
};

export class CostCalculator {
  /**
   * Calculate exact cost for a request
   */
  static estimate(model: string, inputTokens: number, outputTokens: number): number {
    let pricing = MODEL_PRICES[model];
    
    // Auto-fallback mapping for raw model names to "provider/model" format if they forget the prefix
    if (!pricing) {
        // Try guessing OpenAI prefix
        pricing = MODEL_PRICES['openai/' + model];
    }
    if (!pricing) {
        // Try guessing Anthropic prefix
        pricing = MODEL_PRICES['anthropic/' + model];
    }
    if (!pricing) {
        // Try guessing Google prefix
        pricing = MODEL_PRICES['google/' + model];
    }
    if (!pricing) {
        // Try guessing DeepSeek prefix
        pricing = MODEL_PRICES['deepseek/' + model];
    }

    if (!pricing) {
      console.warn(`[Cost] Unknown model: ${model}, using fallback (gpt-4o-mini rates)`);
      return (inputTokens * 0.15 + outputTokens * 0.60) / 1_000_000;
    }

    const inputCost = (inputTokens / 1_000_000) * pricing.prompt;
    const outputCost = (outputTokens / 1_000_000) * pricing.completion;
    
    // Return cost in USD (with 8 decimals precision for micro-transactions)
    return parseFloat((inputCost + outputCost).toFixed(8));
  }
}
