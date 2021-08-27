const path = require("path")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const JavaScriptObfuscator = require("webpack-obfuscator")

function resolve(dir) {
	return path.join(__dirname, dir)
}

const env = process.env.NODE_ENV === "production" ? "production" : "development"

module.exports = {
	publicPath: "./", // 基本路径
	outputDir: "dist", // 输出文件目录
	lintOnSave: false, // eslint-loader 是否在保存的时候检查
	runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
	// 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
	parallel: require("os").cpus().length > 1,
	productionSourceMap: false, // 生产环境是否生成 sourceMap 文件，一般情况不建议打开

	chainWebpack: config => {
		config.resolve.alias
			.set("@", resolve("src"))
			.set("_c", resolve("src/components"))
	},
	configureWebpack: config => {
		if (env === "production") {
			// 为生产环境修改配置...
			config.mode = "production"
			// 开启gzip压缩
			config.plugins.push(
				new CompressionWebpackPlugin({
					algorithm: "gzip",
					test: /\.js$|\.html$|\.json$|\.css/,
					filename: "[path].gz[query]",
					threshold: 10240,
					minRatio: 0.8
				})
			)
			config.plugins.push(
				new JavaScriptObfuscator(
					{
						// 压缩代码
						compact: true,
						// 是否启用控制流扁平化(降低1.5倍的运行速度)
						controlFlowFlattening: false,
						// 随机的死代码块(增加了混淆代码的大小)
						deadCodeInjection: false,
						// 此选项几乎不可能使用开发者工具的控制台选项卡
						debugProtection: false,
						// 如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，从而更难使用“开发人员工具”的其他功能。
						debugProtectionInterval: false,
						// 通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。
						disableConsoleOutput: true,
						// 标识符的混淆方式 hexadecimal(十六进制) mangled(短标识符)
						identifierNamesGenerator: "hexadecimal",
						log: false,
						// 是否启用全局变量和函数名称的混淆
						renameGlobals: true,
						// 通过固定和随机（在代码混淆时生成）的位置移动数组。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
						rotateStringArray: true,
						// 混淆后的代码,不能使用代码美化,同时需要配置 cpmpat:true;
						selfDefending: true,
						// 删除字符串文字并将它们放在一个特殊的数组中
						stringArray: false,
						stringArrayEncoding: ["rc4"],
						stringArrayThreshold: 0.75,
						// 允许启用/禁用字符串转换为unicode转义序列。Unicode转义序列大大增加了代码大小，并且可以轻松地将字符串恢复为原始视图。建议仅对小型源代码启用此选项。
						unicodeEscapeSequence: false
					},
					[]
				)
			)
			config.optimization = {
				minimizer: [
					new UglifyJsPlugin({
						uglifyOptions: {
							compress: {
								drop_console: true, // console
								drop_debugger: false,
								pure_funcs: ["console.log"] // 移除console
							}
						}
					})
				]
			}
		}
	}
}
