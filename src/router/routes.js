/**
 * meta
 */
export default [
	{
		path: "/login",
		meta: {
			title: "登陆"
		},
		component: () => import("@/views/login.vue")
	},
	{
		path: "/",
		meta: {
			title: "首页"
		},
		component: () => import("@/views/main.vue"),
		children: [
			{
				path: "/console",
				meta: {
					title: "控制台"
				},
				component: () => import("@/views/console.vue")
			}
		]
	}
]
