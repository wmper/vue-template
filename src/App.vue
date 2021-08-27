<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
	data() {
		return {}
	}
}
</script>
<style>
html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
caption,
article,
aside,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
menu,
time,
mark,
audio,
video,
a {
	margin: 0;
	padding: 0;
	border: 0;
	outline: 0;
	font-size: 100%;
	vertical-align: baseline;
	background: transparent;
	text-decoration: none;
}

a:hover {
	color: #356bb3;
}

table {
	border-collapse: collapse;
}

input,
textarea,
select,
button {
	outline: none;
}

input[type="button"],
input[type="submit"],
input[type="reset"] {
	-webkit-appearance: none;
}

/* WebKit浏览器 */
input:focus::-webkit-input-placeholder {
	color: transparent;
}

/* Firefox 4 至 18 */
input:focus:-moz-placeholder {
	color: transparent;
}

/* Firefox 19+ */
input:focus::-moz-placeholder {
	color: transparent;
}

/* IE 10+ */
input:focus:-ms-input-placeholder {
	color: transparent;
}
/* WebKit浏览器 */
textarea:focus::-webkit-input-placeholder {
	color: transparent;
}

/* Firefox 4 至 18 */
textarea:focus:-moz-placeholder {
	color: transparent;
}

/* Firefox 19+ */
textarea:focus::-moz-placeholder {
	color: transparent;
}

/* IE 10+ */
textarea:focus:-ms-input-placeholder {
	color: transparent;
}

li {
	list-style: none;
}
html {
	height: 100%;
}
body {
	height: 100%;
	margin: 0;
	padding: 0;
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
		"Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
#app {
	height: 100%;
	display: flex;
	background: #f2f2f2;
}

::-webkit-scrollbar {
	background: #f2f2f2;
	width: 5px;
	height: 5px;
	background-clip: padding-box;
}

::-webkit-scrollbar-thumb {
	background: #ccc;
}
.h-title {
	display: flex;
	border-left: 4px solid #409eff;
	font-size: 15px;
	padding: 6px 0 6px 15px;
	color: #666;
	margin-bottom: 30px;
}
.tools {
	margin-bottom: 15px;
}
</style>