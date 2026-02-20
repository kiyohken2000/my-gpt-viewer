#!/usr/bin/env python3
"""
Keep-alive warmup script for gachiai image generation APIs.
Mirrors the Cloudflare Worker (workers/keepalive/src/index.js) behavior.

Usage:
  python warmup.py              # 全モデルにリクエスト
  python warmup.py --dry-run    # リクエスト内容の確認のみ (実際には送信しない)
  python warmup.py --model pony # モデル名の一部でフィルタ

Requirements:
  pip install aiohttp
"""

import asyncio
import aiohttp
import random
import argparse
from datetime import datetime

ZERO_GPU_URLS = [
    'https://mygpt-image-api-omc3n2et7a-an.a.run.app',
    'https://mygpt-image-api-2-omc3n2et7a-uc.a.run.app',
    'https://mygpt-image-api-3-omc3n2et7a-uc.a.run.app',
    'https://mygpt-image-api-4-omc3n2et7a-uc.a.run.app',
    'https://mygpt-image-api-5-omc3n2et7a-uc.a.run.app',
    'https://mygpt-image-api-6-omc3n2et7a-uc.a.run.app',
    'https://mygpt-image-api-7-1024868641007.asia-northeast2.run.app',
    'https://mygpt-image-api-8-1024868641007.asia-northeast3.run.app',
    'https://mygpt-image-api-9-1024868641007.asia-northeast1.run.app',
    'https://mygpt-image-api-10-1024868641007.asia-northeast2.run.app',
    'https://mygpt-image-api-11-1024868641007.asia-northeast3.run.app',
    'https://mygpt-image-api-12-1024868641007.asia-northeast1.run.app',
    'https://mygpt-image-api-13-1024868641007.asia-east1.run.app',
    'https://mygpt-image-api-14-1024868641007.asia-east2.run.app',
    'https://mygpt-image-api-15-1024868641007.asia-northeast1.run.app',
    'https://mygpt-image-api-16-1024868641007.asia-northeast2.run.app',
    'https://mygpt-image-api-17-1024868641007.asia-northeast3.run.app',
    'https://mygpt-image-api-18-1024868641007.asia-east1.run.app',
    'https://mygpt-image-api-19-1024868641007.asia-east2.run.app',
    'https://mygpt-image-api-20-1024868641007.asia-northeast1.run.app',
]

ENABLED_MODELS = [
    { 'modelName': 'votepurchase/votepurchase-animagine-xl-3.1', 'negativePrompt': 'lowres, bad anatomy, bad hands, text, error, missing finger, extra digits, fewer digits, cropped, worst quality, low quality, low score, bad score, average score, signature, watermark, username, blurry' },
    { 'modelName': 'votepurchase/votepurchase-ponyDiffusionV6XL', 'negativePrompt': 'low quality , bad anatomy, bad proportions, extra legs, deformed anatomy, messy color, deformed fingers, bad, distracted, hyperrealistic,source_furry, source_pony, source_cartoon' },
    { 'modelName': 'retwpay/artiwaifuDiffusion_v20', 'negativePrompt': 'nsfw, lowres, (bad), text, error, fewer, extra, missing, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]' },
    { 'modelName': 'votepurchase/votepurchase-waiREALMIX_v70', 'negativePrompt': 'score_6,score_5,score_4, worst quality, low quality, bad anatomy, bad hands, missing fingers, fewer digits, source_furry, source_pony, source_cartoon,3d, blurry,' },
    { 'modelName': 'votepurchase/votepurchase-AnythingXL_xl', 'negativePrompt': 'nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name' },
    { 'modelName': 'votepurchase/votepurchase-waiREALCN_v10', 'negativePrompt': 'score_6,score_5,score_4,bad anatomy, bad hands, missing fingers, fewer digits, source_furry, source_pony, source_cartoon,3d, blurry, ' },
    { 'modelName': 'votepurchase/votepurchase-7thAnimeXLPonyA_v10', 'negativePrompt': 'score_4,score_5,score_6,source_pony,source_furry,monochrome,3d,photo,hyperrealistic,realstic,rough sketch,fewer digits,extra digits,signature,artist name,' },
    { 'modelName': 'retwpay/3x3x3mixxl-v2-sdxl-spo', 'negativePrompt': 'score_6 , score_5 , score_4 , source_furry, source_pony, source_cartoon,' },
    { 'modelName': 'votepurchase/votepurchase-PVCStyleModelMovable_pony151', 'negativePrompt': 'engrish text,low quality,worstquality,shiny_skin,score_4,score_3,score_2,score_1,ugly,bad feet,bad hands,' },
    { 'modelName': 'votepurchase/votepurchase-PVCStyleModelMovable_beta27Realistic', 'negativePrompt': 'lowres,(bad),text,error,fewer,extra,missing,worst quality,jpeg artifacts,low quality,watermark,unfinished,displeasing,oldest,early,chromatic aberration,artistic error,username,english text,scan,[abstract],' },
    { 'modelName': 'votepurchase/votepurchase-juggernautXL_hyper_8step_sfw', 'negativePrompt': 'nsfw, (low quality, worst quality:1.2), very displeasing, 3d, watermark, signature, ugly, poorly drawn' },
    { 'modelName': 'retwpay/retwpay-novaAnimeXL_ilV40HappyValentine', 'negativePrompt': 'modern, recent, old, oldest, cartoon, graphic, text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured, long body, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, very displeasing, (worst quality, bad quality:1.2), bad anatomy, sketch, jpeg artifacts, signature, watermark, username, signature, simple background, conjoined,bad ai-generated' },
    { 'modelName': 'retwpay/waiNSFWIllustrious_v110', 'negativePrompt': 'bad quality,worst quality,worst detail,sketch,censor' },
    { 'modelName': 'retwpay/shiitakeMix_v10', 'negativePrompt': '(bad quality,worst quality,low quality,bad anatomy,bad hand:1.3), nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name,' },
    { 'modelName': 'retwpay/noobreal_v21', 'negativePrompt': 'blur, sketch, comic, cartoon, toon, oil painting \\(medium\\), flat color, outline, 3D, 2.5D, 2D, unreal, unity, blender, anime ,smooth skin,' },
    { 'modelName': 'retwpay/MatureRitual_v04', 'negativePrompt': 'bad quality,worst quality,worst detail,sketch,censor' },
    { 'modelName': 'retwpay/RedcraftCADSUpdatedFeb08_2relustionIL', 'negativePrompt': 'low quality,ugly,deformed,bad anatomy,extra fingers,censored' },
    { 'modelName': 'votepurchase/novaFurryXL_illustriousV7b', 'negativePrompt': 'human, multiple tails, modern, recent, old, oldest, graphic, cartoon, text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured, long body, lowres, bad anatomy, bad hands, missing fingers, extra digits, fewer digits, cropped, very displeasing, (worst quality, bad quality:1.2), bad anatomy, sketch, jpeg artifacts, signature, watermark, username, simple background, conjoined, bad ai-generated' },
    { 'modelName': 'retwpay/pornmasterPro_noobV3VAE', 'negativePrompt': 'lowres, worst aesthetic, bad quality, worst quality, bad anatomy, jpeg artifacts, scan artifacts, lossy-lossless, unfinished, ugly, poorly drawn, greyscale, (illustration, 2d, 2.5D, 3d, painting \\(medium\\), toon \\(style\\), sketch, comic, anime,flat color,outline,smooth skin:1.2) watermark, text, extra digits' },
]

