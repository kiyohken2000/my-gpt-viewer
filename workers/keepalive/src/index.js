const zeroGPUUrls = [
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
];

// enable: true のモデル
const enabledModels = [
  { modelName: 'votepurchase/votepurchase-animagine-xl-3.1', negativePrompt: 'lowres, bad anatomy, bad hands, text, error, missing finger, extra digits, fewer digits, cropped, worst quality, low quality, low score, bad score, average score, signature, watermark, username, blurry' },
  { modelName: 'votepurchase/votepurchase-ponyDiffusionV6XL', negativePrompt: 'low quality , bad anatomy, bad proportions, extra legs, deformed anatomy, messy color, deformed fingers, bad, distracted, hyperrealistic,source_furry, source_pony, source_cartoon' },
  { modelName: 'retwpay/artiwaifuDiffusion_v20', negativePrompt: 'nsfw, lowres, (bad), text, error, fewer, extra, missing, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]' },
  { modelName: 'votepurchase/votepurchase-waiREALMIX_v70', negativePrompt: 'score_6,score_5,score_4, worst quality, low quality, bad anatomy, bad hands, missing fingers, fewer digits, source_furry, source_pony, source_cartoon,3d, blurry,' },
  { modelName: 'votepurchase/votepurchase-AnythingXL_xl', negativePrompt: 'nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name' },
  { modelName: 'votepurchase/votepurchase-waiREALCN_v10', negativePrompt: 'score_6,score_5,score_4,bad anatomy, bad hands, missing fingers, fewer digits, source_furry, source_pony, source_cartoon,3d, blurry, ' },
  { modelName: 'votepurchase/votepurchase-7thAnimeXLPonyA_v10', negativePrompt: 'score_4,score_5,score_6,source_pony,source_furry,monochrome,3d,photo,hyperrealistic,realstic,rough sketch,fewer digits,extra digits,signature,artist name,' },
  { modelName: 'retwpay/3x3x3mixxl-v2-sdxl-spo', negativePrompt: 'score_6 , score_5 , score_4 , source_furry, source_pony, source_cartoon,' },
  { modelName: 'votepurchase/votepurchase-PVCStyleModelMovable_pony151', negativePrompt: 'engrish text,low quality,worstquality,shiny_skin,score_4,score_3,score_2,score_1,ugly,bad feet,bad hands,' },
  { modelName: 'votepurchase/votepurchase-PVCStyleModelMovable_beta27Realistic', negativePrompt: 'lowres,(bad),text,error,fewer,extra,missing,worst quality,jpeg artifacts,low quality,watermark,unfinished,displeasing,oldest,early,chromatic aberration,artistic error,username,english text,scan,[abstract],' },
  { modelName: 'votepurchase/votepurchase-juggernautXL_hyper_8step_sfw', negativePrompt: 'nsfw, (low quality, worst quality:1.2), very displeasing, 3d, watermark, signature, ugly, poorly drawn' },
  { modelName: 'retwpay/retwpay-novaAnimeXL_ilV40HappyValentine', negativePrompt: 'modern, recent, old, oldest, cartoon, graphic, text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured, long body, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, very displeasing, (worst quality, bad quality:1.2), bad anatomy, sketch, jpeg artifacts, signature, watermark, username, signature, simple background, conjoined,bad ai-generated' },
  { modelName: 'retwpay/waiNSFWIllustrious_v110', negativePrompt: 'bad quality,worst quality,worst detail,sketch,censor' },
  { modelName: 'retwpay/shiitakeMix_v10', negativePrompt: '(bad quality,worst quality,low quality,bad anatomy,bad hand:1.3), nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name,' },
  { modelName: 'retwpay/noobreal_v21', negativePrompt: 'blur, sketch, comic, cartoon, toon, oil painting \\(medium\\), flat color, outline, 3D, 2.5D, 2D, unreal, unity, blender, anime ,smooth skin,' },
  { modelName: 'retwpay/MatureRitual_v04', negativePrompt: 'bad quality,worst quality,worst detail,sketch,censor' },
  { modelName: 'retwpay/RedcraftCADSUpdatedFeb08_2relustionIL', negativePrompt: 'low quality,ugly,deformed,bad anatomy,extra fingers,censored' },
  { modelName: 'votepurchase/novaFurryXL_illustriousV7b', negativePrompt: 'human, multiple tails, modern, recent, old, oldest, graphic, cartoon, text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured, long body, lowres, bad anatomy, bad hands, missing fingers, extra digits, fewer digits, cropped, very displeasing, (worst quality, bad quality:1.2), bad anatomy, sketch, jpeg artifacts, signature, watermark, username, simple background, conjoined, bad ai-generated' },
  { modelName: 'retwpay/pornmasterPro_noobV3VAE', negativePrompt: 'lowres, worst aesthetic, bad quality, worst quality, bad anatomy, jpeg artifacts, scan artifacts, lossy-lossless, unfinished, ugly, poorly drawn, greyscale, (illustration, 2d, 2.5D, 3d, painting \\(medium\\), toon \\(style\\), sketch, comic, anime,flat color,outline,smooth skin:1.2) watermark, text, extra digits' },
];

function getRandomEndpoint() {
  return zeroGPUUrls[Math.floor(Math.random() * zeroGPUUrls.length)];
}

async function generateTags() {
  const imageUrl = 'https://files.catbox.moe/06zi7m.png';
  try {
    const response = await fetch('https://mygpt-api-omc3n2et7a-uc.a.run.app', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: imageUrl }),
    });
    console.log(`[OK] generateTags: ${response.status}`);
  } catch (error) {
    console.error(`[ERROR] generateTags: ${error.message}`);
  }
}

export default {
  async scheduled() {
    console.log('Keep-alive job started');

    const results = await Promise.all([
      generateTags(),
      ...enabledModels.map(async (model) => {
        const endpoint = getRandomEndpoint();
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: model.modelName,
              prompt: 'a girl',
              negative_prompt: model.negativePrompt,
            }),
          });
          console.log(`[OK] ${model.modelName}: ${response.status}`);
          return { model: model.modelName, status: response.status };
        } catch (error) {
          console.error(`[ERROR] ${model.modelName}: ${error.message}`);
          return { model: model.modelName, error: error.message };
        }
      })
    ]);

    console.log(`Keep-alive job completed: ${results.length} requests`);
  },
};
