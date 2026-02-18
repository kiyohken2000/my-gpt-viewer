var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-We41Ky/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// src/index.js
var zeroGPUUrls = [
  "https://mygpt-image-api-omc3n2et7a-an.a.run.app",
  "https://mygpt-image-api-2-omc3n2et7a-uc.a.run.app",
  "https://mygpt-image-api-3-omc3n2et7a-uc.a.run.app",
  "https://mygpt-image-api-4-omc3n2et7a-uc.a.run.app",
  "https://mygpt-image-api-5-omc3n2et7a-uc.a.run.app",
  "https://mygpt-image-api-6-omc3n2et7a-uc.a.run.app",
  "https://mygpt-image-api-7-1024868641007.asia-northeast2.run.app",
  "https://mygpt-image-api-8-1024868641007.asia-northeast3.run.app",
  "https://mygpt-image-api-9-1024868641007.asia-northeast1.run.app",
  "https://mygpt-image-api-10-1024868641007.asia-northeast2.run.app",
  "https://mygpt-image-api-11-1024868641007.asia-northeast3.run.app",
  "https://mygpt-image-api-12-1024868641007.asia-northeast1.run.app",
  "https://mygpt-image-api-13-1024868641007.asia-east1.run.app",
  "https://mygpt-image-api-14-1024868641007.asia-east2.run.app",
  "https://mygpt-image-api-15-1024868641007.asia-northeast1.run.app",
  "https://mygpt-image-api-16-1024868641007.asia-northeast2.run.app",
  "https://mygpt-image-api-17-1024868641007.asia-northeast3.run.app",
  "https://mygpt-image-api-18-1024868641007.asia-east1.run.app",
  "https://mygpt-image-api-19-1024868641007.asia-east2.run.app",
  "https://mygpt-image-api-20-1024868641007.asia-northeast1.run.app"
];
var enabledModels = [
  { modelName: "votepurchase/votepurchase-animagine-xl-3.1", negativePrompt: "lowres, bad anatomy, bad hands, text, error, missing finger, extra digits, fewer digits, cropped, worst quality, low quality, low score, bad score, average score, signature, watermark, username, blurry" },
  { modelName: "votepurchase/votepurchase-ponyDiffusionV6XL", negativePrompt: "low quality , bad anatomy, bad proportions, extra legs, deformed anatomy, messy color, deformed fingers, bad, distracted, hyperrealistic,source_furry, source_pony, source_cartoon" },
  { modelName: "retwpay/artiwaifuDiffusion_v20", negativePrompt: "nsfw, lowres, (bad), text, error, fewer, extra, missing, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]" },
  { modelName: "votepurchase/votepurchase-waiREALMIX_v70", negativePrompt: "score_6,score_5,score_4, worst quality, low quality, bad anatomy, bad hands, missing fingers, fewer digits, source_furry, source_pony, source_cartoon,3d, blurry," },
  { modelName: "votepurchase/votepurchase-AnythingXL_xl", negativePrompt: "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name" },
  { modelName: "votepurchase/votepurchase-waiREALCN_v10", negativePrompt: "score_6,score_5,score_4,bad anatomy, bad hands, missing fingers, fewer digits, source_furry, source_pony, source_cartoon,3d, blurry, " },
  { modelName: "votepurchase/votepurchase-7thAnimeXLPonyA_v10", negativePrompt: "score_4,score_5,score_6,source_pony,source_furry,monochrome,3d,photo,hyperrealistic,realstic,rough sketch,fewer digits,extra digits,signature,artist name," },
  { modelName: "retwpay/3x3x3mixxl-v2-sdxl-spo", negativePrompt: "score_6 , score_5 , score_4 , source_furry, source_pony, source_cartoon," },
  { modelName: "votepurchase/votepurchase-PVCStyleModelMovable_pony151", negativePrompt: "engrish text,low quality,worstquality,shiny_skin,score_4,score_3,score_2,score_1,ugly,bad feet,bad hands," },
  { modelName: "votepurchase/votepurchase-PVCStyleModelMovable_beta27Realistic", negativePrompt: "lowres,(bad),text,error,fewer,extra,missing,worst quality,jpeg artifacts,low quality,watermark,unfinished,displeasing,oldest,early,chromatic aberration,artistic error,username,english text,scan,[abstract]," },
  { modelName: "votepurchase/votepurchase-juggernautXL_hyper_8step_sfw", negativePrompt: "nsfw, (low quality, worst quality:1.2), very displeasing, 3d, watermark, signature, ugly, poorly drawn" },
  { modelName: "retwpay/retwpay-novaAnimeXL_ilV40HappyValentine", negativePrompt: "modern, recent, old, oldest, cartoon, graphic, text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured, long body, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, very displeasing, (worst quality, bad quality:1.2), bad anatomy, sketch, jpeg artifacts, signature, watermark, username, signature, simple background, conjoined,bad ai-generated" },
  { modelName: "retwpay/waiNSFWIllustrious_v110", negativePrompt: "bad quality,worst quality,worst detail,sketch,censor" },
  { modelName: "retwpay/shiitakeMix_v10", negativePrompt: "(bad quality,worst quality,low quality,bad anatomy,bad hand:1.3), nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name," },
  { modelName: "retwpay/noobreal_v21", negativePrompt: "blur, sketch, comic, cartoon, toon, oil painting \\(medium\\), flat color, outline, 3D, 2.5D, 2D, unreal, unity, blender, anime ,smooth skin," },
  { modelName: "retwpay/MatureRitual_v04", negativePrompt: "bad quality,worst quality,worst detail,sketch,censor" },
  { modelName: "retwpay/RedcraftCADSUpdatedFeb08_2relustionIL", negativePrompt: "low quality,ugly,deformed,bad anatomy,extra fingers,censored" },
  { modelName: "votepurchase/novaFurryXL_illustriousV7b", negativePrompt: "human, multiple tails, modern, recent, old, oldest, graphic, cartoon, text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured, long body, lowres, bad anatomy, bad hands, missing fingers, extra digits, fewer digits, cropped, very displeasing, (worst quality, bad quality:1.2), bad anatomy, sketch, jpeg artifacts, signature, watermark, username, simple background, conjoined, bad ai-generated" },
  { modelName: "retwpay/pornmasterPro_noobV3VAE", negativePrompt: "lowres, worst aesthetic, bad quality, worst quality, bad anatomy, jpeg artifacts, scan artifacts, lossy-lossless, unfinished, ugly, poorly drawn, greyscale, (illustration, 2d, 2.5D, 3d, painting \\(medium\\), toon \\(style\\), sketch, comic, anime,flat color,outline,smooth skin:1.2) watermark, text, extra digits" }
];
function getRandomEndpoint() {
  return zeroGPUUrls[Math.floor(Math.random() * zeroGPUUrls.length)];
}
__name(getRandomEndpoint, "getRandomEndpoint");
var src_default = {
  async scheduled() {
    console.log("Keep-alive job started");
    const results = await Promise.all(
      enabledModels.map(async (model) => {
        const endpoint = getRandomEndpoint();
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: model.modelName,
              prompt: "a girl",
              negative_prompt: model.negativePrompt
            })
          });
          console.log(`[OK] ${model.modelName}: ${response.status}`);
          return { model: model.modelName, status: response.status };
        } catch (error) {
          console.error(`[ERROR] ${model.modelName}: ${error.message}`);
          return { model: model.modelName, error: error.message };
        }
      })
    );
    console.log(`Keep-alive job completed: ${results.length} requests`);
  }
};

// ../../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../node_modules/wrangler/templates/middleware/middleware-scheduled.ts
var scheduled = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  const url = new URL(request.url);
  if (url.pathname === "/__scheduled") {
    const cron = url.searchParams.get("cron") ?? "";
    await middlewareCtx.dispatch("scheduled", { cron });
    return new Response("Ran scheduled event");
  }
  const resp = await middlewareCtx.next(request, env);
  if (request.headers.get("referer")?.endsWith("/__scheduled") && url.pathname === "/favicon.ico" && resp.status === 500) {
    return new Response(null, { status: 404 });
  }
  return resp;
}, "scheduled");
var middleware_scheduled_default = scheduled;

// ../../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-We41Ky/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_scheduled_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-We41Ky/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