def get_random_endpoint():
    return random.choice(ZERO_GPU_URLS)


MAX_RETRIES = 3


async def warmup_model(session: aiohttp.ClientSession, model: dict) -> dict:
    model_name = model['modelName']
    for attempt in range(1, MAX_RETRIES + 1):
        endpoint = get_random_endpoint()
        try:
            async with session.post(
                endpoint,
                json={
                    'model': model_name,
                    'prompt': 'a girl',
                    'negative_prompt': model['negativePrompt'],
                },
                timeout=aiohttp.ClientTimeout(total=120),
            ) as resp:
                body = await resp.json()
                if 'image' in body:
                    print(f'[OK] {model_name}: {resp.status}  ({endpoint.split("/")[2]})')
                    return {'model': model_name, 'status': resp.status}
                else:
                    reason = body.get('error', 'imageフィールドなし')
                    raise Exception(f'HTTP {resp.status}: {reason}')
        except Exception as e:
            if attempt < MAX_RETRIES:
                print(f'[RETRY {attempt}/{MAX_RETRIES}] {model_name}: {e}')
            else:
                print(f'[ERROR] {model_name}: {e}')
                return {'model': model_name, 'error': str(e)}


async def run(models: list, dry_run: bool):
    print(f'=== Warmup started at {datetime.now().strftime("%Y-%m-%d %H:%M:%S")} ===')
    print(f'対象モデル数: {len(models)}  |  dry-run: {dry_run}\n')

    if dry_run:
        for model in models:
            endpoint = get_random_endpoint()
            print(f'[{model["modelName"]}]')
            print(f'  POST {endpoint}')
            print(f'  body: {{"model": "{model["modelName"]}", "prompt": "a girl", ...}}\n')
        return

    async with aiohttp.ClientSession() as session:
        tasks = [warmup_model(session, m) for m in models]
        results = await asyncio.gather(*tasks)

    ok = sum(1 for r in results if 'error' not in r)
    ng = len(results) - ok
    print(f'\n=== 完了: {ok} 成功 / {ng} 失敗 (計 {len(results)} リクエスト) ===')


def main():
    parser = argparse.ArgumentParser(description='Gachiai API warmup script')
    parser.add_argument('--dry-run', action='store_true', help='送信せずにリクエスト内容を表示')
    parser.add_argument('--model', metavar='KEYWORD', help='モデル名のキーワードでフィルタ (部分一致)')
    args = parser.parse_args()

    models = ENABLED_MODELS
    if args.model:
        models = [m for m in ENABLED_MODELS if args.model.lower() in m['modelName'].lower()]
        if not models:
            print(f'キーワード "{args.model}" に一致するモデルが見つかりません')
            return

    asyncio.run(run(models, dry_run=args.dry_run))


if __name__ == '__main__':
    main()
