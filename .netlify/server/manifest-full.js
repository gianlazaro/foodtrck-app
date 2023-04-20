export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","manifest.json","serviceworker.js"]),
	mimeTypes: {".png":"image/png",".json":"application/json",".js":"application/javascript"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.512baaf6.js","imports":["_app/immutable/entry/start.512baaf6.js","_app/immutable/chunks/index.33fbba09.js","_app/immutable/chunks/singletons.e2346903.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.0fae0f9f.js","imports":["_app/immutable/entry/app.0fae0f9f.js","_app/immutable/chunks/index.33fbba09.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: () => import('./entries/endpoints/_server.js')
			},
			{
				id: "/subscription",
				pattern: /^\/subscription\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/subscription/_server.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
